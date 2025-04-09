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
})