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

let doOnce = 0;

signUpBtn.addEventListener("click",(e) => {
    e.preventDefault()


    loginAllDiv.innerHTML = `<p class="text">SignUp</p>
    <div class="Username">
        <input class="input-name" placeholder="Username.." type="name">
    </div>
    <div class="password">
        <input class="input-phone active" placeholder="Phone.." type="text">
        <input class="input-password" placeholder="Generate Password.." type="text">
    </div>
    <div class="buttons">
        <button class="login-btn">Login</button>
        <button class="signup-btn">Sign Up</button>
    </div>
    <button class="forgot-passwordBtn">Forgot Password</button>`

});

logInBtn.addEventListener("click",(e) => {
    e.preventDefault()
    
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
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your_access_token_here',
            'apikey': 'your_api_key_here'
        },
        body: JSON.stringify(data)  // Göndermek istediğiniz veriyi JSON formatına dönüştürüp ekleyin
    }).then(response => response.json());
}

async function signUp () {
    let data = {
        userName: `${nameInput.value}`,
        phone: `${phoneInput.value}`,
        password: `${passwordInput.value}`

    }
    postData('https://example.com/api', data)
    .then(responseData => {
        console.log('POST Response:', responseData);
    })
    .catch(error => {
        console.error('POST Error:', error);
    });
}


async function logIn () {
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



// cards 
