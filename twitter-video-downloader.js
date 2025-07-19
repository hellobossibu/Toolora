const tweetUrlInput = document.getElementById('tweetUrl');
const downloadBtn = document.getElementById('downloadBtn');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const resultContainer = document.getElementById('resultContainer');
const videoDownloadLink = document.getElementById('videoDownloadLink');
const videoPreview = document.getElementById('videoPreview');

function showError(msg) {
    errorState.textContent = msg;
    errorState.classList.remove('hidden');
}
function hideError() {
    errorState.classList.add('hidden');
}
function showLoading() {
    loadingState.classList.remove('hidden');
}
function hideLoading() {
    loadingState.classList.add('hidden');
}
function showResult() {
    resultContainer.classList.remove('hidden');
}
function hideResult() {
    resultContainer.classList.add('hidden');
}

// Helper: Validate Twitter URL
function isValidTwitterUrl(url) {
    return /^https?:\/\/(www\.)?(twitter|x)\.com\/.+\/status\/[0-9]+/i.test(url);
}

downloadBtn.addEventListener('click', async () => {
    const tweetUrl = tweetUrlInput.value.trim();
    hideError();
    hideResult();
    if (!tweetUrl) {
        showError('Please paste a tweet URL.');
        return;
    }
    if (!isValidTwitterUrl(tweetUrl)) {
        showError('Please enter a valid Twitter/X tweet URL.');
        return;
    }
    showLoading();
    try {
        // Use savefrom.net as a third-party service (opens their page with the video ready to download)
        // You can swap this for another service if you prefer
        const savefromUrl = `https://en.savefrom.net/18/#url=${encodeURIComponent(tweetUrl)}`;
        videoDownloadLink.href = savefromUrl;
        videoDownloadLink.textContent = 'Download via SaveFrom.net';
        // Optionally, show a preview (just the tweet link as a fallback)
        videoPreview.innerHTML = `<a href="${tweetUrl}" target="_blank" class="text-blue-500 underline">View Original Tweet</a>`;
        showResult();
    } catch (err) {
        showError('Failed to process tweet. Try again or use a different service.');
    } finally {
        hideLoading();
    }
}); 