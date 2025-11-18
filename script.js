document.addEventListener('DOMContentLoaded', function() {
    const surpriseButton = document.getElementById('surprise-button');
    const initialContent = document.querySelector('.initial-content');
    const surpriseContent = document.getElementById('surprise-content');

    // Add a click listener to the button
    surpriseButton.addEventListener('click', function() {
        // 1. Hide the initial content (optional: add a fade-out effect)
        initialContent.style.opacity = '0';

        // Wait a little bit for the fade-out, then swap the content
        setTimeout(() => {
            initialContent.style.display = 'none';

            // 2. Make the surprise content visible
            surpriseContent.classList.remove('hidden');

            // 3. Trigger the CSS transition to make it appear smoothly
            // We use setTimeout 0 to ensure the browser registers the display:block first
            setTimeout(() => {
                surpriseContent.classList.add('visible');
            }, 50);

            // Optional: Add a brief sound or visual effect here!
            // E.g., confetti animation or a simple sound effect
            console.log('Surprise Revealed!');

        }, 500); // 500ms delay matches the initial content's transition time
    });
});