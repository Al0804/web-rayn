// DOM Elements
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const typingText = document.getElementById('typing-text');
const slider = document.querySelector('.kinnies-slider');
const sliderCards = document.querySelectorAll('.kinnie-card');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

// Variables
let currentSlide = 0;
const slideWidth = 100; // percentage

// Functions
function handleScroll() {
    const scrollPos = window.scrollY;
    
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const height = section.offsetHeight;
        
        if (scrollPos >= top && scrollPos < top + height) {
            section.classList.add('active');
            
            // Active nav links
            navLinks.forEach(link => {
                if (link.getAttribute('href').substring(1) === section.id) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        } else {
            section.classList.remove('active');
        }
    });
}

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

function switchTab(e) {
    const target = e.target.dataset.target;
    
    // Remove active class from all buttons and contents
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked button and corresponding content
    e.target.classList.add('active');
    document.getElementById(target).classList.add('active');
}

function typeText() {
    const text = typingText.textContent;
    typingText.textContent = '';
    
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, 50);
}

function moveSlider(direction) {
    if (direction === 'next') {
        currentSlide = (currentSlide === sliderCards.length - 1) ? 0 : currentSlide + 1;
    } else {
        currentSlide = (currentSlide === 0) ? sliderCards.length - 1 : currentSlide - 1;
    }
    
    slider.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
}

// Check for saved theme
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Event Listeners
window.addEventListener('scroll', handleScroll);
hamburger.addEventListener('click', toggleMenu);
navLinks.forEach(link => link.addEventListener('click', closeMenu));
themeToggle.addEventListener('click', toggleTheme);
tabBtns.forEach(btn => btn.addEventListener('click', switchTab));
prevBtn.addEventListener('click', () => moveSlider('prev'));
nextBtn.addEventListener('click', () => moveSlider('next'));

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    handleScroll(); // Set initial active sections
    loadSavedTheme(); // Load saved theme
    typeText(); // Start typing animation
    
    // Set initial active section based on URL hash
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const section = document.getElementById(hash);
        if (section) {
            section.classList.add('active');
        }
    } else {
        // If no hash, activate first section
        sections[0].classList.add('active');
    }

    // Initialize skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
});