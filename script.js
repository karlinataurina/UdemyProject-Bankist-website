'use strict';

/* SMOOTH SCROLLING FOR "LEARN MORE" BUTTON:
when we click on the "learn more" button, the page scrolls smoothly to the section below.
- Selects the button element from html with the class "btn--scroll-to",
and stores it in a variable called "btnScrollTo": */
const btnScrollTo = document.querySelector('.btn--scroll-to');

/* Selects the section element from html with the id "section--1" & stores it in a
variable called "section1": */
const section1 = document.querySelector('#section--1');
/* SMOOTH SCROLLING FOR "LEARN MORE" BUTTON END */

/* NAV SELECTOR: FOR NICE EFFECT ON PAGE NAVIGATION LATER IN CODE
Selects the nav element from html with the class "nav" & stores it in a variable called "nav": */
const nav = document.querySelector('.nav');
/* NAV SELECTOR END */

/* TABBED BUTTONS START:
selects all the elements with the class "operations__tab" and stores it in a variable called "tabs"
(these will be each individual tabs/buttons): */
const tabs = document.querySelectorAll('.operations__tab');

/* selects the element with the class "operations__tab-container" and stores it in a variable called "tabsContainer"
- it's a container that contains the tab buttons: */
const tabsContainer = document.querySelector('.operations__tab-container');

/* selects all the elements with the class "operations__content" and stores it in a variable called "tabsContent"
(these will be each individual tabs contents) */
const tabsContent = document.querySelectorAll('.operations__content');
/* TABBED BUTTONS END */

/* MODAL WINDOW: */
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (event) {
  event.preventDefault(); /* the page stays where it was when the button was clicked,
  if we didn't have this line, the page would jump to the top */
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

/* FOR LOOP:
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

FOREACH LOOP:
- btnsOpenModal is a node list(because of the querySelectorAll method), not an array,
but we can still use the "forEach" method.
This function opens modal window when "open account" buttons are clicked: */
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

/* CLOSE MODAL WITH CLICKING X:
This function closes modal window when "close" button is clicked: */
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// CLOSE MODAL WITH ESC: This function closes modal window when "esc" key is pressed:
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/* MODAL WINDOW END */

/* SMOOTH SCROLLING FOR "LEARN MORE" BUTTON:
smoothly scrolls to the first section which also happens to be the first
item in navigation.
when the button is clicked, the function is executed and the page scrolls
to the section below smoothly: */
btnScrollTo.addEventListener('click', function (event) {

  // gets the coordinates of the section1 element so that we know how far it is from the top of the page:
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // gets the coordinates of the button element so that we know how far it is from the top of the page:
  console.log(event.target.getBoundingClientRect());

  // NOTE: we need element coordinates so that we can tell JavaScript where it should scroll to. "s1coords" = section 1 coordinates.

  // in console: "Current scroll (X/Y) 0 0" - if we're on top of the page when we click the button:
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // getting the height & width of the viewport:
  console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);

  /* Scrolling:
  window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  Scrolling2: just a bit more modern way:
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  Scrolling3: even more modern way, works on all modern browsers: */
  section1.scrollIntoView({ behavior: 'smooth' });
});
/* SMOOTH SCROLLING FOR "LEARN MORE" BUTTON END */

/* IMPLEMENTING PAGE NAVIGATION: smooth scrolling to page sections from navigation
document.querySelectorAll(".nav__link").forEach(function (currentElement) { // selects all the elements with the class "nav__link" and stores them in a node list for later retrieval later on
//("currentElement" is the name of the variable that we're going to use to store the current element in the loop)
//- we're using the "forEach" method to loop over the node list and execute the function for each element in the node list.
  currentElement.addEventListener("click", function (event) { // when we click on any of the elements with the class "nav__link", the function is executed and the page scrolls to the section below smoothly:
    event.preventDefault(); // the page stays where it was when the button was clicked, if we didn't have this line, the page would jump to the top.
    const id = this.getAttribute("href"); // gets the value of the "href" attribute of the current element and stores it in a variable called "id".
    document.querySelector(id).scrollIntoView({ behavior: "smooth" }); // scrolls to the section below smoothly.
  });
});
// SMOOTH PAGE NAVIGATION END */

