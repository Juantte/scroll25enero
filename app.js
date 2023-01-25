let sliderWrap = document.querySelector(".slider-wrap");
let slider = document.querySelector(".slider");
let imgDiv = document.querySelector(".img-div");
let clonesWidth;
let sliderWidth;
let clones = [];
let disableScroll = false;
let scrollPos;
let initialScrollPos;

let items = [...document.querySelectorAll(".slider-item")];
let images = [...document.querySelectorAll(".img-div")];

// images.forEach((image, idx) => {
//   image.style.backgroundImage = `url(./images/${idx + 1}.jpg`;
// });

items.forEach((item) => {
  let clone = item.cloneNode(true);
  clone.classList.add("clone");
  slider.appendChild(clone);
  clones.push(clone);
});

function getClonesWidth() {
  let width = 0;
  clones.forEach((clone) => {
    width += clone.offsetWidth;
  });
  return width;
}

// function getClonesWidthHeight() {
//   return (
//     (clonesWidthHeight = 0),
//     clones.forEach((e) => {
//       clonesWidthHeight += e.offsetWidth + 20;
//     }),
//     clonesWidthHeight
//   );
// }

function getScrollPos() {
  return window.scrollY;
}

console.log(getScrollPos());

function scrollUpdate() {
  scrollPos = getScrollPos();
  if (clonesWidth + scrollPos >= sliderWidth) {
    window.scrollTo({ top: 1 });
  } else if (scrollPos <= 0) {
    window.scrollTo({ top: sliderWidth - clonesWidth - 1 });
  }

  slider.style.transform = `translateY(${-window.scrollY}px)`;

  requestAnimationFrame(scrollUpdate);
}

function onLoad() {
  calculateDimensions();
  document.body.style.height = `${sliderWidth}px`;
  window.scrollTo({ left: 1 });
  scrollUpdate();
}

function calculateDimensions() {
  sliderWidth = slider.getBoundingClientRect().width;
  clonesWidth = getClonesWidth();
}

onLoad();
