(function() {
  'use strict';
  window.addEventListener('load', function() {
    let forms = document.getElementsByClassName('needs-validation');
    let validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        let password = document.getElementById('pwd').value;
        let confirmPassword = document.getElementById('confirm_pwd').value;

        if (form.checkValidity() === false || password !== confirmPassword) {
          event.preventDefault();
          event.stopPropagation();

          if (password !== confirmPassword) {
            alert('Password and Confirm Password do not match.');
          }
        } else {
          alert('Registration successful!');
          sendEmail();
          
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

// Use EmailJS to send the email
function sendEmail() {
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
      to_name: "Recipient Name",
      from_name: "Sender Name",
      message: "This is a confirmation email for your registration."
  })
  .then(function(response) {
      console.log("Email successfully sent!");
  })
  .catch(function(error) {
      console.log("Failed to send email: " + error);
  });
}
