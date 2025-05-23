let indiceActual = 0;
const imagenes = document.querySelectorAll('.imagen');

function cambiarImagen(direccion) {
    imagenes[indiceActual].classList.remove('activa');
    indiceActual = (indiceActual + direccion + imagenes.length) % imagenes.length;
    imagenes[indiceActual].classList.add('activa');
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script index.js cargado correctamente.");

    const token = localStorage.getItem("token");
    const loginOption = document.getElementById("loginOption");
    const userProfile = document.getElementById("userProfile");
    const userNameAnchor = document.getElementById("userName");
    const userNameSpan = document.querySelector(".user-name");
    const logoutBtn = document.getElementById("logout");
    const adminPanelOption = document.getElementById("adminPanelOption");

    if (!loginOption || !userProfile || !userNameAnchor || !userNameSpan || !logoutBtn) {
        console.error("❌ ERROR: Elementos no encontrados en el DOM.");
        return;
    }

    if (token) {
        console.log("🔐 Usuario autenticado. Mostrando perfil...");
        loginOption.classList.add("hidden");
        userProfile.classList.remove("hidden");

        fetch('http://localhost:3000/api/v1/user/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) throw new Error("Token inválido o expirado");
            return response.json();
        })
        .then(data => {
            if (data) {
                // Guardar datos del usuario en localStorage
                localStorage.setItem('userData', JSON.stringify(data));
                userNameSpan.textContent = data.fullname;

                // Mostrar panel de admin si el usuario es administrador
                if (data.profile_id === 1) {
                    adminPanelOption.classList.remove("hidden");
                }
            }
        })
        .catch(error => {
            console.error("❌ Error al obtener perfil:", error);
            // Limpiar datos de sesión
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            loginOption.classList.remove("hidden");
            userProfile.classList.add("hidden");
            adminPanelOption.classList.add("hidden");
            // Redirigir al login si el token es inválido
            window.location.href = "../login/login.html";
        });
    } else {
        console.log("🔓 No hay usuario autenticado.");
        loginOption.classList.remove("hidden");
        userProfile.classList.add("hidden");
        adminPanelOption.classList.add("hidden");
    }

    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("🚪 Cerrando sesión...");
        // Limpiar todos los datos de sesión
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        window.location.href = "../index/index.html";
    });
});

window.addEventListener('DOMContentLoaded', () => {
    // Mostrar el popup solo si el usuario no lo cerró antes
    document.getElementById('promoModal').style.display = 'flex';

  });

  function cerrarPromo() {
    document.getElementById('promoModal').style.display = 'none';
    localStorage.setItem('promoDismissed', 'true');
  }

  function enviarPromo() {
  const email = document.getElementById('promoEmail').value.trim();
  if (!email) {
    alert('Por favor ingresa un correo válido.');
    return;
  }

  fetch('http://localhost:3000/api/v1/user/send-coupon', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    cerrarPromo();
  })
  .catch(err => {
    console.error('Error al enviar cupón:', err);
    alert('Error al registrar el correo.');
  });
}
