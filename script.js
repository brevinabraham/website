window.addEventListener('load', () => {
    document.body.style.opacity = 1;
    document.querySelector('.section-content').style.display = 'none';
});

document.querySelectorAll('.content-sections li').forEach(item => {
    item.addEventListener('click', event => {
        const content = document.getElementById(`${event.target.id}-content`);
        const sectionContentDiv = document.querySelector('.section-content');
        const line = document.querySelector('.line');

        if (!content.classList.contains('hidden')) {
            sectionContentDiv.style.display = 'none';
            content.classList.add('hidden');
            event.target.classList.remove('active');
            line.style.transform = 'translateY(0)';
        } else {
            sectionContentDiv.style.display = 'block';
            document.querySelectorAll('.section-content p').forEach(p => {
                p.classList.add('hidden');
                p.innerHTML = p.textContent; // Reset content to plain text without span
            });
            document.querySelectorAll('.content-sections li').forEach(li => {
                li.classList.remove('active');
            });
            content.classList.remove('hidden');
            event.target.classList.add('active');

            line.style.transition = 'transform 1s ease-in-out';
            line.style.transform = 'translateY(-2vh)';
            sectionContentDiv.classList.add('show');

            // Apply typewriter effect
            typewriterEffect(content);
        }
    });
});

const toggle = document.querySelector('.toggle');
toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark');
    }
});

function typewriterEffect(element) {
    const text = element.textContent;
    element.innerHTML = ''; // Clear the content
    element.style.visibility = 'visible';

    let i = 0;
    let currentLine = document.createElement('span');
    element.appendChild(currentLine);

    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '\n') {
                currentLine = document.createElement('span');
                element.appendChild(currentLine);
                element.appendChild(document.createElement('br'));
            } else {
                currentLine.innerHTML += text.charAt(i);
            }
            i++;
            element.parentNode.scrollTop = element.parentNode.scrollHeight; // Scroll to the bottom
            setTimeout(type, 20); // Adjust typing speed here (in milliseconds)
        } else {
            currentLine.classList.remove('typewriter-text'); // Remove the blinking cursor class
        }
        // Remove blinking cursor class from all spans except the last one
        const spans = element.querySelectorAll('span');
        spans.forEach(span => span.classList.remove('typewriter-text'));
        currentLine.classList.add('typewriter-text'); // Add blinking cursor to the last span
    }
    type();
}