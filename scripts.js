// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Toggle between light and dark mode
const themeToggle = document.querySelector('.theme-toggle');
const moonIcon = document.querySelector('.moon-icon');
const body = document.body;

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        moonIcon.textContent = '🌞'; // Change to sun icon in dark mode
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        moonIcon.textContent = '🌙'; // Change back to moon icon in light mode
    }
});

// Simulate typing effect
const words = ["a software developer.", "a coffee-enthusiast.", "a problem solver.", "an artist.", "a dancer.", "a cat-lover."];
let currentWordIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingSpeed = 150;  // typing speed in ms
const erasingSpeed = 100;  // backspace speed in ms
const delayBetweenWords = 1000;  // delay before switching to next word

const dynamicText = document.getElementById('dynamic-text');

function typeEffect() {
    const currentWord = words[currentWordIndex];
    
    // Determine if we are typing or erasing
    if (!isDeleting) {
        // Typing the current word
        dynamicText.textContent = currentWord.slice(0, currentCharIndex + 1);
        currentCharIndex++;

        // If the word is fully typed, start erasing after a delay
        if (currentCharIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, delayBetweenWords);
        } else {
            setTimeout(typeEffect, typingSpeed);
        }
    } else {
        // Erasing the current word
        dynamicText.textContent = currentWord.slice(0, currentCharIndex - 1);
        currentCharIndex--;

        // If the word is fully erased, switch to the next word
        if (currentCharIndex === 0) {
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % words.length;  // move to next word, loop if needed
            setTimeout(typeEffect, typingSpeed);
        } else {
            setTimeout(typeEffect, erasingSpeed);
        }
    }
}

// Start the typing effect
document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
});

