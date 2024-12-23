document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.querySelector('#cart-container .carrito__productos');
    const totalPriceElement = document.querySelector('#total-price');
    
    // Obtener el carrito desde localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Si el carrito está vacío, mostrar mensaje
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        let totalPrice = 0;

        // Mostrar productos en el carrito
        cart.forEach(item => {
            const productElement = document.createElement('div');
            productElement.classList.add('carrito__producto');
            productElement.dataset.id = item.id;  // Guardar el id del producto para referencia
            productElement.innerHTML = `
                <img class="carrito__producto__imagen" src="${item.image}" alt="${item.title}">
                
                <div class="carrito__producto__detalles">
                    <p class="carrito__producto__nombre">${item.title}</p>
                    <p class="carrito__producto__precio">$${item.price}</p>
                </div>

                <div class="carrito__producto__cantidad">
                    <button class="carrito__producto__btn-restar">-</button>
                    <input class="carrito__producto__cantidad-input" type="number" value="${item.quantity}" min="1">
                    <button class="carrito__producto__btn-sumar">+</button>
                </div>

                <button class="carrito__producto__eliminar">Eliminar</button>
            `;
            
            cartContainer.appendChild(productElement);

            // Calcular el precio total
            totalPrice += item.price * item.quantity;

            // Añadir eventos a los botones de restar y sumar
            const btnRestar = productElement.querySelector('.carrito__producto__btn-restar');
            const btnSumar = productElement.querySelector('.carrito__producto__btn-sumar');
            const quantityInput = productElement.querySelector('.carrito__producto__cantidad-input');

            btnRestar.addEventListener('click', function() {
                updateQuantity(item.id, item.quantity - 1);
            });

            btnSumar.addEventListener('click', function() {
                updateQuantity(item.id, item.quantity + 1);
            });

            // Evento para eliminar producto
            productElement.querySelector('.carrito__producto__eliminar').addEventListener('click', function() {
                removeItemFromCart(item.id);
            });
        });

        // Mostrar el total
        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }
});

// Función para eliminar un item del carrito
function removeItemFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload(); // Recargar para reflejar los cambios
}

// Función para actualizar la cantidad de un producto
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) return; // Evitar que la cantidad sea menor a 1
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Buscar el producto en el carrito
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex !== -1) {
        cart[productIndex].quantity = newQuantity; // Actualizar la cantidad
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload(); // Recargar para reflejar los cambios
}

document.addEventListener('DOMContentLoaded', function() {
    const compraButton = document.querySelector('.carrito__boton__comprar'); // Seleccionamos el botón por la clase

    compraButton.addEventListener('click', function() {
        // Mostrar mensaje de compra realizada con éxito
        alert('¡Compra realizada con éxito!');

        // Borrar el carrito de localStorage
        localStorage.removeItem('cart');

        // Opcional: Recargar la página para reflejar que el carrito está vacío
        location.reload();
    });
});