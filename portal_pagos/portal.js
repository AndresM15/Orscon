document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".payment-form");

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

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fields = {
      fullname: [100, "Nombre completo"],
      address: [150, "Dirección"],
      city: [50, "Ciudad"],
      zip: [10, "Código Postal"],
      phone: [15, "Teléfono"],
      cardholder: [100, "Nombre en la tarjeta"],
      cardnumber: [19, "Número de tarjeta"],
      expiry: [5, "Fecha de expiración"],
      cvv: [4, "CVV"]
    };

    const numericFields = {
      cardnumber: /^[\d\s]+$/,         // Dígitos y espacios
      expiry: /^\d{2}\/\d{2}$/,        // MM/AA
      cvv: /^\d{3,4}$/,                // 3 o 4 dígitos
      phone: /^[\d+]+$/                // Dígitos y "+"
    };

    const direccionRegex = /^[a-zA-Z0-9\s,.\-#ºª]+$/;

    let errors = [];
    let valid = true;

    for (let id in fields) {
      const [maxLength, label] = fields[id];
      const input = document.getElementById(id);
      const value = input?.value.trim() || "";

      if (value === "") {
        errors.push(`${label} no puede estar vacío.`);
        valid = false;
        input.style.borderColor = "red";
      } else if (value.length > maxLength) {
        errors.push(`${label} supera el máximo de ${maxLength} caracteres.`);
        valid = false;
        input.style.borderColor = "red";
      } else if (id === "address" && !direccionRegex.test(value)) {
        errors.push(`${label} contiene caracteres inválidos. Usa solo letras, números, espacios, comas, puntos, guiones y símbolos comunes como #.`);
        valid = false;
        input.style.borderColor = "red";
      } else if (numericFields[id] && !numericFields[id].test(value)) {
        errors.push(`${label} tiene un formato inválido.`);
        valid = false;
        input.style.borderColor = "red";
      } else {
        input.style.borderColor = "#ccc";
      }
    }

    if (!valid) {
      alert("❌ Corrige los siguientes errores:\n\n" + errors.join("\n"));
    } else {
      alert("✅ ¡Formulario válido! Procesando pago...");
      // Aquí podrías continuar con el procesamiento
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.payment-form');
  
  form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Obtener datos del formulario
      const shippingInfo = {
        address_line: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: "Estado", // Puedes obtenerlo de un input o dejarlo fijo si no tienes campo
        country: "País", // Igual que arriba
        postal_code: document.getElementById('zip').value
    };

      const paymentInfo = {
          cardholder: document.getElementById('cardholder').value,
          cardnumber: document.getElementById('cardnumber').value,
          expiry: document.getElementById('expiry').value,
          cvv: document.getElementById('cvv').value
      };

      // Obtener el ID del producto y usuario del localStorage o sessionStorage
      const productId = localStorage.getItem('selectedProductId');
      const userId = localStorage.getItem('userId');
      const quantity = localStorage.getItem('quantity') || 1;

      try {
        const response = await fetch('http://localhost:3000/api/v1/orders', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
              items: [
                  {
                      product_id: productId,
                      quantity: Number(quantity)
                  }
              ],
              shipping_info: shippingInfo,
              payment_info: paymentInfo
          })
      });

          const data = await response.json();

          if (response.ok) {
              alert('¡Compra realizada con éxito! Revisa tu correo para más detalles.');
              // Limpiar el carrito
              localStorage.removeItem('selectedProductId');
              localStorage.removeItem('quantity');
              // Redirigir a la página de confirmación
              window.location.href = '../confirmation/confirmation.html';
          } else {
              alert(data.message || 'Error al procesar la compra');
          }
      } catch (error) {
          console.error('Error:', error);
          alert('Error al procesar la compra. Por favor, intenta de nuevo.');
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