/* IMPLEMENTING PAGE NAVIGATION A BETTER WAY: with event delegation
1. Add event listener to common parent element of all elements we're interested in, and then remove the event listener from the elements themselves. */
document.querySelector(".nav__links") /* selects the element with the class "nav__links"
"nav__links" holds all menu items in html code. it's a container for all menu items - it's an unorganised list which then holds list items[1 list item = 1 menu item]

2. Determine what element originated the event(where the event was actually created.) */
.addEventListener("click", function (event) {
  event.preventDefault(); // the page stays where it was when the button was clicked, if we didn't have this line, the page would jump to the top

  /* 3. Matching strategy: if the element that was clicked on has the class "nav__link", then we want to console.log "link".
  If we click somewhere else - next to navigation buttons, we get the whole "nav__links" list in console. */
  if (event.target.classList.contains("nav__link")) {
    const id = event.target.getAttribute("href"); // gets the value of the "href" attribute of the current element and stores it in a variable called "id".
    document.querySelector(id).scrollIntoView({ behavior: "smooth" }); // scrolls to the section below smoothly.
  }
});
// IMPLEMENTING PAGE NAVIGATION END

/* BUILDING TABBED COMPONENTS START: what is tabbed components?
- we have a container with 3 buttons & 3 sections, each section coressponds to one button.
Each section contains some content.
- when we click on a button, the content of the corresponding section is displayed.
- when we click on another button, the content of other section is displayed.
- It's like a carousel, but with the class "nav__link" and
the class "nav__link--active" added to the buttons.
- when we click one of the buttons, the class "nav__link--active" is added to the
button and the class "nav__link--active" is removed from the other buttons.
- when we click one of the buttons, the class "hidden" is removed from the corresponding
section. */

//event delegation:
tabsContainer.addEventListener('click', function (event) {
  /* selects the element with the class "operations__tab" and stores it in a variable called
  "clicked" - it's the element that was clicked on: */
  const clicked = event.target.closest('.operations__tab');
  //console.log(clicked); // <-- in console we see the element that was clicked on

  /* if we click somewhere else in the container that is not on the button,
  the function stops executing - basically we can't click anywhere else but on the buttons.
  If we click on the button, the code line below is executed
  (the clicked button becomes active(gets a class "active")): */
  if (!clicked) return;

  /* selects all elements with the class "operations__tab" and removes the class "active" from all of them.
  So now when we click a button, only content for that button shows up, but all buttons don't move: */
  tabs.forEach(tabs => tabs.classList.remove('operations__tab--active'));

  /* selects all elements with the class "operations__content" and removes the class "active" from all of them,
  this means that now when we click on a button, only content window for this button appears(without content yet): */
  tabsContent.forEach(content => content.classList.remove('operations__content--active'));
  
  /* adds the active class to the element that was clicked on,
  so now when we click on a button - it rises up, but all others stay down: */
  clicked.classList.add('operations__tab--active');

  /* activate content area:
  selects the element with the class "operations__content" and adds the class "active" to it!
  now when clicking on buttons, the corresponding content is displayed: */
  document
  .querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');
});
// BUILDING TABBED COMPONENTS END

