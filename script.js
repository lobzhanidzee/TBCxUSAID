"use strict";

// Checking resolution for header

document.addEventListener("DOMContentLoaded", function () {
  function isDesktopResolution() {
    return window.innerWidth >= 1024;
  }

  function handleScroll() {
    const header = document.querySelector("header");

    if (window.scrollY > 0) {
      header.classList.add("headerScroll");
    } else {
      header.classList.remove("headerScroll");
    }
  }

  if (isDesktopResolution()) {
    document.addEventListener("scroll", handleScroll);
  } else {
    let prevScrollPos = window.pageYOffset;

    window.onscroll = function () {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos) {
        document.querySelector("header").style.position = "sticky";
      } else {
        document.querySelector("header").style.position = "relative";
        document.querySelector(".burgerbox").style.position = "static";
      }
      document.addEventListener("scroll", handleScroll);
      prevScrollPos = currentScrollPos;
    };
  }
});

// Disable scroll while navbar is active
let isScrollDisabled = false;
const backgroundBlur = document.getElementById("background-blur");

backgroundBlur.addEventListener("click", function () {
  document.getElementById("menyAvPaa").checked = false;
  navBarClose();
});
document.querySelector(".burger").addEventListener("click", function () {
  if (isScrollDisabled) {
    navBarClose();
  } else {
    navBarOpen();
  }
});
function preventDefault(e) {
  e.preventDefault();
}
// For nav bar open and close
function navBarOpen() {
  let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  if (window.scrollY > 0) {
    document.querySelector("header").classList.toggle("headerScroll");
    document.querySelector("header").style.position = "sticky";
  }

  document.querySelector("header").style.zIndex = "5";
  document.querySelector("header img").style.opacity = "0.5";
  document.querySelector("header").classList.remove("headerScroll");

  document.querySelector(".burgerbox").style.position = "fixed";
  document.querySelector(".burgerbox").style.right = "20px";

  document.getElementById("background-blur").style.display = "block";

  document.body.setAttribute("data-scroll-position", scrollPosition);

  window.addEventListener("wheel", preventDefault, { passive: false });
  window.addEventListener("touchmove", preventDefault, { passive: false });
  isScrollDisabled = true;
}

function navBarClose() {
  let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  document.querySelector("header").classList.toggle("headerScroll");
  document.querySelector("header").style.opacity = "auto";
  document.querySelector("header img").style.opacity = "1";
  document.querySelector("header").style.zIndex = "2";

  document.body.style.overflow = "auto";

  document.getElementById("background-blur").style.display = "none";

  window.scrollTo(0, scrollPosition);
  window.removeEventListener("wheel", preventDefault, { passive: false });
  window.removeEventListener("touchmove", preventDefault, { passive: false });
  isScrollDisabled = false;
}

// For slider
let activeSlide = 0;
let recentlyClicked = false;

const bright = function (i) {
  let dotActive = document.querySelector(`.dot${i}`);
  if (i == activeSlide) {
    dotActive.style.opacity = "1";
  } else {
    dotActive.style.opacity = "0.8";
  }
};
bright(activeSlide);

const slideshow = function (num) {
  let slides = document.getElementsByClassName("slide");
  if (num == slides.length) {
    activeSlide = 0;
    num = 0;
  }
  if (num < 0) {
    activeSlide = slides.length - 1;
    num = slides.length - 1;
  }
  for (let y of slides) {
    y.style.display = "none";
  }
  slides[num].style.display = "flex";
  for (let i = 0; i < slides.length; i++) {
    bright(i);
  }
};
slideshow(activeSlide);

let timeoutId = null;
const delay = 4000;

const controller = function (x) {
  activeSlide += x;
  recentlyClicked = true;
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    recentlyClicked = false;
  }, delay);

  slideshow(activeSlide);
};

const dotController = function (x) {
  activeSlide = x;
  recentlyClicked = true;
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    recentlyClicked = false;
  }, delay);

  slideshow(activeSlide);
};

const automaticSlide = function () {
  if (recentlyClicked == false) {
    activeSlide++;
    slideshow(activeSlide);
  }
};

setInterval(automaticSlide, 5000);

// For frequancy asked question container
const firstQuestionBtn = document.querySelector(".question1 > div");
const secondQuestionBtn = document.querySelector(".question2 > div");
const thirdQuestionBtn = document.querySelector(".question3 > div");

const firstQuestion = document.querySelector(".question1-text");
const secondQuestion = document.querySelector(".question2-text");
const thirdQuestion = document.querySelector(".question3-text");

const firstArrow = document.querySelector(".firstArrow");
const secondArrow = document.querySelector(".secondArrow");
const thirdArrow = document.querySelector(".thirdArrow");

const showText = function (question, arrow) {
  question.classList.toggle("hidden");
  !question.classList.contains("hidden")
    ? (arrow.style.transform = "rotate(90deg)")
    : (arrow.style.transform = "rotate(270deg)");
};

const hideText = function (question, question2, arrow1, arrow2) {
  question.classList.add("hidden");
  question2.classList.add("hidden");
  !question.classList.contains("hidden")
    ? (arrow1.style.transform = "rotate(90deg)")
    : (arrow1.style.transform = "rotate(270deg)");
  !question2.classList.contains("hidden")
    ? (arrow2.style.transform = "rotate(90deg)")
    : (arrow2.style.transform = "rotate(270deg)");
};

firstQuestionBtn.addEventListener("click", function () {
  showText(firstQuestion, firstArrow);
  hideText(secondQuestion, thirdQuestion, secondArrow, thirdArrow);
});

secondQuestionBtn.addEventListener("click", function () {
  showText(secondQuestion, secondArrow);
  hideText(firstQuestion, thirdQuestion, firstArrow, thirdArrow);
});

thirdQuestionBtn.addEventListener("click", function () {
  showText(thirdQuestion, thirdArrow);
  hideText(firstQuestion, secondQuestion, firstArrow, secondArrow);
});

document
  .getElementById("expandButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("background-blur").style.display = "block";
    document.getElementById("expandableWindow").classList.toggle("show");
  });

const closeBtn = function (btnNum) {
  document
    .getElementById(`${btnNum}`)
    .addEventListener("click", function (event) {
      event.preventDefault();
      document.getElementById("background-blur").style.display = "none";
      document.getElementById("expandableWindow").classList.remove("show");
    });
};

closeBtn("closeButton");
closeBtn("closeLargeButton");
closeBtn("background-blur");
