document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.dataset.product;
        const price = parseInt(button.dataset.price);
        cart.push({ product, price });

        const orderItems = document.getElementById('order-items');
        const orderTotalPrice = document.getElementById('order-total-price');
        const total = cart.reduce((acc, item) => acc + item.price, 0);

        orderItems.innerHTML = cart.map(item => `<p>${item.product} - Rp.${item.price}</p>`).join('');
        orderTotalPrice.textContent = `Rp.${total}`;
    });
});

document.getElementById('order-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your order! We will contact you soon.');
    cart.length = 0; // Clear the cart after order
    document.getElementById('order-items').innerHTML = '';
    document.getElementById('order-total-price').textContent = 'Rp.0';
});
