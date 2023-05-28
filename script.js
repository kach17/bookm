const apiKey = '8dd735e87f128347ce5e73da06811ded';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', searchMovies);

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
  movieYear.textContent = release_date ? release_date.substring(0, 4) : 'N/A';
  movieCard.appendChild(movieYear);

  // Add click event listener to navigate to movie details page
  movieCard.addEventListener('click', () => {
    window.location.href = `movie.html?id=${id}`;
  });

  return movieCard;
}

// Function to display search results
function displaySearchResults(movies) {
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    searchResults.appendChild(movieCard);
  });
}

// Function to search movies
async function searchMovies() {
  const query = searchInput.value;

  // Clear previous search results
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = '';

  
  const newUrl = new URL(window.location.href);
  newUrl.searchParams.set('query', query);
  window.history.pushState({ path: newUrl.href }, '', newUrl.href);

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
    );
    const data = await response.json();
    const movies = data.results;

    displaySearchResults(movies);
  } catch (error) {
  }
}

// Add an event listener to the search input to trigger the fetchMovies function on pressing enter key
searchInput.addEventListener("keyup", (event) => { // Added an event listener to the search input
    if (event.key === "Enter") { // Checked if the key code is equal to 13 (enter key)
    event.preventDefault(); // Prevented the default action of the event
    searchButton.click(); // Triggered a click on the search button
    }
    });

// Handle URL changes
window.onpopstate = function(event) {
    // Extract the search query from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
  
    // Set the search query in the input field
    document.getElementById('search-input').value = query;
  
    // Perform the search API request and display the results
    // ...
  };
  