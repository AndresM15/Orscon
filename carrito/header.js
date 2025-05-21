// Función para insertar el carrito en el header existente
function insertCart() {
    const cartHtml = `
        <div class="cart-wrapper-centered">
            <div class="cart-icon-container" id="cartIconContainer">
                <i class="fas fa-shopping-cart cart-icon"></i>
                <span class="cart-count">0</span>
            </div>
        </div>
    `;

    // Insertar el carrito después del logo para centrarlo
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

    // Redirigir al hacer click en el icono
    const cartIcon = document.getElementById('cartIconContainer');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            window.location.href = '../carrito/vista.html';
        });
    }
}

document.addEventListener('DOMContentLoaded', insertCart); 