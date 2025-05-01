// Product Data
const products = [
    {
        id: 1,
        name: "Organic Apples",
        price: 2.99,
        description: "Fresh, crisp organic apples from local farms.",
        image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        category: "fruits"
    },
    {
        id: 2,
        name: "Whole Grain Bread",
        price: 3.49,
        description: "Freshly baked whole grain bread with no preservatives.",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
        category: "bakery"
    },
    {
        id: 3,
        name: "Free Range Eggs",
        price: 4.99,
        description: "Dozen free range eggs from happy chickens.",
        image: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        category: "dairy"
    },
    {
        id: 4,
        name: "Organic Spinach",
        price: 2.49,
        description: "Fresh organic spinach packed with nutrients.",
        image: "https://media.istockphoto.com/id/1211556813/photo/pile-of-fresh-green-baby-spinach-leaves-isolated-on-white-background-close-up.webp?a=1&b=1&s=612x612&w=0&k=20&c=NUuPnMoodCn8aHop0uLIRs3ICv18U9O6glVjQalFWn0=",
        category: "vegetables"
    },
    {
        id: 5,
        name: "Grass-Fed Beef",
        price: 8.99,
        description: "Premium grass-fed beef, 1lb package.",
        image: "https://media.istockphoto.com/id/532258344/photo/new-york-steak-beef-meat-cut-on-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=eAL6xR9H3IGJ3-8agwarkH52Q7jxj42VRxxsEEc65qU=",
        category: "meat"
    },
    {
        id: 6,
        name: "Almond Milk",
        price: 3.29,
        description: "Unsweetened almond milk, dairy-free alternative.",
        image: "https://media.istockphoto.com/id/1460576780/photo/almond-milk.webp?a=1&b=1&s=612x612&w=0&k=20&c=CXHVXPFrxuCmjYgyT7L014MSUNneRxJrtsP9Tuv7Aqs=",
        category: "dairy"
    },
    {
        id: 7,
        name: "Organic Bananas",
        price: 0.69,
        description: "Perfectly ripe organic bananas, per lb.",
        image: "https://media.istockphoto.com/id/173242750/photo/banana-bunch.webp?a=1&b=1&s=612x612&w=0&k=20&c=AivNP9JOaer6_PZCwpDgHszfa8xIgjN4P-4Lc8M3VpQ=",
        category: "fruits"
    },
    {
        id: 8,
        name: "Whole Chicken",
        price: 5.99,
        description: "Fresh whole chicken, antibiotic-free.",
        image: "https://media.istockphoto.com/id/1282866808/photo/fresh-raw-chicken.webp?a=1&b=1&s=612x612&w=0&k=20&c=dlWfex2BTx7vmQtz3DIp3lGH-M9ql8Gl4wuHVglhxrs=",
        category: "meat"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartButton = document.getElementById('cartButton');
const cartCount = document.getElementById('cartCount');
const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Display products
function displayProducts() {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-6 col-lg-4 col-xl-3 mb-4';
        productCard.innerHTML = `
            <div class="card product-card h-100">
                <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title product-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        <button class="btn btn-success add-to-cart" data-id="${product.id}">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to cart function
function addToCart(e) {
    const productId = parseInt(e.target.closest('.add-to-cart').getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        });
    }
    
    // Update cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Add bounce animation to cart button
    cartButton.classList.add('bounce');
    setTimeout(() => {
        cartButton.classList.remove('bounce');
    }, 1000);
    
    // Show success message
    const toast = document.createElement('div');
    toast.className = 'position-fixed bottom-0 end-0 p-3';
    toast.style.zIndex = '11';
    toast.innerHTML = `
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header bg-success text-white">
                <strong class="me-auto">Success</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${product.name} added to cart!
            </div>
        </div>
    `;
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Display cart items
function displayCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<tr><td colspan="5" class="text-center">Your cart is empty</td></tr>';
        cartTotal.textContent = '0.00';
        checkoutBtn.disabled = true;
        return;
    }
    
    checkoutBtn.disabled = false;
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;" class="me-3">
                    <span>${item.name}</span>
                </div>
            </td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm quantity-btn minus" data-id="${item.id}">-</button>
                    <input type="text" class="form-control quantity-input mx-2" value="${item.quantity}" data-id="${item.id}">
                    <button class="btn btn-sm quantity-btn plus" data-id="${item.id}">+</button>
                </div>
            </td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-danger remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        cartItems.appendChild(row);
    });
    
    cartTotal.textContent = total.toFixed(2);
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.minus').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.plus').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', updateQuantity);
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

// Decrease quantity
function decreaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }
    
    updateCart();
}

// Increase quantity
function increaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    item.quantity += 1;
    updateCart();
}

// Update quantity from input
function updateQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    const newQuantity = parseInt(e.target.value);
    
    if (newQuantity > 0) {
        item.quantity = newQuantity;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }
    
    updateCart();
}

// Remove item from cart
function removeItem(e) {
    const productId = parseInt(e.target.closest('.remove-item').getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update cart in storage and UI
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}

// Checkout function
function checkout() {
    alert('Thank you for your purchase! Your order has been placed.');
    cart = [];
    updateCart();
    cartModal.hide();
}

// Initialize the page
function init() {
    displayProducts();
    updateCartCount();
    
    // Event listeners
    cartButton.addEventListener('click', () => {
        displayCartItems();
        cartModal.show();
    });
    
    checkoutBtn.addEventListener('click', checkout);
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', init);