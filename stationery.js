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
      renderProductCards(stationery);
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
        renderProductCards(stationery);
      }
    }
  
    function updateCartDisplay() {
      document.querySelector('.header__nav-link').textContent = 'Корзина';
    }
  
  renderProductCards(stationery);
  updateCartDisplay();