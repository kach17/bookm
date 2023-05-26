// script.js

// API key for TMDB
require('dotenv').config();
const API_KEY = process.env.API_KEY;

// Function to search movies
async function searchMovies() {
  const searchInput = document.getElementById('searchInput');
  const query = searchInput.value;

  // Clear previous search results
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = '';

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    const movies = data.results;

    movies.forEach(movie => {
      const movieCard = createMovieCard(movie);
      searchResults.appendChild(movieCard);
    });
  } catch (error) {
    console.error(error);
  }
}

// Function to create a movie card
function createMovieCard(movie) {
  const { id, title, poster_path, release_date } = movie;

  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');

  const movieImage = document.createElement('img');
  movieImage.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
  movieImage.alt = title;
  movieCard.appendChild(movieImage);

  const movieTitle = document.createElement('h3');
  movieTitle.textContent = title;
  movieCard.appendChild(movieTitle);

  const movieYear = document.createElement('p');
  movieYear.textContent = release_date.substring(0, 4);
  movieCard.appendChild(movieYear);

  // Add click event listener to navigate to movie details page
  movieCard.addEventListener('click', () => {
    window.location.href = `movie.html?id=${id}`;
  });

  return movieCard;
}

// Function to get movie details
async function getMovieDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
    const movie = await response.json();

    displayMovieDetails(movie);
  } catch (error) {
    console.error(error);
  }
}

// Function to display movie details
function displayMovieDetails(movie) {
  const { title, overview, poster_path, vote_average } = movie;

  const moviePoster = document.getElementById('moviePoster');
  moviePoster.src = `https://image.tmdb.org/t/p/w500${poster_path}`;

  const movieTitle = document.getElementById('movieTitle');
  movieTitle.textContent = title;

  const movieOverview = document.getElementById('movieOverview');
  movieOverview.textContent = overview;

  const movieRating = document.getElementById('movieRating');
  movieRating.textContent = `Rating: ${vote_average}/10`;
}

// Toggle theme between light and dark mode
function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-mode');
}

// Event listener for theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('change', toggleTheme);
