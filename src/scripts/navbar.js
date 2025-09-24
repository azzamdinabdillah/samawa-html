/**
 * Navbar interactions for mobile drawer and scroll-based styling.
 *
 * Features:
 * - Opens/closes the mobile navigation drawer
 * - Locks page scroll while the drawer is open
 * - Applies a floating style to the navbar when the page is scrolled
 * - Closes the drawer when clicking outside of it (optional behavior)
 *
 * Expected elements (by id):
 * - #mobile-menu-toggle (button to open drawer)
 * - #close-drawer (button inside drawer to close)
 * - #mobile-drawer (the drawer panel)
 * - #navbar (the top navigation bar)
 */

// Get elements
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const closeDrawer = document.getElementById("close-drawer");
const mobileDrawer = document.getElementById("mobile-drawer");
const navbar = document.getElementById("navbar");

// Function to open drawer
function openDrawer() {
  // Slide the drawer in from the left
  mobileDrawer.classList.remove("-translate-x-full");
  mobileDrawer.classList.add("translate-x-0");
  // Prevent page scroll while drawer is open
  document.body.style.overflow = "hidden"; // Prevent scrolling when drawer is open
}

// Function to close drawer
function closeDrawerFunc() {
  // Slide the drawer out to the left
  mobileDrawer.classList.remove("translate-x-0");
  mobileDrawer.classList.add("-translate-x-full");
  // Restore page scroll
  document.body.style.overflow = ""; // Re-enable scrolling
}

// Function to handle scroll effect
function handleScroll() {
  if (window.scrollY > 50) {
    // Add floating/elevated style after scrolling down a bit
    navbar.classList.add("floating");
  } else {
    // Remove floating style when near the top
    navbar.classList.remove("floating");
  }
}

// Add event listeners
mobileMenuToggle.addEventListener("click", openDrawer);
closeDrawer.addEventListener("click", closeDrawerFunc);

// Add scroll event listener
window.addEventListener("scroll", handleScroll);

// Close drawer when clicking outside (optional)
document.addEventListener("click", (event) => {
  if (
    mobileDrawer.classList.contains("translate-x-0") &&
    !mobileDrawer.contains(event.target) &&
    !mobileMenuToggle.contains(event.target)
  ) {
    closeDrawerFunc();
  }
});
