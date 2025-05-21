// Lista de productos de ejemplo (puedes poblarla desde Vproductos)
const productosDeseados = JSON.parse(localStorage.getItem('wishList')) || [];

const wishListDiv = document.getElementById('wishList');

function renderWishList() {
    wishListDiv.innerHTML = '';
    if (productosDeseados.length === 0) {
        wishListDiv.innerHTML = '<p style="text-align:center; color:#888;">No tienes productos en tu lista de deseos.</p>';
        return;
    }
    productosDeseados.forEach(producto => {
        const item = document.createElement('div');
        item.className = 'wish-item';
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <span class="wish-name">${producto.nombre}</span>
            <span class="heart-icon">&#10084;</span>
        `;
        item.addEventListener('click', () => {
            window.location.href = producto.href;
        });
        wishListDiv.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', renderWishList);
