let navbar = document.getElementById('navbar');
let toggleButton = document.getElementById('toggleButton');
let dropdownMenu = document.getElementById('dropdownMenu');

function checkScreenSize() {
    if (window.innerWidth <= 768) {
        navbar.style.display = "none";
        toggleButton.style.display = "block";
        dropdownMenu.style.display = "none";
    } else {
        navbar.style.display = "block";
        toggleButton.style.display = "none";
        dropdownMenu.style.display = "none";
    }
}

toggleButton.addEventListener('click', function() {
    if (dropdownMenu.style.display === 'none') {
        dropdownMenu.style.display = 'block';
    } else {
        dropdownMenu.style.display = 'none';
    }
});

window.addEventListener('resize', checkScreenSize);
checkScreenSize();