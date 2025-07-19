// AI Tweet Generator Script
document.addEventListener('DOMContentLoaded', function() {
    const topicInput = document.getElementById('topicInput');
    const styleSelect = document.getElementById('styleSelect');
    const generateBtn = document.getElementById('generateBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const results = document.getElementById('results');
    const tweetsContainer = document.getElementById('tweetsContainer');
    const errorMessage = document.getElementById('errorMessage');

    // Sample tweet templates for different styles
    const tweetTemplates = {
        professional: [
            "🚀 Exciting developments in {topic}! The latest insights show significant growth potential. Key takeaways: innovation, strategy, and execution. #BusinessGrowth #Innovation",
            "📊 Data-driven analysis reveals compelling trends in {topic}. Organizations embracing these changes are seeing 40%+ improvement in outcomes. #DataAnalytics #Trends",
            "💡 Strategic perspective on {topic}: Success requires a balanced approach combining technology, people, and processes. Here's what industry leaders are doing differently. #Leadership #Strategy"
        ],
        casual: [
            "Hey everyone! 👋 Just discovered some really cool stuff about {topic} and I'm totally obsessed! You guys need to check this out! 😍 #Amazing #MustSee",
            "OMG you won't believe what I learned about {topic} today! 🤯 It's literally mind-blowing and I can't stop thinking about it! Anyone else as excited as I am? 🎉 #MindBlown",
            "So I was scrolling through my feed and stumbled upon this incredible {topic} content! 😱 It's like everything I've been looking for! Can't wait to share more! ✨ #Discovery"
        ],
        motivational: [
            "🔥 Your journey with {topic} starts with a single step. Every expert was once a beginner. Keep pushing forward, stay focused, and never give up on your dreams! 💪 #Motivation #Success",
            "🌟 Remember: The only limits that exist are the ones you place on yourself. {topic} is your opportunity to break through barriers and achieve greatness! Believe in yourself! 🚀 #Believe #Achieve",
            "💫 Today is the perfect day to dive into {topic}! Your future self will thank you for the effort you put in now. Small steps lead to big changes! Keep going! ✨ #Progress #Growth"
        ],
        educational: [
            "📚 Did you know? {topic} has evolved significantly over the past decade. Here are 3 key facts that will change how you think about this subject: [Thread] 🧵 #Education #Learning",
            "🎓 Breaking down {topic} in simple terms: Understanding the fundamentals is crucial for mastery. Let's explore the core concepts together! 📖 #Knowledge #Understanding",
            "🔬 Fascinating research on {topic} reveals surprising connections to everyday life. The science behind it is absolutely incredible! Here's what you need to know: 📊 #Science #Research"
        ],
        humorous: [
            "😂 Plot twist: {topic} is actually just a conspiracy by coffee companies to keep us all caffeinated! ☕️ But seriously, who else can't function without their daily dose? #CoffeeAddict #Conspiracy",
            "🤣 Me trying to understand {topic}: *confused screaming* 😱 Meanwhile, everyone else: "It's so simple!" 🤦‍♂️ Anyone else relate? #Confused #Relatable",
            "😅 The {topic} struggle is real! It's like trying to fold a fitted sheet - looks easy but actually impossible! 😂 Who else has been there? #StruggleIsReal #Relatable"
        ]
    };

    // Generate tweets based on topic and style
    function generateTweets(topic, style) {
        const templates = tweetTemplates[style] || tweetTemplates.casual;
        const tweets = [];
        
        // Generate 3 unique tweets
        for (let i = 0; i < 3; i++) {
            let tweet = templates[i % templates.length];
            tweet = tweet.replace(/{topic}/g, topic);
            
            // Add some variety by modifying the tweet slightly
            if (i === 1) {
                tweet = tweet.replace(/!+/g, '!!');
            } else if (i === 2) {
                tweet = tweet.replace(/\./g, '...');
            }
            
            tweets.push(tweet);
        }
        
        return tweets;
    }

    // Display tweets
    function displayTweets(tweets) {
        tweetsContainer.innerHTML = '';
        
        tweets.forEach((tweet, index) => {
            const tweetDiv = document.createElement('div');
            tweetDiv.className = 'bg-white rounded-2xl shadow-2xl p-8 border-l-4 border-blue-500';
            tweetDiv.innerHTML = `
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            ${index + 1}
                        </div>
                        <div class="ml-4">
                            <h3 class="font-semibold text-gray-800">Tweet ${index + 1}</h3>
                            <p class="text-sm text-gray-500">Ready to copy</p>
                        </div>
                    </div>
                    <button class="copy-tweet-btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center" data-tweet="${tweet.replace(/"/g, '&quot;')}">
                        <i class="fas fa-copy mr-2"></i>Copy
                    </button>
                </div>
                <div class="bg-gray-50 rounded-xl p-6 mb-4">
                    <p class="text-gray-800 text-lg leading-relaxed">${tweet}</p>
                </div>
                <div class="flex items-center justify-between text-sm text-gray-500">
                    <span>${tweet.length} characters</span>
                    <span>${tweet.split(' ').length} words</span>
                </div>
            `;
            tweetsContainer.appendChild(tweetDiv);
        });

        // Add copy functionality
        document.querySelectorAll('.copy-tweet-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const tweet = this.getAttribute('data-tweet');
                navigator.clipboard.writeText(tweet).then(() => {
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check mr-2"></i>Copied!';
                    this.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                    this.classList.add('bg-green-600');
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.classList.remove('bg-green-600');
                        this.classList.add('bg-blue-600', 'hover:bg-blue-700');
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                    alert('Failed to copy tweet. Please try again.');
                });
            });
        });
    }

    // Show/hide loading
    function showLoading() {
        loadingSpinner.classList.remove('hidden');
        results.classList.add('hidden');
        errorMessage.classList.add('hidden');
    }

    function hideLoading() {
        loadingSpinner.classList.add('hidden');
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        hideLoading();
    }

    // Generate tweets
    function generateTweetsHandler() {
        const topic = topicInput.value.trim();
        const style = styleSelect.value || 'casual';

        if (!topic) {
            showError('Please enter a topic to generate tweets about.');
            return;
        }

        showLoading();

        // Simulate AI processing time
        setTimeout(() => {
            try {
                const tweets = generateTweets(topic, style);
                displayTweets(tweets);
                results.classList.remove('hidden');
                hideLoading();
            } catch (error) {
                showError('Failed to generate tweets. Please try again.');
            }
        }, 2000);
    }

    // Event listeners
    generateBtn.addEventListener('click', generateTweetsHandler);

    topicInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateTweetsHandler();
        }
    });

    // Auto-focus on input
    topicInput.focus();

    console.log('AI Tweet Generator loaded successfully!');
}); 