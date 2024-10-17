
  const headphones = [
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
  

  const productCardsContainer = document.querySelector('.product-cards');

function renderProductCards(products) {
  productCardsContainer.innerHTML = '';

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.dataset.id = product.id;

    const image = document.createElement('img');
    image.classList.add('product-card__image');
    image.src = product.image;
    image.alt = product.name;
    image.addEventListener('click', () => {
      window.location.href = `product_card.html?id=${product.id}`;
    });
    productCard.appendChild(image);

    const content = document.createElement('div');
    content.classList.add('product-card__content');
    productCard.appendChild(content);

    const title = document.createElement('h3');
    title.classList.add('product-card__title');
    title.textContent = product.name;
    content.appendChild(title);

    const price = document.createElement('p');
    price.classList.add('product-card__price');
    price.textContent = `₽${product.price}`;
    content.appendChild(price);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('product-card__button-container');
    content.appendChild(buttonContainer);

    const decreaseButton = document.createElement('button');
    decreaseButton.classList.add('product-card__button', 'product-card__button--decrease');
    decreaseButton.textContent = '-';
    decreaseButton.addEventListener('click', () => decreaseQuantity(product.id));
    buttonContainer.appendChild(decreaseButton);

    const quantity = document.createElement('span');
    quantity.classList.add('product-card__quantity');
    quantity.textContent = getQuantity(product.id);
    buttonContainer.appendChild(quantity);

    const increaseButton = document.createElement('button');
    increaseButton.classList.add('product-card__button', 'product-card__button--increase');
    increaseButton.textContent = '+';
    increaseButton.addEventListener('click', () => increaseQuantity(product.id));
    buttonContainer.appendChild(increaseButton);

    productCardsContainer.appendChild(productCard);
  });
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
    renderProductCards(headphones);
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
      renderProductCards(headphones);
    }
  }

  function updateCartDisplay() {
    document.querySelector('.header__nav-link').textContent = 'Корзина';
  }

renderProductCards(headphones);
updateCartDisplay();


