// Variables del carrito
const btnCart = document.querySelector('.container-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const cartTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartContainer = document.querySelector('.container-cart-products');
const productsList = document.querySelector('.container-items');
let allProducts = [];

// Evento para abrir/cerrar el carrito
if (btnCart) {
    btnCart.addEventListener('click', () => {
        containerCartProducts.classList.toggle('hidden-cart');
    });
}

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

// Función para añadir productos al carrito
function addToCart(productElement) {
    const productName = productElement.querySelector('h2').textContent;
    const productPrice = parseFloat(productElement.querySelector('.price').textContent.replace(/[$,]/g, ''));

    const existingProduct = allProducts.find(p => p.name === productName);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        allProducts.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    updateCart();
}

// Función para actualizar el carrito
function updateCart() {
    cartContainer.innerHTML = '';

    let total = 0;
    let totalQuantity = 0;

    if (allProducts.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">El carrito está vacío</p>';
        cartTotal.textContent = '$0';
        countProducts.textContent = 0;
        return;
    }

    allProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('cart-product');
        productElement.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.name}</p>
                <span class="precio-producto-carrito">$${(product.price * product.quantity).toFixed(2)}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"/>
            </svg>
        `;

        productElement.querySelector('.icon-close').addEventListener('click', () => {
            removeProduct(product.name);
        });

        cartContainer.appendChild(productElement);
        total += product.price * product.quantity;
        totalQuantity += product.quantity;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    countProducts.textContent = totalQuantity;
}

// Función para remover productos del carrito
function removeProduct(name) {
    const productIndex = allProducts.findIndex(product => product.name === name);
    if (productIndex !== -1) {
        if (allProducts[productIndex].quantity > 1) {
            allProducts[productIndex].quantity--;
        } else {
            allProducts.splice(productIndex, 1);
        }
    }
    updateCart();
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