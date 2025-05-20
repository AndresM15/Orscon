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

function redirectToProductPage(target) {
    if (target === 'p-1') {
        window.location.href = '../Vreview/vreview.html'; 
    } else if (target === 'p-2') {
        window.location.href = '../Vreview/vreview2.html';
    } else if (target === 'p-3') {
        window.location.href = '../Vreview/vreview3.html';   
    } else if (target === 'p-4') {
        window.location.href = '../Vreview/vreview4.html';
    } else if (target === 'p-5') {
        window.location.href = '../Vreview/vreview5.html';
    } else {
        console.error('No se encontró una página para el producto:', target);
    }
}
