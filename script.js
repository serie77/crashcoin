// Entrance Animation Controller
document.addEventListener('DOMContentLoaded', function() {
    const entrance = document.getElementById('entrance');
    const mainSite = document.getElementById('mainSite');
    const loadingProgress = document.getElementById('loadingProgress');
    
    // Start the entrance sequence
    setTimeout(() => {
        // After all animations complete, transition to main site
        entrance.style.opacity = '0';
        setTimeout(() => {
            entrance.style.display = 'none';
            mainSite.classList.remove('hidden');
            mainSite.style.opacity = '1';
            
            // Add entrance effects to main site elements
            animateMainSiteEntrance();
        }, 1000);
    }, 4300); // 4.3 seconds total for entrance (2.5s rise + 0.8s crash + 1s buffer)
});

// Animate main site elements on entrance
function animateMainSiteEntrance() {
    const coinImg = document.querySelector('.main-coin-img');
    const coinInfo = document.querySelector('.coin-info');
    const banner = document.querySelector('.banner-img');
    
    // Initially hide elements
    coinImg.style.opacity = '0';
    coinImg.style.transform = 'scale(0.5) translateY(50px)';
    coinInfo.style.opacity = '0';
    coinInfo.style.transform = 'translateX(50px)';
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(-30px)';
    
    // Animate banner
    setTimeout(() => {
        banner.style.transition = 'all 0.8s ease-out';
        banner.style.opacity = '1';
        banner.style.transform = 'translateY(0)';
    }, 200);
    
    // Animate coin
    setTimeout(() => {
        coinImg.style.transition = 'all 1s ease-out';
        coinImg.style.opacity = '1';
        coinImg.style.transform = 'scale(1) translateY(0)';
    }, 500);
    
    // Animate coin info
    setTimeout(() => {
        coinInfo.style.transition = 'all 0.8s ease-out';
        coinInfo.style.opacity = '1';
        coinInfo.style.transform = 'translateX(0)';
    }, 800);
}

// Copy Contract Address Function
function copyCA() {
    const caInput = document.getElementById('contractAddress');
    const copyBtn = document.querySelector('.copy-btn');
    const copyIcon = document.querySelector('.copy-icon');
    
    if (caInput.value.trim() === '') {
        // If no CA is entered, show a sample
        caInput.value = '0x1234567890123456789012345678901234567890';
        showNotification('Sample CA added! Replace with real contract address.', 'info');
        return;
    }
    
    // Copy to clipboard
    navigator.clipboard.writeText(caInput.value).then(() => {
        // Success feedback
        copyIcon.textContent = 'COPIED';
        copyBtn.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
        showNotification('Contract address copied to clipboard!', 'success');
        
        // Reset after 2 seconds
        setTimeout(() => {
            copyIcon.textContent = 'COPY';
            copyBtn.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        caInput.select();
        document.execCommand('copy');
        showNotification('Contract address copied!', 'success');
    });
}

// Removed BUY NOW function as button was removed

// Buy on Pump Function
function buyOnPump() {
    const pumpBtn = document.querySelector('.pump-btn');
    const btnText = document.querySelector('.pump-btn .btn-text');
    const btnIcon = document.querySelector('.pump-btn .btn-icon');
    
    // Animation effect
    pumpBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        pumpBtn.style.transform = 'scale(1)';
    }, 150);
    
    // Change button temporarily
    const originalText = btnText.textContent;
    
    btnText.textContent = 'PUMPING...';
    
    // Show notification
    showNotification('Setting up pump alerts... FOMO mode activated!', 'success');
    
    // Reset after delay
    setTimeout(() => {
        btnText.textContent = originalText;
        showNotification('Demo mode: Connect to trading bot for real alerts!', 'info');
    }, 2000);
}

