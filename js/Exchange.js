document.querySelectorAll('input[type="submit"]').forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('formContainer').style.display = 'block';
    });
});

//Request form overlay functions

document.getElementById('requestForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let form = this;
    if(form.checkValidity() === false) {
        event.stopPropagation();
        form.classList.add('was-validated');
    } else {
        document.getElementById('formContainer').style.display = 'none';
        alert('Form submitted successfully!');
    }
});

//Request form overlay functions

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.getElementById('formContainer').style.display = 'none';
    }
});

document.querySelectorAll('.clickable-image').forEach(function(image) {
    image.addEventListener('click', function() {
        let infoId = this.getAttribute('data-info');
        let info = document.getElementById(infoId);
        info.style.display = 'block';
    });
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.overlay').forEach(function(overlay) {
            overlay.style.display = 'none';
        });
    }
});

