const books = [
  {id: '1',
    name: 'Apple',
    price: 30000,
    image: 'src/apple.webp',
  },
  {id: '2',
    name: 'Beats',
    price: 15000,
    image: 'src/beats.jpg',
  },
  {id: '3',
    name: 'JBL',
    price: 5000,
    image: 'src/jbl.webp',
  },
  {id: '4',
    name: 'Pioneer',
    price: 9000,
    image: 'src/pioneer.jpg',
  },
  {id: '5',
    name: 'Sony',
    price: 6000,
    image: 'src/sony.webp',
  },
  {id: '6',
    name: 'Sven',
    price: 3000,
    image: 'src/sven.jpg',
  },
  {id: '7',
    name: 'Hoco',
    price: 1500,
    image: 'src/hoco.jpg',
  },
  {id: '8',
    name: 'Apple Pro',
    price: 19000,
    image: 'src/applepro.webp',
  },
];

const stationery = [
    {id: '25',
        name: 'Набор текстовыделителей, 5 шт',
        price: 231,
        image: 'src/stationery/product1.jpg',
      },
      {id: '26',
        name: 'Пенал школьный',
        price: 652,
        image: 'src/stationery/product2.jpg',
      },
      {id: '27',
        name: 'Подставка для книг и учебников',
        price: 418,
        image: 'src/stationery/product3.jpg',
      },
      {id: '28',
        name: 'Набор тетрадей 48 листов, 5 шт',
        price: 299,
        image: 'src/stationery/product4.jpg',
      },

];

const products = [...books, ...stationery];

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

const product = products.find(p => p.id === productId);

if (product) {
  document.querySelector('.product-name').textContent = product.name;
  document.querySelector('.product-image').src = product.image;
  document.querySelector('.product-image').alt = product.name;
  document.querySelector('.product-price').textContent = `₽${product.price}`;
  document.querySelector('.product-description').textContent = product.description;

  const quantity = document.createElement('span');
  quantity.classList.add('product-card__quantity');
  quantity.textContent = getQuantity(product.id);
  document.querySelector('.product-info-container').appendChild(quantity);

  const decreaseButton = document.createElement('button');
  decreaseButton.classList.add('product-card__button', 'product-card__button--decrease');
  decreaseButton.textContent = '-';
  decreaseButton.addEventListener('click', () => {
    decreaseQuantity(product.id);
    quantity.textContent = getQuantity(product.id);
  });
  document.querySelector('.product-info-container').appendChild(decreaseButton);

  const increaseButton = document.createElement('button');
  increaseButton.classList.add('product-card__button', 'product-card__button--increase');
  increaseButton.textContent = '+';
  increaseButton.addEventListener('click', () => {
    increaseQuantity(product.id);
    quantity.textContent = getQuantity(product.id);
  });
  document.querySelector('.product-info-container').appendChild(increaseButton);
} else {
  console.log('Product not found');
}

function getQuantity(productId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  return cart[productId] || 0;
}

function increaseQuantity(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    cart[productId] = (cart[productId] || 0) + 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function decreaseQuantity(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (cart[productId] > 0) {
      cart[productId] -= 1;
      if (cart[productId] === 0) {
        delete cart[productId];
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartDisplay();
    }
}

function updateCartDisplay() {
    document.querySelector('.header__nav-link').textContent = 'Корзина';
}

updateCartDisplay();