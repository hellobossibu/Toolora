// Free Tools Bundle Script
document.addEventListener('DOMContentLoaded', function() {
    // Password Generator
    const passwordLength = document.getElementById('passwordLength');
    const lengthDisplay = document.getElementById('lengthDisplay');
    const includeUppercase = document.getElementById('includeUppercase');
    const includeLowercase = document.getElementById('includeLowercase');
    const includeNumbers = document.getElementById('includeNumbers');
    const includeSymbols = document.getElementById('includeSymbols');
    const generatePasswordBtn = document.getElementById('generatePasswordBtn');
    const passwordResult = document.getElementById('passwordResult');
    const generatedPassword = document.getElementById('generatedPassword');
    const copyPasswordBtn = document.getElementById('copyPasswordBtn');
    const passwordStrength = document.getElementById('passwordStrength');

    // QR Code Maker
    const qrContent = document.getElementById('qrContent');
    const qrType = document.getElementById('qrType');
    const generateQrBtn = document.getElementById('generateQrBtn');
    const qrResult = document.getElementById('qrResult');
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const downloadQrBtn = document.getElementById('downloadQrBtn');

    // Word Counter
    const textToCount = document.getElementById('textToCount');
    const wordCount = document.getElementById('wordCount');
    const charCount = document.getElementById('charCount');
    const charNoSpaceCount = document.getElementById('charNoSpaceCount');
    const lineCount = document.getElementById('lineCount');

    // Text Case Converter
    const textToConvert = document.getElementById('textToConvert');
    const convertedText = document.getElementById('convertedText');
    const copyConvertedBtn = document.getElementById('copyConvertedBtn');

    // Password Generator Functions
    function updateLengthDisplay() {
        lengthDisplay.textContent = passwordLength.value;
    }

    function generatePassword() {
        const length = parseInt(passwordLength.value);
        const hasUppercase = includeUppercase.checked;
        const hasLowercase = includeLowercase.checked;
        const hasNumbers = includeNumbers.checked;
        const hasSymbols = includeSymbols.checked;

        if (!hasUppercase && !hasLowercase && !hasNumbers && !hasSymbols) {
            alert('Please select at least one character type.');
            return;
        }

        let chars = '';
        if (hasUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (hasLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (hasNumbers) chars += '0123456789';
        if (hasSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        generatedPassword.value = password;
        passwordResult.classList.remove('hidden');
        updatePasswordStrength(password);
    }

    function updatePasswordStrength(password) {
        let strength = 0;
        let feedback = [];

        if (password.length >= 12) strength += 2;
        else if (password.length >= 8) strength += 1;

        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;

        let strengthText = '';
        let strengthColor = '';

        if (strength >= 5) {
            strengthText = 'Very Strong';
            strengthColor = 'text-green-600';
        } else if (strength >= 4) {
            strengthText = 'Strong';
            strengthColor = 'text-green-500';
        } else if (strength >= 3) {
            strengthText = 'Medium';
            strengthColor = 'text-yellow-600';
        } else if (strength >= 2) {
            strengthText = 'Weak';
            strengthColor = 'text-orange-600';
        } else {
            strengthText = 'Very Weak';
            strengthColor = 'text-red-600';
        }

        passwordStrength.innerHTML = `<span class="${strengthColor} font-semibold">${strengthText}</span> (Score: ${strength}/6)`;
    }

    function copyPassword() {
        generatedPassword.select();
        document.execCommand('copy');
        
        const originalText = copyPasswordBtn.innerHTML;
        copyPasswordBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Copied!';
        copyPasswordBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        copyPasswordBtn.classList.add('bg-green-600');
        
        setTimeout(() => {
            copyPasswordBtn.innerHTML = originalText;
            copyPasswordBtn.classList.remove('bg-green-600');
            copyPasswordBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
        }, 2000);
    }

    // QR Code Maker Functions
    function generateQRCode() {
        const content = qrContent.value.trim();
        const type = qrType.value;

        if (!content) {
            alert('Please enter content for the QR code.');
            return;
        }

        let qrData = content;
        if (type === 'url' && !content.startsWith('http')) {
            qrData = 'https://' + content;
        }

        qrCodeContainer.innerHTML = '';
        
        QRCode.toCanvas(qrCodeContainer, qrData, {
            width: 200,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        }, function(error) {
            if (error) {
                alert('Failed to generate QR code. Please try again.');
            } else {
                qrResult.classList.remove('hidden');
            }
        });
    }

    function downloadQRCode() {
        const canvas = qrCodeContainer.querySelector('canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = canvas.toDataURL();
            link.click();
        }
    }

    // Word Counter Functions
    function updateWordCount() {
        const text = textToCount.value;
        const words = text.trim() ? text.trim().split(/\s+/) : [];
        const characters = text.length;
        const charactersNoSpace = text.replace(/\s/g, '').length;
        const lines = text ? text.split('\n').length : 0;

        wordCount.textContent = words.length;
        charCount.textContent = characters;
        charNoSpaceCount.textContent = charactersNoSpace;
        lineCount.textContent = lines;
    }

    // Text Case Converter Functions
    function convertTextCase(type) {
        const text = textToConvert.value;
        let converted = '';

        switch (type) {
            case 'uppercase':
                converted = text.toUpperCase();
                break;
            case 'lowercase':
                converted = text.toLowerCase();
                break;
            case 'titleCase':
                converted = text.replace(/\w\S*/g, (txt) => 
                    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                );
                break;
            case 'sentenceCase':
                converted = text.toLowerCase().replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
                break;
            case 'camelCase':
                converted = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
                break;
            case 'snakeCase':
                converted = text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_');
                break;
        }

        convertedText.value = converted;
    }

    function copyConvertedText() {
        convertedText.select();
        document.execCommand('copy');
        
        const originalText = copyConvertedBtn.innerHTML;
        copyConvertedBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Copied!';
        copyConvertedBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        copyConvertedBtn.classList.add('bg-green-600');
        
        setTimeout(() => {
            copyConvertedBtn.innerHTML = originalText;
            copyConvertedBtn.classList.remove('bg-green-600');
            copyConvertedBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
        }, 2000);
    }

    // Event Listeners
    // Password Generator
    passwordLength.addEventListener('input', updateLengthDisplay);
    generatePasswordBtn.addEventListener('click', generatePassword);
    copyPasswordBtn.addEventListener('click', copyPassword);

    // QR Code Maker
    generateQrBtn.addEventListener('click', generateQRCode);
    downloadQrBtn.addEventListener('click', downloadQRCode);

    // Word Counter
    textToCount.addEventListener('input', updateWordCount);

    // Text Case Converter
    document.getElementById('uppercaseBtn').addEventListener('click', () => convertTextCase('uppercase'));
    document.getElementById('lowercaseBtn').addEventListener('click', () => convertTextCase('lowercase'));
    document.getElementById('titleCaseBtn').addEventListener('click', () => convertTextCase('titleCase'));
    document.getElementById('sentenceCaseBtn').addEventListener('click', () => convertTextCase('sentenceCase'));
    document.getElementById('camelCaseBtn').addEventListener('click', () => convertTextCase('camelCase'));
    document.getElementById('snakeCaseBtn').addEventListener('click', () => convertTextCase('snakeCase'));
    copyConvertedBtn.addEventListener('click', copyConvertedText);

    // Initialize
    updateLengthDisplay();
    updateWordCount();

    console.log('Free Tools Bundle loaded successfully!');
}); 