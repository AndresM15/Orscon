
const btnCart = document.querySelector('.container-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const productsList = document.querySelector('.container-items');
const cartTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartContainer = document.querySelector('.container-cart-products');

let allProducts = []; 


btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});


productsList.addEventListener('click', e => {
	if (e.target.tagName === 'BUTTON') {
		const productElement = e.target.closest('.item'); 
		const productName = productElement.querySelector('h2').textContent;
		const productPrice = parseInt(productElement.querySelector('.price').textContent.replace('$', '').replace('.', ''));
		
		
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
});


function updateCart() {
	
	cartContainer.innerHTML = '';

	let total = 0;
	let totalQuantity = 0;

	allProducts.forEach(product => {
		const productElement = document.createElement('div');
		productElement.classList.add('cart-product');
		productElement.innerHTML = `
			<div class="info-cart-product">
				<span class="cantidad-producto-carrito">${product.quantity}</span>
				<p class="titulo-producto-carrito">${product.name}</p>
				<span class="precio-producto-carrito">$${product.price * product.quantity}</span>
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


	cartTotal.textContent = `$${total}`;
	countProducts.textContent = totalQuantity;
}

function removeProduct(name) {
	allProducts = allProducts.filter(product => product.name !== name);
	updateCart();
}
