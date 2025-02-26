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

// Evento para gestionar productos (añadir al carrito o abrir vista previa)
if (productsList) {
    productsList.addEventListener('click', e => {
        const productElement = e.target.closest('.item');

        if (!productElement) return;

        // Si se hace clic en una imagen -> abrir vista previa
        if (e.target.tagName === 'IMG') {
            const target = productElement.getAttribute('data-target');
            openPreview(target);
            return;
        }

        // Si se hace clic en el botón "Añadir al carrito" -> agregar producto
        if (e.target.tagName === 'BUTTON') {
            addToCart(productElement);
        }
    });
}

// Función para abrir la vista previa del producto
function openPreview(target) {
    const previewContainer = document.querySelector(".productos-preview");
    const previewBoxes = document.querySelectorAll('.productos-preview .preview');

    previewContainer.style.display = 'flex'; // Mostrar el contenedor principal

    previewBoxes.forEach(preview => {
        if (preview.getAttribute('data-target') === target) {
            preview.style.display = 'block'; // Mostrar la previsualización correcta
        } else {
            preview.style.display = 'none'; // Ocultar las demás
        }
    });
}

// Función para añadir productos al carrito
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

// Función para actualizar el carrito
function updateCart() {
    cartContainer.innerHTML = ''; 

    let total = 0;
    let totalQuantity = 0;

    if (allProducts.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">El carrito está vacío</p>';
        cartTotal.textContent = $0;
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

// Función para remover productos del carrito
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

// Evento para cerrar la vista previa
document.addEventListener("DOMContentLoaded", () => {
    const previewContainer = document.querySelector(".productos-preview");
    const previewBoxes = document.querySelectorAll('.productos-preview .preview');

    previewBoxes.forEach(preview => {
        const closeButton = preview.querySelector('.fa-times');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                preview.style.display = 'none';
                previewContainer.style.display = 'none';
            });
        }
    });
});