/*/////////////////////////////////////Version 1 ----///////////////////////////////////////////////////////
// NICE EFFECT ON PAGE NAVIGATION WHERE ALL THE OTHER LINKS FADE OUT WHEN HOVERED OVER ONE OF THEM
[except the one that is hovered over]: this will teach how to pass arguments into event handler functions.

Event delegation again:
we'll use the entire navigation[so we'll take the class that starts the navigation container]
as our parent container[element] on which we'll handle the event that's gonna bubble up from the links
[Remember that this works because events bubble up from their target].
This whole code block makes nav links and logo grayed out when we hover on one of the nav links, so we know which link we're hovering //
nav.addEventListener('mouseover', function (event) {
  if (event.target.classList.contains('nav__link')) {// if the element that was hovered over has the class "nav__link",
    const linkHovered = event.target;
    const linkSiblings = linkHovered.closest('.nav').querySelectorAll('.nav__link');
    const logo = linkHovered.closest('.nav').querySelector('img'); 

    linkSiblings.forEach(link => {
      if (link !== linkHovered) link.style.opacity = 0.5; // if the link is not the one that was hovered over, then it's opacity is set to 0.5
    });
    logo.style.opacity = 0.5; // sets the opacity of the logo to 0.5 when we hover over the links
  }
});

// when we stop hovering over the links, the opacity of the links and logo is set back to 1: //
nav.addEventListener('mouseout', function (event) {
  if (event.target.classList.contains('nav__link')) {
    const linkHovered = event.target;
    const linkSiblings = linkHovered.closest('.nav').querySelectorAll('.nav__link');
    const logo = linkHovered.closest('.nav').querySelector('img'); 

    linkSiblings.forEach(link => {
      if (link !== linkHovered) link.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});
/* NICE EFFECT ON PAGE NAVIGATION END 

/////////////////////////////////////Version 2 ----///////////////////////////////////////////////////////
NICE EFFECT ON PAGE NAVIGATION - same functionality cleaner code [refactored]:*/
/* const handleHover = function (event, opacity) {
  if (event.target.classList.contains('nav__link')) {
    const linkHovered = event.target;
    const linkSiblings = linkHovered.closest('.nav').querySelectorAll('.nav__link');
    const logo = linkHovered.closest('.nav').querySelector('img'); 

    linkSiblings.forEach(link => {
      if (link !== linkHovered) link.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', function (event) {
  handleHover(event, 0.5);
});
nav.addEventListener('mouseout', function (event) {
  handleHover(event, 1);
});
/* NICE EFFECT ON PAGE NAVIGATION END

/////////////////////////////////////Version 3 ----///////////////////////////////////////////////////////
NICE EFFECT ON PAGE NAVIGATION - same functionality EVEN MORE cleaner code [refactored]:*/
const handleHover = function (event) {
  if (event.target.classList.contains('nav__link')) {
    const linkHovered = event.target;
    const linkSiblings = linkHovered.closest('.nav').querySelectorAll('.nav__link');
    const logo = linkHovered.closest('.nav').querySelector('img'); 

    linkSiblings.forEach(link => {
      if (link !== linkHovered) link.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
/* NICE EFFECT ON PAGE NAVIGATION END */

/* STICKY NAVIGATION version1: scroll event [not efficient - should be avoided]
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);//in console we see the coordinates of the section1 element

window.addEventListener('scroll', function () {
  console.log(window.scrollY);
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
* STICKY NAVIGATION scroll event END *
///////////////////////////////////////////////////////////////////////////////////

STICKY NAVIGATION - a better way:
THE INTERSECTION OBSERVER API */
const header = document.querySelector('.header'); // we want the sticky nav to reappear on top when we scroll past the header section.
const navHeight = nav.getBoundingClientRect().height; // we use this for rootMargin in the observer

const stickyNav = function (entries) {
  const [entry] = entries; // destructuring to get the first element of the entries
  if (!entry.isIntersecting) nav.classList.add('sticky'); //if entry[target] is not intersecting, then add the class "sticky" to the nav
  else nav.classList.remove('sticky'); // if entry[target] is intersecting, then remove the class "sticky" from the nav
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // the viewport is the root element
  threshold: 0, // when zero header is visible[we've scrolled past it], the nav reappears on top
  rootMargin: `-${navHeight}px` /*`-${nav.getBoundingClientRect().height}px` <-- if we don't have the 'const navHeight' specified above in the code, but in this case we do
  The margin is the height of the nav. This is to make sure that the nav reappears on top
  before we've scrolled past the threshold. So before we reach section1,
  the nav reappears again right when we have left nav heights worth of space before sec1 */
});
headerObserver.observe(header);
/* STICKY NAVIGATION END */

/* REVEALING ELEMENTS ON SCROLL: using the intersection observer API again.
each new section is revealed and isn't visible right away.
Animation itself comes from CSS, but with JS we'll make it work - each section
will appear as we approach it, because at first they're all invisible. */
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return; // if the entry is not intersecting, then we return and do nothing
  entry.target.classList.remove('section--hidden'); // if the entry is intersecting, then we remove the class "section--hidden" from the entry
  observer.unobserve(entry.target); // we unobserve the entry, because we don't want it to be observed anymore
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, // when 15% of the section is visible, the section will be revealed
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
/* REVEALING ELEMENTS ON SCROLL END */

/* LAZY LOADING IMAGES("features" container in our html):
Images are loaded only when they're in the viewport.
They first need to be small, low resolution.
Then next to them in code are the real resolution pics that are loaded when
the image gets in the viewport. For that we use data-src attribute.
Then we're gonna remove the "lazy-img" class - which is a filter that makes the low res
img blurred when out of viewport. */

/* so in this line of code only images with the "data-src" attribute will be selected
for lazy loading because that's where we specified the real high res pictures: */
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // replace src with data-src:
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '100px', // the image will be loaded 100pixels before it gets in the viewport
});

imgTargets.forEach(img => imgObserver.observe(img));
/* LAZY LOADING END */

/* BUILDING SLIDER[carousel on the near bottom of page] COMPONENT: */
const slider = function () {
  const slides = document.querySelectorAll('.slide'); // selects all slides in the html
  const btnLeft = document.querySelector('.slider__btn--left'); // selects the left button
  const btnRight = document.querySelector('.slider__btn--right'); // selects the right button
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0; // the current slide we're on
  // to stop the slider from going out of bounds, we need to know how many slides there are:
  const maxSlide = slides.length;
  //if we have 4 slides, then the maxSlide is 3, because we start counting from 0

  // Functions:
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, index) => (s.style.transform = `translateX(${100 * (index - slide)}%)`)
    );
  };

//next slide:
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const previousSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // to go to next slide with the right button:
  btnRight.addEventListener('click', nextSlide);
  // to go to previous slide with the left button:
  btnLeft.addEventListener('click', previousSlide);

  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') prevSlide();
    event.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('dots__dot')) {
      const { slide } = event.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
/* SLIDER END */