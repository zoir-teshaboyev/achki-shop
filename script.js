function changeMainImage(src) {
    document.getElementById('mainImage').src = src;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.src === src) {
            thumb.classList.add('active');
        }
    });
}

function selectColor(button) {
    // Remove selected class from all color buttons
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selected class to clicked button
    button.classList.add('selected');
}

// Add to basket functionality
document.querySelector('.add-to-basket').addEventListener('click', function() {
    // Check if user is authenticated
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Please sign in to add items to cart');
        window.location.href = 'signin.html';
        return;
    }

    const selectedSize = document.getElementById('size').value;
    const selectedColor = document.querySelector('.color-btn.selected');
    
    if (!selectedSize) {
        alert('Please select a size');
        return;
    }
    
    if (!selectedColor) {
        alert('Please select a color');
        return;
    }

    // Get product details
    const productName = document.querySelector('h1').textContent;
    const category = document.querySelector('.category').textContent;
    const price = parseFloat(document.querySelector('.price span').textContent.replace('$', ''));
    const image = document.getElementById('mainImage').src;
    const color = selectedColor.style.backgroundColor;

    // Create product object
    const product = {
        name: productName,
        category: category,
        price: price,
        image: image,
        size: selectedSize,
        color: color,
        quantity: 1
    };

    // Get existing cart or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add product to cart
    cart.push(product);
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }

    alert('Product added to cart!');
});