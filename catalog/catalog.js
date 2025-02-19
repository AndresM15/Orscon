// Ejecutar el código solo cuando el DOM esté listo

document.addEventListener("DOMContentLoaded", function () {
    const btnCart = document.querySelector('.container-cart-icon');
    const containerCartProducts = document.querySelector('.container-cart-products');
    const cartInfo = document.querySelector('.cart-product');
    const rowProduct = document.querySelector('.row-product');
    const productsList = document.querySelector('.container-items');
    const valorTotal = document.querySelector('.total-pagar');
    const countProducts = document.querySelector('#contador-productos');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartTotal = document.querySelector('.cart-total');

    // Verificar si los elementos existen antes de asignar eventos
    if (btnCart && containerCartProducts) {
        btnCart.addEventListener('click', () => {
            containerCartProducts.classList.toggle('hidden-cart');
        });
    }

    let allProducts = [];

    if (productsList) {
        productsList.addEventListener('click', e => {
            if (e.target.classList.contains('btn-add-cart')) {
                const product = e.target.parentElement;
                
                const infoProduct = {
                    quantity: 1,
                    title: product.querySelector('h2')?.textContent || '',
                    price: product.querySelector('p')?.textContent || '',
                };

                if (!infoProduct.title || !infoProduct.price) return;

                const exists = allProducts.some(product => product.title === infoProduct.title);

                if (exists) {
                    allProducts = allProducts.map(product => {
                        if (product.title === infoProduct.title) {
                            product.quantity++;
                        }
                        return product;
                    });
                } else {
                    allProducts.push(infoProduct);
                }

                showHTML();
            }
        });
    }

    if (rowProduct) {
        rowProduct.addEventListener('click', e => {
            if (e.target.classList.contains('icon-close')) {
                const product = e.target.parentElement;
                const title = product.querySelector('p')?.textContent || '';

                allProducts = allProducts.filter(product => product.title !== title);

                showHTML();
            }
        });
    }

    // Función para actualizar el carrito
    function showHTML() {
        if (!rowProduct || !cartEmpty || !cartTotal) return;

        if (allProducts.length === 0) {
            cartEmpty.classList.remove('hidden');
            rowProduct.classList.add('hidden');
            cartTotal.classList.add('hidden');
        } else {
            cartEmpty.classList.add('hidden');
            rowProduct.classList.remove('hidden');
            cartTotal.classList.remove('hidden');
        }

        rowProduct.innerHTML = '';

        let total = 0;
        let totalOfProducts = 0;

        allProducts.forEach(product => {
            const containerProduct = document.createElement('div');
            containerProduct.classList.add('cart-product');

            containerProduct.innerHTML = `
                <div class="info-cart-product">
                    <span class="cantidad-producto-carrito">${product.quantity}</span>
                    <p class="titulo-producto-carrito">${product.title}</p>
                    <span class="precio-producto-carrito">${product.price}</span>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="icon-close"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            `;

            rowProduct.append(containerProduct);

            total += parseInt(product.quantity * product.price.slice(1));
            totalOfProducts += product.quantity;
        });

        if (valorTotal) valorTotal.innerText = `$${total}`;
        if (countProducts) countProducts.innerText = totalOfProducts;
    }
});