// View Chart Function
function viewChart() {
    const chartBtn = document.querySelector('.chart-btn');
    const btnText = document.querySelector('.chart-btn .btn-text');
    const btnIcon = document.querySelector('.chart-btn .btn-icon');
    
    // Animation effect
    chartBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        chartBtn.style.transform = 'scale(1)';
    }, 150);
    
    // Change button temporarily
    const originalText = btnText.textContent;
    
    btnText.textContent = 'LOADING...';
    
    // Show notification
    showNotification('Opening chart analysis... Prepare for red candles!', 'warning');
    
    // Reset after delay
    setTimeout(() => {
        btnText.textContent = originalText;
        // In a real implementation, you would open a chart like:
        // window.open('https://dexscreener.com/YOUR_TOKEN_ADDRESS', '_blank');
        showNotification('Demo mode: Replace with actual chart link!', 'info');
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-text">${message}</span>
        <button class="notification-close" onclick="closeNotification(this)">×</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: #fff;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 400px;
        font-family: 'Bahnschrift Bold', sans-serif;
        font-weight: 700;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 4000);
}

function getNotificationColor(type) {
    switch (type) {
        case 'success':
            return 'linear-gradient(45deg, #00ff00, #00cc00)';
        case 'warning':
            return 'linear-gradient(45deg, #ff9500, #ff6600)';
        case 'error':
            return 'linear-gradient(45deg, #ff0000, #cc0000)';
        default:
            return 'linear-gradient(45deg, #333333, #555555)';
    }
}

function closeNotification(button) {
    const notification = button.parentNode;
    notification.style.animation = 'slideOut 0.3s ease-in forwards';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Add notification animations to CSS dynamically
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: #fff;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        opacity: 0.7;
        transition: opacity 0.2s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .notification-text {
        flex: 1;
    }
`;
document.head.appendChild(notificationStyles);

// Easter eggs and interactive effects
document.addEventListener('keydown', function(e) {
    // Konami code easter egg
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    window.konamiSequence = window.konamiSequence || [];
    window.konamiSequence.push(e.keyCode);
    
    if (window.konamiSequence.length > konamiCode.length) {
        window.konamiSequence.shift();
    }
    
    if (window.konamiSequence.length === konamiCode.length && 
        window.konamiSequence.every((code, index) => code === konamiCode[index])) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    showNotification('Konami Code activated! Ultra rug mode enabled!', 'success');
    
    // Add rainbow effect to the coin
    const coinImg = document.querySelector('.main-coin-img');
    coinImg.style.animation = 'float 3s ease-in-out infinite, coinRotate 2s linear infinite, rainbow 3s linear infinite';
    
    // Add rainbow keyframes
    const rainbowStyles = document.createElement('style');
    rainbowStyles.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg) saturate(2); }
            25% { filter: hue-rotate(90deg) saturate(2); }
            50% { filter: hue-rotate(180deg) saturate(2); }
            75% { filter: hue-rotate(270deg) saturate(2); }
            100% { filter: hue-rotate(360deg) saturate(2); }
        }
    `;
    document.head.appendChild(rainbowStyles);
    
    // Reset after 10 seconds
    setTimeout(() => {
        coinImg.style.animation = 'float 3s ease-in-out infinite, coinRotate 10s linear infinite';
        if (rainbowStyles.parentNode) {
            rainbowStyles.remove();
        }
    }, 10000);
}

// Add parallax effect to background elements
window.addEventListener('mousemove', function(e) {
    const stars = document.querySelector('.stars');
    const twinkling = document.querySelector('.twinkling');
    
    if (stars && twinkling) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        stars.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        twinkling.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
    }
});

// Smooth scroll for better UX (if you add more sections later)
document.documentElement.style.scrollBehavior = 'smooth';

// Add click ripple effect to buttons
function addRippleEffect(button) {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    });
}

// Add ripple effect to buttons when page loads
window.addEventListener('load', function() {
    const copyBtn = document.querySelector('.copy-btn');
    const pumpBtn = document.querySelector('.pump-btn');
    const chartBtn = document.querySelector('.chart-btn');
    
    if (copyBtn) addRippleEffect(copyBtn);
    if (pumpBtn) addRippleEffect(pumpBtn);
    if (chartBtn) addRippleEffect(chartBtn);
    
    // Add ripple animation styles
    const rippleStyles = document.createElement('style');
    rippleStyles.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .copy-btn, .pump-btn, .chart-btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyles);
    
    // Initialize collage
    initializeCollage();
});

