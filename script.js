// let lastScrollTop = 0;
// const header = document.querySelector('.header');
// window.addEventListener("scroll", function() {
//   let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

//   if (currentScroll > lastScrollTop) {
//     // Scrolling down
//     console.log("Scrolling down");
//     if(header.classList.contains('fixed-nav')){
//         header.classList.remove('fixed-nav')
//     }
//   } else {
//     // Scrolling up
//     console.log("Scrolling up");
  
//     if(!header.classList.contains('fixed-nav')){
//         header.classList.add('fixed-nav')
//     }
//   }
  
//   lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
// });


/*
const navItems = document.querySelectorAll('.nav-item')
const headerHeight = header.offsetHeight
navItems.forEach(navItem=>{
  const id = navItem.id
  const scrollSection = document.querySelector('.'+id)
  navItem.addEventListener('click',function(){
    scrollSection.scrollIntoView({
      behavior: 'smooth'
    });
  })
})


function getGreeting() {
  const currentTime = new Date().getHours();

  if (currentTime >= 4 && currentTime < 12) {
    return 'Good morning!';
  } else if (currentTime >= 12 && currentTime < 15) {
    return 'Good afternoon!';
  } else if (currentTime >= 15 && currentTime < 19) {
    return 'Good evening!';
  } else {
    return 'Good night!';
  }
}

const greeting = document.getElementById('greeting');
greeting.textContent = getGreeting()
*/
