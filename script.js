document.addEventListener('DOMContentLoaded', () => {

    // 2. Header Scroll Effect (Blur & Background)
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }


    // 3. Selected Artists Carousel Logic
    const carouselContainer = document.querySelector('.artists-carousel-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (carouselContainer && prevBtn && nextBtn) {
        // Card width (280px) + Gap (25px)
        const scrollAmount = 305; 

        prevBtn.addEventListener('click', () => {
            carouselContainer.scrollBy({ 
                left: -scrollAmount, 
                behavior: 'smooth' 
            });
        });

        nextBtn.addEventListener('click', () => {
            carouselContainer.scrollBy({ 
                left: scrollAmount, 
                behavior: 'smooth' 
            });
        });
    }


    // 4. Hero Dynamic Image Carousel
    const heroSlides = [
        { 
            img: 'images/MAluminium1.png', 
            artist: 'Aluminiumfolie' 
        },
        { 
            img: 'images/Stanleydopsleutel27mm1.png', 
            artist: 'Stanley dopsleutel' 
        },
        { 
            // Replace these with your actual image paths
            img: 'images/Torx+schroef+165+x1.png', 
            artist: 'Torx schroef' 
        },
        { 
            // Replace these with your actual image paths
            img: 'images/woodcutter41.png', 
            artist: 'Arnoud Dekker' 
        }
    ];

    const heroImageEl = document.querySelector('.hero-imagae');
    const exploreImgEl = document.querySelector('.explorimgg');
    const artistNameEl = document.querySelector('.traas');
    const indicators = document.querySelectorAll('.circle-indicator');
    
    let currentSlideIndex = 0;
    let heroCarouselInterval;

    if (heroImageEl && exploreImgEl && indicators.length > 0) {
        
        // Function to update the images, text, and active circle
        const updateHeroSection = (index) => {
            currentSlideIndex = index;
            
            // Calculate the next index (loops back to 0 if at the end)
            const nextSlideIndex = (currentSlideIndex + 1) % heroSlides.length;

            // Update Background Images
            heroImageEl.style.backgroundImage = `url(${heroSlides[currentSlideIndex].img})`;
            exploreImgEl.style.backgroundImage = `url(${heroSlides[nextSlideIndex].img})`;
            
            // Update Artist Text
            if(artistNameEl) {
                artistNameEl.textContent = heroSlides[currentSlideIndex].artist;
            }

            // Update Active Indicator
            indicators.forEach((ind, i) => {
                if (i === currentSlideIndex) {
                    ind.classList.add('active');
                } else {
                    ind.classList.remove('active');
                }
            });
        };

        // Function to start the 7-second timer
        const startHeroCarousel = () => {
            heroCarouselInterval = setInterval(() => {
                let next = (currentSlideIndex + 1) % heroSlides.length;
                updateHeroSection(next);
            }, 5000); // 7000 milliseconds = 7 seconds
        };

        // Initialize the carousel on page load
        updateHeroSection(0);
        startHeroCarousel();

        // Allow clicking the circles to manually change slides
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                // Reset the timer when manually clicked
                clearInterval(heroCarouselInterval);
                updateHeroSection(index);
                startHeroCarousel();
            });
        });
    }

});