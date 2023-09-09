const searchDialog = document.querySelector(".searchDialog");
const searchInput = document.querySelector("#search");
const postPathSearch = "http://image.tmdb.org/t/p/w500";

async function findMovie() {
    const pageCount = 20;
    let showMovie = null;

    for (let i = 1; i <= pageCount; i++) {
        const movieList = await fetchMovieData(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${i}&sort_by=popularity.desc`);
        
        showMovie = movieList.results.find(movie => searchInput.value.toLowerCase() === movie.title.toLowerCase());
        
        if (showMovie) {
            break;
        }
    }

    return showMovie;
}

searchInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        const foundMovie = await findMovie();

        if (foundMovie) {
            searchDialog.innerHTML = `
                <div class="dialogContainer">
                    <div class="dialogClose">
                        <p>❌</p>
                    </div>
                    <div class="dialogBackimg">
                        <img src="${postPathSearch}${foundMovie.backdrop_path}" alt="Dialog">
                    </div>
                    <div class="poster">
                        <img src="${postPathSearch}${foundMovie.poster_path}" alt="">
                        <div class="dialogInfo">
                            <div class="dialogTitle">
                                <h2>${foundMovie.title} | IMBD: ${foundMovie.vote_average}</h2>
                            </div>
                            <div class="dialogOverview">
                                <h5>${foundMovie.overview}</h5>
                            </div>
                            <div class="dialogBuy">
                                <button class="buy">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            searchInput.value = ""
            searchDialog.showModal();
        } else {
            window.alert("Film bulunamadı")
        }
    }
});

searchDialog.addEventListener("click",async (e) => {
    if(e.target.parentElement.className === "dialogClose"){
        searchDialog.close()
        searchDialog.innerHTML = "";
    }else if(e.target.className === "deleteAccount"){
        await deleteData(e.target.id)
        // window.location.reload()
    }
})

async function findClickedMovie(e,dataPath) {
    const pageCount = 20;
    let showMovie = null;

    for (let i = 1; i <= pageCount; i++) {
        const movieList = await fetchMovieData(`https://api.themoviedb.org/3/movie/${dataPath}?language=en-US&page=${i}`);
        showMovie = movieList.results.find(movie => movie.id == e);
        if (showMovie) {
            break;
        }
    }

    return showMovie;
}


async function buyDialog(e,datapath) {
    console.log("buy dialog id:",e);
    const foundMovie = await findClickedMovie(e,datapath);
    console.log(foundMovie);
    if (foundMovie) {
        searchDialog.innerHTML = `
            <div class="dialogContainer" id="${foundMovie.id}">
                <div class="dialogClose">
                    <p>❌</p>
                </div>
                <div class="dialogBackimg" >
                    <img src="${postPathSearch}${foundMovie.backdrop_path}" alt="Dialog" id="${foundMovie.id}">
                </div>
                <div class="poster">
                    <img src="${postPathSearch}${foundMovie.poster_path}" alt="Dialog" id="${foundMovie.id}">
                    <div class="dialogInfo">
                        <div class="dialogTitle">
                            <h2>${foundMovie.title} | IMBD: ${foundMovie.vote_average}</h2>
                        </div>
                        <div class="dialogOverview">
                            <h5>${foundMovie.overview}</h5>
                        </div>
                        <div class="dialogBuy">
                            <button class="buy">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        searchDialog.showModal();
    } else {
        window.alert("Film bulunamadı")
    }
}

async function profileFind(id) {
    try {
        let users = await fetchData("https://gxwpgtfrztveqgqycknq.supabase.co/rest/v1/users");
        const foundUser = users.find(el => el.id == id);
        if (foundUser) {
            profileDialog(foundUser)

        } else {window.alert("KULLANICI BULUNAMADI (İD) HATASI")}

    } catch (error) {
        console.error("Log in error:", error);
    }
}

function profileDialog(user) {
        searchDialog.innerHTML = `
            <div class="dialogContainer">
                <div class="dialogClose">
                    <p>❌</p>
                </div>
                <div class="dialogBackimg" >
                    <img src="assets/image/thumb-1920-1003880.png" alt="Dialog">
                </div>
                <div class="poster">
                    <img src="assets/image/man.png" alt="Dialog" >
                    <div class="dialogInfo">
                        <div class="dialogTitle">
                            <h2>${user.userName} | ID: ${user.id}</h2>
                        </div>
                        <div class="dialogOverview">
                            <button class="changePassword">ChangePassword</button>
                        </div>
                        <div class="dialogDelete">
                            <button class="deleteAccount" id="${user.id}">Delete Account</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        searchDialog.showModal();
}

const deleteData = async (id) => {
    console.log(id);
    try {
        const response = await fetch(`https://gxwpgtfrztveqgqycknq.supabase.co/rest/v1/users/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4d3BndGZyenR2ZXFncXlja25xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQxMjM4NCwiZXhwIjoyMDA4OTg4Mzg0fQ.fxxdxsJkoR5d_1IsCiar6iiGa2WUi5UWAPo_N_dXggg",
                "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4d3BndGZyenR2ZXFncXlja25xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQxMjM4NCwiZXhwIjoyMDA4OTg4Mzg0fQ.fxxdxsJkoR5d_1IsCiar6iiGa2WUi5UWAPo_N_dXggg" 
            }
        });
        
        if (response.status === 204) {
            console.log("Başarıyla silindi.");
        } else {
            console.error("Silme hatası:", response.status);
        }
    } catch (error) {
        console.error("Fetch hatası:", error);
    }
};