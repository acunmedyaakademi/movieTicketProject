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
                <h4>Phone: ${user.phone}</h4>
                <h4>Created: ${user.createdAt}</h4>
            </div>
        </div>
        <div class="slideLinks">
            <button>MyTickets</button>
            <button>Settings</button>

        </div>
        <h5>TicketNow All Right Reserved</h5>
    </div>
    `
}


function showProfile(el) {
    el === true ? profileDiv.classList.add("active"):profileDiv.classList.remove("active")
}