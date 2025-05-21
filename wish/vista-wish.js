const productosDeseados = JSON.parse(localStorage.getItem('wishList')) || [];

const wishItemsDiv = document.getElementById('wishItems');

function renderWishItems() {
    wishItemsDiv.innerHTML = '';
    let wishList = JSON.parse(localStorage.getItem('wishList')) || [];
    if (wishList.length === 0) {
        wishItemsDiv.innerHTML = '<p style="text-align:center; color:#888;">No tienes productos en tu lista de deseos.</p>';
        return;
    }
    wishList.forEach(producto => {
        const item = document.createElement('div');
        item.className = 'wish-item';
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <span class="wish-name">${producto.nombre}</span>
            <span class="heart-icon">&#10084;</span>
            <span class="remove-wish" title="Eliminar">&times;</span>
        `;
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-wish')) return;
            window.location.href = producto.href;
        });
        item.querySelector('.remove-wish').addEventListener('click', (e) => {
            e.stopPropagation();
            removeFromWishList(producto.id);
        });
        wishItemsDiv.appendChild(item);
    });
}

function removeFromWishList(id) {
    let wishList = JSON.parse(localStorage.getItem('wishList')) || [];
    wishList = wishList.filter(p => p.id !== id);
    localStorage.setItem('wishList', JSON.stringify(wishList));
    renderWishItems();
}

document.addEventListener('DOMContentLoaded', renderWishItems);
