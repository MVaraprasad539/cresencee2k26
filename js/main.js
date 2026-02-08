// --- Event Data Configuration (Replicates Alegria Structure) ---
const EVENTS_DATA = {
    'technical': {
        title: 'Technical Events',
        events: [
            { title: 'AI Nexus', desc: 'Discover the future of Intelligence.', prize: '₹15,000', rules: 'Individual', class: 'bg-tech', image: 'assets/tech_bg.png' },
            { title: 'CyberGuard CTF', desc: 'Capture the Flag security challenge.', prize: '₹10,000', rules: 'Team of 2', class: 'bg-tech', image: 'assets/ctf.png' },
            { title: 'Robo Wars', desc: 'Ultimate bot battles in the arena.', prize: '₹12,000', rules: 'Weight Limit', class: 'bg-tech', image: 'assets/robowar.png' }
        ]
    },
    'non-technical': {
        title: 'Non-Technical Events',
        events: [
            { title: 'BGMI Tournament', desc: 'Battlegrounds Mobile India.', prize: '₹15,000', rules: 'Squads', class: 'bg-gaming', image: 'assets/bgmi.png' },
            { title: 'Free Fire Clash', desc: 'Survival battle royale.', prize: '₹10,000', rules: 'Solo/Squad', class: 'bg-gaming', image: 'assets/freefire.png' },
            { title: 'ShutterUp Photography', desc: 'Capture the moment.', prize: '₹5,000', rules: 'DSLR/Mobile', class: 'bg-art', image: 'assets/photography.png' },
            { title: 'CineMatrix Videography', desc: 'Short film making contest.', prize: '₹8,000', rules: '3-5 mins', class: 'bg-video', image: 'assets/videography.png' },
            { title: 'Mehndi Art', desc: 'Traditional henna design.', prize: '₹3,000', rules: '1 hour', class: 'bg-art', image: 'assets/mehndi.png' }
        ]
    },
    'spotlight': {
        title: 'Spotlight Events',
        events: [
            { title: 'Flashmob', desc: 'Synchronized dance spectacle.', prize: 'N/A', rules: 'Open to all', class: 'bg-spotlight', image: 'assets/flashmob.png', isSpotlight: true },
            { title: 'Cultural Night', desc: 'A night of tradition and dance.', prize: 'N/A', rules: 'Entry Pass', class: 'bg-spotlight', image: 'assets/cultural.png', isSpotlight: true }
        ]
    },
    'performing-arts': {
        title: 'Performing Arts',
        events: [
            { title: 'Solo Dance', desc: 'Show your moves.', prize: '₹5,000', rules: '3 mins max', class: 'bg-art', image: 'assets/cultural.png' }
        ]
    },
    'workshops': {
        title: 'Workshops',
        events: [
            { title: 'Generative AI Workshop', desc: 'Master the future of AI. Build LLM apps.', prize: 'Certification', rules: 'Laptop req.', class: 'bg-tech', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000' },
            { title: 'Cyber Security Workshop', desc: 'Ethical Hacking & Network Defense.', prize: 'Certification', rules: 'Laptop req.', class: 'bg-tech', image: 'https://images.unsplash.com/photo-1563206767-5b1d972b9fb1?auto=format&fit=crop&q=80&w=1000' }
        ]
    }
};

// --- Google Login Simulation Logic ---
// --- Firebase Google Login Logic ---
const USER_SESSION = {
    isLoggedIn: false,
    user: null
};

// Monitor Auth State
auth.onAuthStateChanged((user) => {
    const loginBtn = document.getElementById('nav-login-btn');
    const profileContainer = document.getElementById('nav-profile-container');
    const profileImg = document.getElementById('nav-profile-img');

    if (user) {
        USER_SESSION.isLoggedIn = true;
        USER_SESSION.user = {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
        };
        console.log("User logged in:", USER_SESSION.user);

        // Update UI
        if (loginBtn) loginBtn.style.display = 'none';
        if (profileContainer) {
            profileContainer.style.display = 'block';
            if (user.photoURL) {
                profileImg.src = user.photoURL;
            } else {
                // Fallback placeholder if no photo
                profileImg.src = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
            }
        }
    } else {
        USER_SESSION.isLoggedIn = false;
        USER_SESSION.user = null;
        console.log("User logged out");

        // Update UI
        if (loginBtn) loginBtn.style.display = 'block';
        if (profileContainer) profileContainer.style.display = 'none';

        // Hide dropdown if open
        const dropdown = document.getElementById('profile-dropdown');
        if (dropdown) dropdown.style.display = 'none';
    }
});

window.toggleProfileDropdown = function () {
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown.style.display === 'flex') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'flex';
    }
};

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    const profileContainer = document.getElementById('nav-profile-container');
    const dropdown = document.getElementById('profile-dropdown');
    if (profileContainer && !profileContainer.contains(event.target)) {
        if (dropdown) dropdown.style.display = 'none';
    }
});

