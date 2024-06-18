function autoScroll() {
    const scrollContainers = document.querySelectorAll('.scroll-container');
    

    scrollContainers.forEach(container => {
        const scrollTopContent = container.querySelector('.scroll-top').innerHTML;
        const scrollBottomContent = container.querySelector('.scroll-bottom').innerHTML;

        container.querySelector('.scroll-top').innerHTML += scrollTopContent;
        container.querySelector('.scroll-bottom').innerHTML += scrollBottomContent;

        container.querySelector('.scroll-top').classList.add('scroll-content');
        container.querySelector('.scroll-bottom').classList.add('scroll-content');
    });
}

export default autoScroll;