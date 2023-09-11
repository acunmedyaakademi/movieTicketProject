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

async function findMovieSearch() {
    const pageCount = 20;
    let  movieList = null;
    let newİnput = setValue()
    movieList = await fetchMovieData(`https://api.themoviedb.org/3/search/movie?query=${newİnput}&include_adult=false&language=en-US&page=1`);
    return movieList;
}

function setValue(){
    var newValue = searchInput.value.replace(/ /g, '%20');
    if (newValue === searchInput.value) {
        return searchInput.value;
    }else {return newValue;}
}


const searchDiv = document.querySelector(".searchDiv")
searchInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        searchDiv.classList.remove("deactive")
        let searchMovieData = await findMovieSearch()
        searchMovieData.results.forEach(foundMovie => {
            if(foundMovie.backdrop_path === null){
                return
            }
            searchDiv.innerHTML += `
                <div class="searchDivContainer">
                    <div class="searchPoster">
                        <img src="${postPathSearch}${foundMovie.poster_path}" alt="POSTER PATH ERROR">
                        <div class="searhcInfo">
                            <div class="searchBuy">
                                <button class="searchBuy">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
            
        searchInput.value = ""
        }
    }
);

searchDiv.addEventListener("click",(e) => {
    e.target.className === "searchDivCloseBtn" ? searchDiv.classList.add("deactive"):null;
})

searchDialog.addEventListener("click",async (e) => {
    if(e.target.parentElement.className === "dialogClose"){
        searchDialog.close()
        searchDialog.innerHTML = "";
    }else if(e.target.className === "deleteAccount"){
        await deleteData(e.target.id)
        // window.location.reload()
    }else if(e.target.className === "buy"){
        return buyTicket()
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
    const foundMovie = await findClickedMovie(e,datapath);
    searchDialog.showModal();
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
    } else {
        window.alert("Film bulunamadı")
    }
}

const deleteData = async (id) => {
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

function buyTicket() {
    searchDialog.innerHTML += `
            <h2>Satın Alma İşlevi Şuan Aktif Değil</h2>
    `;
}