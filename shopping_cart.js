const cartItemsContainer = document.querySelector('.cart-items');
const totalPriceContainer = document.querySelector('.total-price');
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
console.log('Products:', products);

function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  console.log('Cart:', cart);

  cartItemsContainer.innerHTML = '';

  Object.keys(cart).forEach(productId => {
    const product = products.find(p => p.id === productId);
    if (product && cart[productId] > 0) {
      console.log('Product:', product);
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');

      const image = document.createElement('img');
      image.classList.add('cart-item__image');
      image.src = product.image;
      image.alt = product.name;
      cartItem.appendChild(image);

      const content = document.createElement('div');
      content.classList.add('cart-item__content');
      cartItem.appendChild(content);

      const title = document.createElement('h3');
      title.classList.add('cart-item__title');
      title.textContent = product.name;
      content.appendChild(title);

      const price = document.createElement('p');
      price.classList.add('cart-item__price');
      price.textContent = `₽${product.price}`;
      content.appendChild(price);

      const quantity = document.createElement('p');
      quantity.classList.add('cart-item__quantity');
      quantity.textContent = `Количество: ${cart[productId]}`;
      content.appendChild(quantity);

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('cart-item__delete-button');
      deleteButton.textContent = 'Удалить товар';
      deleteButton.addEventListener('click', () => removeFromCart(productId));
      content.appendChild(deleteButton);

      cartItemsContainer.appendChild(cartItem);
    }
  });

  updateTotalPrice();
  updateCartDisplay();
}

function removeFromCart(productId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  delete cart[productId];
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems();
}

function updateTotalPrice() {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  const totalPrice = Object.keys(cart).reduce((total, productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      return total + (product.price * cart[productId]);
    }
    return total;
  }, 0);

  totalPriceContainer.textContent = `Итоговая стоимость: ₽${totalPrice}`;
}

renderCartItems();

function removeFromCart(productId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  delete cart[productId];
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems();
}

function updateTotalPrice() {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  const totalPrice = Object.keys(cart).reduce((total, productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      return total + (product.price * cart[productId]);
    }
    return total;
  }, 0);

  totalPriceContainer.textContent = `Итоговая стоимость: ₽${totalPrice}`;
}

renderCartItems();