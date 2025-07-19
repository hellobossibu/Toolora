const lengthInput = document.getElementById('length');
const uppercaseInput = document.getElementById('uppercase');
const lowercaseInput = document.getElementById('lowercase');
const numbersInput = document.getElementById('numbers');
const symbolsInput = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const passwordOutput = document.getElementById('passwordOutput');
const copyBtn = document.getElementById('copyBtn');
const notification = document.getElementById('notification');

function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = `mt-4 text-center ${type === 'success' ? 'text-green-600' : 'text-red-600'}`;
    notification.classList.remove('hidden');
    setTimeout(() => notification.classList.add('hidden'), 2000);
}

function generatePassword() {
    const length = parseInt(lengthInput.value, 10);
    const useUpper = uppercaseInput.checked;
    const useLower = lowercaseInput.checked;
    const useNumbers = numbersInput.checked;
    const useSymbols = symbolsInput.checked;

    let chars = '';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?/~';

    if (!chars) {
        showNotification('Select at least one character type.', 'error');
        return '';
    }
    if (length < 4 || length > 64) {
        showNotification('Password length must be 4-64.', 'error');
        return '';
    }
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

generateBtn.addEventListener('click', () => {
    const pwd = generatePassword();
    if (pwd) {
        passwordOutput.value = pwd;
        showNotification('Password generated!');
    }
});

copyBtn.addEventListener('click', () => {
    if (!passwordOutput.value) {
        showNotification('Nothing to copy.', 'error');
        return;
    }
    navigator.clipboard.writeText(passwordOutput.value).then(() => {
        showNotification('Copied to clipboard!');
    }).catch(() => {
        showNotification('Failed to copy.', 'error');
    });
}); 