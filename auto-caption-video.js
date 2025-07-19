const videoInput = document.getElementById('videoInput');
const openaiKeyInput = document.getElementById('openaiKey');
const generateBtn = document.getElementById('generateBtn');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const resultContainer = document.getElementById('resultContainer');
const transcriptDisplay = document.getElementById('transcriptDisplay');
const downloadSrtBtn = document.getElementById('downloadSrtBtn');

let transcriptText = '';

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

function toSrt(transcript) {
    // Simple SRT generator: splits transcript into sentences, assigns fake timings
    const sentences = transcript.match(/[^.!?\n]+[.!?\n]+/g) || [transcript];
    let srt = '';
    let start = 0;
    const duration = 3; // 3 seconds per sentence (fake)
    sentences.forEach((sentence, i) => {
        const end = start + duration;
        const pad = n => String(n).padStart(2, '0');
        const time = t => `${pad(Math.floor(t/60))}:${pad(t%60)},000`;
        srt += `${i+1}\n${time(start)} --> ${time(end)}\n${sentence.trim()}\n\n`;
        start = end;
    });
    return srt;
}

generateBtn.addEventListener('click', async () => {
    hideError();
    hideResult();
    const file = videoInput.files[0];
    const apiKey = openaiKeyInput.value.trim();
    if (!file || file.type !== 'video/mp4') {
        showError('Please upload a valid MP4 video.');
        return;
    }
    if (!apiKey || !apiKey.startsWith('sk-')) {
        showError('Please enter a valid OpenAI API key.');
        return;
    }
    showLoading();
    try {
        // Prepare form data for Whisper API
        const formData = new FormData();
        formData.append('file', file);
        formData.append('model', 'whisper-1');
        formData.append('response_format', 'text');
        // Call OpenAI Whisper API
        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            },
            body: formData
        });
        if (!response.ok) {
            throw new Error('OpenAI API error: ' + response.status);
        }
        transcriptText = await response.text();
        transcriptDisplay.textContent = transcriptText;
        showResult();
    } catch (err) {
        showError(err.message || 'Failed to transcribe video.');
    } finally {
        hideLoading();
    }
});

downloadSrtBtn.addEventListener('click', () => {
    if (!transcriptText) return;
    const srt = toSrt(transcriptText);
    const blob = new Blob([srt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'captions.srt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}); 