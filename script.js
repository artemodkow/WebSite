const burgerMenuButton = document.querySelector('.burger-menu__button');

burgerMenuButton.addEventListener('click', () => {
    burgerMenuButton.classList.toggle('open');
});



// Карусель
const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-control-prev');
const nextButton = document.querySelector('.carousel-control-next');

let currentIndex = 0;
let isAnimating = false;

function showImage(index) {
  if (isAnimating) return;

  isAnimating = true;
  carouselInner.style.transform = `translateX(-${index * 100}%)`;
  currentIndex = index;

  setTimeout(() => {
    isAnimating = false;
  }, 500);
}

prevButton.addEventListener('click', () => {
  const newIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  showImage(newIndex);
});

nextButton.addEventListener('click', () => {
  const newIndex = (currentIndex + 1) % carouselItems.length;
  showImage(newIndex);
});

function updateCartDisplay() {
  document.querySelector('.header__nav-link').textContent = 'Корзина';
}





