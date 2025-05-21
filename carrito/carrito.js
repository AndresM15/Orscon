// --- Carrito.js robusto ---
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function syncCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartIcon() {
    syncCart();
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    updateCartDropdown();
}

function updateCartDropdown() {
    syncCart();
    const cartDropdown = document.querySelector('.cart-dropdown');
    if (!cartDropdown) return;
    cartDropdown.innerHTML = '';
    if (cart.length === 0) {
        cartDropdown.innerHTML = '<div class="empty-cart">El carrito está vacío</div>';
        return;
    }
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-index="${index}" data-action="minus">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-index="${index}" data-action="plus">+</button>
                </div>
            </div>
            <div class="remove-item" data-index="${index}" data-action="remove">×</div>
        `;
        cartDropdown.appendChild(cartItem);
    });
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.innerHTML = `Total: <span>$${total.toLocaleString()}</span>`;
    cartDropdown.appendChild(totalElement);
}

// Delegación de eventos para el dropdown
function handleCartDropdownClick(e) {
    const btn = e.target;
    const index = btn.getAttribute('data-index');
    const action = btn.getAttribute('data-action');
    if (index === null || !action) return;
    if (action === 'plus') {
        cart[index].quantity++;
    } else if (action === 'minus') {
        cart[index].quantity--;
        if (cart[index].quantity <= 0) cart.splice(index, 1);
    } else if (action === 'remove') {
        cart.splice(index, 1);
    }
    saveCart();
    updateCartIcon();
}

function toggleCartDropdown() {
    const dropdown = document.querySelector('.cart-dropdown');
    dropdown.classList.toggle('show');
}

function showCartDropdown() {
    const dropdown = document.querySelector('.cart-dropdown');
    dropdown.classList.add('show');
    setTimeout(() => {
        dropdown.classList.remove('show');
    }, 3000);
}

document.addEventListener('click', (e) => {
    const cartContainer = document.querySelector('.cart-icon-container');
    const dropdown = document.querySelector('.cart-dropdown');
    if (cartContainer && dropdown && !cartContainer.contains(e.target) && dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateCartIcon();
    // Delegación de eventos para el dropdown
    const dropdown = document.querySelector('.cart-dropdown');
    if (dropdown) {
        dropdown.addEventListener('click', handleCartDropdownClick);
    }
});

// Sincroniza el contador si se cambia el carrito en otra pestaña
window.addEventListener('storage', updateCartIcon);

// --- Añadir al carrito desde los botones de producto ---
function initializeCartButtons() {
    document.querySelectorAll('.carrito').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productContainer = this.closest('.text-box');
            const mainImage = document.querySelector('.producto-img');
            if (productContainer && mainImage) {
                const priceText = productContainer.querySelector('.price').textContent;
                const price = parseFloat(priceText.replace(/[^\d]/g, ''));
                const product = {
                    name: productContainer.querySelector('.product-title').textContent,
                    price: price,
                    image: mainImage.src,
                    quantity: 1
                };
                addToCart(product);
                // Mensaje de confirmación
                const confirmMessage = document.createElement('div');
                confirmMessage.className = 'add-to-cart-message';
                confirmMessage.textContent = '¡Producto añadido al carrito!';
                document.body.appendChild(confirmMessage);
                setTimeout(() => { confirmMessage.remove(); }, 2000);
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', initializeCartButtons);

// Función para añadir productos al carrito
function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push(product);
    }
    saveCart();
    updateCartIcon();
    showCartDropdown();
} 