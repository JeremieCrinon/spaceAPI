const Website_header_menu_hamburger = document.querySelector('.Website--header--menu--hamburger');
const Website_header_menu = document.querySelector('.Website--header--menu');

Website_header_menu_hamburger.addEventListener('click', function() {
    Website_header_menu.classList.toggle('Website--header--menu--active');
    Website_header_menu_hamburger.classList.toggle('Website--header--menu--hamburger--active');
});