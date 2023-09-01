const signUpBtn = document.querySelector(".signup-btn")
const logInBtn = document.querySelector(".login-btn")
const forgotPasswordBtn = document.querySelector(".forgot-passwordBtn")
const nameInput = document.querySelector(".input-name")
const phoneInput = document.querySelector(".input-phone")
const passwordInput = document.querySelector(".input-password")
const mainContainer = document.querySelector(".container")
const panelContainer = document.querySelector(".panelContainer")
const backImage = document.querySelector(".backImage")
const form = document.querySelector(".form")
const loginAllDiv = document.querySelector(".login-all")
const blurryImage = document.querySelector(".blurry-image")

signUpBtn.addEventListener("click",(e) => {
    e.preventDefault()
    loginAllDiv.children[1].textContent = ""

    loginAllDiv.children[0].textContent = "SignUp"
    if(phoneInput.className === "input-phone active"){
        e.target.parentElement.parentElement.children[0].textContent = "Login"
        if(nameInput.value === ""){
            loginAllDiv.children[1].textContent = "Please enter the required information!"
            loginAllDiv.children[0].classList.add("changer")
            nameInput.classList.add("warn");
            return;
        } else if (phoneInput.value === ""){
            loginAllDiv.children[1].textContent = "Please enter the required information!"
            nameInput.classList.remove("warn");
            phoneInput.classList.add("warn");
            return;
        } else if (passwordInput.value === ""){
            loginAllDiv.children[1].textContent = "Please enter the required information!"
            phoneInput.classList.remove("warn");
            nameInput.classList.remove("warn");
            passwordInput.classList.add("warn");
            return;
        } else {
            loginAllDiv.children[0].classList.remove("changer")
            phoneInput.classList.remove("active")
            passwordInput.classList.remove("warn");
            signUp()
            return
        }
    }
    nameInput.classList.remove("warn");
    passwordInput.classList.remove("warn");
    blurryImage.classList.add("active")
    phoneInput.classList.add("active")    
});

logInBtn.addEventListener("click",(e) => {
    e.preventDefault()
    nameInput.classList.remove("warn");
    passwordInput.classList.remove("warn");

    if(phoneInput.className === "input-phone active"){
        phoneInput.classList.remove("active")
        e.target.parentElement.parentElement.children[0].textContent = "Login"
        return

    }else {
        if(nameInput.value === ""){
            loginAllDiv.children[1].textContent = "Please enter the required information!"
            loginAllDiv.children[1].classList.add("changer")
            nameInput.classList.add("warn");
            return;
        } else if (passwordInput.value === ""){
            loginAllDiv.children[1].textContent = "Please enter the required information!"
            loginAllDiv.children[1].classList.add("changer")
            nameInput.classList.remove("warn");
            passwordInput.classList.add("warn");
            return;
        } else {
            passwordInput.classList.remove("warn");
            logIn();
            return;
        }
    }
});

const fetchData = async (url) => {
    return await fetch(url,{
        headers: {
            "Content-Type":"application/json",
            "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4d3BndGZyenR2ZXFncXlja25xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQxMjM4NCwiZXhwIjoyMDA4OTg4Mzg0fQ.fxxdxsJkoR5d_1IsCiar6iiGa2WUi5UWAPo_N_dXggg",
            "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4d3BndGZyenR2ZXFncXlja25xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQxMjM4NCwiZXhwIjoyMDA4OTg4Mzg0fQ.fxxdxsJkoR5d_1IsCiar6iiGa2WUi5UWAPo_N_dXggg"
        }
    }).then(response => response.json())
}

const fetchMovieData = async (url) => {
    return fetch(url).then(response => response.json())
}

const postData = async (url, data) => {
    // ChatGpt eseri
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4d3BndGZyenR2ZXFncXlja25xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQxMjM4NCwiZXhwIjoyMDA4OTg4Mzg0fQ.fxxdxsJkoR5d_1IsCiar6iiGa2WUi5UWAPo_N_dXggg',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4d3BndGZyenR2ZXFncXlja25xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQxMjM4NCwiZXhwIjoyMDA4OTg4Mzg0fQ.fxxdxsJkoR5d_1IsCiar6iiGa2WUi5UWAPo_N_dXggg'
        },
        body: JSON.stringify(data) 
    })
}

async function signUp () {
    let data = {
        userName: `${nameInput.value}`,
        phone: `${phoneInput.value}`,
        password: `${passwordInput.value}`
    }
    await postData('https://gxwpgtfrztveqgqycknq.supabase.co/rest/v1/users', data);
    resetInputValue()
    

    
}


async function logIn () {
    nameInput.classList.remove("warn");
    passwordInput.classList.remove("warn");
    let users = await fetchData("https://gxwpgtfrztveqgqycknq.supabase.co/rest/v1/users")
    if(users.find(x =>  nameInput.value === x.userName&&users.find(x =>  passwordInput.value === x.password))){
        panelContainer.innerHTML = ``
        mainContainer.classList.add("active")
        backImage.classList.add("deactive")
        
    }else {
        loginAllDiv.children[1].textContent = "User Name/Password wrong!"
        nameInput.classList.add("warn");
        passwordInput.classList.add("warn");
        nameInput.value = "";
        passwordInput.value = "";
    }
}

function resetInputValue () {
    passwordInput.value = ""; 
    phoneInput.value = "";
    nameInput.value = "";
    passwordInput.classList.remove("warn");
    phoneInput.classList.remove("warn");
    nameInput.classList.remove("warn");
    loginAllDiv.children[0].classList.add("changer")
    loginAllDiv.children[1].textContent = "Your account has been created! You can now login."
}

