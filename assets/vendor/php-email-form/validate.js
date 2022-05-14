(function () {
  "use strict";

  let forms = document.querySelectorAll('#contact-form-unique');

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
    document.getElementById('name-unique').value = "";
    document.getElementById('email-unique').value = "";
    document.getElementById('subject-unique').value = "";
    document.getElementById('message-unique').value = "";
  }

  function sendContact(evt) {
    evt.preventDefault();

    let thisForm = this;



    thisForm.querySelector('.loading').classList.add('d-block');
    thisForm.querySelector('.error-message').classList.remove('d-block');
    thisForm.querySelector('.sent-message').classList.remove('d-block');

    const name = document.getElementById('name-unique').value
    const email = document.getElementById('email-unique').value
    const subject = document.getElementById('subject-unique').value
    const _message = document.getElementById('message-unique').value
    console.log(`this is contact`)
    const body = `${_message}
    **sent by**: ${name}
    **email**: ${email}
    `
    Email.send({
      SecureToken: "de0e590b-cf3d-46da-bbab-484b58266047",
      To: 'mjadarko@gmail.com,iferch.techlead@gmail.com, info@softscraft.com, nanayawfixing@gmail.com, arc.solutions.gh@gmail.com, ic1914yy@gmail.com',
      From: 'arc.solutions.gh@gmail.com',
      Subject: subject,
      Body: _message
    }).then(
      (message) => {
        if (message === "OK") {
          thisForm.querySelector('.loading').classList.remove('d-block');
          resetInputs();
          thisForm.querySelector('.sent-message').classList.add('d-block');
          thisForm.querySelector('.error-message').classList.remove('d-block');
          console.log(`this is the message ${message}`)
          // alert("We have received your message, Thank you!");
        } else {
          // alert("Your message was not sent, check your internet connection");
          console.log(`this is the message ${message}`)
          displayError(thisForm)
        }
      }
    );
  }

  contact.addEventListener("submit", sendContact);


  function displayError(thisForm) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerText = 'Your message was not sent, check your internet connection';
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
