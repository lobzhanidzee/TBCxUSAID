"use strict";

// Checking resolution for header

document.addEventListener("DOMContentLoaded", function () {
  function isDesktopResolution() {
    return window.innerWidth >= 768;
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
      }
      document.addEventListener("scroll", handleScroll);
      prevScrollPos = currentScrollPos;
    };
  }
});

// Disable scroll while navbar is active
let isScrollDisabled = false;

document.querySelector(".burger").addEventListener("click", function () {
  if (isScrollDisabled) {
    enableScroll();
  } else {
    disableScroll();
  }
});

function disableScroll() {
  let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  document.body.style.overflow = "hidden";
  document.body.style.boxShadow = "1000px 1500px 1000px #212121 inset";
  document.body.style.position = "static";
  document.querySelector("main").style.opacity = "0.7";
  document.querySelector("header").style.boxShadow =
    "1000px 1500px 1000px #black inset";
  document.querySelector("header img").style.opacity = "0.5";
  document.querySelector("footer").style.opacity = "0.7";
  document.querySelector("header").classList.remove("headerScroll");

  document.body.setAttribute("data-scroll-position", scrollPosition);

  isScrollDisabled = true;
}

function enableScroll() {
  let scrollPosition =
    parseInt(document.body.getAttribute("data-scroll-position"), 10) || 0;

  document.body.style.overflow = "auto";
  document.querySelector("main").style.opacity = "1";
  document.body.style.boxShadow = "none";
  document.querySelector("header").style.boxShadow = "none";
  document.querySelector("header").classList.add("headerScroll");
  document.querySelector("header img").style.opacity = "1";
  document.querySelector("footer").style.opacity = "1";
  document.body.style.position = "static";

  window.scrollTo(0, scrollPosition);

  isScrollDisabled = false;
}

// For slider
let activeSlide = 0;

const controller = function (x) {
  activeSlide += x;
  slideshow(activeSlide);
};

const dotController = function (x) {
  activeSlide = x;
  slideshow(activeSlide);
};
const automaticSlide = function () {
  activeSlide++;
  slideshow(activeSlide);
};
setInterval(automaticSlide, 5000);

const bright = function (i) {
  let dotActive = document.querySelector(`.dot${i}`);
  i = activeSlide;
  dotActive.style.opacity = "1";
  if (i != activeSlide) {
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
  bright(activeSlide);
};
slideshow(activeSlide);

// For frequancy asked question
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
