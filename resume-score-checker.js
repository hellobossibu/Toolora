const resumeInput = document.getElementById('resumeInput');
const openaiKeyInput = document.getElementById('openaiKey');
const checkResumeBtn = document.getElementById('checkResumeBtn');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const resultContainer = document.getElementById('resultContainer');
const scoreDisplay = document.getElementById('scoreDisplay');
const feedbackFormatting = document.getElementById('feedbackFormatting');
const feedbackClarity = document.getElementById('feedbackClarity');
const feedbackImpact = document.getElementById('feedbackImpact');

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

checkResumeBtn.addEventListener('click', async () => {
    const resume = resumeInput.value.trim();
    const apiKey = openaiKeyInput.value.trim();
    hideError();
    hideResult();
    if (!resume) {
        showError('Please paste your resume.');
        return;
    }
    if (!apiKey || !apiKey.startsWith('sk-')) {
        showError('Please enter a valid OpenAI API key.');
        return;
    }
    showLoading();
    try {
        const prompt = `You are a professional resume reviewer. Given the following resume, provide:\n- A score out of 10 (just the number, no explanation)\n- Feedback in three categories: Formatting, Clarity, and Impact.\nFormat your response as:\nScore: <number>\nFormatting: <feedback>\nClarity: <feedback>\nImpact: <feedback>\n\nResume:\n${resume}`;
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 500,
                temperature: 0.5
            })
        });
        if (!response.ok) {
            throw new Error('OpenAI API error: ' + response.status);
        }
        const data = await response.json();
        let text = data.choices[0].message.content.trim();
        // Parse response
        const scoreMatch = text.match(/Score:\s*(\d+)/i);
        const formattingMatch = text.match(/Formatting:\s*([\s\S]*?)(Clarity:|$)/i);
        const clarityMatch = text.match(/Clarity:\s*([\s\S]*?)(Impact:|$)/i);
        const impactMatch = text.match(/Impact:\s*([\s\S]*)/i);
        scoreDisplay.textContent = scoreMatch ? scoreMatch[1] : '?';
        feedbackFormatting.textContent = formattingMatch ? formattingMatch[1].trim() : 'No feedback.';
        feedbackClarity.textContent = clarityMatch ? clarityMatch[1].trim() : 'No feedback.';
        feedbackImpact.textContent = impactMatch ? impactMatch[1].trim() : 'No feedback.';
        showResult();
    } catch (err) {
        showError(err.message || 'Failed to evaluate resume.');
    } finally {
        hideLoading();
    }
}); 