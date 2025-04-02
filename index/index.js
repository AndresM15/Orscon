let indiceActual = 0;
const imagenes = document.querySelectorAll('.imagen');

function cambiarImagen(direccion) {
    
    imagenes[indiceActual].classList.remove('activa');
    

    indiceActual = (indiceActual + direccion + imagenes.length) % imagenes.length;
    

    imagenes[indiceActual].classList.add('activa');
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script index.js cargado correctamente.");

    const token = localStorage.getItem("token"); // Obtener token
    console.log("🔍 Token almacenado:", token);

    // Elementos del DOM
    const loginOption = document.getElementById("loginOption"); // Botón de iniciar sesión
    const userProfile = document.getElementById("userProfile"); // Menú de usuario
    const userName = document.getElementById("userName"); // Contenedor del nombre/usuario
    const logoutBtn = document.getElementById("logout"); // Botón de cerrar sesión

    // Verificar si existen los elementos
    if (!loginOption || !userProfile || !userName || !logoutBtn) {
        console.error("❌ ERROR: Elementos no encontrados en el DOM.");
        return;
    }

    if (token) {
        console.log("🔐 Usuario autenticado. Mostrando perfil...");

        // CAMBIO 1: Usar classList en lugar de style.display
        loginOption.classList.add("hidden");
        userProfile.classList.remove("hidden");

        // Obtener datos del usuario desde la API
        fetch(`http://localhost:3000/api/v1/user/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.fullname) {
                // CAMBIO 2: No usar textContent para no borrar la imagen
                // Creamos un span para el nombre si no existe
                let nameSpan = userName.querySelector(".user-name");
                if (!nameSpan) {
                    nameSpan = document.createElement("span");
                    nameSpan.className = "user-name";
                    userName.appendChild(nameSpan);
                }
                nameSpan.textContent = data.fullname;
                
                // Opcional: Actualizar el alt de la imagen
                const userImg = userName.querySelector("img");
                if (userImg) {
                    userImg.alt = data.fullname;
                }
            }
        })
        .catch(error => console.error("⚠️ Error al obtener el usuario:", error));
    } else {
        console.log("🔓 No hay usuario autenticado. Mostrando opción de iniciar sesión.");

        // CAMBIO 3: Usar classList consistentemente
        loginOption.classList.remove("hidden");
        userProfile.classList.add("hidden");
    }

    // Cerrar sesión (sin cambios)
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("🚪 Cierre de sesión activado.");
        localStorage.removeItem("token"); // Eliminar token
        window.location.reload(); // Recargar la página para reflejar cambios
    });
});

let nameSpan = userName.querySelector(".user-name");
if (!nameSpan) {
    nameSpan = document.createElement("span");
    nameSpan.className = "user-name";
    userName.appendChild(nameSpan);
}
nameSpan.textContent = data.fullname;