window.openRegistrationModal = function (eventTitle) {
    const modal = document.getElementById('registration-modal');
    if (!modal) return;

    // reset form
    document.getElementById('event-registration-form').reset();

    // Pre-fill data
    if (USER_SESSION.user) {
        document.getElementById('reg-name').value = USER_SESSION.user.name || '';
        document.getElementById('reg-email').value = USER_SESSION.user.email || '';
    }
    document.getElementById('reg-event').value = eventTitle;

    // determine fee
    const feeElement = document.getElementById('reg-fee');
    if (eventTitle.includes('Hackathon') || eventTitle.includes('Flag')) {
        feeElement.innerText = "₹50";
    } else if (eventTitle.includes('Workshop')) {
        feeElement.innerText = "₹150";
    } else {
        feeElement.innerText = "₹10";
    }

    modal.style.display = 'flex';
};

window.closeRegistrationModal = function () {
    document.getElementById('registration-modal').style.display = 'none';
};

window.handleRegisterClick = function (eventTitle) {
    // Safety Check for Configuration
    if (!firebaseConfig || firebaseConfig.apiKey === "YOUR_API_KEY") {
        alert("Configuration Missing: Please check firebase-config.js");
        return;
    }

    if (USER_SESSION.isLoggedIn) {
        if (eventTitle === 'General Access') {
            const confirmLogout = confirm(`Logged in as ${USER_SESSION.user.name}. Do you want to logout?`);
            if (confirmLogout) {
                auth.signOut().then(() => alert("Logged out successfully."));
            }
        } else {
            // Open Detailed Registration Form
            window.openRegistrationModal(eventTitle);
        }
    } else {
        // Show Login Modal
        const loginModal = document.getElementById('google-login-modal');
        if (loginModal) {
            loginModal.dataset.pendingEvent = eventTitle;
            loginModal.style.display = 'flex';
        }
    }
};

