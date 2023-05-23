function Slider( cssClass ){

    this.slider = document.getElementsByClassName(cssClass);
    this.number = this.slider[0].childElementCount;
    this.slidItems = this.slider[0].children;
    this.currentSlide = this.slider[0].getElementsByClassName('active');

    this.nextSlide = function(){
        
    }

    this.prevSlide = function(){

    }

    this.lastSlide = function(){
        this.currentSlide[0].classList.remove('active');
        this.slidItems[this.number-1].classList.add('active');
    }

    this.firstSlide = function(){

    }

    this.openSlideByIndex = function(number) {

    }

    this.addSlide = function(title, description) {

    }

    this.insertSlide = function(number, title, description) {

    }

    this.removeLastSlide = function(){

    }

    this.removeSlide = function(number) {
        
    }
}
const slider = new Slider('carousel-inner');
slider.lastSlide();