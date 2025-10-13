document.addEventListener('DOMContentLoaded', () => {


    const menuItems = [
        { id: 1, name: "Espresso", price: "₹180", description: "Rich and aromatic single shot of pure coffee.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrjyHlkViXf1t9FlpAnmlozT9DZSvPbFi-Lg&s", category: "coffee" },
        { id: 2, name: "Cappuccino", price: "₹220", description: "Espresso with steamed milk foam, a classic favorite.", image: "https://guentercoffee.com/cdn/shop/articles/anleitung-cappuccino-blogheader.jpg?v=1758119315&width=1200", category: "coffee" },
        { id: 3, name: "Iced Latte", price: "₹250", description: "Chilled espresso with milk over ice.", image: "https://usercontent.one/wp/www.cafeafricanorestaurant.com/wp-content/uploads/2024/09/Iced-Latte.webp?media=1752496386", category: "coffee" },
        { id: 4, name: "Croissant", price: "₹150", description: "Buttery, flaky, and freshly baked pastry.", image: "https://delishglobe.com/wp-content/uploads/2024/11/Croissants-article.png", category: "snacks" },
        { id: 5, name: "Avocado Toast", price: "₹280", description: "Sourdough toast with fresh avocado and seasonings.", image: "https://feelgoodfoodie.net/wp-content/uploads/2025/05/Avocado-Toast-10.jpg", category: "snacks" },
        { id: 6, name: "Chocolate Cake", price: "₹300", description: "Decadent and moist chocolate layer cake.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1987&auto=format&fit=crop", category: "desserts" },
        { id: 7, name: "Red Velvet Muffin", price: "₹180", description: "A delightful red velvet muffin with cream cheese frosting.", image: "https://i.ytimg.com/vi/1mqXXgYDY8U/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAgKvpla1wkSzua-ckytt2_omCgUg", category: "desserts" },
        { id: 8, name: "Paneer Tikka Sandwich", price: "₹260", description: "Grilled sandwich with spicy paneer tikka filling.", image: "https://www.maggi.in/sites/default/files/srh_recipes/094e741f748730fae8c3742217c5fd58.jpg", category: "snacks" },
    ];

    const menuGrid = document.getElementById('menu-grid');
    const filterButtons = document.querySelectorAll('.btn-filter');
    const specialsContainer = document.getElementById('specials-container');


    function displayMenuItems(items) {
        menuGrid.innerHTML = items.map(item => `
            <div class="menu-card">
                <img src="${item.image}" alt="${item.name}">
                <div class="card-content">
                    <h3>${item.name} <span>${item.price}</span></h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');
    }


    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.btn-filter.active').classList.remove('active');
            button.classList.add('active');

            const category = button.dataset.category;
            const filteredItems = category === 'all' 
                ? menuItems 
                : menuItems.filter(item => item.category === category);
            displayMenuItems(filteredItems);
        });
    });


    function displaySpecials() {
        const shuffled = [...menuItems].sort(() => 0.5 - Math.random());
        const specials = shuffled.slice(0, 3); // Get 3 random items

        specialsContainer.innerHTML = specials.map(item => `
            <div class="special-card">
                <img src="${item.image}" alt="${item.name}">
                <div class="card-content">
                    <h3>${item.name} <span>${item.price}</span></h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');
    }


    const bookingForm = document.getElementById('booking-form');
    const formMessage = document.getElementById('form-message');

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        if (name.trim() === '') {
            formMessage.textContent = 'Please fill out all fields.';
            formMessage.style.color = 'red';
            return;
        }

        formMessage.textContent = `Thank you, ${name}! Your table is booked. We'll send a confirmation email.`;
        formMessage.style.color = 'green';
        bookingForm.reset();
        setTimeout(() => formMessage.textContent = '', 5000);
    });
    

    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });


    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });


    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
    

    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));


    // --- Initial Page Load Calls ---
    displayMenuItems(menuItems);
    displaySpecials();
});
