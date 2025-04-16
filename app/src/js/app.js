window.addEventListener("DOMContentLoaded",e=>{
  const burgerBtn = document.querySelector('.header__burger');
  const headerMenu = document.querySelector('.header__menu');
  if(burgerBtn){
    burgerBtn.addEventListener("click",e=>{
      burgerBtn.classList.toggle('active');
      headerMenu.classList.toggle('active');
    })
  }
  //burger outside click
  window.addEventListener("click",e=>{
    if(!e.target.closest(".header__menu")&& !e.target.closest(".header__burger") && burgerBtn.classList.contains("active")){
      burgerBtn.classList.toggle('active');
      headerMenu.classList.toggle('active');
    }
  })
  Fancybox.bind("[data-fancybox]", {
    closeExisting:true,
    zoomOpacity:false,
    placeFocusBack:false,
    Images: {
      zoom: false,
    },
	});
  // validate inputs
  const forms = document.querySelectorAll('form');
  const usernameInputs = document.querySelectorAll('[name="name"]');
  const usernameErrors = document.querySelectorAll('.name-error');
  const userPhoneInputs = document.querySelectorAll('[name="phone"]');
  const userPhoneErrors = document.querySelectorAll('.phone-error');
  forms.forEach(form=>{
    form.addEventListener('submit', (event) => {
      const usernameInput = form.querySelector('[name="name"]');
      const usernameError = form.querySelector('.name-error');
      const userPhoneInput = form.querySelector('[name="phone"]');
      const userPhoneError = form.querySelector('.phone-error');
      // Проверяем, заполнено ли поле имя
      if (usernameInput && usernameInput.value.trim() === '') {
        event.preventDefault(); // Отменяем отправку формы
        usernameError.style.display = 'block'; // Показываем сообщение об ошибке
        usernameInput.classList.add('invalid'); // Добавляем класс для стилизации
      } else if(usernameInput) {
        usernameError.style.display = 'none'; // Скрываем сообщение об ошибке
        usernameInput.classList.remove('invalid'); // Убираем класс для стилизации
      }
      // Проверяем, заполнено ли поле телефон
      if (userPhoneInput && userPhoneInput.value.trim() === '') {
        event.preventDefault(); // Отменяем отправку формы
        userPhoneError.style.display = 'block'; // Показываем сообщение об ошибке
        userPhoneInput.classList.add('invalid'); // Добавляем класс для стилизации
      } else if (userPhoneInput){
        userPhoneError.style.display = 'none'; // Скрываем сообщение об ошибке
        userPhoneInput.classList.remove('invalid'); // Убираем класс для стилизации
      }
    });
    // Дополнительно: скрывать сообщение об ошибке при вводе текста
    if(usernameInputs){
      usernameInputs.forEach((usernameInput, idx)=>{
        usernameInput.addEventListener('input', () => {
          if (usernameInput.value.trim() !== '') {
            usernameErrors[idx].style.display = 'none';
            usernameInput.classList.remove('invalid');
          }
        });
      })
    }
    if(userPhoneInputs){
      userPhoneInputs.forEach((userPhoneInput, idx)=>{
        userPhoneInput.addEventListener('input', () => {
          if (userPhoneInput.value.trim() !== '') {
            userPhoneErrors[idx].style.display = 'none';
            userPhoneInput.classList.remove('invalid');
          }
        });
      })
    }
  })
      	//mask width 8 fix
	var phoneInputs = document.querySelectorAll('[name="phone"]');
  if(phoneInputs){
    phoneInputs.forEach(function(input) {
      input.addEventListener('input', function() {
        var inputValue = this.value;
        if (inputValue[0] == '8') {
          this.value = '7' + inputValue.substr(1);
        } else if (inputValue[0] == '7') {
        } else if (inputValue[0] == '+') {
          if (inputValue[1] == '8') {
            this.value = '+7' + inputValue.substr(2);
          } else if ((inputValue[1] == '7') || (inputValue.substr(1) === '')) {
          } else {
            this.value = '+7' + inputValue.substr(1);
          }
        } else if (inputValue !== '') {
          this.value = '7' + inputValue;
        }
      });
      Inputmask({
        mask: '+7 (999) 999-99-99',
        onBeforePaste: function (pastedValue, opts) {
          var processedValue = pastedValue;
          if (processedValue[0] == '8') {
            processedValue = '7' + processedValue.slice(1);
          } else if (processedValue[0] == '7') {
          } else if (processedValue[0] == '+') {
            if (processedValue[1] == '8') {
              processedValue = '+7' + processedValue.slice(2);
            } else if ((processedValue[1] == '7') || (processedValue.substr(1) === '')) {
            } else {
              processedValue = '+7' + processedValue.slice(1);
            }
          } else if (processedValue !== '') {
            processedValue = '7' + processedValue;
          }
          return processedValue;
        }
      }).mask(input);
    });
  }
  const currentStart = document.querySelector('.start__slider-current');
  const totalStart = document.querySelector('.start__slider-total');
  let startSlider = new Swiper('.start__slider',{
    slidesPerView: 1,
    loop:true,
    effect:'fade',
    spaceBetween: 0,
    slideClass:'start__slide',
    navigation: false,
    pagination: {
      el: '.start__pagination',
      type: 'bullets',
      clickable:true
    },
    navigation: {
      nextEl: '.start__next',
      prevEl: '.start__prev',
    },
    on:{
      init: function(){
        currentStart.innerText = '1';
        totalStart.innerText = this.slides.length;
      },
      slideChange: function(){
        currentStart.innerText = this.realIndex + 1;
      }
    }
  })
  let rentSlider = new Swiper('.rent__slider',{
    slidesPerView: 'auto',
    loop:true,
    
    spaceBetween: 10,
    slideClass:'rent__slide',
    navigation: false,
    pagination: {
      el: '.rent__indx',
      type: 'fraction',
      clickable:true
    },
    navigation: {
      nextEl: '.rent__next',
      prevEl: '.rent__prev',
    },
    breakpoints:{
      1200:{
        slidesPerView: 1,
        effect:'fade',
        spaceBetween:0
      }
    }
  })
  let subscriptionSlider = new Swiper('.subscription__slider',{
    slidesPerView: 'auto',
    spaceBetween: 10,
    slideClass:'subscription__slide',
    navigation: false,
    breakpoints:{
      1200:{
        spaceBetween:20
      }
    }
  })
  const organizationSliderNextBtns = document.querySelectorAll('.organization__next');
  const organizationSliderPrevBtns = document.querySelectorAll('.organization__prev');
  const organizationSlideIndex = document.querySelectorAll('.organization__total .current');
  const organizationSlideTotal = document.querySelectorAll('.organization__total .total');
  let organizationSlider = new Swiper('.organization__slider',{
    slidesPerView: 'auto',
    spaceBetween: 10,
    slideClass:'organization__slide',
    breakpoints:{
      1500:{
        slidesPerView: 1,
        spaceBetween:20
      },
      navigation: false
    }
  })
  if(organizationSlideIndex){
    organizationSlideIndex.forEach((item, index)=>{
      item.innerText = index + 1;
    })
  }
  if(organizationSlideTotal){
    organizationSlideTotal.forEach((item)=>{
      item.innerText = organizationSlideTotal.length;
    })
  }
  if(organizationSliderNextBtns){
    organizationSliderNextBtns.forEach(next=>{
      next.addEventListener('click',e=>{
        organizationSlider.slideNext();
      })
    })
  }
  if(organizationSliderPrevBtns){
    organizationSliderPrevBtns.forEach(next=>{
      next.addEventListener('click',e=>{
        organizationSlider.slidePrev();
      })
    })
  }
})