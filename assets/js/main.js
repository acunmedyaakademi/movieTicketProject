const signUpBtn = document.querySelector(".signup-btn")
const logInBtn = document.querySelector(".login-btn")
const forgotPasswordBtn = document.querySelector(".forgot-passwordBtn")
const nameInput = document.querySelector(".input-name")
const phoneInput = document.querySelector(".input-phone")
const passwordInput = document.querySelector(".input-password")

signUpBtn.addEventListener("click",(e) => {
  e.preventDefault()
  phoneInput.classList.toggle("active")
  e.target.parentElement.parentElement.innerHTML = `<p class="text">SignUp</p>
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
  e.target.parentElement.parentElement.innerHTML = `<p class="text">Login</p>
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