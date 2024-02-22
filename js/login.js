




// <!--* ═════════▶ validation ◀═════════ -->

let emailInput = document.getElementById("emailInput");
let passInput = document.getElementById("passInput");
let nameInput = document.getElementById("nameInput");



function validationName(){
    let inputName = nameInput.value;
     let regexName = /^[a-zA-Z0-9_]{3,}$/
    
    if(regexName.test(inputName)){
        nameInput.classList.add("is-valid");
        nameInput.classList.remove("is-invalid");
        return true;
    }

    else{
        nameInput.classList.add("is-invalid");
        nameInput.classList.remove("is-valid");
        return false;
    }

}
function validationEmail(){
    var inputMail = emailInput.value;
    let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    
    if(regexEmail.test(inputMail)){
        emailInput.classList.add("is-valid");
        emailInput.classList.remove("is-invalid");
        return true;
    }

    else{
        emailInput.classList.add("is-invalid");
        emailInput.classList.remove("is-valid");
        return false;
    }

}

function validationPass(){
    let inputPass = passInput.value;
    let regexPass = /^.{4,}$/
    
    if(regexPass.test(inputPass)){
        passInput.classList.add("is-valid");
        passInput.classList.remove("is-invalid");
        return true;
    }
    else{
        passInput.classList.add("is-invalid");
        passInput.classList.remove("is-valid");
        return false;
    }

}
function allInputValid(){
    if(validationEmail()&& validationName()&& validationPass()){
        return true;
    }else{
        return false;
    }
}


// <!--* ═════════▶ switches ◀═════════ -->

let register = document.getElementById("register");
let login = document.getElementById("login");
function switchfromsignuptologin(){
    
    register.classList.add("d-none");
    login.classList.remove("d-none");
}

function createAccount(){
    
    register.classList.remove("d-none");
    login.classList.add("d-none");
   
}


// <!--* ═════════▶ add in local storage ◀═════════ -->

let userData=[];

if(localStorage.getItem("users") != null){
    userData = JSON.parse(localStorage.getItem("users"));
  }

function addUser(){
    if(allInputValid()&& isExist() == false){
let user = {
Name:nameInput.value,
email : emailInput.value,
password :passInput.value
}
userData.push(user);
localStorage.setItem("users",JSON.stringify(userData));
clearSignupForm();
nameInput.classList.remove("is-valid");
emailInput.classList.remove("is-valid");
passInput.classList.remove("is-valid");
clearLoginForm();
switchfromsignuptologin();
    }
    else{
        clearSignupForm();
        nameInput.classList.remove("is-valid");
emailInput.classList.remove("is-valid");
passInput.classList.remove("is-valid");
    }
}

function clearSignupForm(){
    nameInput.value="";
    emailInput.value="";
    passInput.value="";
  }

  function isExist(){
    for(var i=0; i<userData.length; i++){
      if(userData[i].email.toLowerCase() == emailInput.value.toLowerCase())
      {
        Swal.fire({
          icon: "error",
          title: "User already exists!",
          text: "Try another Email",
        });
        return true;
      }
    }
    Swal.fire({
      icon: "success",
      title: "Signed up successfully",
      text: "Login Now!"
    });
    
    return false;
  }

 
 



  var textLogin = document.getElementById("textLogin");
  var emailinput = document.getElementById("emailinput");
  var passinput = document.getElementById("passinput");
  var loginbtn = document.getElementById("loginbtn");
  var reg = document.getElementById("reg");
  
  function clearLoginForm(){
      emailinput.value="";
      passinput.value="";
  }
  //var textLogin = document.getElementById("textLogin");

//var userNameSession = JSON.parse(localStorage.getItem("username"));

  function Login(){
      for(var i=0; i<userData.length; i++){
          if(userData[i].email.toLowerCase() == emailinput.value.toLowerCase() &&
             userData[i].password.toLowerCase() == passinput.value.toLowerCase())
          {
              Swal.fire({
                  icon: "success",
                  title: "Logged in successfully",
                  showConfirmButton: false,
                  timer: 1500
              }).then((result) => {
                  var userNameSession = userData[i].name;
                  localStorage.setItem("username", JSON.stringify(userNameSession));
                  if (result.dismiss === Swal.DismissReason.timer) {
                    // var userNameSession = userData[i].name;
                    // localStorage.setItem("username",JSON.stringify(userNameSession));
                    // textLogin.innerHTML= `<h1 class=" fw-semibold w-custom">Welcome to our website, ${userNameSession}!</h1>`;
                    getWelcomePage();
                    
                  }
              });
              return true;
          }
      }
      Swal.fire({
          icon: "error",
          text: "User is invalid or does not exist!"
      });
  }
  

  

  function getWelcomePage() {
    console.log("Before getWelcomePage called");
    console.log("getWelcomePage called");

    window.location.href = "index.html";
  }
//fatma12345@gmail.com




//.....................................



let ProductPrice = document.getElementById("price");
let retailPrice = document.getElementById("All");

ProductPrice.addEventListener("click",function(){
    retailPrice += ProductPrice
});

