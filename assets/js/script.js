/**
 * scripts.js
 * 
 * This file handles:
 * - Three.js 3D background (DNA-like helix)
 * - GSAP ScrollTrigger animations
 * - Smooth scroll for anchor links
 * - Responsive handling on window resize
 * - Additional interactive UI effects
 */

// ---------------------------
// THREE.JS 3D BACKGROUND SETUP
// ---------------------------
let scene, camera, renderer, helixGroup;

function initThreeJS() {
  // Create scene
  scene = new THREE.Scene();
  
  // Create camera
  camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
  );
  camera.position.z = 25;

  // Create renderer with transparent background
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  // Append renderer to our canvas container (or directly to body if no container)
  const bgCanvas = document.getElementById('bg-canvas');
  bgCanvas.parentNode.replaceChild(renderer.domElement, bgCanvas);
  renderer.domElement.id = 'bg-canvas'; // Retain the id for styling

  // Create a group for our DNA helix
  helixGroup = new THREE.Group();
  createDNAHelix();
  scene.add(helixGroup);

  // Add light for better visibility
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const pointLight = new THREE.PointLight(0xffffff, 1.5);
  pointLight.position.set(10, 15, 10);
  scene.add(pointLight);
  
  // Start the animation loop
  animateThreeJS();
}

function createDNAHelix() {
  // Create geometry for a helix-like structure
  const numSpheres = 40;
  const helixRadius = 5;
  const helixHeight = 20;
  const sphereGeometry = new THREE.SphereGeometry(0.3, 16, 16);
  const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00BFFF });

  for (let i = 0; i < numSpheres; i++) {
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    const angle = i * 0.4;
    const x = helixRadius * Math.sin(angle);
    const y = (i / numSpheres) * helixHeight - helixHeight / 2;
    const z = helixRadius * Math.cos(angle);
    sphere.position.set(x, y, z);
    helixGroup.add(sphere);
  }
}

function animateThreeJS() {
  requestAnimationFrame(animateThreeJS);
  
  // Rotate the helix slowly for a dynamic effect
  helixGroup.rotation.y += 0.005;
  helixGroup.rotation.x += 0.002;

  renderer.render(scene, camera);
}

// ---------------------------
// GSAP SCROLL TRIGGER ANIMATIONS
// ---------------------------
function initGSAPAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Animate sections on scroll
  document.querySelectorAll('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out'
    });
  });
}

// ---------------------------
// SMOOTH SCROLL FOR ANCHOR LINKS
// ---------------------------
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetID = this.getAttribute('href');
      const targetElement = document.querySelector(targetID);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

// ---------------------------
// TYPING EFFECT (OPTIONAL)
// ---------------------------
function initTypingEffect() {
  const heroText = document.querySelector('.typing-effect');
  if (heroText) {
    let text = heroText.textContent;
    heroText.textContent = '';
    let index = 0;
    const speed = 100;
    function type() {
      if (index < text.length) {
        heroText.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    }
    type();
  }
}

// ---------------------------
// WINDOW RESIZE HANDLER
// ---------------------------
function handleResize() {
  window.addEventListener('resize', () => {
    // Adjust camera and renderer size
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ---------------------------
// INITIALIZATION
// ---------------------------
document.addEventListener('DOMContentLoaded', () => {
  initThreeJS();
  initGSAPAnimations();
  initSmoothScroll();
  initTypingEffect();
  handleResize();
  
  // Additional initialization for other UI interactions can be added here.
  
  // Debug info: Log that all scripts have loaded.
  console.log('All scripts initialized successfully.');
});

// ---------------------------
// EXTRA INTERACTIVE EFFECTS
// ---------------------------
function initExtraEffects() {
  // Example: Parallax effect for hero background
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('header');
    if (hero) {
      hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    }
  });
  
  // Example: Button ripple effect (if needed)
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function(e) {
      let ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      const maxDim = Math.max(this.clientWidth, this.clientHeight);
      ripple.style.width = ripple.style.height = maxDim + 'px';
      ripple.style.left = e.clientX - this.offsetLeft - maxDim / 2 + 'px';
      ripple.style.top = e.clientY - this.offsetTop - maxDim / 2 + 'px';
      setTimeout(() => { ripple.remove(); }, 600);
    });
  });
}

initExtraEffects();

/* End of scripts.js */
