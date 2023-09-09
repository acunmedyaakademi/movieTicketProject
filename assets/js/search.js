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

searchDialog.addEventListener("click",(e) => {
    e.target.parentElement.className === "dialogClose" ? searchDialog.close():null;
})