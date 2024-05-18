document.getElementById('registrationBtn').addEventListener('click', function() {
    let email = document.getElementById('inputEmail').value;
    let password = document.getElementById('inputPassword').value;

    if (email === "" || password === "") {
        alert("Please fill out all fields.");
    } else {
        // placeholder for authentication logick
    }
});
