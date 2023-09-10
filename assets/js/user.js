const profileDiv = document.querySelector(".slideProfileDiv")
let currentUser;
function slideActiveProfile(user){
    currentUser = user;
    profileDiv.innerHTML = `
    <div class="back">
        <img src="assets/image/icons8-back-64.png" alt="" class="slideBack">
    </div>
    <div class="slideProfile">
        <div class="slideProfileImage">
            <img src="assets/image/man.png" alt="">
        </div>
        <div class="profileTitle">
            <div class="upTitle">
                <h2>${user.userName} | ID: ${user.id}</h2>
            </div>
        </div>
        <div class="slideLinks">
            <button>MyTickets</button>
            <button class="mainProfileBtn">Profile</button>
            <button>Settings</button>

        </div>
        <h5>TicketNow All Right Reserved</h5>
    </div>
    `
}

const mainProfileDiv = document.querySelector(".mainProfile")
function activeMainProfile(){
    mainProfileDiv.classList.remove("deactive")
    mainProfileDiv.innerHTML = `
        <button class="mainProfileDeleteBtn">❌</button>
        <img src="assets/image/man.png" alt="">
        <div class="mainProfileInfo">
            <div class="mainProfileTitle">
                <h3>${currentUser.userName} | ID: ${currentUser.id}</h3>
                <h3>Phone: ${currentUser.phone}</h3>
                <h3>Created At: ${currentUser.createdAt}</h3>
            </div>
            <div class="mainProfileButtons">
                <button class="ProfileDeleteBtn" id="${currentUser.id}">Delete Account</button>
                <button class="ProfileChangePasswordBtn" id="${currentUser.id}">Change Password</button>
            </div>
        </div>
    `
}

function removeMainProfile(){
    mainProfileDiv.classList.add("deactive")
}

function showProfile(el) {
    el === true ? profileDiv.classList.add("active"):profileDiv.classList.remove("active")
}