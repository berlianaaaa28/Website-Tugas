// Mendapatkan elemen keranjang
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Mendeklarasikan cart global
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fungsi untuk menambahkan item ke keranjang
function addToCart(productName, productPrice) {
    const product = { name: productName, price: productPrice };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));  // Menyimpan ke localStorage
    updateCartDisplay();  // Update tampilan keranjang
}

// Fungsi untuk mengupdate tampilan keranjang
function updateCartDisplay() {
    const cartDetails = document.getElementById('cart-details');
    const totalPriceElement = document.getElementById('total-price');
    
    // Clear keranjang sebelum update
    cartDetails.innerHTML = '';
    let totalPrice = 0;

    // Menampilkan produk di keranjang
    cart.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-item');
        productDiv.innerHTML = `
            <p>${item.name} - Rp.${item.price}</p>
            <button class="remove-item" data-product="${item.name}">Remove</button>
        `;
        cartDetails.appendChild(productDiv);
        totalPrice += item.price;
    });

    // Menampilkan total harga
    totalPriceElement.textContent = `Rp.${totalPrice.toLocaleString()}`;
}

// Fungsi untuk menghapus produk dari keranjang
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));  // Update localStorage
    updateCartDisplay();  // Update tampilan keranjang
}

// Menambahkan event listener ke semua tombol "Add to Cart"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product');
        const productPrice = parseInt(button.getAttribute('data-price'), 10);
        addToCart(productName, productPrice);
    });
});

// Menangani klik tombol "Remove" pada produk di keranjang
document.getElementById('cart-details')?.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item')) {
        const productName = event.target.getAttribute('data-product');
        removeFromCart(productName);
    }
});

// Tombol Checkout via WhatsApp
document.getElementById('checkout-btn').addEventListener('click', () => {
    const name = document.getElementById('order-name').value.trim();
    const address = document.getElementById('order-address').value.trim();
    const phone = document.getElementById('order-phone').value.trim();
    const cartItems = cart.map(item => `${item.product} (Rp.${item.price})`).join(', ');
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    if (!name || !address || !phone) {
        alert("Please fill in all the fields before checking out.");
        return;
    }

    const message = `Hello, I would like to order:\n\nItems: ${cartItems}\nTotal: Rp.${totalPrice}\n\nName: ${name}\nAddress: ${address}\nPhone: ${phone}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send/?phone=628813558093&text=${encodedMessage}&type=phone_number&app_absent=0`;

    alert("Order success, thank you for waiting!");
    window.location.href = whatsappURL;
});

// Menangani pengiriman form order
document.getElementById('order-form')?.addEventListener('submit', (event) => {
    event.preventDefault();  // Mencegah form dari submit default

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    // Menampilkan pesan konfirmasi
    alert(`Terima kasih, ${name}! Pesanan Anda akan dikirim ke ${address}. Kami akan menghubungi Anda di ${phone}.`);

    // Kosongkan keranjang setelah pemesanan
    localStorage.removeItem('cart');
    cart = [];
    updateCartDisplay();
});

// Inisialisasi tampilan keranjang saat halaman dimuat
updateCartDisplay();

// JavaScript untuk smooth scroll jika ingin efek scroll halus saat klik tombol "Explore Our Menu"
document.querySelector('.btn').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
});
