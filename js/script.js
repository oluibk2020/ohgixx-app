const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResult:0
    

    },
  api:{
      access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTFkZGZjZmY4MmFjNDhhNjNmYzhjNjUxMDIwNGEwZCIsInN1YiI6IjY0ZjFmZDAwZTBjYTdmMDBlYzg3Njg0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pV_h6mjsquTi1N7N3n5KX2insmC-zG44JZaGtm2QcJw',
      api_url: 'https://api.themoviedb.org/3/'
  }
};

//display popular TV
async function displayPopularTvShows() {
  const data = await fetchAPIData("tv/popular");
  const popularShows = document.querySelector("#popular-shows");

  data.results.forEach((show) => {
    //TV Show details
    const image = show.poster_path;
    const air_date = show.first_air_date;
    const title = show.name;
    const id = show.id;

    //create virtual dom
    const div = document.createElement("div");
    //add class
    div.classList.add("card");
    //add innerhtml
    div.innerHTML = `<div class="card">
        <a href="tv-details.html?id=${id}">
          ${
            image
              ? `<img
          src="https://image.tmdb.org/t/p/w500${image}"
          class="card-img-top"
          alt="${title}"
        />`
              : `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="${title}"
      />`
          }
        </a>
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">
            <small class="text-muted">Aired: ${air_date}</small>
          </p>
        </div>
      </div>`;
    popularShows.appendChild(div);
  });
}

//display tv details
async function displayTvDetails() {
    const tvId = window.location.search.split('=')[1]
    const data = await fetchAPIData(`tv/${tvId}`)

    //display background image
    displayBackgroundImage('show',data.backdrop_path)


    //movie details
    const image = data.poster_path;
    const release = data.first_air_date;
    const lastEpisodeToAir = data.last_episode_to_air.name;
    const title = data.name;
    const numberOfEpisodes = data.number_of_episodes;
    const overview = data.overview;
    const homepage = data.homepage;
    const genres = data.genres
    const productionCompany = data.production_companies
    const status = data.status
    const vote = data.vote_average.toFixed(1)

    //create a virtual DOM
    const tvDetail = document.querySelector('#show-details')

    const div = document.createElement('div')

    //add inner html
    div.innerHTML = `<div class="details-top">
    <div>
    ${
        image
          ? `<img
      src="https://image.tmdb.org/t/p/w500${image}"
      class="card-img-top"
      alt="${title}"
    />`
          : `<img
    src="images/no-image.jpg"
    class="card-img-top"
    alt="${title}"
  />`
      }
    </div>
    <div>
      <h2>${title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${vote} / 10
      </p>
      <p class="text-muted">Release Date: ${release}</p>
      <p>
        ${overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
      ${genres.map((genre) => 
        `<li>${genre.name}</li>`
      ).join('')}
      </ul>
      <a href="${homepage}" target="_blank" class="btn">Visit Show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number Of Episodes:</span> ${numberOfEpisodes}</li>
      <li>
        <span class="text-secondary">Last Episode To Air: </span> ${lastEpisodeToAir}
      </li>
      <li><span class="text-secondary">Status:</span> ${status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${productionCompany.map((company) => 
        `<span>${company.name}</span>`
    ).join('')}</div>
  </div>`

  //adding to the dom
  tvDetail.appendChild(div)
}

