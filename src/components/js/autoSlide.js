const slideImg = [
    '/public/img/jubo-slide/hero-slider-1.jpg',
    '/public/img/jubo-slide/hero-slider-2.jpg',
    '/public/img/jubo-slide/hero-slider-3.jpg'
]

let currentSlide = 0

function autoSlide(){
    const slideJumbo = document.querySelector('.jumbo-head');

    if(slideJumbo){
        slideJumbo.style.backgroundImage = `url(${slideImg[currentSlide]})`;
        currentSlide++;
        if(currentSlide >= slideImg.length){
            currentSlide = 0;
        }
        setTimeout(autoSlide, 5000);
    }
}

export default autoSlide;