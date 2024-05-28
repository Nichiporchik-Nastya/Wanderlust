function scrollToBlock(event) {
  // if (burgerMenu.classList.contains("menu-active")) {
  //   burgerMenu.classList.remove("menu-active");
  // }

  event.preventDefault(); 

  const targetElement = document.querySelector(
    event.target.getAttribute('href')
  );
  
  const offset = targetElement.offsetTop - 160; 


  window.scrollTo({
    top: offset,
    behavior: 'smooth',
  });
}

const linksWithAnchor = document.querySelectorAll('a[href^="#"]');

linksWithAnchor.forEach((link) => {
  link.addEventListener('click', scrollToBlock);
});