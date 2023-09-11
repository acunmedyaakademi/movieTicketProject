const rightDiv = document.querySelector(".rightMovie");
const popularMovie = document.querySelector(".upperMovie")
const topRated = document.querySelector(".lowerMovie")
const centerMovieDiv = document.querySelector(".centerMovie")
const rightScrollBtn = document.querySelector(".rightScroll")
const leftScrollBtn = document.querySelector(".leftScroll")
const postPath = "http://image.tmdb.org/t/p/w500";

async function showMoviesUpcoming(iswork) {
    if(!iswork){
        return console.log("log in and be a man!")
    }
    setActiveHome(true)
    const pageCount = 20;
    const requests = [];
    for (let page = 1; page <= pageCount; page++) {
        const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
        requests.push(fetchMovieData(url));
    }

    try {
        const responses = await Promise.all(requests);
        rightDiv.children[1].innerHTML = "";
        responses.forEach(data => {
            if (data && data.results) {
                data.results.forEach(movie => {
                    if(movie.backdrop_path == null){
                        return
                    }
                    const movieElement = document.createElement('div');
                    movieElement.classList.add('movie');
                    movieElement.innerHTML = `
                        <div class="upComing">
                            <img src="${postPath}${movie.backdrop_path}" alt="${movie.title}">
                            <div class="title">
                                <h2>${movie.title}</h2>
                                <h5 class="deactive">${movie.overview}</h5>
                            </div>
                        </div>
                    `;
                    rightDiv.appendChild(movieElement);
                });
            }
        });
        showMoviesPopular(true);
    } catch (error) {
        console.error('Error fetching and displaying data:', error);
    }
}

async function showMoviesPopular(iswork) {
    if(!iswork){
        return console.log("log in and be a man!")
    }
    const pageCount = 20;
    const requests = [];

    for (let page = 1; page <= pageCount; page++) {
        const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
        requests.push(fetchMovieData(url));
    }

    try {
        const responses = await Promise.all(requests);
        popularMovie.innerHTML = ""
        responses.forEach(data => {
            if (data && data.results) {
                data.results.forEach(movie => {
                    if(movie.backdrop_path == null){
                        return
                    }
                    const movieElement = document.createElement('div');
                    movieElement.classList.add('moviePopular');
                    movieElement.innerHTML = `
                    <div class="upComing">
                        <div class="inside">
                            <img src="${postPath}${movie.poster_path}" alt="${movie.title}/İmage" id="${movie.id}" class="popular">
                            <div class="info">
                                <h3>${movie.title}</h3>
                                <p>Release Date: ${movie.release_date}</p>
                                <h5>Vote Average : ${movie.vote_average} | Vote Count : ${movie.vote_count}</h5>
                            </div>
                        </div>
                        <img src="${postPath}${movie.backdrop_path}" alt="${movie.title}/İmage" >
                    </div>
                    `;
                    popularMovie.appendChild(movieElement);
                });
            }
        });
        showMoviesToprated(true);
        scrollContent()
    } catch (error) {
        console.error('Error fetching and displaying data:', error);
    }
}

async function showMoviesToprated(iswork) {
    if(!iswork){
        return console.log("log in and be a man!")
    }
    const pageCount = 20;
    const requests = [];

    for (let page = 1; page <= pageCount; page++) {
        const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
        requests.push(fetchMovieData(url));
    }

    try {
        const responses = await Promise.all(requests);
        topRated.innerHTML = ""
        responses.forEach(data => {
            if (data && data.results) {
                data.results.forEach(movie => {
                    if(movie.poster_path == null){
                        return
                    }
                    const movieElement = document.createElement('div');
                    movieElement.classList.add('movieRated');
                    movieElement.innerHTML = `
                        <div class="upComing">
                            <img src="${postPath}${movie.poster_path}" alt="${movie.title}" id="${movie.id}" class="toprated">
                        </div>
                    `;
                    topRated.appendChild(movieElement);
                });
            }
        });
    } catch (error) {
        console.error('Error fetching and displaying data:', error);
    }
}


function setActiveDiv(center,right) {
    center === true ? centerMovieDiv.classList.remove("deactive"):centerMovieDiv.classList.add("deactive")
    right === true ? rightDiv.classList.remove("deactive"):rightDiv.classList.add("deactive")
    center&&right === true ? activeProfile():null;
}

function resetDivHtml(tr,pm,rd) {
    tr === true ? topRated.innerHTML = "":null;
    pm === true ? popularMovie.innerHTML = "":null;
    rd === true ? rightDiv.forEach(x => {
        if(x.className === "upComing"){
            rightDiv.pop(x)
        }
    }):null;
}

rightDiv.addEventListener("mouseover",(e) => {
    if(e.target.className === "upComing"){
        e.target.children[1].children[1].className = "active"
    }else if (e.target.tagName == "IMG"){
        e.target.parentElement.children[1].children[1].className = "active"
    }else if (e.target.className === "title"){
        e.target.children[1].className = "active"
    }else if(e.target.tagName == "H5"){
        e.target.className = "active"
    }
})

rightDiv.addEventListener("mouseout",(e) => {
    if(e.target.className === "upComing"){
        e.target.children[1].children[1].className = "deactive"
    }else if (e.target.tagName == "IMG"){
        e.target.parentElement.children[1].children[1].className = "deactive"
    }else if (e.target.className === "title"){
        e.target.children[1].className = "deactive"
    }else if(e.target.tagName == "H5"){
        e.target.className = "deactive"
    }
})


// Top Rated Kaydırma efekti

let scrollValue = 0;

rightScrollBtn.addEventListener("click", function () {
    if(scrollValue <0){
        return scrollValue = 0;
    }
    scrollValue += 820;
    smoothScroll(scrollValue);
});


leftScrollBtn.addEventListener("click", function () {
    if(scrollValue <= 0){
        return scrollValue = 0;
    }
    scrollValue -= 820;
    smoothScroll(scrollValue);
});

function smoothScroll(targetScrollValue) {
    const duration = 500; 
    const startScrollValue = topRated.scrollLeft;
    let startTime;
// burdan sonrası youtube + chatGpt
    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const scrollProgress = Math.min(elapsedTime / duration, 1);
        topRated.scrollLeft = startScrollValue + (targetScrollValue - startScrollValue) * scrollProgress;

        if (scrollProgress < 1) {
        requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}



// üst div kayma işlemi 
let inside = document.querySelector(".inside")
var scrollDistance = 1000000;
var scrollSpeed = 10;

var scrollLeft = 0;
var scrollingRight = true;

// Kaydırma işlemi
function scrollContent() {
    if (scrollingRight) {
        if (scrollLeft < scrollDistance) {
        scrollLeft++;
        } else {
        scrollingRight = false;
        }
    } else {
        if (scrollLeft > 0) {
        scrollLeft--;
        } else {
        scrollingRight = true;
        }
    }
    popularMovie.scrollLeft = scrollLeft;

    setTimeout(scrollContent, scrollSpeed);
}