const weatherApiKey = "8f4d0929777db0539221589bab48bd3f";
const weatherApiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&";

const galleryImages = [
  {
    src: "./assets/gallery/image1.jpg",
    alt: "Thumbnail Image 1",
  },
  {
    src: "./assets/gallery/image2.jpg",
    alt: "Thumbnail Image 2",
  },
  {
    src: "./assets/gallery/image3.jpg",
    alt: "Thumbnail Image 3",
  },
];

const products = [
  {
    title: "AstroFiction",
    author: "John Doe",
    price: 49.9,
    image: "./assets/products/img6.png",
  },
  {
    title: "Space Odissey",
    author: "Marie Anne",
    price: 35,
    image: "./assets/products/img1.png",
  },
  {
    title: "Doomed City",
    author: "Jason Cobert",
    price: 0,
    image: "./assets/products/img2.png",
  },
  {
    title: "Black Dog",
    author: "John Doe",
    price: 85.35,
    image: "./assets/products/img3.png",
  },
  {
    title: "My Little Robot",
    author: "Pedro Paulo",
    price: 0,
    image: "./assets/products/img5.png",
  },
  {
    title: "Garden Girl",
    author: "Ankit Patel",
    price: 45,
    image: "./assets/products/img4.png",
  },
];

// MENU
const menuHandler = () => {
  document.querySelector("#open-nav-menu").addEventListener("click", () => {
    document.querySelector("header nav .wrapper").classList.add("nav-open");
  });

  document.querySelector("#close-nav-menu").addEventListener("click", () => {
    document.querySelector("header nav .wrapper").classList.remove("nav-open");
  });
};

const celsiusToFahr = (temperature) => {
  return temperature * (9 / 5) + 32;
};

// WELCOME
const welcomeHandler = () => {
  let greetingText = "Welcome";
  let localTime = new Date();
  let currentHour = localTime.getHours();

  if (currentHour < 12) {
    greetingText = "Good morning!";
  } else if (currentHour < 19) {
    greetingText = "Good afternoon!";
  } else if (currentHour < 24) {
    greetingText = "Good evening!";
  }

  document.querySelector("#greeting").innerHTML = greetingText;
};

// TIME
const localTimeHandler = () => {
  const updateTime = () => {
    let localTime = new Date();

    document.querySelector("span[data-time=hours]").textContent = localTime
      .getHours()
      .toString()
      .padStart(2, "0");
    document.querySelector("span[data-time=minutes]").textContent = localTime
      .getMinutes()
      .toString()
      .padStart(2, "0");
    document.querySelector("span[data-time=seconds]").textContent = localTime
      .getSeconds()
      .toString()
      .padStart(2, "0");
  };

  setInterval(updateTime, 1000);
};

// GALLERY
const galleryHandler = () => {
  const mainImage = document.querySelector("#gallery > img");
  mainImage.src = galleryImages[0].src;
  mainImage.alt = galleryImages[0].alt;

  const thumbnails = document.querySelector("#gallery .thumbnails");

  galleryImages.forEach((img, index) => {
    let thumb = document.createElement("img");
    thumb.src = img.src;
    thumb.alt = img.alt;
    thumb.dataset.arrayIndex = index;
    thumb.dataset.selected = index === 0 ? true : false;

    thumb.addEventListener("click", (e) => {
      let selectedIndex = e.target.dataset.arrayIndex;
      let selectedImage = galleryImages[selectedIndex];

      mainImage.src = selectedImage.src;
      mainImage.alt = selectedImage.alt;

      thumbnails.querySelectorAll("img").forEach((img) => {
        img.dataset.selected = false;
      });

      e.target.dataset.selected = true;
    });

    thumbnails.append(thumb);
  });
};

// PRODUCTS
const populateProducts = (productList) => {
  let productSection = document.querySelector(".products-area");
  productSection.textContent = "";

  productList.forEach((product, index) => {
    let prodElement = document.createElement("div");
    prodElement.classList.add("product-item");

    let prodImage = document.createElement("img");
    prodImage.src = product.image;
    prodImage.alt = product.title;

    let prodDetails = document.createElement("div");
    prodDetails.classList.add("product-details");

    prodDetails.innerHTML = `<h3 class="product-title">${product.title}</h3>
    <p class="product-author">${product.author}</p>
    <p class="price-title">Price</p>
    <p class="product-price">$ ${
      product.price > 0 ? product.price.toFixed(2) : "FREE"
    }</p>`;

    prodElement.append(prodImage, prodDetails);

    productSection.append(prodElement);
  });
};

const productsHandler = () => {
  let freeProducts = products.filter((p) => !p.price || p.price === 0);
  let paidProducts = products.filter((p) => p.price > 0);

  populateProducts(products);

  document.querySelector(
    ".products-filter label[for=all] span.product-amount"
  ).textContent = products.length;
  document.querySelector(
    ".products-filter label[for=paid] span.product-amount"
  ).textContent = paidProducts.length;
  document.querySelector(
    ".products-filter label[for=free] span.product-amount"
  ).textContent = freeProducts.length;

  let productsFilter = document.querySelector(".products-filter");
  productsFilter.addEventListener("click", (e) => {
    if (e.target.id === "all") {
      populateProducts(products);
    } else if (e.target.id === "paid") {
      populateProducts(paidProducts);
    } else if (e.target.id === "free") {
      populateProducts(freeProducts);
    }
  });
};

// FOOTER
const footerHandler = () => {
  let year = new Date().getFullYear();
  document.querySelector(
    "footer"
  ).textContent = `${year} - All rights reserved`;
};

// WEATHER
const weatherHandler = () => {
  navigator.geolocation.getCurrentPosition((pos) => {
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;
    let url = `${weatherApiUrl}lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const condition = data.weather[0].description;
        const temperature = data.main.temp;
        const location = data.name;

        let celsiusText = `The weather is ${condition} in ${location} and it's ${Math.round(
          temperature
        ).toString()}°C outside.`;
        let fahrText = `The weather is ${condition} in ${location} and it's ${Math.round(
          celsiusToFahr(temperature)
        ).toString()}°F outside.`;

        const weatherP = document.querySelector("p#weather");
        weatherP.innerHTML = celsiusText;

        document
          .querySelector(".weather-group")
          .addEventListener("click", (e) => {
            if (e.target.id === "celsius") {
              weatherP.innerHTML = celsiusText;
            } else if (e.target.id === "fahr") {
              weatherP.innerHTML = fahrText;
            }
          });
      })
      .catch((error) => {
        console.log("Error", error);
        weatherP.innerHTML = "Error fetching weather data";
      });
  });
};

// PAGE
menuHandler();
welcomeHandler();
weatherHandler();
localTimeHandler();
galleryHandler();
productsHandler();
footerHandler();