//display movie details
async function displayMovieDetail() {
    const movieId = window.location.search.split('=')[1]

    const data = await fetchAPIData(`movie/${movieId}`);

    //display background image
displayBackgroundImage('movie',data.backdrop_path)
    
    //movie details
    const image = data.poster_path;
    const release = data.release_date;
    const title = data.title;
    const overview = data.overview;
    const homepage = data.homepage;
    const genres = data.genres
    //toLocaleString("en-US") adds comma to numbers
    const budget = data.budget.toLocaleString("en-US")
    const revenue = data.revenue.toLocaleString("en-US")
    const runtime = data.runtime
    const productionCompany = data.production_companies
    const status = data.status
    const vote = data.vote_average.toFixed(1)
    const backdrop = data.backdrop_path
    
    
    //create a virtual DOM
    const movieDetail = document.querySelector('#movie-details')
    const div = document.createElement('div')
    
    
    div.innerHTML = `<div class="details-top">
    <div>
    ${
        image
          ? `<img
      src="https://image.tmdb.org/t/p/w500${image}"
      class="card-img-top"
      alt="${title}"
    />`
          : `<img
    src="images/no-image.jpg"
    class="card-img-top"
    alt="${title}"
    />`
}
</div>
<div>
<h2>${title}</h2>
<p>
<i class="fas fa-star text-primary"></i>
${vote} / 10
</p>
<p class="text-muted">Release Date: ${release}</p>
<p>
${overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
      ${genres.map((genre) => 
        `<li>${genre.name}</li>`
        ).join('')}
        </ul>
        <a href="${homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
        </div>
        </div>
        <div class="details-bottom">
        <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${budget}</li>
      <li><span class="text-secondary">Revenue:</span> $${revenue}</li>
      <li><span class="text-secondary">Runtime:</span> ${runtime} minutes</li>
      <li><span class="text-secondary">Status:</span> ${status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${productionCompany.map((company) => 
        `<span>${company.name}</span> `
    ).join('')}</div>
  </div>`

  movieDetail.appendChild(div)
}




//display 20 popular movies
async function displayPopularMovies() {
  const data = await fetchAPIData("/movie/popular");
  const popularMovies = document.querySelector("#popular-movies");

  data.results.forEach((movie) => {
    //movie details
    const image = movie.poster_path;
    const release = movie.release_date;
    const title = movie.title;
    const id = movie.id;
    //creating a virtual DIV
    const div = document.createElement("div");
    //adding card class
    div.classList.add("card");
    //adding inner html
    div.innerHTML = `<a href="movie-details.html?id=${id}">
        ${
          image
            ? `<img
        src="https://image.tmdb.org/t/p/w500${image}"
        class="card-img-top"
        alt="${title}"
      />`
            : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${title}"
    />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${release}</small>
        </p>
      </div>`;
    //appending to the child of popularmovies ID
    popularMovies.appendChild(div);
  });
  data.results;
}

// Display Backdrop On Details Pages
function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';
  
    if (type === 'movie') {
      document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
      document.querySelector('#show-details').appendChild(overlayDiv);
    }
  }

//fetch data from the API

async function fetchAPIData(endpoint) {
  const ACCESS_TOKEN =
    global.api.access_token;
  const API_URL = global.api.api_url;
  showSpinner();

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  const data = await response.json();
  hideSpinner();
  return data;
}


//show spinner
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

//display slider TV shows
async function displayShowSlider() {
  const {results} = await fetchAPIData('tv/airing_today')
  

  results.forEach(result => {
    const div = document.createElement('div')
    div.classList.add('swiper-slide')

    div.innerHTML = `<div class="swiper-slide">
    <a href="movie-details.html?id=${result.id}">
    ${
      result.poster_path
        ? `<img
    src="https://image.tmdb.org/t/p/w500${result.poster_path}"
    class="card-img-top"
    alt="${result.name}"
  />`
        : `<img
  src="images/no-image.jpg"
  class="card-img-top"
  alt="${result.name}"
/>`
    }
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${result.vote_average} / 10
    </h4>
  </div>`

  document.querySelector('.swiper-wrapper').appendChild(div)
  
  initSwiper()
  });
}

//display slider movies
async function displaySlider() {
  const {results} = await fetchAPIData('movie/now_playing')
  

  results.forEach(result => {
    const div = document.createElement('div')
    div.classList.add('swiper-slide')

    div.innerHTML = `<div class="swiper-slide">
    <a href="movie-details.html?id=${result.id}">
    ${
      result.poster_path
        ? `<img
    src="https://image.tmdb.org/t/p/w500${result.poster_path}"
    class="card-img-top"
    alt="${result.title}"
  />`
        : `<img
  src="images/no-image.jpg"
  class="card-img-top"
  alt="${result.title}"
/>`
    }
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${result.vote_average} / 10
    </h4>
  </div>`

  document.querySelector('.swiper-wrapper').appendChild(div)
  
  initSwiper()
  });
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    breakpoints: {
      500: {
        slidesPerView: 2
      },
      700: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      },
    }
  })
}

