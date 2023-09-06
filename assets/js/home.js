const rightDiv = document.querySelector(".rightMovie");
const popularMovie = document.querySelector(".upperMovie")
const nowPlaying = document.querySelector(".lowerMovie")
const postPath = "http://image.tmdb.org/t/p/w500";
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDc5N2RkNGU0MWU3ODE1MWY0NmE1MTBmM2M1MmJiMSIsInN1YiI6IjY0ZWZjNGVhY2FhNTA4MDE0YzhiMzJhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UWMW2nEvwjByMme8MI_Pgwc3l0j6wH5NLB5Zgf1a26k';

async function fetchMovieData(url) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
        }
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('HTTP Error: ' + response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function showMoviesUpcoming() {
    const pageCount = 20;
    const requests = [];

    for (let page = 1; page <= pageCount; page++) {
        const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
        requests.push(fetchMovieData(url));
    }

    try {
        const responses = await Promise.all(requests);
        responses.forEach(data => {
            if (data && data.results) {
                data.results.forEach(movie => {
                    if(movie.poster_path == null){
                        return
                    }
                    console.log(movie);
                    const movieElement = document.createElement('div');
                    movieElement.classList.add('movie');
                    movieElement.innerHTML = `
                        <div class="upComing">
                            <img src="${postPath}${movie.poster_path}" alt="${movie.title}" id="${movie.id}">
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

async function showMoviesPopular() {
    const pageCount = 20;
    const requests = [];

    for (let page = 1; page <= pageCount; page++) {
        const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
        requests.push(fetchMovieData(url));
    }

    try {
        const responses = await Promise.all(requests);
        responses.forEach(data => {
            if (data && data.results) {
                data.results.forEach(movie => {
                    if(movie.poster_path == null){
                        return
                    }
                    console.log(movie);
                    const movieElement = document.createElement('div');
                    movieElement.classList.add('movie');
                    movieElement.innerHTML = `
                        <div class="upComing">
                            <img src="${postPath}${movie.poster_path}" alt="${movie.title}" id="${movie.id}">
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

async function showMoviesToprated() {
    const pageCount = 20;
    const requests = [];

    for (let page = 1; page <= pageCount; page++) {
        const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
        requests.push(fetchMovieData(url));
    }

    try {
        const responses = await Promise.all(requests);
        responses.forEach(data => {
            if (data && data.results) {
                data.results.forEach(movie => {
                    if(movie.poster_path == null){
                        return
                    }
                    console.log(movie);
                    const movieElement = document.createElement('div');
                    movieElement.classList.add('movie');
                    movieElement.innerHTML = `
                        <div class="upComing">
                            <img src="${postPath}${movie.poster_path}" alt="${movie.title}" id="${movie.id}">
                        </div>
                    `;
                    nowPlaying.appendChild(movieElement);
                });
            }
        });
    } catch (error) {
        console.error('Error fetching and displaying data:', error);
    }
}