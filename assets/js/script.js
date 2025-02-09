/**
 * assets/js/scripts.js
 * 
 * This script handles:
 * - Three.js 3D background animations including:
 *   • A DNA helix effect
 *   • Rotating ML cubes (representing machine learning)
 *   • Twisting NLP torus knots (representing natural language processing)
 * - GSAP ScrollTrigger animations for section reveals
 * - Smooth scroll for anchor links
 * - Responsive resize handling, parallax effects, and button ripple effects
 */

// ---------------------------
// THREE.JS 3D BACKGROUND SETUP
// ---------------------------
let scene, camera, renderer;
let dnaGroup, mlGroup, nlpGroup;

function initThreeJS() {
  // Create the scene
  scene = new THREE.Scene();

  // Set up the camera
  camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
  );
  camera.position.z = 30;

  // Create the renderer with transparency
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Replace the existing canvas with our renderer's canvas
  const bgCanvas = document.getElementById('bg-canvas');
  bgCanvas.parentNode.replaceChild(renderer.domElement, bgCanvas);
  renderer.domElement.id = 'bg-canvas';

  // Add ambient and point lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1.2);
  pointLight.position.set(20, 30, 20);
  scene.add(pointLight);

  // Create groups for 3D effects
  dnaGroup = new THREE.Group();
  createDNAHelix();
  scene.add(dnaGroup);

  mlGroup = new THREE.Group();
  createMLObjects();
  scene.add(mlGroup);

  nlpGroup = new THREE.Group();
  createNLPObjects();
  scene.add(nlpGroup);

  animateThreeJS();
}

function createDNAHelix() {
  // Build a DNA helix with spheres
  const numSpheres = 50;
  const helixRadius = 5;
  const helixHeight = 30;
  const sphereGeometry = new THREE.SphereGeometry(0.4, 16, 16);
  const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00BFFF });
  
  for (let i = 0; i < numSpheres; i++) {
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    const angle = i * 0.3;
    const x = helixRadius * Math.sin(angle);
    const y = (i / numSpheres) * helixHeight - helixHeight / 2;
    const z = helixRadius * Math.cos(angle);
    sphere.position.set(x, y, z);
    dnaGroup.add(sphere);
  }
  // Offset the DNA group to the left
  dnaGroup.position.x = -15;
}

function createMLObjects() {
  // Create rotating cubes to represent ML icons
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xFF4500, flatShading: true });
  
  for (let i = 0; i < 10; i++) {
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = Math.random() * 10 - 5;
    cube.position.y = Math.random() * 20 - 10;
    cube.position.z = Math.random() * 10 - 5;
    mlGroup.add(cube);
  }
  // Position ML group to the right of center
  mlGroup.position.x = 10;
}

function createNLPObjects() {
  // Create rotating torus knots to represent NLP effects
  const torusGeometry = new THREE.TorusKnotGeometry(1.2, 0.4, 100, 16);
  const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x8A2BE2, flatShading: true });
  
  for (let i = 0; i < 8; i++) {
    const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);
    torusKnot.position.x = Math.random() * 10 - 5;
    torusKnot.position.y = Math.random() * 15 - 7.5;
    torusKnot.position.z = Math.random() * 10 - 5;
    nlpGroup.add(torusKnot);
  }
  // Position NLP group to the far right
  nlpGroup.position.x = 15;
}

function animateThreeJS() {
  requestAnimationFrame(animateThreeJS);
  
  // Slowly rotate the DNA helix group
  dnaGroup.rotation.y += 0.005;
  dnaGroup.rotation.x += 0.003;
  
  // Rotate each ML cube
  mlGroup.children.forEach(cube => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  });
  
  // Rotate each NLP torus knot
  nlpGroup.children.forEach(torus => {
    torus.rotation.x += 0.02;
    torus.rotation.y += 0.015;
  });
  
  renderer.render(scene, camera);
}

// ---------------------------
// GSAP SCROLL TRIGGER ANIMATIONS
// ---------------------------
function initGSAPAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  
  // Animate each section on scroll
  document.querySelectorAll('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
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
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ---------------------------
// OPTIONAL: TYPING EFFECT FOR HERO TEXT
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
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ---------------------------
// EXTRA EFFECTS: PARALLAX & BUTTON RIPPLE
// ---------------------------
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('header');
    if (header) {
      header.style.backgroundPositionY = -(scrolled * 0.3) + 'px';
    }
  });
}

function initButtonRipple() {
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function(e) {
      let ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      const maxDim = Math.max(this.clientWidth, this.clientHeight);
      ripple.style.width = ripple.style.height = maxDim + 'px';
      ripple.style.left = (e.clientX - this.offsetLeft - maxDim / 2) + 'px';
      ripple.style.top = (e.clientY - this.offsetTop - maxDim / 2) + 'px';
      setTimeout(() => { ripple.remove(); }, 600);
    });
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
  initParallax();
  initButtonRipple();
  console.log('All scripts initialized successfully.');
});
