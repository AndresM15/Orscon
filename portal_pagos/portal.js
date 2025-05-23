document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".payment-form");
  const submitButton = form.querySelector('button[type="submit"]');

  // Logs de depuración
  console.log('Estado del localStorage:');
  console.log('selectedProductId:', localStorage.getItem('selectedProductId'));
  console.log('quantity:', localStorage.getItem('quantity'));
  console.log('token:', localStorage.getItem('token'));
  console.log('userData:', localStorage.getItem('userData'));

  // Reglas para limpiar entradas numéricas
  document.getElementById("cvv").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });

  document.getElementById("phone").addEventListener("input", function () {
    this.value = this.value.replace(/[^\d+]/g, "");
  });

  document.getElementById("cardnumber").addEventListener("input", function () {
    this.value = this.value.replace(/[^\d\s]/g, "");
  });

  document.getElementById("expiry").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9/]/g, "");
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Validar que el usuario esté autenticado
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No hay token de autenticación. Por favor, inicia sesión nuevamente.');
      window.location.href = '../login/login.html';
      return;
    }

    // Obtener datos del usuario
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData.email) {
      alert('Error: No se encontró la información del usuario. Por favor, inicia sesión nuevamente.');
      window.location.href = '../login/login.html';
      return;
    }

    // Validar que exista un producto seleccionado
    const productId = localStorage.getItem('selectedProductId');
    if (!productId) {
      alert('Error: No se encontró el producto seleccionado. Por favor, selecciona un producto nuevamente.');
      window.location.href = '../catalog/catalog.html';
      return;
    }

    // Validar cantidad
    const quantity = parseInt(localStorage.getItem('quantity')) || 1;
    if (quantity <= 0) {
      alert('La cantidad debe ser mayor a 0');
      return;
    }

    // Validar formato de fecha de expiración
    const expiryValue = document.getElementById('expiry').value.trim();
    if (!/^\d{2}\/\d{2}$/.test(expiryValue)) {
      alert('Por favor, ingresa una fecha de expiración válida en formato MM/YY');
      return;
    }

    // Obtener información de envío
    const shippingInfo = {
      address_line: document.getElementById('address').value.trim(),
      city: document.getElementById('city').value.trim(),
      state: "Estado",
      country: "País",
      postal_code: document.getElementById('zip').value.trim()
    };

    // Obtener información de pago
    const paymentInfo = {
      cardholder: document.getElementById('cardholder').value.trim(),
      cardnumber: document.getElementById('cardnumber').value.replace(/\s/g, ''),
      expiry: expiryValue,
      cvv: document.getElementById('cvv').value.trim()
    };

    try {
      // Mostrar indicador de carga
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Procesando...';
      submitButton.disabled = true;

      const response = await fetch('http://localhost:3000/api/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: [
            {
              product_id: parseInt(productId),
              quantity: quantity
            }
          ],
          shipping_info: shippingInfo,
          payment_info: paymentInfo
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        console.error('Status:', response.status);
        
        if (response.status === 403) {
          alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
          window.location.href = '../login/login.html';
          return;
        }
        
        if (response.status === 404) {
          alert('El producto seleccionado no está disponible. Por favor, selecciona otro producto.');
          window.location.href = '../catalog/catalog.html';
          return;
        }
        
        throw new Error(`Error ${response.status}: ${errorData}`);
      }

      const data = await response.json();

      // Mostrar mensaje de éxito
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerHTML = `
        <h3>¡Compra realizada con éxito!</h3>
        <p>Se ha enviado un correo de confirmación a: ${userData.email}</p>
        <p>Número de orden: ${data.orderId}</p>
        <p>Total: $${data.total.toLocaleString()}</p>
        <p>Detalles de la compra:</p>
        <ul>
          ${data.items.map(item => `<li>${item.name} (Cantidad: ${item.quantity})</li>`).join('')}
        </ul>
      `;
      document.body.appendChild(successMessage);

      // Limpiar el carrito
      localStorage.removeItem('selectedProductId');
      localStorage.removeItem('quantity');
      localStorage.removeItem('cart');

      // Limpiar el formulario
      form.reset();

      // Restaurar el botón
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;

    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Error al procesar la compra. Por favor, intenta de nuevo.');
      
      // Restaurar el botón en caso de error
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    }
  });

  // Validación de tarjeta de crédito
  const cardNumber = document.getElementById('cardnumber');
  cardNumber.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    e.target.value = value;
  });

  // Validación de fecha de expiración
  const expiry = document.getElementById('expiry');
  expiry.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
  });

  // Validación de CVV
  const cvv = document.getElementById('cvv');
  cvv.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    e.target.value = value;
  });
}); 