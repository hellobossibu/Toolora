const pdfInput = document.getElementById('pdfInput');
const pdfError = document.getElementById('pdfError');
const pdfLoading = document.getElementById('pdfLoading');
const flipbookContainer = document.getElementById('flipbookContainer');
const flipbook = document.getElementById('flipbook');
const closeFlipbook = document.getElementById('closeFlipbook');

pdfInput.addEventListener('change', handlePDFUpload);
closeFlipbook.addEventListener('click', () => {
    flipbookContainer.classList.add('hidden');
    flipbook.innerHTML = '';
    pdfInput.value = '';
});

function showError(msg) {
    pdfError.textContent = msg;
    pdfError.classList.remove('hidden');
}
function hideError() {
    pdfError.classList.add('hidden');
}
function showLoading() {
    pdfLoading.classList.remove('hidden');
}
function hideLoading() {
    pdfLoading.classList.add('hidden');
}

async function handlePDFUpload(e) {
    hideError();
    flipbook.innerHTML = '';
    const file = e.target.files[0];
    if (!file || file.type !== 'application/pdf') {
        showError('Please upload a valid PDF file.');
        return;
    }
    showLoading();
    try {
        const fileReader = new FileReader();
        fileReader.onload = async function() {
            const typedarray = new Uint8Array(this.result);
            const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
            const pages = [];
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                const context = canvas.getContext('2d');
                await page.render({ canvasContext: context, viewport: viewport }).promise;
                const img = document.createElement('img');
                img.src = canvas.toDataURL('image/png');
                img.className = 'flipbook-page w-full h-full object-contain';
                img.style.background = 'white';
                pages.push(img);
            }
            // Add pages to flipbook
            flipbook.innerHTML = '';
            pages.forEach(page => flipbook.appendChild(page));
            // Init turn.js
            $(flipbook).turn({
                width: Math.min(800, window.innerWidth * 0.7),
                height: Math.min(600, window.innerHeight * 0.6),
                autoCenter: true,
                gradients: true,
                elevation: 50
            });
            flipbookContainer.classList.remove('hidden');
        };
        fileReader.readAsArrayBuffer(file);
    } catch (err) {
        showError('Failed to process PDF. Try a different file.');
    } finally {
        hideLoading();
    }
} 