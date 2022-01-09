

var myInput = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
const username=document.getElementById("username");
const email=document.getElementById("email");
const submit=document.getElementById("form")
  

const password2=document.getElementById("password2");
const phone=document.getElementById("phone");


// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }
  
  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }
  
  // Validate length
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
 
}
// function match(username,phone,email,myInput,password2,userValidate,phoneValidate,validateEmail,validatePass,confirmPass)
// {   const uservalidate=userValidate(username);
//   const phonevalidate=phoneValidate(phone);    
//     const emailvalidate=validateEmail(email);   
//     const passvalidate=validatePass(myInput);   
//     const confirmvalidate=confirmPass(password2);   
  
//     if(uservalidate && phonevalidate && emailvalidate && passvalidate && confirmvalidate){
//       window.href="/login"
        

//           return false;
        
//     }
// }
function userValidate(){
 if(username.value.trim()==""){
  setErrorFor(username,'username cannot be empty');
}
else if(username.value.length<5)
{setErrorFor(username,'minimum 5 characters')}
else{ 
 setSuccessFor(username)

return true;

}}

function phoneValidate(){
  // const phoneValue= phone.value.trim();
  if(phone.value==""){
    setErrorFor(phone,"Phone number can't be empty"); 
    return false;
   
  }else if(! /^([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone.value.trim())){
    setErrorFor(phone,"Accepts only this format: xxxxxxxxxx,xxx-xxx-xxxx,xxx.xxx.xxxx");
    return false;
   
  }else{
    setSuccessFor(phone);
    return true;
    
  }
}
function validateEmail(){
  var reg =/^([A-Za-z0-9\.-]+)@([A-Za-z0-9\-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
  if(reg.test(email.value)){
    setSuccessFor(email)
      return true;
  }
  else{
    setErrorFor(email,'Please enter valid email.');
  return false;
  }
  
}
function validatePass(){
  var reg1 =/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9]{8,20}$/;
  if(reg1.test(myInput.value)){
    setSuccessFor(myInput)
      return true;
  }
  else{
    setErrorFor(myInput,'Password is invalid');
  return false;
  }
  
}
function confirmPass(){
  if(password2.value.trim()==""){
    setErrorFor(password2,'Please confirm'); 
    return false;
   
  }else if(myInput.value!== password2.value)
  {
    setErrorFor(password2,"Passwords doesn't match ");
    return false;
   
  }else{
    setSuccessFor(password2);
    return true;
  }  
}



function setErrorFor(input,message){
  const formGroup=input.parentElement;
  const small=formGroup.querySelector('small');
  small.innerText=message;
  formGroup.className='form-group error';
}
function setSuccessFor(input){
  const formGroup=input.parentElement;
  formGroup.className='form-group success';
}

// submit.onsubmit = function() {
//   return match(username.value,phone.value,email.value,myInput.value,password2.value,userValidate,phoneValidate,validateEmail,validatePass,confirmPass);
  
// }

