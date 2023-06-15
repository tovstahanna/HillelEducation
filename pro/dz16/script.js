const select = document.getElementById('change-slider');
const showRemoveForm = document.getElementById('remove-show-slide');
const addForm = document.getElementById('add-slide');
const sliderDiv = new Slider('slider-block');
const divIndicators = document.getElementsByClassName('carousel-indicators');

function cleanUp() {
    select.value = 0;
    addForm.style = "display: none;";
    showRemoveForm.style = "display: none;";
}

function Slider( cssID ){

    this.slider = document.getElementById(cssID);
    this.count = this.slider.childElementCount;
    this.slidItems = this.slider.children;

    this.slidesCount = function(){
        return this.count;
    }

    this.getCurrentSlide = function(){
        const currentSlide = this.slider.getElementsByClassName('active');
        return currentSlide[0];
    }

    this.getCurrentSlideIndex = function(){
        let index;
        for (let i = 0; i < this.slidItems.length; i++) {
            const classes = this.slidItems[i].classList;
            if( classes.contains('active') ) index = i;
        }
        return index;
    }

    this.nextSlide = function(){
        const current = this.getCurrentSlide();
        let number = this.getCurrentSlideIndex();
        current.classList.remove('active');
        if( number == this.count-1 ) number = 0; else number = number + 1;
        this.slidItems[number].classList.add('active');
        cleanUp();
    }

    this.prevSlide = function(){
        const current = this.getCurrentSlide();
        let number = this.getCurrentSlideIndex();
        current.classList.remove('active');
        if( number == 0 ) number = this.count-1; else number = number - 1;
        console.log(number);
        this.slidItems[number].classList.add('active');
        cleanUp();
    }

    this.lastSlide = function(){
        this.openSlideByIndex(this.count);
    }

    this.firstSlide = function(){
       this.openSlideByIndex(1);
    }

    this.openSlideByIndex = function(number) {
        const current = this.getCurrentSlide();
        current.classList.remove('active');
        this.slidItems[number-1].classList.add('active');
        cleanUp();
    }

    this.addSlide = function(title, description) {
        const div = document.createElement('div');
        const color = Math.floor(Math.random()*16777215).toString(16);
        const lastChild = this.slider.lastChild;
        div.className = "carousel-item active";
        div.style="background-color:#" + color + ";height: 200px;";
        div.innerHTML = `<h2>${title}</h2><p>${description}</p>`;
        this.slider.insertBefore(div, lastChild);

        const lastChildIndicator = divIndicators.lastChild;
        const newIndicator =  document.createElement('button');
        divIndicators[0].getElementsByClassName('active')[0].classList.remove('active');
        newIndicator.type = 'button';
        newIndicator.setAttribute('aria-label', title);
        newIndicator.setAttribute('class', 'active');
        newIndicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
        newIndicator.setAttribute('data-bs-slide-to', this.count);
        divIndicators[0].insertBefore(newIndicator, lastChildIndicator);
        cleanUp();
    }

    this.insertSlide = function(number, title, description) {
        let duplicateSlider = []; 
        const div = document.createElement('div');
        const color = Math.floor(Math.random()*16777215).toString(16);
        div.className = "carousel-item active";
        div.style="background-color:#" + color + ";height: 200px;";
        div.innerHTML = `<h2>${title}</h2><p>${description}</p>`;
        const current = this.getCurrentSlide();
        current.classList.remove('active');
        this.slider.children[number-1].before(div);
        
        const newIndicator =  document.createElement('button');
        divIndicators[0].getElementsByClassName('active')[0].removeAttribute('aria-current');
        divIndicators[0].getElementsByClassName('active')[0].classList.remove('active');
        newIndicator.type = 'button';
        newIndicator.setAttribute('aria-label', title);
        newIndicator.setAttribute('class', 'active');
        newIndicator.setAttribute('aria-current', true);
        newIndicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
        newIndicator.setAttribute('data-bs-slide-to', number-1);
        for (let index = 0; index < divIndicators[0].children.length; index++) {
            divIndicators[0].children[index].setAttribute('data-bs-slide-to', index+1); // чтоб слайди автоматически слайдились верно
        }
        divIndicators[0].children[number-1].before(newIndicator);
        cleanUp();
    }

    this.removeLastSlide = function(){
        this.slider.children[this.count-1].remove();
        divIndicators[0].children[this.count-1].remove();
        console.log(this.slider);
        cleanUp();
    }

    this.removeSlide = function(number) {
        const current = this.getCurrentSlideIndex();
        if(number-1 == current){
            this.slider.children[number].classList.add('active');
            divIndicators[0].children[number].setAttribute('class', 'active');
            divIndicators[0].children[number].setAttribute('aria-current', true);
            for (let index = number; index < divIndicators[0].children.length; index++) {
                divIndicators[0].children[index].setAttribute('data-bs-slide-to', index-1); // чтоб слайди автоматически слайдились верно
            }
        }

        this.slider.children[number-1].remove();
        divIndicators[0].children[number-1].remove();
        cleanUp();
    }
}


select.addEventListener('change', (event) => {
    const title = document.getElementById('slide_title');
    const description = document.getElementById('slide_description');
    switch (event.target.value) {
        case 'showFirst':
            sliderDiv.firstSlide();
            break;
        case 'showLast':
            sliderDiv.lastSlide();
            break;
        case 'showSlide':
             showRemoveForm.style = "display: block;";
             showRemoveForm.addEventListener('submit', (ev) => {
                ev.preventDefault();
                const slideNumber = showRemoveForm.elements['number'].value;
                if( slideNumber >0 && slideNumber <= sliderDiv.slidesCount() ){
                    sliderDiv.openSlideByIndex(slideNumber);
                }else{
                    alert('Enter a valid slide number');
                }
             })
             break;
        case 'addNew':
            addForm.style = "display: block;";
            addForm.addEventListener('submit', (ev) => {
                ev.preventDefault();
                const slideNumber = sliderDiv.count+1;
                if( slideNumber > sliderDiv.slidesCount() ){
                    sliderDiv.addSlide(title.value, description.value);
                    sliderDiv.openSlideByIndex(slideNumber);
                }else{
                    alert('Enter a valid slide number');
                }
             })
             break;
        case 'addNewX':
            addForm.style = "display: block;";
            const num = document.getElementById('slider_number');
            num.style = "display: block;";
            addForm.addEventListener('submit', (ev) => {
                ev.preventDefault();
                if( Number(num.value) > 0 && Number(num.value) <= sliderDiv.slidesCount() ){
                    sliderDiv.insertSlide(Number(num.value), title.value, description.value);
                    //sliderDiv.openSlideByIndex(Number(num.value));
                }else{
                    alert('Enter a valid slide number');
                }
             })
             break;
        case 'removeLast':
            sliderDiv.removeLastSlide();
            break;
        case 'removeSlide':
            showRemoveForm.style = "display: block;";
            showRemoveForm.addEventListener('submit', (ev) => {
                ev.preventDefault();
                const slideNumber = showRemoveForm.elements['number'].value;
                if( slideNumber > 0 && slideNumber < sliderDiv.slidesCount() ){
                    sliderDiv.removeSlide(slideNumber-1);
                }else{
                    alert('Enter a valid slide number');
                }
             })
            break;
        case 'showPrev':
            sliderDiv.prevSlide();
            break;
        case 'showNext':
            sliderDiv.nextSlide();
            break;
      }
      
});
