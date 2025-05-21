// carrito/vista.js

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
    const cart = getCart();
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalDiv = document.getElementById('cartTotal');
    cartItemsDiv.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="empty-cart">El carrito está vacío</div>';
        cartTotalDiv.textContent = '';
        return;
    }

    cart.forEach(product => {
        total += product.price * product.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${product.name}</div>
                <div class="cart-item-price">$${product.price.toLocaleString()}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-name="${product.name}">-</button>
                    <span>${product.quantity}</span>
                    <button class="quantity-btn plus" data-name="${product.name}">+</button>
                </div>
            </div>
            <div class="remove-item" data-name="${product.name}">×</div>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });
    cartTotalDiv.innerHTML = `Total: <span>$${total.toLocaleString()}</span>`;
}

// Delegación de eventos para botones de cantidad y eliminar
function handleCartActions(e) {
    const cart = getCart();
    const name = e.target.getAttribute('data-name');
    if (!name) return;
    const idx = cart.findIndex(p => p.name === name);
    if (idx === -1) return;
    if (e.target.classList.contains('plus')) {
        cart[idx].quantity++;
    } else if (e.target.classList.contains('minus')) {
        cart[idx].quantity--;
        if (cart[idx].quantity <= 0) cart.splice(idx, 1);
    } else if (e.target.classList.contains('remove-item')) {
        cart.splice(idx, 1);
    }
    saveCart(cart);
    renderCart();
    updateCartCountGlobal();
}

// Actualiza el contador global del carrito en el header
function updateCartCountGlobal() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, p) => sum + p.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) cartCount.textContent = totalItems;
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    document.getElementById('cartItems').addEventListener('click', handleCartActions);
    updateCartCountGlobal();
});

// Sincroniza el contador si se cambia el carrito en otra pestaña
window.addEventListener('storage', () => {
    renderCart();
    updateCartCountGlobal();
}); 