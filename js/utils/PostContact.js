
// document.querySelector('form').addEventListener('submit', e => {
//     e.preventDefault()
//     const data = Object.fromEntries(
//         new FormData(e.target)
//     )
//     alert(JSON.stringify(data))
//     // console.log(JSON.stringify(data))
// })

// const form = document.getElementById('form-contact');

// form.addEventListener('submit', function(e) {
//     e.preventDefault();

// //RESPUESTA QUE SE LE DA LUEGO DEL SUBMIT
// let response = document.getElementById('respuesta');
// const formBody = new FormData(form);
// formBody.append("nombre", "robert");
// console.log(formBody);
// let request = new XMLHttpRequest();
// request.open('post', api, true );
// request.onload = function(oEvent){
//     if (request.status == 200){
//         response.innerHTML= "Enviado!";
//     }else {
//         response.innerHTML = "Error" + response.status + "al enviar el formulario.<br>";
//     }
// }
// response.send(formBody);
// }, false);


const form = document.getElementById('form-contact');


form.addEventListener('submit', function(e) {
    e.preventDefault();

let firstName = document.getElementById('nombre');
let email = document.getElementById('email');
// let subject = document.getElementById('asunto');
let phone = document.getElementById('phone');
// let message = document.getElementById('mensaje');



let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
 
let raw = JSON.stringify({
  "name": firstName.value,
  "email": email.value,
//   "subject": subject.value,
  "phone": phone.value,
//   "message": message.value,
  "termsAndConditions": true,
  "action": "vender"
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