// Collage System
let currentModalImage = 0;
const totalImages = 13;

function initializeCollage() {
    const collageGrid = document.getElementById('collageGrid');
    if (!collageGrid) return;
    
    // Predefined layout to ensure all 13 images fit perfectly in 5x4 grid (with 3 spanning positions)
    const layoutMap = [
        { size: 'large', position: 1 },  // Image 1 - large (2x2)
        { size: 'medium', position: 3 }, // Image 2 - medium (2x1) 
        { size: '', position: 5 },       // Image 3 - normal
        { size: '', position: 6 },       // Image 4 - normal
        { size: 'tall', position: 7 },   // Image 5 - tall (1x2)
        { size: '', position: 8 },       // Image 6 - normal
        { size: '', position: 9 },       // Image 7 - normal
        { size: '', position: 10 },      // Image 8 - normal
        { size: 'medium', position: 12 },// Image 9 - medium (2x1)
        { size: '', position: 14 },      // Image 10 - normal
        { size: '', position: 15 },      // Image 11 - normal
        { size: '', position: 16 },      // Image 12 - normal
        { size: '', position: 17 }       // Image 13 - normal
    ];
    
    for (let i = 1; i <= totalImages; i++) {
        const collageItem = document.createElement('div');
        collageItem.className = 'collage-item';
        
        // Apply predefined layout to ensure perfect fit
        const layout = layoutMap[i - 1];
        if (layout.size) {
            collageItem.classList.add(layout.size);
        }
        
        collageItem.innerHTML = `
            <img src="${i}.png" alt="Crash Coin Screenshot ${i}" class="collage-image" loading="lazy">
            <div class="collage-overlay">
                <span>CLICK TO ENLARGE</span>
            </div>
        `;
        
        // Add random rotation and chaos
        const randomRotation = (Math.random() - 0.5) * 10; // -5 to +5 degrees
        const randomScale = 0.95 + Math.random() * 0.1; // 0.95 to 1.05
        collageItem.style.setProperty('--rotation', `${randomRotation}deg`);
        collageItem.style.transform = `rotate(${randomRotation}deg) scale(${randomScale})`;
        
        // Add click event to open modal
        collageItem.addEventListener('click', () => openModal(i));
        
        // Add chaotic animation delays
        collageItem.style.animationDelay = `${Math.random() * 4}s`;
        collageItem.style.animationDuration = `${2 + Math.random() * 2}s`;
        
        collageGrid.appendChild(collageItem);
    }
}

// Removed shuffling to maintain proper grid layout for all 13 images

function openModal(imageNumber) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    currentModalImage = imageNumber;
    modalImage.src = `${imageNumber}.png`;
    modalImage.alt = `Crash Coin Screenshot ${imageNumber}`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add some loading effect
    modalImage.style.opacity = '0';
    modalImage.onload = () => {
        modalImage.style.transition = 'opacity 0.3s ease';
        modalImage.style.opacity = '1';
    };
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function navigateModal(direction) {
    currentModalImage += direction;
    
    // Wrap around
    if (currentModalImage > totalImages) {
        currentModalImage = 1;
    } else if (currentModalImage < 1) {
        currentModalImage = totalImages;
    }
    
    const modalImage = document.getElementById('modalImage');
    modalImage.style.opacity = '0';
    
    setTimeout(() => {
        modalImage.src = `${currentModalImage}.png`;
        modalImage.alt = `Crash Coin Screenshot ${currentModalImage}`;
        modalImage.style.opacity = '1';
    }, 150);
}

// Keyboard navigation for modal
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('imageModal');
    if (!modal.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeModal();
            break;
        case 'ArrowLeft':
            navigateModal(-1);
            break;
        case 'ArrowRight':
            navigateModal(1);
            break;
    }
});

// Preload images for better performance
function preloadImages() {
    for (let i = 1; i <= totalImages; i++) {
        const img = new Image();
        img.src = `${i}.png`;
    }
}

// Start preloading images after a short delay
setTimeout(preloadImages, 1000); 