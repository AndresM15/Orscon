const url = 'http://localhost:3000/api/v1';

//Ejecutando funciones
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);

//Declarando variables
const formulario_login = document.querySelector(".formulario__login");
const formulario_register = document.querySelector(".formulario__register");
const contenedor_login_register = document.querySelector(".contenedor__login-register");
const caja_trasera_login = document.querySelector(".caja__trasera-login");
const caja_trasera_register = document.querySelector(".caja__trasera-register");

    //FUNCIONES

function anchoPage(){

    if (window.innerWidth > 850){
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "block";
    }else{
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";   
    }
}

anchoPage();


    function iniciarSesion(){
        if (window.innerWidth > 850){
            formulario_login.style.display = "block";
            contenedor_login_register.style.left = "10px";
            formulario_register.style.display = "none";
            caja_trasera_register.style.opacity = "1";
            caja_trasera_login.style.opacity = "0";
        }else{
            formulario_login.style.display = "block";
            contenedor_login_register.style.left = "0px";
            formulario_register.style.display = "none";
            caja_trasera_register.style.display = "block";
            caja_trasera_login.style.display = "none";
        }
    }

    function register(){
        if (window.innerWidth > 850){
            formulario_register.style.display = "block";
            contenedor_login_register.style.left = "410px";
            formulario_login.style.display = "none";
            caja_trasera_register.style.opacity = "0";
            caja_trasera_login.style.opacity = "1";
        }else{
            formulario_register.style.display = "block";
            contenedor_login_register.style.left = "0px";
            formulario_login.style.display = "none";
            caja_trasera_register.style.display = "none";
            caja_trasera_login.style.display = "block";
            caja_trasera_login.style.opacity = "1";
        }
}

const onSaveInfo = async (e) => {
    e.preventDefault()
    const fullname = document.getElementById("nombreR").value.trim();
    const user = document.getElementById("usuarioR").value.trim();
    const email = document.getElementById("correoR").value.trim();
    const password = document.getElementById("contraseñaR").value.trim();

    if (!fullname || !email || !user  || !password) {
        alert("Todos los campos son obligatorios"); 
        return;
    }

    const body = {
        fullname,
        user,
        email,
        password
    };
    try {
        const response = await fetch(`${url}/user/create`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        console.log("Respuesta de la API:", data);

        if (response.ok) {
            alert("¡Registro exitoso!");
        } else {
            alert("Error en el registro: " + (data.message || "Respuesta inesperada"));
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Hubo un problema al registrar el usuario.");
    }
};


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('loginForm').addEventListener('submit', onlogin);
    document.getElementById('registerForm').addEventListener('submit', onSaveInfo);
});

const onlogin = async (e) => {
    e.preventDefault();

    const email = document.getElementById('correo').value.trim();
    const password = document.getElementById('contraseña').value.trim();

    if (!email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const body = { email, password };

    try {
        const response = await fetch(`${url}/user/`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Inicio de sesión exitoso");
            localStorage.setItem("token", data.token); // Guardamos el token de sesión
            // Redirigir al dashboard o página principal
            window.location.href = "../index/index.html"; 
        } else {
            alert(data.message || "Error al iniciar sesión");
        }

    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Hubo un problema al iniciar sesión.");
    }
};

document.getElementById('recuperarContrasenaLink').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('modalRecuperar').style.display = 'block';
});

document.getElementById('enviarRecuperacion').addEventListener('click', async function() {
    const email = document.getElementById('emailRecuperar').value.trim();

    if (!email) {
        alert("Por favor ingresa tu correo electrónico.");
        return;
    }

    try {
        const response = await fetch(`${url}/user/recover`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Se ha enviado un correo para recuperar tu contraseña.");
            document.getElementById('modalRecuperar').style.display = 'none';
        } else {
            alert(data.message || "No se pudo enviar el correo.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un error al intentar recuperar la contraseña.");
    }
});
