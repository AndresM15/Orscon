// Selecciona la imagen principal y las miniaturas
const mainImage = document.querySelector('.producto-img');
const thumbnails = document.querySelectorAll('.thumbnail');

// Agrega un evento de clic a cada miniatura
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        // Cambia la fuente de la imagen principal por la de la miniatura seleccionada
        mainImage.src = thumbnail.src;
    });
});