//fetch search data from the API

async function searchAPIData() {
  const ACCESS_TOKEN =
    global.api.access_token;
  const API_URL = global.api.api_url;
  showSpinner();

  const response = await fetch(`${API_URL}search/${global.search.type}?include_adult=false&language=en-US&query=${global.search.term}&page=${global.search.page}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  const data = await response.json();
  hideSpinner();
  return data;
}

//search movies
async function search() {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
 global.search.type = urlParams.get('type')
 global.search.term = urlParams.get('search-term')

 if (global.search.term !== '' && global.search.term !== null) {
  const {results, total_pages, page, total_results} = await searchAPIData();

  //assigning current data values to global variables
  global.search.page = page
  global.search.totalPages = total_pages
  global.search.totalResult = total_results

  if (results.length === 0) {
    showAlert('No result found')
    return
  }

  displaySearchResults(results)

  //clear search input
  document.querySelector('#search-term').value = ''
 } else{
  showAlert('please enter a search item')
 }
}

//displaying search to DOM
function displaySearchResults(data) {
  const searchResults = document.querySelector('#search-results')

  //clear previous results
  searchResults.innerHTML = ''
  document.querySelector('#search-results-heading').innerHTML = ''
  document.querySelector('#pagination').innerHTML = ''

  //display to DOM
  data.forEach(search => {
    
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `<a href="${global.search.type}-details.html?id=${search.id}">
    ${
      search.poster_path
        ? `<img
    src="https://image.tmdb.org/t/p/w500${search.poster_path}"
    class="card-img-top"
    alt="${global.search.type === 'movie' ? search.title : search.name}"
  />`
        : `<img
  src="images/no-image.jpg"
  class="card-img-top"
  alt="${global.search.type === 'movie' ? search.title : search.name}"
/>`
    }
  </a>
  <div class="card-body">
    <h5 class="card-title">${global.search.type === 'movie' ? search.title : search.name}</h5>
    <p class="card-text">
      <small class="text-muted">Release: ${ global.search.type=== 'movie' ? search.release_date : search.first_air_date}</small>
    </p>
  </div>`
  searchResults.appendChild(div)
  })

  displayPagination()

  //displaying results heading
  document.querySelector('#search-results-heading').innerHTML = `<h2>${data.length} 0f ${global.search.totalResult} Results For ${global.search.type} found</h2>`
}

//display pagination for search
function displayPagination() {
  const div = document.createElement('div')
  div.classList.add('pagination')
  div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `
  document.querySelector('#pagination').appendChild(div)

  //disable prev btn if on firstpage
  if (global.search.page === 1) {
    document.querySelector('#prev').disabled = true
  }
  //disable next btn if on lastpage
  if (global.search.page === global.search.totalPages) {
    document.querySelector('#next').disabled = true
  }

  //next page
  document.querySelector('#next').addEventListener('click', async function () {
    global.search.page++
    const {results, total_pages} = await searchAPIData()
    displaySearchResults(results)
  })

  //previous page
  document.querySelector('#prev').addEventListener('click', async function () {
    global.search.page--
    const {results, total_pages} = await searchAPIData()
    displaySearchResults(results)
  } )
}

//show alert
function showAlert(message, className = 'error') {
  const alertEl = document.createElement('div')
  alertEl.classList.add('alert', className)
  alertEl.appendChild(document.createTextNode(message))
  document.querySelector('#alert').appendChild(alertEl)

  setTimeout(() => 
    
   alertEl.remove(),3000)
}

//highlight active link
function highLightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

//Init App
function init() {
  if (global.currentPage === "/" || global.currentPage === "/index.html") {
    displaySlider()
    displayPopularMovies();
  } else if (global.currentPage === "/shows.html") {
    displayShowSlider()
    displayPopularTvShows();
  } else if (global.currentPage === "/search.html") {
    search()
  } else if (global.currentPage === "/movie-details.html") {
    displayMovieDetail()
  } else if (global.currentPage === "/tv-details.html") {
    displayTvDetails()
  }

  highLightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
