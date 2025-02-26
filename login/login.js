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



document.addEventListener("DOMContentLoaded", function () { 
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío del formulario

        let username = document.getElementById("correo").value;
        let password = document.getElementById("contraseña").value;

        if (username.trim() !== "" && password.trim() !== "") {
            alert("¡Inicio de sesión exitoso!");

            // Redirigir después de que el usuario cierre la alerta
            setTimeout(function() {
                window.location.href = "../index/index.html"; // Cambia esto por la ruta correcta
            }, 1000);
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registerForm").addEventListener("submite", function(event) {
        event.preventDefault(); // Evita el envío predeterminado del formulario

        let nombre = document.getElementById("nombreR").value.trim();
        let correo = document.getElementById("correoR").value.trim();
        let usuario = document.getElementById("usuarioR").value.trim();
        let contraseña = document.getElementById("contraseñaR").value.trim();

        // Verificar que todos los campos estén llenos
        if (!nombre || !correo || !usuario || !contraseña) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Validar que el correo tenga un formato correcto
        let correoValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!correoValido.test(correo)) {
            alert("Por favor, ingresa un correo válido.");
            return;
        }

        alert("¡Registro exitoso!");

        // Redirigir después de la alerta
        setTimeout(function() {
            window.location.href = "../index/index.html"; // Cambia esto por la página a la que quieres redirigir
        }, 1000);
    });
});

