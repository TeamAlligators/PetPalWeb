import "./Home.css";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <body class="page-container">
      <NavBar />
      <div class="body">
        <div class="body-item">
          <img
            class="index-picture"
            src={require("../images/index1.png")}
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
            src={require("../images/index2.png")}
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

export default Home;
