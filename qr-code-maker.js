// QR Code Maker JS
// Uses QRious (https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js)

// Dynamically load QRious if not present
(function loadQRious() {
    if (!window.QRious) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js';
        script.onload = () => {};
        document.head.appendChild(script);
    }
})();

const qrInput = document.getElementById('qrInput');
const generateQRBtn = document.getElementById('generateQRBtn');
const qrResult = document.getElementById('qrResult');
const qrCanvas = document.getElementById('qrCanvas');
const downloadQRBtn = document.getElementById('downloadQRBtn');
const copyQRBtn = document.getElementById('copyQRBtn');
const qrNotification = document.getElementById('qrNotification');

let qr;

function showQRNotification(message, type = 'success') {
    qrNotification.textContent = message;
    qrNotification.className = `mt-4 text-center ${type === 'success' ? 'text-green-600' : 'text-red-600'}`;
    qrNotification.classList.remove('hidden');
    setTimeout(() => qrNotification.classList.add('hidden'), 2000);
}

function generateQR() {
    const value = qrInput.value.trim();
    if (!value) {
        showQRNotification('Please enter text or a URL.', 'error');
        qrResult.classList.add('hidden');
        return;
    }
    if (!window.QRious) {
        showQRNotification('QR code library not loaded. Try again.', 'error');
        return;
    }
    qr = new QRious({
        element: qrCanvas,
        value: value,
        size: 220,
        level: 'H',
    });
    qrResult.classList.remove('hidden');
    showQRNotification('QR code generated!');
}

generateQRBtn.addEventListener('click', generateQR);
qrInput.addEventListener('keypress', e => { if (e.key === 'Enter') generateQR(); });

downloadQRBtn.addEventListener('click', () => {
    if (!qr) {
        showQRNotification('Generate a QR code first.', 'error');
        return;
    }
    const link = document.createElement('a');
    link.href = qrCanvas.toDataURL('image/png');
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showQRNotification('QR code downloaded!');
});

copyQRBtn.addEventListener('click', async () => {
    if (!qr) {
        showQRNotification('Generate a QR code first.', 'error');
        return;
    }
    try {
        qrCanvas.toBlob(blob => {
            const item = new ClipboardItem({ 'image/png': blob });
            navigator.clipboard.write([item]).then(() => {
                showQRNotification('QR code copied to clipboard!');
            }).catch(() => {
                showQRNotification('Failed to copy QR code.', 'error');
            });
        });
    } catch {
        showQRNotification('Copy not supported in this browser.', 'error');
    }
}); 