window.submitRegistration = function (e) {
    e.preventDefault();

    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Registering...";
    submitBtn.disabled = true;

    // Collect Data
    const formData = {
        name: document.getElementById('reg-name').value,
        email: document.getElementById('reg-email').value,
        college: document.getElementById('reg-college').value,
        village: document.getElementById('reg-village').value,
        district: document.getElementById('reg-district').value,
        state: document.getElementById('reg-state').value,
        event: document.getElementById('reg-event').value,
        fee: document.getElementById('reg-fee').innerText,
        paymentScreenshot: "Pending Upload...", // Placeholder
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    // Simulate image upload (Firestore Storage not set up yet)
    setTimeout(() => {
        db.collection("registrations").add(formData)
            .then((docRef) => {
                // Show Success Animation
                const successOverlay = document.createElement('div');
                successOverlay.className = 'success-overlay';
                successOverlay.innerHTML = `
                    <div class="checkmark-circle">
                        <div class="checkmark"></div>
                    </div>
                    <h2 class="text-white" style="font-family: var(--font-heading); margin-bottom: 0.5rem;">Registration Successful!</h2>
                    <p style="color: #38bdf8;">See you at the event.</p>
                `;

                const modalContent = document.querySelector('.registration-content');
                modalContent.appendChild(successOverlay);

                // Close after animation
                setTimeout(() => {
                    closeRegistrationModal();
                    successOverlay.remove();
                    submitBtn.innerText = "Register Now";
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                alert("Error registering. Please try again.");
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            });
    }, 1000);
};

window.performGoogleLogin = function () {
    const loginModal = document.getElementById('google-login-modal');
    // Hide content, show spinner
    const spinner = document.getElementById('login-spinner');
    if (spinner) spinner.style.display = 'flex';

    auth.signInWithPopup(provider)
        .then((result) => {
            // Login successful
            if (spinner) spinner.style.display = 'none';
            loginModal.style.display = 'none';

            // Complete pending action
            const pendingEvent = loginModal.dataset.pendingEvent;
            const user = result.user;

            if (pendingEvent) {
                if (pendingEvent === 'General Access') {
                    alert(`Welcome, ${user.displayName}!`);
                } else {
                    // alert(`Login Successful! Registered for ${pendingEvent}.`);
                    // Open Registration Modal after login
                    window.openRegistrationModal(pendingEvent);
                }

                // Refresh grid/UI
                const activeLocalTab = document.querySelector('.tab-btn.active');
                if (activeLocalTab) activeLocalTab.click();
            }
        }).catch((error) => {
            console.error("Login Failed:", error);

            if (error.code === 'auth/configuration-not-found') {
                alert('Login Failed: Google Sign-In provider is NOT enabled in your Firebase Console.\n\nPlease go to Firebase Console > Authentication > Sign-in method and enable "Google".');
            } else if (error.code === 'auth/popup-closed-by-user') {
                console.log("Login popup closed by user.");
            } else {
                alert(`Login Failed: ${error.message}`);
            }

            if (spinner) spinner.style.display = 'none';
        });
};

window.closeLoginModal = function () {
    document.getElementById('google-login-modal').style.display = 'none';
};

// --- Generic Modal Opener ---
window.openCategoryModal = function (categoryKey) {
    const data = EVENTS_DATA[categoryKey];
    if (!data) return;

    // Use a single generic modal container (e.g., repurpose #modal-tech or generic #modal-category)
    // I need to ensure #modal-category exists in HTML. I will use #modal-tech as the base.
    const modal = document.getElementById('modal-tech'); // Reusing this ID for simplicity to avoid HTML rewrite
    if (!modal) return;

    // Update Title
    const titleEl = modal.querySelector('h2');
    if (titleEl) titleEl.innerText = data.title;

    // Update Grid Content
    const grid = modal.querySelector('.events-grid');
    if (grid) {
        grid.innerHTML = data.events.map(ev => `
            <div class="event-item-card" onclick="openEventDashboard(this)"
                 data-title="${ev.title}"
                 data-tagline="${ev.desc}"
                 data-prize="${ev.prize}"
                 data-rules="${ev.rules}"
                 data-class="${ev.class}">
                <div class="card-img-wrapper">
                    <div class="event-img-placeholder ${ev.class}"></div>
                    <div class="card-overlay"><button class="register-btn">View Details</button></div>
                </div>
                <h3>${ev.title}</h3>
                <p>${ev.desc}</p>
            </div>
        `).join('');
    }

    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('open'), 10);
};

// Deprecate old specific functions by pointing them to the new one if needed, 
// but we updated HTML to use openCategoryModal, so we are good.

// --- Event Dashboard Logic (Drill Down) ---
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // Move close logic here to ensure elements exist
    const closeBtns = document.querySelectorAll('.close-modal');
    const modalBackdrops = document.querySelectorAll('.modal-backdrop');

    function closeModal() {
        document.querySelectorAll('.event-modal').forEach(modal => {
            modal.classList.remove('open');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
    }

    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
    modalBackdrops.forEach(backdrop => backdrop.addEventListener('click', closeModal));


    // =========================================================================
    // EXACT OPENING ANIMATION (Reconstructed High-Fidelity)
    // =========================================================================
    const tl = gsap.timeline();
    const preloader = document.getElementById('preloader');

    // Ensure initial state
    gsap.set('body', { overflow: 'hidden' });
    gsap.set('.hero-content h1', { y: 100, opacity: 0 });
    gsap.set('.hero-content p', { y: 50, opacity: 0 });
    gsap.set('.navbar', { y: -100, opacity: 0 });

    // 1. Logo Pulse & Text Reveal (The "Waiting" Phase)
    tl.to('.loader-logo', {
        scale: 1.15,
        duration: 1.0,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1,
        boxShadow: "0 0 50px var(--gold)"
    })
        .to('.loader-text', {
            opacity: 1,
            letterSpacing: "5px",
            duration: 1.2,
            ease: "power2.out"
        }, "-=1.0")

        // 2. The Curtain Reveal (Cinematic Lift)
        .to(preloader, {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut",
            delay: 0.2
        })

        // 3. Hero Elements Stagger In
        .to('.navbar', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .to('.hero-content h1', {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
        }, "-=0.8")
        .to('.hero-content p', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }, "-=1.0")
        .add(() => {
            document.body.classList.remove('loading');
            document.body.style.overflow = 'auto'; // Unlock scroll
            ScrollTrigger.refresh(); // Refresh scroll triggers once layout is set
        });

    // =========================================================================
    // SCROLL INTERACTIONS
    // =========================================================================

    // Navbar Glass Effect on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.textContent = '☰';
            });
        });
    }

    // Scroll Animations (GSAP Batch)
    gsap.utils.toArray('.scroll-animate').forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        });
    });

    // =========================================================================
    // EVENT GRID & TABS LOGIC (New Implementation)
    // =========================================================================
    const eventGrid = document.getElementById('events-grid');
    const tabBtns = document.querySelectorAll('.tab-btn');

    if (eventGrid && tabBtns.length > 0) {
        let allEvents = [];

        // 1. Flatten Data
        for (const [key, category] of Object.entries(EVENTS_DATA)) {
            let type = 'non-technical';
            if (key === 'technical') type = 'technical';
            if (key === 'workshops') type = 'workshop';

            category.events.forEach(ev => {
                // Determine Spotlight Status (Custom logic based on popular events)
                const isSpotlight = ev.isSpotlight || ['Hackathon', 'Battle of Bands', 'Fashion Show', 'DJ Night', 'Pro Show', 'Valorant'].some(t => ev.title.includes(t));

                allEvents.push({
                    ...ev,
                    categoryKey: key,
                    type: type,
                    isSpotlight: isSpotlight
                });
            });
        }

        // 2. Render Function
        function renderEvents(filter) {
            eventGrid.innerHTML = ''; // Clear current

            const filteredEvents = allEvents.filter(ev => {
                if (filter === 'all') return true;
                if (filter === 'spotlight') return ev.isSpotlight;
                return ev.type === filter;
            });

            // Add animation delay stagger
            filteredEvents.forEach((ev, index) => {
                const card = document.createElement('div');
                card.className = 'event-display-card';
                card.style.animationDelay = `${index * 0.1}s`; // Stagger effect

                // Image Class handling (assuming bg- classes exist from previous css or usage)
                // Use explicit image if available, else fallback
                const bgStyle = ev.image ? `background-image: url('${ev.image}');` : '';
                const bgClass = ev.image ? '' : (ev.class || 'bg-gaming');

                card.innerHTML = `
                    <div class="card-image-top ${bgClass}" style="${bgStyle}">
                        ${ev.isSpotlight ? '<span class="card-category-badge">Spotlight</span>' : ''}
                    </div>
                    <div class="event-card-content">
                        <h3>${ev.title}</h3>
                        <p>${ev.desc}</p>
                        <button class="register-btn-main" onclick="handleRegisterClick('${ev.title}')">
                            ${USER_SESSION.isLoggedIn ? 'Register Now' : 'Login to Register'}
                        </button>
                    </div>
                `;
                eventGrid.appendChild(card);
            });
        }

        // 3. Init with 'All'
        renderEvents('all');

        // 4. Tab Click Handlers
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                renderEvents(filter);
            });
        });
    }

});
