// Función para insertar el carrito y el wishlist en el header existente
function insertCart() {
    const cartHtml = `
        <div class="cart-wrapper-centered">
            <div class="cart-icon-container" id="cartIconContainer">
                <i class="fas fa-shopping-cart cart-icon"></i>
                <span class="cart-count">0</span>
            </div>
            <a href="../wish/vista-wish.html" class="wishlist-header-icon" id="wishlistHeaderIcon" title="Lista de deseos">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6c-1.5-1.4-3.9-1.4-5.4 0l-.4.4-.4-.4c-1.5-1.4-3.9-1.4-5.4 0-1.6 1.5-1.6 4 0 5.5l5.8 5.7 5.8-5.7c1.6-1.5 1.6-4 0-5.5z"></path></svg>
            </a>
        </div>
    `;

    // Insertar el carrito y wishlist después del logo para centrarlo
    const menuContainer = document.querySelector('.menu.container');
    if (menuContainer) {
        const logo = menuContainer.querySelector('.logo');
        if (logo) {
            logo.insertAdjacentHTML('afterend', cartHtml);
        }
    }

    // Cargar los estilos necesarios si no están ya cargados
    if (!document.querySelector('link[href="../carrito/carrito.css"]')) {
        const cartStyle = document.createElement('link');
        cartStyle.rel = 'stylesheet';
        cartStyle.href = '../carrito/carrito.css';
        document.head.appendChild(cartStyle);
    }

    if (!document.querySelector('link[href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"]')) {
        const fontAwesome = document.createElement('link');
        fontAwesome.rel = 'stylesheet';
        fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
        document.head.appendChild(fontAwesome);
    }

    // Redirigir al hacer click en el icono del carrito
    const cartIcon = document.getElementById('cartIconContainer');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            window.location.href = '../carrito/vista.html';
        });
    }

    // Ocultar wishlist en la página de vista-wish
    if (window.location.pathname.includes('vista-wish.html')) {
        const wishlistIcon = document.getElementById('wishlistHeaderIcon');
        if (wishlistIcon) wishlistIcon.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', insertCart);