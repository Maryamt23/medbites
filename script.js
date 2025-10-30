document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("#navbar ul");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Gallery (only runs if slides exist) 
  const slides = document.querySelectorAll(".slide");
  const slidesContainer = document.querySelector(".slides");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  if (slides.length > 0 && slidesContainer) {
    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateSlide() {
      const slideWidth = slides[0].clientWidth;
      slidesContainer.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlide();
      });
    }

    // Auto-play every 3s
    setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlide();
    }, 3000);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Handle Add to Cart buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      addToCart(name, price);
      alert(`${name} added to cart!`);
    });
  });

  // If on cart page, display cart
  if (window.location.pathname.includes("cart.html")) {
    displayCart();
    document.querySelector("#clear-cart").addEventListener("click", clearCart);
  }
});

function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart() {
  const cartContainer = document.getElementById("cart-container");
  const cartTotal = document.getElementById("cart-total");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Nothing in Cart.</p>";
    cartTotal.textContent = "";
    return;
  }

  let total = 0;
  let html = "<table class='cart-table'><tr><th>Item</th><th>Quantity</th><th>Price</th><th>Remove</th></tr>";

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    html += `
      <tr>
        <td>${item.name}</td>
        <td>${item.name} x ${item.quantity}</td>
        <td>$${itemTotal.toFixed(2)}</td>
        <td><button class="remove-item" data-index="${index}">Remove</button></td>
      </tr>
    `;
  });

  html += "</table>";
  cartContainer.innerHTML = html;
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;

  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", e => {
      const index = e.target.dataset.index;
      removeFromCart(index);
    });
  });
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function clearCart() {
  localStorage.removeItem("cart");
  displayCart();
}
