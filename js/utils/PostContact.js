
const form = document.getElementById('form-contact');

form.addEventListener('submit', function(e) {
    e.preventDefault();

let firstName = document.getElementById('nombre');
let email = document.getElementById('email');
let subject = document.getElementById('asunto');
let phone = document.getElementById('phone');
let message = document.getElementById('mensaje');



let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
 
let raw = JSON.stringify({
  "name": firstName.value,
  "lastName":"",
  "email": email.value,
  "phone": phone.value,
  "subject": subject.value,
  "message": message.value,
  "termsAndConditions": true,
  "action": "vender",
  "meetingDate":""
});
 
let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
//   redirect: 'follow'
};
 
fetch("https://aulen.partnersadvisers.info/contact", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error))


})

