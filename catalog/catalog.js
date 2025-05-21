const productsList = document.querySelector('.container-items');




// Evento para gestionar clics en productos
if (productsList) {
    productsList.addEventListener('click', e => {
        const productElement = e.target.closest('.item');

        if (!productElement) return;

        // Si se hace clic en una imagen -> redirigir a la página del producto
        if (e.target.tagName === 'IMG') {
            const target = productElement.getAttribute('data-target');
            redirectToProductPage(target);
            return;
        }

        // Si se hace clic en el botón "Añadir al carrito" -> agregar producto
        if (e.target.tagName === 'BUTTON') {
            addToCart(productElement);
        }
    });
}

// Función para redirigir a la página del producto
function redirectToProductPage(target) {
    // Redirigir a una página específica según el producto
    if (target === 'p-1') {
        window.location.href = '../Vproductos/vteclado.html'; // Página del teclado
    } else if (target === 'p-2') {
        window.location.href = '../Vproductos/vaudifonos.html'; // Otra página de producto
    } else if(target === 'p-3') {
        window.location.href = '../Vproductos/vcargador_negro.html'; // Otra página de producto    
    }
    else if(target === 'p-4') {
        window.location.href = '../Vproductos/vreloj.html';
    }
    else if(target === 'p-5') {
        window.location.href = '../Vproductos/vmouse.html';
    }
    else{
        console.error('No se encontró una página para el producto:', target);
    }
}







const searchInput = document.querySelector('.search-bar input');
const items = document.querySelectorAll('.item');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    items.forEach(item => {
        const productName = item.querySelector('h2').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            item.style.display = 'block'; // Muestra el producto si coincide
        } else {
            item.style.display = 'none'; // Oculta el producto si no coincide
        }
    });
});

// Wishlist
const wishHearts = document.querySelectorAll('.wish-heart');

const productosCatalogo = [
    { id: 'p-1', nombre: 'Teclado', imagen: '../catalog/teclado_nuevo.jpg', href: '../Vproductos/vteclado.html' },
    { id: 'p-2', nombre: 'Audifonos', imagen: '../catalog/aud_nuevos1.jpg', href: '../Vproductos/vaudifonos.html' },
    { id: 'p-3', nombre: 'Cargador', imagen: '../catalog/cargador1.jpeg', href: '../Vproductos/vcargador_negro.html' },
    { id: 'p-4', nombre: 'Smartwatch', imagen: '../catalog/reloj1.jpg', href: '../Vproductos/vreloj.html' },
    { id: 'p-5', nombre: 'Mouse', imagen: '../catalog/mouse1.jpg', href: '../Vproductos/vmouse.html' }
];

function getWishList() {
    return JSON.parse(localStorage.getItem('wishList')) || [];
}
function saveWishList(list) {
    localStorage.setItem('wishList', JSON.stringify(list));
}

// Al cargar la página, marca los corazones de productos en wishlist
function marcarCorazonesWishlist() {
    const wishList = getWishList();
    wishHearts.forEach(heart => {
        const id = heart.getAttribute('data-id');
        if (wishList.some(p => p.id === id)) {
            heart.classList.add('filled');
        } else {
            heart.classList.remove('filled');
        }
    });
}

document.addEventListener('DOMContentLoaded', marcarCorazonesWishlist);

wishHearts.forEach(heart => {
    heart.addEventListener('click', function(e) {
        e.stopPropagation();
        const id = this.getAttribute('data-id');
        let wishList = getWishList();
        const producto = productosCatalogo.find(p => p.id === id);
        if (!producto) return;
        const yaEsta = wishList.some(p => p.id === id);
        if (!yaEsta) {
            wishList.push(producto);
            this.classList.add('filled');
            saveWishList(wishList);
        } else {
            wishList = wishList.filter(p => p.id !== id);
            this.classList.remove('filled');
            saveWishList(wishList);
        }
    });
});