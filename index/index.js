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

    if (!loginOption || !userProfile || !userNameAnchor || !userNameSpan || !logoutBtn) {
        console.error("❌ ERROR: Elementos no encontrados en el DOM.");
        return;
    }

    if (token) {
        console.log("🔐 Usuario autenticado. Mostrando perfil...");
        loginOption.classList.add("hidden");
        userProfile.classList.remove("hidden");

        fetch(`http://localhost:3000/api/v1/user/profile`, {
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
            if (data.fullname) {
                userNameSpan.textContent = data.fullname;

                // Cambiar también texto del enlace en menú si lo deseas
                const verPerfilLink = document.querySelector("#userProfile .dropdown-menu li a");
                
            }
        })
        .catch(error => {
            console.error("❌ Error al obtener perfil:", error);
            localStorage.removeItem("token");
            loginOption.classList.remove("hidden");
            userProfile.classList.add("hidden");
        });
    } else {
        console.log("🔓 No hay usuario autenticado.");
        loginOption.classList.remove("hidden");
        userProfile.classList.add("hidden");
    }

    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("🚪 Cerrando sesión...");
        localStorage.removeItem("token");
        window.location.reload();
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

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    // Oculta "Iniciar sesión" y muestra el menú de usuario
    document.getElementById("loginOption").classList.add("hidden");
    const userProfile = document.getElementById("userProfile");
    userProfile.classList.remove("hidden");
    userProfile.querySelector(".user-name").textContent = user.fullname;

    // Si el usuario es administrador, muestra el botón del panel admin
    if (user.profile_id === 1) {
      document.getElementById("adminPanelOption").classList.remove("hidden");
    }

    // Logout
    document.getElementById("logout").addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "../index/index.html";
    });
  }
});
