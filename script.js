document.addEventListener("DOMContentLoaded", function () {
    if (typeof lucide !== "undefined" && typeof lucide.createIcons === "function") {
        lucide.createIcons();
    }

    // --- Element References ---
    const monogramInteractionArea = document.getElementById("monogram-interaction-area");
    const monogramContainer = document.getElementById("monogram-container");
    const initialWChar = document.getElementById("initial-w-char");
    const introTextContainer = document.getElementById("intro-text-container");
    const introTextSpan = introTextContainer ? introTextContainer.querySelector(".intro-gradient-text") : null;

    const artifactSentence = document.getElementById("artifact-sentence");
    const waerRevealText = document.getElementById("waer-reveal-text");
    const awLogo = document.getElementById("aw-logo");
    const phase2ContentWrapper = document.getElementById("phase2-content-wrapper");
    const professionalSummaryElement = document.getElementById("professional-summary-text");

    // Carousel & Nav References
    const carouselTrack = document.querySelector(".carousel-track");
    const carouselSlides = document.querySelectorAll(".carousel-slide");
    const bottomNav = document.getElementById("bottom-main-nav");
    const bottomNavLinks = document.querySelectorAll("#bottom-main-nav .bottom-nav-link");
    const navIndicator = document.querySelector("#bottom-main-nav .nav-indicator");
    
    let currentSlide = 0;
    let introSequenceCompleted = false;
    const initialIntroText = "Curious? 🤔✨";
    const hoverIntroText = "Click to Enter 🚀"; // Changed text to be clearer

    // --- DATA: Summary & Keywords ---
    const summaryFullText = "CPTE-certified Penetration Tester and Red Team specialist with expertise in gray-box assessments, AI-driven security automation, and secure software development. Proven track record of identifying critical vulnerabilities like IDOR, SSRF, SQLi, and RCE through manual exploitation and static code analysis. Experienced in leading technical teams, securing IoT infrastructures, and conducting forensic analysis. Actively preparing for OSCP with a strong focus on Active Directory attacks and advanced web exploitation.";
    
    const summaryKeywords = [
        "CPTE-certified", "Penetration Tester", "Red Team", "gray-box",
        "AI-driven", "secure software", "IDOR", "SSRF", "SQLi", "RCE",
        "manual exploitation", "static code analysis", "IoT", "forensic",
        "OSCP", "Active Directory", "web exploitation"
    ];

    // --- INITIALIZATION ---
    if (introTextSpan) introTextSpan.innerHTML = initialIntroText;

    // Remove loading overlay when page is ready
    const loadingOverlay = document.getElementById("loading-overlay");
    if (loadingOverlay) {
        loadingOverlay.style.display = "flex";
        window.addEventListener("load", () => {
            setTimeout(() => {
                loadingOverlay.style.opacity = "0";
                setTimeout(() => { loadingOverlay.style.visibility = "hidden"; }, 500);
            }, 500);
        });
    }

    // --- PARTICLE BACKGROUND ---
    const particleBg = document.getElementById("particle-bg");
    if (particleBg) {
        const numParticles = 20; // Lightweight count
        for (let i = 0; i < numParticles; i++) {
            let particle = document.createElement("div");
            particle.classList.add("particle");
            let size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Randomize position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // CSS Variable for movement
            particle.style.setProperty("--moveX", `${(Math.random() - 0.5) * 200}px`);
            particle.style.setProperty("--moveY", `${(Math.random() - 0.5) * 200}px`);
            
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            particleBg.appendChild(particle);
        }
    }

    // --- MAIN TRANSITION SEQUENCE ---
    function startMainTransitionSequence() {
        if (introSequenceCompleted) return;
        introSequenceCompleted = true;

        // 1. Hide the prompt text
        if (introTextContainer) introTextContainer.style.opacity = '0';
        
        // 2. Animate the W
        if (initialWChar) {
            initialWChar.classList.add("enlarge-effect");
        }

        // 3. FORCE PROCEED after 800ms (Fixes the freeze)
        setTimeout(() => {
            if (initialWChar) initialWChar.style.opacity = '0';
            
            // Show Artifact Sentence
            if (artifactSentence) {
                artifactSentence.classList.add("visible");
                
                // Hide Sentence, Show Reveal Text
                setTimeout(() => {
                    artifactSentence.classList.remove("visible");
                    if (waerRevealText) waerRevealText.classList.add("visible");
                    
                    // Final Reveal
                    setTimeout(() => {
                        if (waerRevealText) waerRevealText.classList.remove("visible");
                        if (monogramContainer) monogramContainer.style.display = 'none';
                        
                        // Show Main Content
                        if (awLogo) awLogo.classList.add("visible");
                        if (phase2ContentWrapper) phase2ContentWrapper.classList.add("visible");

                        // Trigger animations inside content
                        setTimeout(() => {
                             animateProfessionalSummary();
                             staggerChildrenAnimation(carouselSlides[0]);
                             updateCarouselControls();
                        }, 100);

                    }, 2000); // Time reading "WAER."
                }, 3500); // Time reading Quote
            }
        }, 800); // Matches CSS animation duration
    }

    // --- EVENT LISTENERS ---
    if (monogramInteractionArea) {
        monogramInteractionArea.addEventListener("click", startMainTransitionSequence);
        
        // Hover effects
        monogramInteractionArea.addEventListener("mouseenter", () => {
            if (!introSequenceCompleted && introTextSpan) introTextSpan.innerHTML = hoverIntroText;
        });
        monogramInteractionArea.addEventListener("mouseleave", () => {
            if (!introSequenceCompleted && introTextSpan) introTextSpan.innerHTML = initialIntroText;
        });
    }

    // --- HELPER FUNCTIONS ---

    function animateProfessionalSummary() {
        if (!professionalSummaryElement) return;
        professionalSummaryElement.innerHTML = "";
        
        const words = summaryFullText.split(" ");
        let wordIndex = 0;

        // Simple text injection with highlighting
        const fragment = document.createDocumentFragment();
        
        words.forEach((word) => {
            const span = document.createElement("span");
            span.textContent = word + " ";
            span.classList.add("summary-word");
            
            // Check for keywords
            const cleanWord = word.replace(/[^a-zA-Z0-9-]/g, "");
            const isKeyword = summaryKeywords.some(k => k.includes(cleanWord) || cleanWord.includes(k));
            
            if (isKeyword && cleanWord.length > 2) {
                span.classList.add("highlight");
            }

            // Animation delay
            span.style.animationDelay = `${wordIndex * 0.03}s`;
            fragment.appendChild(span);
            wordIndex++;
        });

        professionalSummaryElement.appendChild(fragment);
    }

    function staggerChildrenAnimation(parentElement) {
        if (!parentElement) return;
        const items = parentElement.querySelectorAll("h1, h2, h3, p, li");
        items.forEach((item, index) => {
            item.style.opacity = "0";
            item.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
        });
    }

    // --- NAVIGATION LOGIC ---
    function updateCarouselControls() {
        bottomNavLinks.forEach((link, index) => {
            link.classList.toggle("active", index === currentSlide);
            if (index === currentSlide) moveNavIndicator(link);
        });
    }

    function moveNavIndicator(activeLink) {
        if (!navIndicator || !activeLink || !bottomNav) return;
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = bottomNav.getBoundingClientRect();
        const leftPos = linkRect.left - navRect.left + (linkRect.width / 2) - (navIndicator.offsetWidth / 2);
        navIndicator.style.transform = `translateX(${leftPos}px)`;
    }

    function goToSlide(index) {
        if (!carouselTrack) return;
        carouselTrack.style.transform = `translateX(-${index * 100}%)`;
        currentSlide = index;
        updateCarouselControls();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    bottomNavLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            goToSlide(parseInt(link.dataset.index));
        });
    });

    window.addEventListener("resize", () => {
         updateCarouselControls();
    });
});
