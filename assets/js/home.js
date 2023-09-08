const rightDiv = document.querySelector(".rightMovie");
const popularMovie = document.querySelector(".upperMovie")
const topRated = document.querySelector(".lowerMovie")
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
                            <img src="${postPath}${movie.backdrop_path}" alt="${movie.title}" id="${movie.id}">,
                            <div class="title">
                                <h2>${movie.title}</h2>
                                <h5>${movie.overview}</h5>
                            </div>
                        </div>
                    `;
                    rightDiv.appendChild(movieElement);
                });
            }
        });
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
                            <img src="${postPath}${movie.poster_path}" alt="${movie.title}/İmage">
                            <div class="info">
                                <h3>${movie.title}</h3>
                                <p>Release Date: ${movie.release_date}</p>
                                <h5>Vote Average : ${movie.vote_average} | Vote Count : ${movie.vote_count}</h5>
                            </div>
                        </div>
                        <img src="${postPath}${movie.backdrop_path}" alt="${movie.title}/İmage" id="${movie.id}">
                    </div>
                    `;
                    popularMovie.appendChild(movieElement);
                });
            }
        });
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
                            <img src="${postPath}${movie.poster_path}" alt="${movie.title}" id="${movie.id}">
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
