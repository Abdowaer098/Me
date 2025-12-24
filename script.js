document.addEventListener("DOMContentLoaded", function () {
  if (
    typeof lucide !== "undefined" &&
    typeof lucide.createIcons === "function"
  ) {
    lucide.createIcons();
  }

  const monogramInteractionArea = document.getElementById(
    "monogram-interaction-area"
  );
  const monogramContainer = document.getElementById("monogram-container");
  const initialWChar = document.getElementById("initial-w-char");
  const introTextContainer = document.getElementById("intro-text-container");
  const introTextSpan = introTextContainer
    ? introTextContainer.querySelector(".intro-gradient-text")
    : null;

  const artifactSentence = document.getElementById("artifact-sentence");
  const waerRevealText = document.getElementById("waer-reveal-text");

  const awLogo = document.getElementById("aw-logo");
  const phase2ContentWrapper = document.getElementById(
    "phase2-content-wrapper"
  );
  const professionalSummaryElement = document.getElementById(
    "professional-summary-text"
  );

  const carouselTrack = document.querySelector(".carousel-track");
  const carouselSlides = document.querySelectorAll(".carousel-slide");
  const bottomNav = document.getElementById("bottom-main-nav");
  const bottomNavLinks = document.querySelectorAll(
    "#bottom-main-nav .bottom-nav-link"
  );
  const navIndicator = document.querySelector(
    "#bottom-main-nav .nav-indicator"
  );
  let currentSlide = 0;

  let introSequenceCompleted = false;
  const initialIntroText = "Curious? 🤔✨";
  const hoverIntroText = "Go deeper 💡🚀";

  // UPDATED SUMMARY TEXT
  const summaryFullText =
    "CPTE-certified Penetration Tester and Red Team specialist with expertise in gray-box assessments, AI-driven security automation, and secure software development. Proven track record of identifying critical vulnerabilities like IDOR, SSRF, SQLi, and RCE through manual exploitation and static code analysis. Experienced in leading technical teams, securing IoT infrastructures, and conducting forensic analysis. Actively preparing for OSCP with a strong focus on Active Directory attacks and advanced web exploitation.";
  
  // UPDATED KEYWORDS FOR HIGHLIGHTING
  const summaryKeywords = [
    "CPTE-certified",
    "Penetration Tester",
    "Red Team specialist",
    "gray-box assessments",
    "AI-driven security automation",
    "secure software development",
    "critical vulnerabilities",
    "IDOR",
    "SSRF",
    "SQLi",
    "RCE",
    "manual exploitation",
    "static code analysis",
    "leading technical teams",
    "IoT infrastructures",
    "forensic analysis",
    "OSCP",
    "Active Directory attacks",
    "advanced web exploitation",
  ];

  if (introTextSpan) {
    introTextSpan.innerHTML = initialIntroText;
  }

  if (monogramContainer && initialWChar) {
    initialWChar.addEventListener("animationend", (event) => {
      if (event.animationName === "fadeInW") {
        if (monogramContainer) {
          monogramContainer.classList.add("text-ready");
        }
      }
    });
  }

  const particleBg = document.getElementById("particle-bg");
  if (particleBg) {
    // Use reduced particle count for performance
    const numParticles = parseInt(particleBg.getAttribute("data-particle-count")) || 25;
    for (let i = 0; i < numParticles; i++) {
      let particle = document.createElement("div");
      particle.classList.add("particle");
      let size = Math.random() * 2.5 + 0.5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      const startSide = Math.floor(Math.random() * 4);
      let startX, startY;
      if (startSide === 0) {
        startX = `${Math.random() * 100}%`;
        startY = "-5%";
      } else if (startSide === 1) {
        startX = "105%";
        startY = `${Math.random() * 100}%`;
      } else if (startSide === 2) {
        startX = `${Math.random() * 100}%`;
        startY = "105%";
      } else {
        startX = "-5%";
        startY = `${Math.random() * 100}%`;
      }
      particle.style.setProperty("--startX", startX);
      particle.style.setProperty("--startY", startY);
      particle.style.setProperty("--endX", `${Math.random() * 100}%`);
      particle.style.setProperty("--endY", `${Math.random() * 100}%`);
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
      particleBg.appendChild(particle);
    }
  }

  // Add loading state management
  const loadingOverlay = document.getElementById("loading-overlay");
  if (loadingOverlay) {
    loadingOverlay.style.display = "flex";
    window.addEventListener("load", function () {
      setTimeout(() => {
        loadingOverlay.style.opacity = "0";
        loadingOverlay.style.visibility = "hidden";
      }, 500);
    });
  }

  function animateProfessionalSummary() {
    if (!professionalSummaryElement) return;
    professionalSummaryElement.innerHTML = "";
    const normalizedSummaryText = summaryFullText.replace(/\s+/g, " ").trim();
    const words = normalizedSummaryText.split(" ");
    let currentWordIndexInSource = 0;
    words.forEach((wordFromSplit, loopIndex) => {
      if (loopIndex < currentWordIndexInSource) return;
      const wordSpan = document.createElement("span");
      wordSpan.classList.add("summary-word");
      let isMultiWordKeyword = false;
      let matchedPhraseFromText = "";
      for (const kw of summaryKeywords) {
        const kwWords = kw.split(" ");
        if (words.length >= loopIndex + kwWords.length) {
          let potentialMatch = true;
          let tempPhraseForMatch = "";
          for (let k = 0; k < kwWords.length; k++) {
            tempPhraseForMatch +=
              (k > 0 ? " " : "") +
              words[loopIndex + k].replace(/[,.]+$/, "").toLowerCase();
          }
          if (tempPhraseForMatch === kw.toLowerCase()) {
            isMultiWordKeyword = true;
            for (let k = 0; k < kwWords.length; k++) {
              matchedPhraseFromText +=
                words[loopIndex + k] + (k < kwWords.length - 1 ? " " : "");
            }
            wordSpan.textContent = matchedPhraseFromText;
            wordSpan.classList.add("highlight");
            currentWordIndexInSource = loopIndex + kwWords.length;
            break;
          }
        }
      }
      if (!isMultiWordKeyword) {
        wordSpan.textContent = wordFromSplit;
        const cleanedSingleWord = wordFromSplit
          .replace(/[,.]+$/, "")
          .toLowerCase();
        if (
          summaryKeywords.some(
            (kw) =>
              kw.toLowerCase() === cleanedSingleWord &&
              kw.split(" ").length === 1
          )
        ) {
          wordSpan.classList.add("highlight");
        }
        currentWordIndexInSource = loopIndex + 1;
      }
      professionalSummaryElement.appendChild(wordSpan);
      if (currentWordIndexInSource < words.length) {
        professionalSummaryElement.appendChild(document.createTextNode(" "));
      }
      // Reduce animation intensity
      wordSpan.style.transitionDelay = `${loopIndex * 0.02}s`;
    });
    void professionalSummaryElement.offsetWidth;
    const wordSpans =
      professionalSummaryElement.querySelectorAll(".summary-word");
    wordSpans.forEach((span) => {
      span.style.opacity = "1";
      span.style.transform = "translateY(0) rotateX(0deg)";
    });
  }

  function startMainTransitionSequence() {
    if (
      introSequenceCompleted ||
      !initialWChar ||
      !artifactSentence ||
      !waerRevealText ||
      !monogramContainer ||
      !awLogo ||
      !phase2ContentWrapper
    )
      return;
    introSequenceCompleted = true;

    if (introTextContainer) introTextContainer.classList.add("hidden");
    initialWChar.classList.add("enlarge-effect");

    initialWChar.addEventListener("animationend", function wEnlargeEnd(event) {
      if (event.animationName === "enlargeWOnClick") {
        initialWChar.removeEventListener("animationend", wEnlargeEnd);
        initialWChar.classList.remove("enlarge-effect");
        initialWChar.classList.add("hidden");

        setTimeout(() => {
          artifactSentence.classList.add("visible");
          setTimeout(() => {
            artifactSentence.classList.add("hidden");
            setTimeout(() => {
              waerRevealText.classList.add("visible");
              setTimeout(() => {
                waerRevealText.classList.add("hidden");
                setTimeout(() => {
                  if (monogramContainer)
                    monogramContainer.classList.add("hidden");
                  if (awLogo) awLogo.classList.add("visible");
                  if (phase2ContentWrapper)
                    phase2ContentWrapper.classList.add("visible");

                  const firstSlide = carouselSlides[0];
                  if (firstSlide) {
                    staggerChildrenAnimation(firstSlide);
                  }
                  animateProfessionalSummary();
                  updateCarouselControls();
                  if (bottomNavLinks.length > 0) {
                    moveNavIndicator(bottomNavLinks[0]);
                    if (bottomNav) bottomNav.classList.add("indicator-visible");
                  }
                }, 700);
              }, 2500);
            }, 700);
          }, 5000);
        }, 500);
      }
    });
  }

  if (monogramInteractionArea) {
    monogramInteractionArea.addEventListener("click", () => {
      if (!introSequenceCompleted) {
        startMainTransitionSequence();
      }
    });

    monogramInteractionArea.addEventListener("mouseenter", () => {
      if (!introSequenceCompleted && introTextSpan) {
        introTextSpan.innerHTML = hoverIntroText;
      }
    });
    monogramInteractionArea.addEventListener("mouseleave", () => {
      if (!introSequenceCompleted && introTextSpan) {
        introTextSpan.innerHTML = initialIntroText;
      }
    });
  }

  function staggerChildrenAnimation(parentElement) {
    if (!parentElement) return;
    const itemsToAnimate = parentElement.querySelectorAll(
      ".phase2-header .name-part, .phase2-header .education-text, .summary-word, .section-title, .achievement-card-placeholder p"
    );
    let delay = 0;
    itemsToAnimate.forEach((item) => {
      if (item.style.opacity !== "1") {
        item.style.transitionDelay = `${delay}s`;
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
        delay += item.classList.contains("summary-word") ? 0.025 : 0.1;
      }
    });
  }

  function moveNavIndicator(activeLink) {
    if (!navIndicator || !activeLink || !bottomNav) return;
    const iconInLink = activeLink.querySelector(".nav-icon");
    if (!iconInLink) {
      const linkRect = activeLink.getBoundingClientRect();
      const navBarRect = bottomNav.getBoundingClientRect();
      navIndicator.style.left = `${
        linkRect.left -
        navBarRect.left +
        linkRect.width / 2 -
        navIndicator.offsetWidth / 2
      }px`;
      return;
    }

    const iconRect = iconInLink.getBoundingClientRect();
    const navBarRect = bottomNav.getBoundingClientRect();

    navIndicator.style.left = `${
      iconRect.left -
      navBarRect.left +
      iconRect.width / 2 -
      navIndicator.offsetWidth / 2
    }px`;
  }

  function updateCarouselControls() {
    bottomNavLinks.forEach((link, index) => {
      const isActive = index === currentSlide;
      link.classList.toggle("active", isActive);
      if (isActive) {
        moveNavIndicator(link);
      }
    });
    if (
      bottomNav &&
      !bottomNav.classList.contains("indicator-visible") &&
      bottomNavLinks.length > 0
    ) {
      bottomNav.classList.add("indicator-visible");
    }
  }

  function goToSlide(slideIndex) {
    if (!carouselTrack || slideIndex < 0 || slideIndex >= carouselSlides.length)
      return;

    carouselTrack.style.transform = `translateX(-${slideIndex * 100}%)`;

    carouselSlides.forEach((slide, index) => {
      slide.classList.toggle("active-slide", index === slideIndex);
      if (index === slideIndex) {
        staggerChildrenAnimation(slide);
        if (
          slide.id === "summary-section" &&
          professionalSummaryElement.innerHTML.trim() === ""
        ) {
          animateProfessionalSummary();
        }
      }
    });
    currentSlide = slideIndex;
    updateCarouselControls();
    // Always scroll to top on mobile for all sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Additional scroll reset for the content wrapper
    const phase2Wrapper = document.getElementById('phase2-content-wrapper');
    if (phase2Wrapper) {
      phase2Wrapper.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  bottomNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const slideIndex = parseInt(link.dataset.index);
      goToSlide(slideIndex);
    });
  });

  // Add debounce to resize handler
  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (typeof bottomNavLinks !== "undefined" && bottomNavLinks.length > currentSlide) {
        moveNavIndicator(bottomNavLinks[currentSlide]);
      }
    }, 100);
  });

  // Add keyboard navigation for accessibility
  document.addEventListener("keydown", function (e) {
    if (typeof introSequenceCompleted !== "undefined" && introSequenceCompleted) {
      if (e.key === "ArrowRight") {
        goToSlide((currentSlide + 1) % carouselSlides.length);
      } else if (e.key === "ArrowLeft") {
        goToSlide((currentSlide - 1 + carouselSlides.length) % carouselSlides.length);
      }
    }
  });
});
