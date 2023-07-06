window.addEventListener('DOMContentLoaded', (event) => {
    let fadeInSection = document.querySelector('.fade-in-section');
    let fadeInAt;

    function checkSlide(e) {
        fadeInAt = (window.scrollY + window.innerHeight);
        let offsetTop = fadeInSection.offsetTop;
        if (fadeInAt > offsetTop) {
            fadeInSection.classList.add('is-visible');
        }
    }

    window.addEventListener('scroll', checkSlide);
});

document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
