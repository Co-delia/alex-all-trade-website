// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const menuOverlay = document.getElementById('menuOverlay');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    // Change hamburger icon to X when menu is open
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking overlay
menuOverlay.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuOverlay.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
});

// Close mobile menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Gallery Navigation
const gallery = document.getElementById('scrollableGallery');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (prevBtn && nextBtn && gallery) {
    prevBtn.addEventListener('click', () => {
        gallery.scrollBy({ left: -320, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        gallery.scrollBy({ left: 320, behavior: 'smooth' });
    });
}

// Form Handling
const enquiryForm = document.getElementById('enquiryForm');

if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link
        const subject = `Transportation Inquiry for ${service} - Alex All Trade`;
        const body = `Name: ${name}%0D%0APhone: ${phone}%0D%0AEmail: ${email}%0D%0AService: ${service}%0D%0AMessage: ${message}`;
        
        window.location.href = `mailto:mckelsydevelops@gmail.com?subject=${subject}&body=${body}`;
        
        // Show success message
        alert('Thank you for your inquiry! Your email client will open to send the message.');
        
        // Reset form
        enquiryForm.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if(this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize Map
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('operationsMap')) {
        // Create map centered on South Africa
        const map = L.map('operationsMap').setView([-28.4793, 24.6727], 5);
        
        // Add OpenStreetMap tiles without attribution
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18
        }).addTo(map);
        
        // Define custom icons
        const pretoriaIcon = L.divIcon({
            html: '<div style="background-color: #F9A826; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;"><i class="fas fa-map-pin"></i></div>',
            className: 'custom-div-icon',
            iconSize: [40, 40],
            iconAnchor: [20, 40]
        });
        
        const capetownIcon = L.divIcon({
            html: '<div style="background-color: #2E7D32; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;"><i class="fas fa-map-pin"></i></div>',
            className: 'custom-div-icon',
            iconSize: [40, 40],
            iconAnchor: [20, 40]
        });
        
        // Pretoria coordinates
        const pretoria = L.marker([-25.7479, 28.2293], {icon: pretoriaIcon})
            .addTo(map)
            .bindPopup(`
                <div style="padding: 15px; min-width: 200px;">
                    <h3 style="margin: 0 0 8px 0; color: #1A3A5F; font-size: 1.2rem;">Pretoria Headquarters</h3>
                    <p style="margin: 0 0 10px 0; color: #666; font-size: 0.95rem;">Main Operations Center</p>
                    <p style="margin: 0; font-size: 0.9em; color: #1A3A5F;"><i class="fas fa-phone"></i> +27 73 669 7307</p>
                </div>
            `);
        
        // Cape Town coordinates
        const capetown = L.marker([-33.9249, 18.4241], {icon: capetownIcon})
            .addTo(map)
            .bindPopup(`
                <div style="padding: 15px; min-width: 200px;">
                    <h3 style="margin: 0 0 8px 0; color: #1A3A5F; font-size: 1.2rem;">Cape Town Branch</h3>
                    <p style="margin: 0 0 10px 0; color: #666; font-size: 0.95rem;">Coastal Operations Center</p>
                    <p style="margin: 0; font-size: 0.9em; color: #1A3A5F;"><i class="fas fa-phone"></i> +27 73 669 7307</p>
                </div>
            `);
        
        // Fit map to show both markers
        const bounds = L.latLngBounds([pretoria.getLatLng(), capetown.getLatLng()]);
        map.fitBounds(bounds, {padding: [80, 80]});
        
        // Add click events to markers
        pretoria.on('click', function() {
            this.openPopup();
        });
        
        capetown.on('click', function() {
            this.openPopup();
        });
        
        // Automatically open both popups on load
        setTimeout(() => {
            pretoria.openPopup();
            setTimeout(() => {
                capetown.openPopup();
            }, 500);
        }, 1000);
    }
});