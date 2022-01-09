email=document.getElementById('email');
password=document.getElementById('password');
error1=document.getElementById('error1');
error2=document.getElementById('error2');


var re = /^([A-Za-z0-9\.-]+)@([A-Za-z0-9\-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
var reg1 =/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9]{8,20}$/;
function checkemail(){
     if(email.value.trim()==""){
        error1.innerHTML="Error:please fillout this field";
        email.style.border="2px solid red";
        error1.style.visibility="visible"
        email.focus()
        return false;
    }
   else if(!re.test(email.value.trim())) {
        error1.innerHTML="Error: email is invalid";
        email.style.border="2px solid red";
        error1.style.visibility="visible"
        email.focus();
        return false;
      }
    
      else
      error1.innerHTML="";
      email.style.border="2px solid green";
      return true;
}
function checkpassword(){
    if(password.value.trim()==""){
       error2.innerHTML="Error:please fillout this field";
       password.style.border="2px solid red";
       error2.style.visibility="visible"
       password.focus()
       return false;
   }
  else if(!reg1.test(password.value.trim())) {
       error2.innerHTML="Error: Password is invalid";
       password.style.border="2px solid red";
       error2.style.visibility="visible"
       password.focus();
       return false;
     }
   
     else
     error2.innerHTML="";
     password.style.border="2px solid green";
     return true;
}