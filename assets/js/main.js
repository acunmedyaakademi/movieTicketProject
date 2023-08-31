const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDc5N2RkNGU0MWU3ODE1MWY0NmE1MTBmM2M1MmJiMSIsInN1YiI6IjY0ZWZjNGVhY2FhNTA4MDE0YzhiMzJhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UWMW2nEvwjByMme8MI_Pgwc3l0j6wH5NLB5Zgf1a26k'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));