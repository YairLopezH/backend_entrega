export function addToCart(productId, cartId) {
  fetch(`/api/carts/${cartId}/products/${productId}`, {
    method: 'POST'
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      alert('Producto agregado al carrito');
    } else {
      alert('Error al agregar el producto al carrito');
    }
  })
  .catch(error => console.error('Error:', error));
}