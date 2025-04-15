// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get all category buttons and product cards
  const categoryButtons = document.querySelectorAll(".category-btn");
  const productCards = document.querySelectorAll(".product-card");

  // Set initial equal heights for all cards
  function setEqualCardHeights() {
    // Reset heights first
    productCards.forEach((card) => {
      card.style.height = "auto";
    });

    // For medium screens and up, make all cards equal height
    if (window.innerWidth >= 768) {
      let maxHeight = 0;

      // Find the tallest card
      productCards.forEach((card) => {
        if (card.offsetHeight > maxHeight) {
          maxHeight = card.offsetHeight;
        }
      });

      // Set all cards to the height of the tallest card
      if (maxHeight > 0) {
        productCards.forEach((card) => {
          card.style.height = `${maxHeight}px`;
        });
      }
    }
  }

  // Call this function on load and resize
  setEqualCardHeights();
  window.addEventListener("resize", setEqualCardHeights);

  // Add click event listeners to each category button
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get the selected category
      const selectedCategory = this.getAttribute("data-category");

      // Remove 'active' class from all buttons
      categoryButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.classList.remove("text-deeppink");
        btn.classList.add("text-gray-500");
        btn.classList.remove("border-deeppink");
        btn.classList.add("border-transparent");
      });

      // Add 'active' class to the clicked button
      this.classList.add("active");
      this.classList.add("text-deeppink");
      this.classList.remove("text-gray-500");
      this.classList.add("border-deeppink");
      this.classList.remove("border-transparent");

      // Show all products if 'all' is selected, otherwise filter by category
      if (selectedCategory === "all") {
        productCards.forEach((card) => {
          card.style.display = "flex"; // Use flex instead of block to maintain card structure

          // Add animation for smooth transition
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        });

        // Reset equal heights after cards are visible
        setTimeout(setEqualCardHeights, 100);
      } else {
        productCards.forEach((card) => {
          const cardCategory = card.getAttribute("data-category");

          if (cardCategory === selectedCategory) {
            card.style.display = "flex"; // Use flex instead of block

            // Add animation for smooth transition
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 50);
          } else {
            // Add fade-out animation
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";

            // After animation completes, hide the element
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        });

        // Reset equal heights after visible cards update
        setTimeout(setEqualCardHeights, 350);
      }
    });
  });

  // Add CSS transitions to product cards for smooth filtering
  productCards.forEach((card) => {
    card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  });

  // Mobile menu functionality from previous implementation
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const closeMenuButton = document.getElementById("close-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && closeMenuButton && mobileMenu) {
    const mobileMenuLinks = mobileMenu.querySelectorAll("a");

    // Function to open mobile menu
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.remove("hidden");
      mobileMenu.classList.add("flex");
      document.body.style.overflow = "hidden"; // Prevent scrolling
    });

    // Function to close mobile menu
    function closeMenu() {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
      document.body.style.overflow = ""; // Re-enable scrolling
    }

    // Close menu when clicking the close button
    closeMenuButton.addEventListener("click", closeMenu);

    // Close menu when clicking on a link
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }
});
