// Emoji mapping for common words and concepts
const emojiMap = {
    love: '❤️',
    like: '👍',
    happy: '😊',
    sad: '😢',
    cat: '🐱',
    dog: '🐶',
    pizza: '🍕',
    burger: '🍔',
    coffee: '☕',
    tea: '🍵',
    sun: '☀️',
    moon: '🌙',
    star: '⭐',
    fire: '🔥',
    cool: '😎',
    party: '🎉',
    music: '🎵',
    car: '🚗',
    bike: '🚲',
    run: '🏃',
    walk: '🚶',
    food: '🍽️',
    cake: '🎂',
    birthday: '🎂',
    gift: '🎁',
    money: '💰',
    phone: '📱',
    computer: '💻',
    book: '📚',
    school: '🏫',
    work: '💼',
    home: '🏠',
    travel: '✈️',
    airplane: '✈️',
    train: '🚆',
    bus: '🚌',
    water: '💧',
    rain: '🌧️',
    snow: '❄️',
    smile: '😄',
    laugh: '😂',
    cry: '😭',
    angry: '😡',
    wow: '😲',
    sleep: '😴',
    food: '🍽️',
    drink: '🥤',
    beer: '🍺',
    wine: '🍷',
    soccer: '⚽',
    football: '🏈',
    basketball: '🏀',
    tennis: '🎾',
    movie: '🎬',
    tv: '📺',
    camera: '📷',
    photo: '📸',
    heart: '❤️',
    star: '⭐',
    flower: '🌸',
    tree: '🌳',
    beach: '🏖️',
    mountain: '⛰️',
    city: '🏙️',
    world: '🌍',
    earth: '🌍',
    family: '👨‍👩‍👧‍👦',
    friend: '👫',
    friends: '👫',
    baby: '👶',
    boy: '👦',
    girl: '👧',
    man: '👨',
    woman: '👩',
    yes: '✅',
    no: '❌',
    ok: '👌',
    good: '👍',
    bad: '👎',
    fast: '⚡',
    slow: '🐢',
    strong: '💪',
    weak: '🤕',
    sick: '🤒',
    doctor: '👨‍⚕️',
    nurse: '👩‍⚕️',
    police: '👮',
    fireman: '👨‍🚒',
    teacher: '👩‍🏫',
    student: '🧑‍🎓',
    king: '🤴',
    queen: '👸',
    robot: '🤖',
    alien: '👽',
    star: '⭐',
    kiss: '💋',
    hug: '🤗',
    hand: '✋',
    clap: '👏',
    pray: '🙏',
    money: '💰',
    clock: '⏰',
    calendar: '📅',
    light: '💡',
    dark: '🌑',
    up: '⬆️',
    down: '⬇️',
    left: '⬅️',
    right: '➡️',
    question: '❓',
    exclamation: '❗',
    check: '✔️',
    cross: '❌',
    smiley: '😊',
    sadface: '☹️',
    angryface: '😠',
    happyface: '😃',
    bored: '🥱',
    excited: '🤩',
    scared: '😱',
    surprised: '😮',
    tired: '🥱',
    hungry: '😋',
    thirsty: '🥤',
    cold: '🥶',
    hot: '🥵',
    party: '🎉',
    celebrate: '🥳',
    win: '🏆',
    lose: '😞',
    game: '🎮',
    play: '🎲',
    sleep: '😴',
    dream: '💭',
    idea: '💡',
    lightbulb: '💡',
    phone: '📱',
    email: '✉️',
    mail: '✉️',
    message: '💬',
    chat: '💬',
    talk: '🗣️',
    speak: '🗣️',
    listen: '👂',
    see: '👀',
    watch: '👀',
    hear: '👂',
    smell: '👃',
    taste: '👅',
    touch: '🤚',
    run: '🏃',
    jump: '🤾',
    swim: '🏊',
    fly: '🦅',
    read: '📖',
    write: '✍️',
    draw: '🎨',
    paint: '🎨',
    sing: '🎤',
    dance: '💃',
    cook: '👩‍🍳',
    eat: '🍽️',
    drink: '🥤',
    sleep: '😴',
    wake: '🌅',
    work: '💼',
    study: '📚',
    learn: '📚',
    teach: '👩‍🏫',
    help: '🤝',
    save: '💾',
    open: '📂',
    close: '❌',
    start: '▶️',
    stop: '⏹️',
    pause: '⏸️',
    play: '▶️',
    fast: '⚡',
    slow: '🐢',
    strong: '💪',
    weak: '🤕',
    sick: '🤒',
    healthy: '💪',
    rich: '💰',
    poor: '😞',
    smart: '🧠',
    dumb: '🤪',
    beautiful: '😍',
    ugly: '🤢',
    big: '🦖',
    small: '🐜',
    old: '👴',
    young: '🧒',
    new: '🆕',
    old: '🧓',
    hot: '🥵',
    cold: '🥶',
    clean: '🧼',
    dirty: '💩',
    funny: '😂',
    fun: '😃',
    boring: '😴',
    easy: '👌',
    hard: '💪',
    strong: '💪',
    weak: '🤕',
    fast: '⚡',
    slow: '🐢',
    safe: '🛡️',
    dangerous: '☠️',
    beautiful: '😍',
    ugly: '🤢',
    happy: '😊',
    sad: '😢',
    angry: '😡',
    scared: '😱',
    surprised: '😮',
    tired: '🥱',
    excited: '🤩',
    bored: '🥱',
    hungry: '😋',
    thirsty: '🥤',
    cold: '🥶',
    hot: '🥵',
    party: '🎉',
    celebrate: '🥳',
    win: '🏆',
    lose: '😞',
    game: '🎮',
    play: '🎲',
    sleep: '😴',
    dream: '💭',
    idea: '💡',
    lightbulb: '💡',
    phone: '📱',
    email: '✉️',
    mail: '✉️',
    message: '💬',
    chat: '💬',
    talk: '🗣️',
    speak: '🗣️',
    listen: '👂',
    see: '👀',
    watch: '👀',
    hear: '👂',
    smell: '👃',
    taste: '👅',
    touch: '🤚',
};

function translateToEmojis(text) {
    // Split text into words, remove punctuation, and map to emojis
    return text.split(/\s+/).map(word => {
        const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/gi, '');
        if (emojiMap[cleanWord]) {
            return emojiMap[cleanWord];
        }
        // If the word is a number, return the number emoji
        if (/^\d+$/.test(cleanWord)) {
            return Array.from(cleanWord).map(d => `${d}`).join('');
        }
        return word;
    }).join(' ');
}

// DOM Elements
const emojiInput = document.getElementById('emojiInput');
const emojiOutput = document.getElementById('emojiOutput');
const translateBtn = document.getElementById('translateBtn');
const copyBtn = document.getElementById('copyBtn');

translateBtn.addEventListener('click', () => {
    const input = emojiInput.value.trim();
    if (!input) {
        showNotification('Please enter a sentence to translate.', 'error');
        return;
    }
    const result = translateToEmojis(input);
    emojiOutput.textContent = result;
});

copyBtn.addEventListener('click', () => {
    const text = emojiOutput.textContent;
    if (!text) {
        showNotification('Nothing to copy!', 'error');
        return;
    }
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy.', 'error');
    });
});

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full`;
    if (type === 'success') {
        notification.className += ' bg-green-500 text-white';
    } else if (type === 'error') {
        notification.className += ' bg-red-500 text-white';
    } else {
        notification.className += ' bg-blue-500 text-white';
    }
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2500);
} 