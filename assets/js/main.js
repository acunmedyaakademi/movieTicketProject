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
    if(phoneInput.className === "input-phone active"){
        signUp()
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
        return
    }else {
        if(nameInput.value === ""){
            nameInput.classList.add("warn");
            return;
        } else if (passwordInput.value === ""){
            nameInput.classList.remove("warn");
            passwordInput.classList.add("warn");
            return;
        } else {
            passwordInput.classList.remove("warn");
            logIn();
            return;
        }
    }
    
    e.preventDefault()
    e.target.parentElement.parentElement.innerHTML = `<p class="text">Login</p>
    <div class="Username">
        <input class="input-name" placeholder="Username.." type="name">
    </div>
    <div class="password">
        <input class="input-phone" placeholder="Phone.." type="text">
        <input class="input-password" placeholder="Password.." type="text">
    </div>
    <div class="buttons">
        <button class="login-btn">Login</button>
        <button class="signup-btn">Sign Up</button>
    </div>
    <button class="forgot-passwordBtn">Forgot Password</button>`
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
    }).then(response => response.json());
    window.location.reload()
}

async function signUp () {
    
    let data = {
        userName: `${nameInput.value}`,
        phone: `${phoneInput.value}`,
        password: `${passwordInput.value}`
    }
    postData('https://gxwpgtfrztveqgqycknq.supabase.co/rest/v1/users', data);
    

    
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
        nameInput.classList.add("warn");
        passwordInput.classList.add("warn");
        nameInput.value = "";
        passwordInput.value = "";
    }
}

