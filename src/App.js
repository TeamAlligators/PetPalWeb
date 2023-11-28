import "./App.css";

function App() {
  return (
    <body class="page-container">
      <nav id="navigation-bar">
        <span id="nav-item-left">
          <a href="index.html">
            <img src={require("./images/logo.png")} class="logo" alt="logo" />
          </a>
        </span>
        <span id="nav-item">
          <a class="nav-link" href="pet-search.html">
            Explore
          </a>
          <a class="nav-icon" href="pet-search.html">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-search-heart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 13a6.474 6.474 0 0 0 3.845-1.258h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.008 1.008 0 0 0-.115-.1A6.471 6.471 0 0 0 13 6.5 6.502 6.502 0 0 0 6.5 0a6.5 6.5 0 1 0 0 13Zm0-8.518c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z" />
            </svg>
          </a>

          <a class="nav-link" href="available-shelters.html">
            Shelters
          </a>
          <a class="nav-icon" href="available-shelters.html">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-houses-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7.207 1a1 1 0 0 0-1.414 0L.146 6.646a.5.5 0 0 0 .708.708L1 7.207V12.5A1.5 1.5 0 0 0 2.5 14h.55a2.51 2.51 0 0 1-.05-.5V9.415a1.5 1.5 0 0 1-.56-2.475l5.353-5.354L7.207 1Z" />
              <path d="M8.793 2a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708L8.793 2Z" />
            </svg>
          </a>

          <a class="nav-link" href="faq-page.html">
            FAQ
          </a>
          <a class="nav-icon" href="faq-page.html">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-clipboard-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"
              />
              <path
                fill-rule="evenodd"
                d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm4 5.982c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z"
              />
            </svg>
          </a>
          <div class="notification-container">
            <div class="red-dot!"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-bell-fill notification nav-icon"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
            </svg>
          </div>
          <a class="sign-up-button" href="signup.html">
            Sign up
          </a>
          <a class="sign-up-button" href="login.html">
            Login
          </a>
        </span>
      </nav>
      <div class="body">
        <div class="body-item">
          <img
            class="index-picture"
            src={require("./images/index1.png")}
            alt="home"
          />
          <div>
            <h1 class="body-text header">
              Bring <span class="purple">pawsitivity</span> in your life with a
              <span class="purple">PetPal</span>
            </h1>
            <p class="body-text paragraph">
              At PetPal, we believe in the magic of unconditional love and the
              joy that a furry companion brings into our lives. Every wag of a
              tail, every purr, and every nuzzle is a reminder that love knows
              no bounds.
            </p>
          </div>
          <img
            class="index-picture-2"
            src={require("./images/index2.png")}
            alt="home2"
          />
        </div>
        <div class="body-item-2">
          <a id="explore-button" class="sign-up-button" href="pet-search.html">
            Explore
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              class="bi bi-search-heart"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z" />
              <path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z" />
            </svg>
          </a>
        </div>
      </div>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"
      ></script>
    </body>
  );
}

export default App;
