const EVENTS_DATA = {
    'technical': {
        title: 'Technical Events (Entry: ₹50)',
        events: [
            { title: 'AI Nexus', desc: 'Discover the future of Intelligence. Winners get Certificates.', prize: 'Certificate', rules: 'Individual', class: 'bg-tech', image: 'assets/tech_bg.png' },
            { title: 'CyberGuard CTF', desc: 'Capture the Flag security challenge. Winners get Certificates.', prize: 'Certificate', rules: 'Individual', class: 'bg-tech', image: 'assets/ctf.png' },
            { title: 'Code Sprint', desc: 'Ultimate coding battle. Winners get Certificates.', prize: 'Certificate', rules: 'Individual', class: 'bg-tech', image: 'assets/tech_bg.png' }
        ]
    },
    'non-technical': {
        title: 'Non-Technical Events',
        events: [
            { title: 'BGMI Tournament', desc: 'Solo: Entry ₹40. Prizes: 1st ₹80, 2nd ₹60. Duo: Entry ₹80. Prizes: 1st ₹160, 2nd ₹120. Squad: Entry ₹150. Prizes: 1st ₹300, 2nd ₹200. Open to Boys & Girls. Winners & Runners get Certificates.', prize: 'Pool ₹600+', rules: 'Open to All', class: 'bg-gaming', image: 'assets/bgmi.png' },
            { title: 'Free Fire Clash', desc: 'Solo: Entry ₹40. Prizes: 1st ₹80, 2nd ₹60. Duo: Entry ₹80. Prizes: 1st ₹160, 2nd ₹120. Squad: Entry ₹150. Prizes: 1st ₹300, 2nd ₹200. Open to Boys & Girls. Winners & Runners get Certificates.', prize: 'Pool ₹600+', rules: 'Open to All', class: 'bg-gaming', image: 'assets/freefire.png' },
            { title: 'ShutterUp (Photo)', desc: 'Entry: ₹20. Prizes: 1st ₹80, 2nd ₹60, 3rd ₹40. Winners & Runners get Certificates.', prize: '₹180 Pool', rules: 'Individual', class: 'bg-art', image: 'assets/photography.png' },
            { title: 'CineMatrix (Video)', desc: 'Entry: ₹20. Prizes: 1st ₹80, 2nd ₹60, 3rd ₹40. Winners & Runners get Certificates.', prize: '₹180 Pool', rules: 'Individual', class: 'bg-video', image: 'assets/videography.png' },
            { title: 'Mehindi Art', desc: 'Entry: ₹50. Prizes: 1st ₹120, 2nd ₹80, 3rd ₹60. Winners & Runners get Certificates.', prize: '₹260 Pool', rules: 'Team of 2', class: 'bg-art', image: 'assets/mehndi.png' }
        ]
    },
    'spotlight': {
        title: 'Spotlight Events',
        events: [
            { title: 'Flashmob', desc: 'Synchronized dance spectacle.', prize: 'N/A', rules: 'Showcase', class: 'bg-spotlight', image: 'assets/flashmob.png', isSpotlight: true },
            { title: 'Cultural Night', desc: 'A night of tradition and dance.', prize: 'N/A', rules: 'Showcase', class: 'bg-spotlight', image: 'assets/cultural.png', isSpotlight: true },
            { title: 'Solo Dance', desc: 'Special Dance Performances.', prize: 'N/A', rules: 'Showcase', class: 'bg-spotlight', image: 'assets/cultural.png', isSpotlight: true }
        ]
    },
    'workshops': {
        title: 'Workshops (Entry: ₹150)',
        events: [
            { title: 'Generative AI Workshop', desc: 'Master the future of AI. Build LLM apps.', prize: 'Certificate', rules: 'Laptop req.', class: 'bg-tech', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000' },
            { title: 'Cyber Security Workshop', desc: 'Ethical Hacking & Network Defense.', prize: 'Certificate', rules: 'Laptop req.', class: 'bg-tech', image: 'https://images.unsplash.com/photo-1563206767-5b1d972b9fb1?auto=format&fit=crop&q=80&w=1000' }
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

    // 4. Hacker Text Scramble (Nav Links)
    initHackerText();

    function initHackerText() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.dataset.value = link.innerText; // Store original

            link.addEventListener('mouseover', event => {
                let iteration = 0;
                let interval = setInterval(() => {
                    event.target.innerText = event.target.innerText
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return event.target.dataset.value[index];
                            }
                            return letters[Math.floor(Math.random() * 26)];
                        })
                        .join("");

                    if (iteration >= event.target.dataset.value.length) {
                        clearInterval(interval);
                    }

                    iteration += 1 / 3;
                }, 30);

                // Safety cleanup
                link.addEventListener('mouseleave', () => {
                    clearInterval(interval);
                    event.target.innerText = event.target.dataset.value;
                }, { once: true });
            });
        });
    }

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
        .add(() => {
            // Typing Effect Trigger
            const desc = document.querySelector('.hero-content p');
            if (desc) {
                const text = desc.innerText;
                desc.innerText = '';
                desc.style.opacity = 1; // Make visible

                let i = 0;
                function typeWriter() {
                    if (i < text.length) {
                        desc.innerHTML += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, 30); // Typing speed
                    }
                }
                typeWriter();
            }
        }, "-=0.5")
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
            if (key === 'spotlight') type = 'spotlight';

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
                card.className = 'event-zigzag-card'; // New Zig-Zag Class

                // Add scroll animation class (handled by GSAP or basic CSS observer if present, 
                // but let's stick to simple CSS fade-in for now or reuse scroll-animate)
                // card.classList.add('scroll-animate'); 

                card.style.animationDelay = `${index * 0.15}s`;

                // Image logic
                const bgStyle = ev.image ? `background-image: url('${ev.image}');` : '';
                const bgClass = ev.image ? '' : (ev.class || 'bg-gaming');

                card.innerHTML = `
                    <div class="zigzag-img-wrapper ${bgClass}" style="${bgStyle}">
                        <div class="img-overlay"></div>
                        ${ev.isSpotlight ? '<span class="card-category-badge">Spotlight</span>' : ''}
                    </div>
                    <div class="zigzag-content">
                        <div class="content-decoration"></div>
                        <h3>${ev.title}</h3>
                        <p class="event-desc">${ev.desc}</p>
                        
                        <div class="zigzag-meta">
                            <span class="meta-item">🏆 ${ev.prize || 'Exciting Prizes'}</span>
                            <span class="meta-item">👥 ${ev.rules || 'Register Now'}</span>
                        </div>

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

// --- Particles.js Initialization for Cyberpunk Background ---
// --- Interactive Animations (Burst & Cursor) ---
document.addEventListener('DOMContentLoaded', () => {
    // --- Click Burst Animation ---
    document.addEventListener('click', (e) => {
        createBurst(e.clientX, e.clientY);
    });

    function createBurst(x, y) {
        const particleCount = 12;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('click-particle');
            document.body.appendChild(particle);

            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 100 + 50;
            const tx = Math.cos(angle) * velocity + 'px';
            const ty = Math.sin(angle) * velocity + 'px';

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.setProperty('--tx', tx);
            particle.style.setProperty('--ty', ty);

            // Random colors from theme
            const colors = ['#e8ba30', '#33ffff', '#ffffff', '#d946ef'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];

            setTimeout(() => {
                particle.remove();
            }, 800);
        }
    }

    // --- Custom Cursor Trail Animation ---
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    const follower = document.createElement('div');
    follower.classList.add('custom-cursor-follower');
    document.body.appendChild(follower);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Simple lag effect for follower
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    // Hover effect for links
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('active'));
        el.addEventListener('mouseleave', () => follower.classList.remove('active'));
    });

    // --- Premium Animations (Tilt & Magnetic) ---
    initPremiumAnimations();

    function initPremiumAnimations() {
        // 1. 3D Holographic Tilt
        // Only active on devices that support hover (Mouse) to prevent mobile scroll blocking
        if (window.matchMedia('(hover: hover)').matches) {
            const tiltCards = document.querySelectorAll('.team-card, .event-card, .glass-panel');

            tiltCards.forEach(card => {
                card.style.transition = 'transform 0.1s ease-out'; // Smooth movement

                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    // Calculate center
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    // Calculate tilt (Max 15 degrees)
                    const rotateX = ((y - centerY) / centerY) * -10; // Invert Y for natural tilt
                    const rotateY = ((x - centerX) / centerX) * 10;

                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transition = 'transform 0.5s ease-out'; // Smooth return
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                });
            });

            // 2. Magnetic Buttons
            const magnets = document.querySelectorAll('.btn, .nav-link, .social-icon-link');

            magnets.forEach(btn => {
                btn.addEventListener('mousemove', (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    // Move button slightly towards cursor (Magnetic pull)
                    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
                });

                btn.addEventListener('mouseleave', () => {
                    btn.style.transform = 'translate(0, 0)';
                });
            });
        }
    }

    // --- Extra Animations (Scroll & Spotlight) ---
    initExtraAnimations();

    function initExtraAnimations() {
        // 1. Scroll Progress
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const progress = (scrollTop / scrollHeight) * 100;
                progressBar.style.width = progress + '%';
            });
        }

        // 2. Spotlight Overlay for Events Grid
        const eventGrids = document.querySelectorAll('.events-grid, .events-grid-display');
        eventGrids.forEach(grid => {
            grid.addEventListener('mousemove', (e) => {
                const rect = grid.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                grid.style.setProperty('--mouse-x', `${x}px`);
                grid.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }
});
