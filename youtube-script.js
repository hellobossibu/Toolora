// YouTube Thumbnail Downloader Script
document.addEventListener('DOMContentLoaded', function() {
    const youtubeUrlInput = document.getElementById('youtubeUrl');
    const extractBtn = document.getElementById('extractBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const results = document.getElementById('results');
    const errorMessage = document.getElementById('errorMessage');
    const highQualityThumbnail = document.getElementById('highQualityThumbnail');
    const standardThumbnail = document.getElementById('standardThumbnail');
    const downloadHighQuality = document.getElementById('downloadHighQuality');
    const downloadStandard = document.getElementById('downloadStandard');
    const videoDetails = document.getElementById('videoDetails');

    // Extract YouTube video ID from URL
    function extractVideoId(url) {
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/watch\?.*&v=)([^&\n?#]+)/,
            /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
            /youtu\.be\/([^&\n?#]+)/
        ];

        for (let pattern of patterns) {
            const match = url.match(pattern);
            if (match) {
                return match[1];
            }
        }
        return null;
    }

    // Generate thumbnail URLs
    function generateThumbnailUrls(videoId) {
        return {
            highQuality: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            standard: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
            low: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`
        };
    }

    // Check if image exists
    async function checkImageExists(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    // Get the best available thumbnail
    async function getBestThumbnail(videoId) {
        const urls = generateThumbnailUrls(videoId);
        
        // Check high quality first
        if (await checkImageExists(urls.highQuality)) {
            return { url: urls.highQuality, quality: 'High Quality (1280x720)' };
        }
        
        // Check standard quality
        if (await checkImageExists(urls.standard)) {
            return { url: urls.standard, quality: 'Standard Quality (480x360)' };
        }
        
        // Check medium quality
        if (await checkImageExists(urls.medium)) {
            return { url: urls.medium, quality: 'Medium Quality (320x180)' };
        }
        
        // Fallback to low quality
        return { url: urls.low, quality: 'Low Quality (120x90)' };
    }

    // Download image
    function downloadImage(url, filename) {
        // Create a temporary canvas to handle CORS issues
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            canvas.toBlob(function(blob) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            }, 'image/jpeg', 0.9);
        };
        
        img.onerror = function() {
            // Fallback: direct download
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        
        img.src = url;
    }

    // Extract thumbnails
    async function extractThumbnails() {
        const url = youtubeUrlInput.value.trim();
        
        if (!url) {
            showError('Please enter a YouTube URL');
            return;
        }

        const videoId = extractVideoId(url);
        if (!videoId) {
            showError('Invalid YouTube URL. Please check the URL and try again.');
            return;
        }

        // Show loading
        hideError();
        showLoading();
        hideResults();

        try {
            // Get thumbnails
            const urls = generateThumbnailUrls(videoId);
            
            // Check which thumbnails are available
            const [highQualityExists, standardExists] = await Promise.all([
                checkImageExists(urls.highQuality),
                checkImageExists(urls.standard)
            ]);

            // Set thumbnail images
            if (highQualityExists) {
                highQualityThumbnail.src = urls.highQuality;
                highQualityThumbnail.alt = 'High Quality Thumbnail';
            } else {
                highQualityThumbnail.src = urls.standard;
                highQualityThumbnail.alt = 'Standard Quality Thumbnail (High Quality not available)';
            }

            standardThumbnail.src = urls.standard;
            standardThumbnail.alt = 'Standard Quality Thumbnail';

            // Set download handlers
            downloadHighQuality.onclick = () => {
                const filename = `youtube-thumbnail-${videoId}-high.jpg`;
                downloadImage(highQualityThumbnail.src, filename);
            };

            downloadStandard.onclick = () => {
                const filename = `youtube-thumbnail-${videoId}-standard.jpg`;
                downloadImage(standardThumbnail.src, filename);
            };

            // Show video info
            videoDetails.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <strong>Video ID:</strong> ${videoId}
                    </div>
                    <div>
                        <strong>High Quality:</strong> ${highQualityExists ? 'Available' : 'Not Available'}
                    </div>
                    <div>
                        <strong>Standard Quality:</strong> Available
                    </div>
                    <div>
                        <strong>Original URL:</strong> <a href="${url}" target="_blank" class="text-blue-500 hover:underline">${url}</a>
                    </div>
                </div>
            `;

            // Show results
            hideLoading();
            showResults();

        } catch (error) {
            console.error('Error extracting thumbnails:', error);
            hideLoading();
            showError('Failed to extract thumbnails. Please check the URL and try again.');
        }
    }

    // Utility functions
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    function hideError() {
        errorMessage.classList.add('hidden');
    }

    function showLoading() {
        loadingSpinner.classList.remove('hidden');
    }

    function hideLoading() {
        loadingSpinner.classList.add('hidden');
    }

    function showResults() {
        results.classList.remove('hidden');
    }

    function hideResults() {
        results.classList.add('hidden');
    }

    // Event listeners
    extractBtn.addEventListener('click', extractThumbnails);

    youtubeUrlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            extractThumbnails();
        }
    });

    // Handle image load errors
    highQualityThumbnail.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg==';
        this.alt = 'Image not available';
    });

    standardThumbnail.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg==';
        this.alt = 'Image not available';
    });

    // Auto-focus on input
    youtubeUrlInput.focus();

    console.log('YouTube Thumbnail Downloader loaded successfully!');
}); 