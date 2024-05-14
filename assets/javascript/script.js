/*=============== PRELOADER ===============*/
window.addEventListener("load", () => {
  document.querySelector(".js-preloader").classList.add("loaded");
  document
    .querySelector(".js-preloader .js-bg-item")
    .addEventListener("transitionend", () => {
      document.querySelector(".js-preloader").style.display = "none";

      // initialize AOS
      AOS.init({
        duration: 1200,
        easing: "ease-in-out-cubic",
        once: true,
      });
    });
});

/*=============== SCROLL UP ===============*/
// Function to check scroll position and show/hide scroll-to-top button
const scrollUp = () => {
  const scrollUpButton = document.getElementById("scroll-up");

  if (window.scrollY >= 350) {
    scrollUpButton.classList.add("show-scroll");
  } else {
    scrollUpButton.classList.remove("show-scroll");
  }
};

// Function to scroll smoothly to the top
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Event listener for scroll event
window.addEventListener("scroll", scrollUp);

// Event listener for click event on scroll-to-top button
document.getElementById("scroll-up").addEventListener("click", (event) => {
  event.preventDefault(); // Prevent default behavior of anchor tag
  scrollToTop();
});

// Disable scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

/*=============== HEADER ===============*/
function headerMenu() {
  const toggler = document.querySelector(".js-header-toggler");
  const menu = document.querySelector(".js-header-menu");
  const overlay = document.querySelector(".js-overlay");
  const items = menu.querySelectorAll("li");
  const header = document.querySelector(".header");
  const sections = document.querySelectorAll('section[id]');

  if (!toggler || !menu || !overlay || !items || !header || !sections) {
    console.error("Required elements not found.");
    return;
  }

  const menuToggle = () => {
    menu.classList.toggle("open");
    toggler.classList.toggle("active");
    overlay.classList.toggle("open");
  };

  toggler.addEventListener("click", menuToggle);

  // Close the menu when the overlay is clicked
  overlay.addEventListener("click", () => {
    if (menu.classList.contains("open")) {
      menuToggle();
    }
  });

  // Close the menu when the "Esc" key is pressed
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("open")) {
      menuToggle();
    }

    // Open the menu when "Ctrl + M" is pressed
    if (
      event.ctrlKey &&
      event.key === "m" &&
      !menu.classList.contains("open")
    ) {
      menuToggle();
    }
  });

  // Close the menu when scrolling
  window.addEventListener("scroll", () => {
    if (menu.classList.contains("open")) {
      menuToggle();
    }
  });

  // Remove the hash fragment from the URL after reaching the section
  items.forEach((item) => {
    item.querySelector("a").addEventListener("click", (event) => {
      if (window.innerWidth <= 991) {
        menuToggle();
      }

      // Get the href attribute of the clicked link
      const href = item.querySelector("a").getAttribute("href");

      // Check if the href is a hash fragment
      if (href.startsWith("#")) {
        // Prevent the default scroll behavior
        event.preventDefault();

        // Get the target element by the hash fragment
        const targetElement = document.querySelector(href);

        // Scroll to the target element
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });

          // Remove the hash fragment from the URL
          history.replaceState(null, null, window.location.pathname);
        }
      }
    });
  });

  // Add hide and scrolled functionality to the header
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    const headerHeight = header.offsetHeight;

    if (currentScroll > lastScrollTop && currentScroll > headerHeight) {
      // Scrolling down
      header.classList.add("hide");
      header.classList.add("scrolled");
    } else {
      // Scrolling up or at the top
      header.classList.remove("hide");
      if (currentScroll > headerHeight) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

    // Update active link based on scroll position
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 58;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const sectionLink = document.querySelector(
        `.header-menu ul li a[href="#${sectionId}"]`
      );

      if (
        sectionLink &&
        currentScroll > sectionTop &&
        currentScroll <= sectionTop + sectionHeight
      ) {
        sectionLink.classList.add("active-link");
      } else if (sectionLink) {
        sectionLink.classList.remove("active-link");
      }
    });
  });
}

headerMenu();

/*=============== SPLITTING ===============*/
Splitting();
