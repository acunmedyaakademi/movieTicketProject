const signUpBtn = document.querySelector(".signup-btn");
const logInBtn = document.querySelector(".login-btn");
const forgotPasswordBtn = document.querySelector(".forgot-passwordBtn");
const nameInput = document.querySelector(".input-name");
const phoneInput = document.querySelector(".input-phone");
const passwordInput = document.querySelector(".input-password");
const form = document.querySelector(".form");
const blurryImage = document.querySelector(".blurry-image");

form.addEventListener("submit", (e) => {
    e.preventDefault();
});

signUpBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    setLoginAllDiv(true,true)
    if (phoneInput.classList.contains("active")) {
        if (nameInput.value === "") {
            setLoginAllDiv(null,null,"Please enter the required information!",true)
            nameInput.classList.add("warn");
            return;
        } else if (phoneInput.value === "") {
            setLoginAllDiv(null,null,"Please enter the required information!",true)
            setInputValueAndClass(null,null,null,false,true,null)
            return;
        }else if (nameInput.value.length < 4) {
            setLoginAllDiv(null,null,"Username must be at least 4 characters long!",true)
            nameInput.classList.add("warn");
            return;
        }else if (passwordInput.value === "") {
            setLoginAllDiv(null,null,"Please enter the required information!",true)
            setInputValueAndClass(null,null,null,false,false,true)
            return;
        } else if (phoneInput.value.length === 11 && phoneInput.value.startsWith('05')) {
            if (passwordInput.value.length < 6 || !passwordInput.value.match(/\d/)) {
                setLoginAllDiv(null,null,"Password must be at least 6 characters long and contain at least one digit!",true)
                passwordInput.classList.add("warn");
                return;
            }
            passwordInput.classList.remove("warn");
            try {
                await signUp(nameInput,phoneInput,passwordInput);
            } catch (error) {
                console.error("Sign up error:", error);
            }
            return;
        } else {
            setLoginAllDiv(null,null,"Please enter the right phone number!",true)
            phoneInput.classList.add("warn");
        }
    }
    setInputValueAndClass(null,null,null,false,null,false)
    blurryImage.classList.add("active");
    phoneInput.classList.add("active");
});

logInBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    setInputValueAndClass(null,null,null,false,null,false)
    setLoginAllDiv(true,null,null,false)
    if (phoneInput.classList.contains("active")) { 
        phoneInput.classList.remove("active");
        setLoginAllDiv(null,false)
        return;
        
    } else {
        if (nameInput.value === "") {
            setLoginAllDiv(null,null,"Please enter the required information",true)
            nameInput.classList.add("warn");
            if (passwordInput.value === "") {
                passwordInput.classList.add("warn");
            }
            return;

        } else if (passwordInput.value === "") {
            setLoginAllDiv(null,null,"Please enter the required information",true)
            setInputValueAndClass(null,null,null,false,null,true)
            return;
        } else {
            passwordInput.classList.remove("warn");
            
            try {
                await logIn(nameInput,passwordInput);
            } catch (error) {
                console.error("Login Error:", error);
            }
            
            return;
        }
    }
});

forgotPasswordBtn.addEventListener("click",(e) => {
    e.preventDefault()
    loginAllDiv.children[1].textContent = "Forgot Password is out of use!";
})

async function resetInputValue() {
    (passwordInput,nameInput,phoneInput).value = "";
    (passwordInput,nameInput,phoneInput).classList.remove("warn")
    phoneInput.classList.remove("active"),
    setLoginAllDiv(null,true,"Your account has been created! You can now login..",false)
}

function setInputValueAndClass(resetName,resetPhone,resetPassword,nameClass,phoneClass,passwordClass){
    resetName === true ? nameInput.value = "":null;
    resetPhone === true ? phoneInput.value = "":null;
    resetPassword === true ? passwordInput.value = "":null;

    nameClass === true ? nameInput.classList.add("warn"):nameInput.classList.remove("warn")
    phoneClass === true ? phoneInput.classList.add("warn"):phoneInput.classList.remove("warn")
    passwordClass === true ? passwordInput.classList.add("warn"):passwordInput.classList.remove("warn")
}
