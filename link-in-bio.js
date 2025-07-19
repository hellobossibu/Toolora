// Link in Bio Generator Script
document.addEventListener('DOMContentLoaded', function() {
    const profilePic = document.getElementById('profilePic');
    const profileName = document.getElementById('profileName');
    const profileBio = document.getElementById('profileBio');
    const linksContainer = document.getElementById('linksContainer');
    const addLinkBtn = document.getElementById('addLinkBtn');
    const previewBtn = document.getElementById('previewBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const previewContainer = document.getElementById('previewContainer');

    let linkCounter = 0;

    // Add new link
    function addLink() {
        linkCounter++;
        const linkDiv = document.createElement('div');
        linkDiv.className = 'bg-gray-50 rounded-xl p-4 border-2 border-gray-200';
        linkDiv.innerHTML = `
            <div class="flex items-center justify-between mb-3">
                <h4 class="font-semibold text-gray-700">Link ${linkCounter}</h4>
                <button class="text-red-500 hover:text-red-700" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="space-y-3">
                <input type="text" placeholder="Link Title" class="link-title w-full px-3 py-2 border border-gray-300 rounded-lg">
                <input type="url" placeholder="URL" class="link-url w-full px-3 py-2 border border-gray-300 rounded-lg">
                <select class="link-icon w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="fas fa-link">🔗 Link</option>
                    <option value="fab fa-instagram">📷 Instagram</option>
                    <option value="fab fa-youtube">📺 YouTube</option>
                    <option value="fab fa-twitter">🐦 Twitter</option>
                    <option value="fab fa-tiktok">🎵 TikTok</option>
                    <option value="fab fa-facebook">📘 Facebook</option>
                    <option value="fab fa-linkedin">💼 LinkedIn</option>
                    <option value="fas fa-envelope">📧 Email</option>
                    <option value="fas fa-phone">📞 Phone</option>
                    <option value="fas fa-globe">🌐 Website</option>
                    <option value="fas fa-shopping-cart">🛒 Shop</option>
                    <option value="fas fa-heart">❤️ Heart</option>
                    <option value="fas fa-star">⭐ Star</option>
                    <option value="fas fa-fire">🔥 Fire</option>
                    <option value="fas fa-rocket">🚀 Rocket</option>
                </select>
            </div>
        `;
        linksContainer.appendChild(linkDiv);
    }

    // Preview bio page
    function previewBioPage() {
        const name = profileName.value || 'Your Name';
        const bio = profileBio.value || 'Tell people about yourself...';
        const picUrl = profilePic.value || 'https://via.placeholder.com/150x150/667eea/ffffff?text=Profile';

        let linksHTML = '';
        const linkElements = linksContainer.querySelectorAll('.bg-gray-50');
        linkElements.forEach((linkEl, index) => {
            const title = linkEl.querySelector('.link-title').value || `Link ${index + 1}`;
            const url = linkEl.querySelector('.link-url').value || '#';
            const icon = linkEl.querySelector('.link-icon').value || 'fas fa-link';
            
            if (url && url !== '#') {
                linksHTML += `
                    <a href="${url}" target="_blank" class="block w-full bg-white hover:bg-gray-50 text-gray-800 py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 mb-4">
                        <i class="${icon} mr-3 text-purple-500"></i>
                        ${title}
                    </a>
                `;
            }
        });

        const previewHTML = `
            <div class="max-w-md mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 shadow-xl">
                <div class="text-center">
                    <img src="${picUrl}" alt="${name}" class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg">
                    <h1 class="text-2xl font-bold text-white mb-2">${name}</h1>
                    <p class="text-purple-100 mb-8">${bio}</p>
                    <div class="space-y-4">
                        ${linksHTML}
                    </div>
                </div>
            </div>
        `;

        previewContainer.innerHTML = previewHTML;
    }

    // Download bio page
    function downloadBioPage() {
        const name = profileName.value || 'Your Name';
        const bio = profileBio.value || 'Tell people about yourself...';
        const picUrl = profilePic.value || 'https://via.placeholder.com/150x150/667eea/ffffff?text=Profile';

        let linksHTML = '';
        const linkElements = linksContainer.querySelectorAll('.bg-gray-50');
        linkElements.forEach((linkEl, index) => {
            const title = linkEl.querySelector('.link-title').value || `Link ${index + 1}`;
            const url = linkEl.querySelector('.link-url').value || '#';
            const icon = linkEl.querySelector('.link-icon').value || 'fas fa-link';
            
            if (url && url !== '#') {
                linksHTML += `
                    <a href="${url}" target="_blank" class="block w-full bg-white hover:bg-gray-50 text-gray-800 py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 mb-4">
                        <i class="${icon} mr-3 text-purple-500"></i>
                        ${title}
                    </a>
                `;
            }
        });

        const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - Bio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="bg-gradient-to-br from-purple-500 to-pink-500 min-h-screen">
    <div class="max-w-md mx-auto bg-gradient-to-br from-purple-500 to-pink-500 min-h-screen p-6">
        <div class="text-center">
            <img src="${picUrl}" alt="${name}" class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg">
            <h1 class="text-2xl font-bold text-white mb-2">${name}</h1>
            <p class="text-purple-100 mb-8">${bio}</p>
            <div class="space-y-4">
                ${linksHTML}
            </div>
        </div>
    </div>
</body>
</html>`;

        const blob = new Blob([fullHTML], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name.replace(/\s+/g, '-').toLowerCase()}-bio.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    // Event listeners
    addLinkBtn.addEventListener('click', addLink);
    previewBtn.addEventListener('click', previewBioPage);
    downloadBtn.addEventListener('click', downloadBioPage);

    // Auto-save to localStorage
    function saveToLocalStorage() {
        const data = {
            profilePic: profilePic.value,
            profileName: profileName.value,
            profileBio: profileBio.value,
            links: []
        };

        const linkElements = linksContainer.querySelectorAll('.bg-gray-50');
        linkElements.forEach(linkEl => {
            data.links.push({
                title: linkEl.querySelector('.link-title').value,
                url: linkEl.querySelector('.link-url').value,
                icon: linkEl.querySelector('.link-icon').value
            });
        });

        localStorage.setItem('linkInBioData', JSON.stringify(data));
    }

    // Load from localStorage
    function loadFromLocalStorage() {
        const saved = localStorage.getItem('linkInBioData');
        if (saved) {
            const data = JSON.parse(saved);
            profilePic.value = data.profilePic || '';
            profileName.value = data.profileName || '';
            profileBio.value = data.profileBio || '';
            
            data.links.forEach(link => {
                addLink();
                const lastLink = linksContainer.lastElementChild;
                lastLink.querySelector('.link-title').value = link.title || '';
                lastLink.querySelector('.link-url').value = link.url || '';
                lastLink.querySelector('.link-icon').value = link.icon || 'fas fa-link';
            });
        }
    }

    // Auto-save on input
    [profilePic, profileName, profileBio].forEach(input => {
        input.addEventListener('input', saveToLocalStorage);
    });

    // Load saved data on page load
    loadFromLocalStorage();

    // Add initial link if none exist
    if (linksContainer.children.length === 0) {
        addLink();
    }

    console.log('Link in Bio Generator loaded successfully!');
}); 