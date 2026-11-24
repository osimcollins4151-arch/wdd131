const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const gallery = document.querySelector("#temple-gallery");
const filterTitle = document.querySelector("#filter-title");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last modified: ${new Date(
  document.lastModified
).toLocaleString()}`;

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute(
    "aria-label",
    isExpanded ? "Open navigation menu" : "Close navigation menu"
  );
  menuToggle.textContent = isExpanded ? "☰" : "×";
  navigation.classList.toggle("is-open", !isExpanded);
});

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-75244-main.jpg"
  },
  {
    templeName: "San Diego California Temple",
    location: "San Diego, California, United States",
    dedicated: "1993, April, 25",
    area: 58005,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/san-diego-california-temple/san-diego-california-temple-9060-main.jpg"
  },
  {
    templeName: "Laie Hawaii Temple",
    location: "Laie, Hawaii, United States",
    dedicated: "1919, November, 27",
    area: 42100,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/laie-hawaii-temple/laie-hawaii-temple-7370-main.jpg"
  }
];

const filters = {
  home: () => true,
  old: (temple) => Number(temple.dedicated.split(",")[0]) < 1900,
  new: (temple) => Number(temple.dedicated.split(",")[0]) > 2000,
  large: (temple) => temple.area > 90000,
  small: (temple) => temple.area < 10000
};

function createTempleCard(temple) {
  const card = document.createElement("article");
  card.className = "temple-card";

  const title = document.createElement("h3");
  title.textContent = temple.templeName;

  const image = document.createElement("img");
  image.src = temple.imageUrl;
  image.alt = temple.templeName;
  image.loading = "lazy";

  const location = document.createElement("p");
  location.textContent = `Location: ${temple.location}`;

  const dedication = document.createElement("p");
  dedication.textContent = `Dedicated: ${temple.dedicated}`;

  const area = document.createElement("p");
  area.className = "temple-area";
  area.textContent = `Area: ${temple.area.toLocaleString()} square feet`;

  card.append(title, image, location, dedication, area);
  return card;
}

function renderTemples(filterName) {
  const matchingTemples = temples.filter(filters[filterName]);
  gallery.replaceChildren(...matchingTemples.map(createTempleCard));
  filterTitle.textContent =
    filterName.charAt(0).toUpperCase() + filterName.slice(1);

  navigation.querySelectorAll("[data-filter]").forEach((link) => {
    if (link.dataset.filter === filterName) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

navigation.addEventListener("click", (event) => {
  const filterLink = event.target.closest("[data-filter]");
  if (!filterLink) {
    return;
  }

  event.preventDefault();
  renderTemples(filterLink.dataset.filter);
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  menuToggle.textContent = "☰";
  navigation.classList.remove("is-open");
});

renderTemples("home");
