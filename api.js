// Function to convert a title to kebab case
const kebabCase = function (title) {
  // Define a regular expression to match punctuation characters
  const punctuationPattern = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
  // Remove punctuation from the title using the regular expression
  const newTitle = title.replaceAll(punctuationPattern, "");
  // Convert the title to lowercase and replace spaces with hyphens
  return newTitle.toLowerCase().split(" ").join("-");
};

// Fetch data about currently playing movies
fetch("https://film-flash.netlify.app/.netlify/functions/now-playing")
  .then((response) => response.json())
  .then((response) => {
    // Generate a random number to pick a random movie from the response
    const randomNumber = Math.floor(Math.random() * 20);
    // Get the details of the randomly selected movie
    const randomMovie = response.results[randomNumber];
    const backdropPath = randomMovie.backdrop_path;
    const movieId = randomMovie.id;

    // Convert the movie title to kebab case
    const kebabTitle = kebabCase(randomMovie.title);

    // Fetch additional information, specifically videos, for the selected movie
    fetch(
      `https://film-flash.netlify.app/.netlify/functions/videos?id=${movieId}`
    )
      .then((response) => response.json())
      .then((movieResponse) => {
        // Find the trailer among the videos using a case-insensitive search
        const trailer = movieResponse.videos.results.find((video) =>
          /trailer/i.test(video.name)
        );
        const trailerKey = trailer.key;
        // Create the YouTube trailer URL
        const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;

        // Get DOM elements for manipulation
        const mainElement = document.querySelector("main");
        const title = document.getElementById("title");
        const description = document.getElementById("description");
        const info = document.getElementById("info");
        const trailerLink = document.getElementById("trailer-link");
        const showtimes = document.getElementById("showtimes");
        const currentYear = new Date().getFullYear();

        // Update DOM elements with movie information
        mainElement.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${backdropPath})`;
        title.innerHTML = randomMovie.title;
        description.innerHTML = randomMovie.overview;
        info.href = `https://www.themoviedb.org/movie/${movieId}`;
        trailerLink.href = trailerUrl;
        showtimes.href = `https://www.cinemaclock.com/movies/${kebabTitle}-${currentYear}/showtimes`;

        // Add a CSS class to trigger a fade-in effect
        mainElement.classList.add("main-fade-in");
      })
      .catch((err) => console.error(err));
  })
  .catch((err) => console.error(err));
