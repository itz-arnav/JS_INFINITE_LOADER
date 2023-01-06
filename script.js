"use strict";

const imageContainer = document.querySelector(".img-container");
const loader = document.querySelector(".loader");

const YOUR_ACCESS_KEY = "hJ1-0DU1ArTXag2vLVKgMjD8bjfB4BKq_5zf4NooiFY";
let COUNT = 10;
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${YOUR_ACCESS_KEY}&count=${COUNT}`;

let photosArray = [];
let readyToLoad = false;
let imagesLoaded = 0;
let totalImages = 0;
let hidden = false;

function countImages() {
  totalImages++;
  imagesLoaded++;
  if (imagesLoaded === COUNT) {
    readyToLoad = true;
  }
  console.log(totalImages);
}
function displayPhotos() {
  if (!hidden) {
    loader.hidden = true;
    hidden = true;
  }
  imagesLoaded = 0;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    item.setAttribute;
    "href", photo.links.html;
    item.setAttribute("target", "_blank");
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("title", photo.alt_description);
    img.setAttribute("alt", photo.alt_description);

    img.addEventListener("load", countImages);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const photos = await fetch(apiURL);
    photosArray = await photos.json();
    displayPhotos();
  } catch (e) {
    console.log(e);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    readyToLoad
  ) {
    readyToLoad = false;
    getPhotos();
  }
});

getPhotos();
