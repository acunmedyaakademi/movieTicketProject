const signUpBtn = document.querySelector(".signup-btn");
const logInBtn = document.querySelector(".login-btn");
const forgotPasswordBtn = document.querySelector(".forgot-passwordBtn");
const nameInput = document.querySelector(".input-name");
const phoneInput = document.querySelector(".input-phone");
const passwordInput = document.querySelector(".input-password");
const form = document.querySelector(".form");
const loginAllDiv = document.querySelector(".login-all");
const blurryImage = document.querySelector(".blurry-image");

signUpBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    loginAllDiv.children[1].textContent = "";
    loginAllDiv.children[0].textContent = "SignUp";
    if (phoneInput.classList.contains("active")) {
        if (nameInput.value === "") {
            loginAllDiv.children[1].textContent = "Please enter the required information!";
            loginAllDiv.children[0].classList.add("changer");
            nameInput.classList.add("warn");
            return;
        } else if (phoneInput.value === "") {
            loginAllDiv.children[1].textContent = "Please enter the required information!";
            nameInput.classList.remove("warn");
            phoneInput.classList.add("warn");
            return;
        }else if (nameInput.value.length < 4) {
            loginAllDiv.children[1].textContent = "Username must be at least 4 characters long!";
            nameInput.classList.add("warn");
            return;
        }else if (passwordInput.value === "") {
            loginAllDiv.children[1].textContent = "Please enter the required information!";
            phoneInput.classList.remove("warn");
            nameInput.classList.remove("warn");
            passwordInput.classList.add("warn");
            return;
        } else if (phoneInput.value.length === 11 && phoneInput.value.startsWith('05')) {
            if (passwordInput.value.length < 6 || !passwordInput.value.match(/\d/)) {
                loginAllDiv.children[1].textContent = "Password must be at least 6 characters long and contain at least one digit!";
                loginAllDiv.children[0].classList.add("changer");
                passwordInput.classList.add("warn");
                return;
            }
            passwordInput.classList.remove("warn");
            try {
                await signUp();
            } catch (error) {
                console.error("Sign up error:", error);
            }
            return;
        } else {
            loginAllDiv.children[1].textContent = "Please enter the right phone number!";
            loginAllDiv.children[0].classList.add("changer");
            phoneInput.classList.add("warn");
        }
    }
    nameInput.classList.remove("warn");
    passwordInput.classList.remove("warn");
    blurryImage.classList.add("active");
    phoneInput.classList.add("active");
});

logInBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    nameInput.classList.remove("warn");
    passwordInput.classList.remove("warn");
    loginAllDiv.children[0].classList.remove("changer");
    loginAllDiv.children[1].textContent = "";

    if (phoneInput.classList.contains("active")) { 
        phoneInput.classList.remove("active");
        loginAllDiv.children[0].textContent = "Login";
        return;
        
    } else {
        if (nameInput.value === "") {
            loginAllDiv.children[1].textContent = "Please enter the required information!";
            loginAllDiv.children[1].classList.add("changer");
            nameInput.classList.add("warn");
            if (passwordInput.value === "") {
                passwordInput.classList.add("warn");
            }
            return;

        } else if (passwordInput.value === "") {
            loginAllDiv.children[1].textContent = "Please enter the required information!";
            loginAllDiv.children[1].classList.add("changer");
            nameInput.classList.remove("warn");
            passwordInput.classList.add("warn");
            return;
        } else {
            passwordInput.classList.remove("warn");
            
            try {
                await logIn();
            } catch (error) {
                console.error("Login Error:", error);
            }
            
            return;
        }
    }
});

const postData = async (url, data) => {
    // ChatGpt + koray eseri 
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4d3BndGZyenR2ZXFncXlja25xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQxMjM4NCwiZXhwIjoyMDA4OTg4Mzg0fQ.fxxdxsJkoR5d_1IsCiar6iiGa2WUi5UWAPo_N_dXggg",
                "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4d3BndGZyenR2ZXFncXlja25xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQxMjM4NCwiZXhwIjoyMDA4OTg4Mzg0fQ.fxxdxsJkoR5d_1IsCiar6iiGa2WUi5UWAPo_N_dXggg"
            },
            body: JSON.stringify(data)
        });""
    } catch (error) {
        console.error("Fetch error:");

    }
};

forgotPasswordBtn.addEventListener("click",(e) => {
    e.preventDefault()
    loginAllDiv.children[1].textContent = "Forgot Password is out of use!";
})

async function signUp() {
    let data = {
        userName: `${nameInput.value}`,
        phone: `${phoneInput.value}`,
        password: `${passwordInput.value}`
    };

    try {
        let users = await fetchData("https://gxwpgtfrztveqgqycknq.supabase.co/rest/v1/users");

        if (users.find(x => nameInput.value === x.userName)) {
            loginAllDiv.children[1].textContent = "Please use a different username!";
            loginAllDiv.children[0].classList.add("changer"); 
            nameInput.classList.add("warn");
            return;
        }else {
           await Promise.all([
                postData('https://gxwpgtfrztveqgqycknq.supabase.co/rest/v1/users', data),
                phoneInput.classList.remove("active"),
                resetInputValue() 
            ]);
        }
        
        
    } catch (error) {
        console.error("Sign up error:", error);
    }
}

async function logIn() {
    loginAllDiv.children[1].textContent = "";
    nameInput.classList.remove("warn");
    passwordInput.classList.remove("warn");
    try {
        let users = await fetchData("https://gxwpgtfrztveqgqycknq.supabase.co/rest/v1/users");
        if (users.find(x => nameInput.value === x.userName && passwordInput.value === x.password)) {
            setActivePanel(false);
            showMoviesUpcoming(true);
            showMoviesPopular(true);
            showMoviesToprated(true);
        } else {
            loginAllDiv.children[1].textContent = "User Name/Password wrong!";
            nameInput.classList.add("warn");
            passwordInput.classList.add("warn");
            nameInput.value = "";
            passwordInput.value = "";
        }
    } catch (error) {
        console.error("Log in error:", error);
    }
}

async function resetInputValue() {
    passwordInput.value = "";
    phoneInput.value = "";
    nameInput.value = "";
    passwordInput.classList.remove("warn");
    phoneInput.classList.remove("warn");
    nameInput.classList.remove("warn");
    loginAllDiv.children[0].classList.remove("changer");
    loginAllDiv.children[0].textContent = "Login";
    loginAllDiv.children[1].textContent = "Your account has been created! You can now login.";
}
