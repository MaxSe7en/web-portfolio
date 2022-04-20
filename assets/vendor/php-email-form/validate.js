/**
* PHP Email Form Validation - v3.2
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (e) {
    e.addEventListener('submit', sendContact);
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
      .then(response => {
        if (response.ok) {
          return response.text()
        } else {
          throw new Error(`${response.status} ${response.statusText} ${response.url}`);
        }
      })
      .then(data => {
        thisForm.querySelector('.loading').classList.remove('d-block');
        if (data.trim() == 'OK') {
          thisForm.querySelector('.sent-message').classList.add('d-block');
          thisForm.reset();
        } else {
          throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action);
        }
      })
      .catch((error) => {
        displayError(thisForm, error);
      });
  }

  // const contact = document.getElementById("submit");


  function resetInputs() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";
  }

  function sendContact(evt) {
    evt.preventDefault();

    let thisForm = this;



    thisForm.querySelector('.loading').classList.add('d-block');
    thisForm.querySelector('.error-message').classList.remove('d-block');
    thisForm.querySelector('.sent-message').classList.remove('d-block');

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const _message = document.getElementById("message").value;
    console.log(`this is contact`)
    const body = `${_message}
    **sent by**: ${name}
    `
    Email.send({
      SecureToken: "edc7ed75-0ad6-4caf-8e1f-244dba901168",
      Host: "smtp.gmail.com",
      Username: "nanayawfixing@gmail.com",
      Password: "*******",
      To: 'nanayawfixing@gmail.com',
      From: email,
      Subject: subject,
      Body: body
    }).then(
      (message) => {
        if (message === "OK") {
          thisForm.querySelector('.loading').classList.remove('d-block');
          resetInputs();
          thisForm.querySelector('.sent-message').classList.add('d-block');
          // alert("We have received your message, Thank you!");
        } else {
          // alert("Your message was not sent, check your internet connection");
          console.log(`this is the message ${message}`)
          displayError(thisForm)
        }
      }
    );
  }

  // contact.addEventListener("submit", sendContact);

  function displayError(thisForm) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerText = 'Your message was not sent, check your internet connection';
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
