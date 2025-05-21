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

// Función para actualizar la visualización de estrellas
function updateStarsDisplay(rating) {
    const starsInner = document.querySelector('.stars-inner');
    const ratingNumber = document.querySelector('.rating-number');
    
    // Convertir la calificación a porcentaje
    const starPercentage = (rating / 5) * 100;
    
    // Actualizar el ancho de las estrellas llenas
    starsInner.style.width = `${starPercentage}%`;
    
    // Actualizar el número de calificación
    ratingNumber.textContent = rating.toFixed(1);
}

// Inicializar con 0 estrellas
updateStarsDisplay(0);

// Agregar event listeners a las etiquetas de estrellas
document.querySelectorAll('.stars-input label').forEach(label => {
    label.addEventListener('click', (e) => {
        const input = document.getElementById(e.target.getAttribute('for'));
        const rating = parseInt(input.value);
        updateStarsDisplay(rating);
    });
});