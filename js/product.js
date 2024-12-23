document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los botones de "Agregar al carrito"
    const addToCartButtons = document.querySelectorAll('.formulario__submit');

    // Comprobar que se encontraron los botones
    console.log('Botones encontrados:', addToCartButtons);

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Obtener los datos del producto
            const productElement = button.closest('.productos'); // El contenedor del producto
            const title = productElement.querySelector('#product-title').textContent; // Título del producto
            const price = parseFloat(productElement.querySelector('#product-price').textContent.replace('$', '')); // Precio
            const image = productElement.querySelector('#product-image').src; // Imagen del producto
            const quantity = parseInt(productElement.querySelector('#cantidad').value, 10) || 1; // Cantidad (1 por defecto)

            // Agregar el producto al carrito
            addProductToCart(title, price, image, quantity);
        });
    });

    // Función para agregar el producto al carrito
    function addProductToCart(title, price, image, quantity) {
        // Obtener el carrito desde localStorage (si existe) o inicializar uno vacío
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Comprobar si el producto ya está en el carrito
        const existingProductIndex = cart.findIndex(item => item.title === title);
        console.log('Índice del producto en el carrito:', existingProductIndex);

        if (existingProductIndex !== -1) {
            // Si el producto ya está, incrementar la cantidad
            cart[existingProductIndex].quantity += quantity;
            console.log('Producto actualizado en el carrito:', cart[existingProductIndex]);
        } else {
            // Si el producto no está en el carrito, agregarlo
            cart.push({
                title,
                price,
                image,
                quantity
            });
            console.log('Producto agregado al carrito:', {
                title,
                price,
                image,
                quantity
            });
        }

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Confirmación
        alert('Producto agregado al carrito');
        console.log('Carrito actualizado:', cart);
    }
});
