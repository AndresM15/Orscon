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


