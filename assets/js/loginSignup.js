// SignUp POST işlemi
async function signUp(name,phone,password) {
    let data = {
        userName: `${name.value}`,
        phone: `${phone.value}`,
        password: `${password.value}`
    };
    try {
        let users = await fetchData("https://gxwpgtfrztveqgqycknq.supabase.co/rest/v1/users");
        if (users.find(x => name.value === x.userName)) {
            setLoginAllDiv(null,null,"Please use a different username!",true)
            setInputValueAndClass(null,null,null,true)
            return;
        }else {
           await Promise.all([
                postData('https://gxwpgtfrztveqgqycknq.supabase.co/rest/v1/users', data),
                resetInputValue() 
            ]);
        }
    } catch (error) {
        console.error("Sign up error:", error);
    }
}

// Logİn GET işlemi 
async function logIn(name,password) {
    setLoginAllDiv(true)
    setInputValueAndClass(null,null,null,false,null,false)
    try {
        let users = await fetchData("https://gxwpgtfrztveqgqycknq.supabase.co/rest/v1/users");
        if (users.find(x => name.value === x.userName && password.value === x.password)) {
            setActivePanel(false);
            showMoviesUpcoming(true);
            showMoviesPopular(true);
            showMoviesToprated(true);
        } else {
            setLoginAllDiv(null,null,"User Name/Password wrong!",true)
            setInputValueAndClass(true,null,true,true,null,true)
        }
    } catch (error) {
        console.error("Log in error:", error);
    }
}