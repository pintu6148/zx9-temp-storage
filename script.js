document.addEventListener('DOMContentLoaded', function() {
    const birthdayDate = new Date('2025-11-19T00:00:00'); // Set Payal's Birthday: YYYY-MM-DD
    const countdownSection = document.getElementById('countdown-section');
    const surpriseContent = document.getElementById('surprise-content');
    const secretRevealButton = document.getElementById('secret-reveal-button');

    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');

    let countdownInterval; // To store the interval ID

    function updateCountdown() {
        const now = new Date();
        const difference = birthdayDate.getTime() - now.getTime();

        if (difference <= 0) {
            // Countdown finished! Reveal the surprise.
            clearInterval(countdownInterval);
            revealSurprise();
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysSpan.textContent = String(days).padStart(2, '0');
        hoursSpan.textContent = String(hours).padStart(2, '0');
        minutesSpan.textContent = String(minutes).padStart(2, '0');
        secondsSpan.textContent = String(seconds).padStart(2, '0');
    }

    function revealSurprise() {
        countdownSection.style.opacity = '0'; // Start fading out countdown
        countdownSection.style.pointerEvents = 'none'; // Make it unclickable

        setTimeout(() => {
            countdownSection.style.display = 'none'; // Hide it completely

            surpriseContent.classList.remove('hidden'); // Make surprise content visible
            setTimeout(() => {
                surpriseContent.classList.add('visible'); // Trigger CSS transition for reveal
                shootConfetti(); // Fire confetti!
                animateGalleryImages(); // Animate gallery images
            }, 50); // Small delay to ensure display:block is applied first

        }, 1000); // Wait for countdown to fade out (1 second)
    }

    function shootConfetti() {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, we use a component of the random spread to set the perfect angle and send them upwards
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    function animateGalleryImages() {
        const images = document.querySelectorAll('.gallery-img');
        images.forEach((img, index) => {
            // CSS animations are already set up with delays.
            // This ensures they restart if the content was hidden/shown multiple times.
            img.style.animation = 'none'; // Reset animation
            void img.offsetWidth; // Trigger reflow
            if (img.classList.contains('slide-in-left')) {
                img.style.animation = 'slideInLeft 1s ease-out ' + (2 + index * 0.2) + 's forwards';
            } else if (img.classList.contains('zoom-in')) {
                img.style.animation = 'zoomIn 1s ease-out ' + (2 + index * 0.2) + 's forwards';
            } else if (img.classList.contains('slide-in-right')) {
                img.style.animation = 'slideInRight 1s ease-out ' + (2 + index * 0.2) + 's forwards';
            }
        });
    }

    // Initial call to set up the countdown
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

    // Secret Reveal Button Listener (for testing or impatient you!)
    secretRevealButton.addEventListener('click', function() {
        clearInterval(countdownInterval); // Stop the countdown
        revealSurprise(); // Instantly reveal
    });
});