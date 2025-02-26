let indiceActual = 0;
const imagenes = document.querySelectorAll('.imagen');

function cambiarImagen(direccion) {
    
    imagenes[indiceActual].classList.remove('activa');
    

    indiceActual = (indiceActual + direccion + imagenes.length) % imagenes.length;
    

    imagenes[indiceActual].classList.add('activa');
}

