
// Variables globales
const apiUrl = 'https://fakestoreapi.com/products';

// ✅ Función para obtener y mostrar la lista de productos
async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    const products = await response.json();
    displayProducts(products); // Mostrar productos
  } catch (error) {
    console.error('Error al obtener los productos:', error);
  }
}

// ✅ Función para mostrar los productos en el HTML
function displayProducts(products) {
  const productsContainer = document.getElementById('products-container');
  if (!productsContainer) return; // Evitar error si no existe el contenedor

  productsContainer.innerHTML = ''; // Limpiar el contenedor

  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'producto';
    productElement.innerHTML = `
      <a href="producto.html?id=${product.id}">
        <img class="producto__imagen" src="${product.image}" alt="${product.title}">
        <div class="producto__informacion">
          <p class="producto__nombre">${product.title}</p>
          <p class="producto__precio">$${product.price}</p>
        </div>
      </a>
    `;
    productsContainer.appendChild(productElement);
  });
}

// ✅ Función para obtener y mostrar los detalles de un producto
async function fetchProductDetails(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener los detalles del producto');
    }

    const product = await response.json();
    displayProductDetails(product);
  } catch (error) {
    console.error('Error al obtener los detalles del producto:', error);
  }
}

// ✅ Función para mostrar los detalles de un producto en el HTML
function displayProductDetails(product) {
  const titleElement = document.getElementById('product-title');
  const imageElement = document.getElementById('product-image');
  const descriptionElement = document.getElementById('product-description');
  const priceElement = document.getElementById('product-price');

  if (titleElement) titleElement.innerText = product.title;
  if (imageElement) {
    imageElement.src = product.image;
    imageElement.alt = product.title;
  }
  if (descriptionElement) descriptionElement.innerText = product.description;
  if (priceElement) priceElement.innerText = `$${product.price}`;
}

// ✅ Detectar si estamos en la página de detalles de producto o lista de productos
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (productId) {
    // Si hay un ID en la URL, cargar detalles del producto
    fetchProductDetails(productId);
  } else {
    // Si no hay un ID, cargar lista de productos
    fetchProducts();
  }
});

// Espera a que el DOM cargue completamente
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.classList.contains('pagina-productos')) {
      inicializarPaginaProductos();
  }

  if (document.body.classList.contains('pagina-carrito')) {
      inicializarPaginaCarrito();
  }
});


//Lógica Productos

function inicializarPaginaProductos() {
  const btnAgregar = document.getElementById('agregar-carrito');

  btnAgregar.addEventListener('click', () => {
      const titulo = document.getElementById('product-title').innerText;
      const precio = parseFloat(document.getElementById('product-price').innerText.replace('$', ''));
      const cantidad = parseInt(document.getElementById('cantidad').value);

      if (cantidad > 0) {
          const producto = { titulo, precio, cantidad };

          // Guardar en localStorage
          let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
          carrito.push(producto);
          localStorage.setItem('carrito', JSON.stringify(carrito));

          alert('Producto agregado al carrito');
      } else {
          alert('Por favor, selecciona una cantidad válida.');
      }
  });
}