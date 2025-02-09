/**
 * assets/js/scripts.js
 * 
 * This script handles:
 * - Four Three.js 3D background animations:
 *    1. A realistic rotating DNA double helix
 *    2. A machine-learning network (nodes and connections)
 *    3. Rotating NLP torus knots
 *    4. An AI Cube effect
 * - A preloader fade-out
 * - GSAP ScrollTrigger animations for section reveals and card hover effects
 * - Smooth scroll for anchor links
 * - Section transition overlay effect on scroll
 * - Responsive resize handling and extra effects (parallax, button ripple)
 */

let scene, camera, renderer;
let dnaGroup, mlGroup, nlpGroup, aiGroup;

function initThreeJS() {
  // Create the scene
  scene = new THREE.Scene();

  // Set up the camera (centered so that 0,0,0 is the middle of the screen)
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 40;

  // Create the renderer with transparency
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Replace the existing canvas with our renderer’s canvas
  const bgCanvas = document.getElementById('bg-canvas');
  bgCanvas.parentNode.replaceChild(renderer.domElement, bgCanvas);
  renderer.domElement.id = 'bg-canvas';

  // Add ambient and point lights for a realistic look
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1.2);
  pointLight.position.set(20, 30, 20);
  scene.add(pointLight);

  // Create and add 3D groups
  dnaGroup = new THREE.Group();
  createDNAHelix();
  // Center the DNA helix so that its middle is at (0,0,0)
  dnaGroup.position.set(0, 0, 0);
  scene.add(dnaGroup);

  mlGroup = new THREE.Group();
  createMLNetwork();
  scene.add(mlGroup);

  nlpGroup = new THREE.Group();
  createNLPObjects();
  scene.add(nlpGroup);

  aiGroup = new THREE.Group();
  createAICube();
  scene.add(aiGroup);

  animateThreeJS();
}

function createDNAHelix() {
  // Create a realistic DNA double helix that twists around the center.
  const numSegments = 100;
  const radius = 12; // Adjusted so that the helix circles around the hero image
  const height = 40;
  const sphereGeo = new THREE.SphereGeometry(0.5, 32, 32);
  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0x00BFFF,
    emissive: 0x0066FF,
    metalness: 0.7,
    roughness: 0.2
  });

  for (let i = 0; i < numSegments; i++) {
    const angle = (i / numSegments) * Math.PI * 8;
    const y = (i / numSegments) * height - height / 2;

    // First strand sphere
    const sphere1 = new THREE.Mesh(sphereGeo, sphereMat);
    sphere1.position.set(
      radius * Math.cos(angle),
      y,
      radius * Math.sin(angle)
    );
    dnaGroup.add(sphere1);

    // Second strand sphere (offset by PI)
    const sphere2 = new THREE.Mesh(sphereGeo, sphereMat);
    sphere2.position.set(
      radius * Math.cos(angle + Math.PI),
      y,
      radius * Math.sin(angle + Math.PI)
    );
    dnaGroup.add(sphere2);

    // Connecting “rungs” every 5 segments
    if (i % 5 === 0) {
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        sphere1.position,
        sphere2.position
      ]);
      const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff });
      const line = new THREE.Line(lineGeo, lineMat);
      dnaGroup.add(line);
    }
  }
}

function createMLNetwork() {
  const nodes = [];
  const layers = [4, 6, 4]; // Nodes per layer

  layers.forEach((nodeCount, layerIndex) => {
    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.6, 16, 16),
        new THREE.MeshStandardMaterial({
          color: 0xFF4500,
          emissive: 0xFF3300,
          metalness: 0.5
        })
      );
      node.position.x = layerIndex * 6 - 6;
      node.position.y = (i - nodeCount / 2) * 2.5;
      mlGroup.add(node);
      nodes.push(node);

      // Connect nodes to previous layer nodes
      if (layerIndex > 0) {
        const prevLayerNodes = nodes.filter(n => n.position.x === (layerIndex - 1) * 6 - 6);
        prevLayerNodes.forEach(prevNode => {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([
            prevNode.position,
            node.position
          ]);
          const lineMat = new THREE.LineBasicMaterial({
            color: 0xFF4500,
            opacity: 0.3,
            transparent: true
          });
          const line = new THREE.Line(lineGeo, lineMat);
          mlGroup.add(line);
        });
      }
    }
  });
}

function createNLPObjects() {
  // Create several rotating torus knots for an NLP effect.
  const torusGeo = new THREE.TorusKnotGeometry(1.2, 0.4, 100, 16);
  const torusMat = new THREE.MeshStandardMaterial({ color: 0x8A2BE2, flatShading: true });

  for (let i = 0; i < 8; i++) {
    const torusKnot = new THREE.Mesh(torusGeo, torusMat);
    torusKnot.position.x = Math.random() * 20 - 10;
    torusKnot.position.y = Math.random() * 20 - 10;
    torusKnot.position.z = Math.random() * 20 - 10;
    nlpGroup.add(torusKnot);
  }
}

function createAICube() {
  // A rotating cube representing an AI-inspired effect.
  const cubeGeo = new THREE.BoxGeometry(3, 3, 3);
  const cubeMat = new THREE.MeshStandardMaterial({
    color: 0x00FF7F,
    emissive: 0x008040,
    metalness: 0.5,
    roughness: 0.3
  });
  const cube = new THREE.Mesh(cubeGeo, cubeMat);
  cube.position.set(-15, 0, 0);
  aiGroup.add(cube);
}

function animateThreeJS() {
  requestAnimationFrame(animateThreeJS);

  // Rotate the DNA helix for a realistic twist
  dnaGroup.rotation.y += 0.005;
  dnaGroup.rotation.z += 0.002;

  // Animate ML network nodes and connections
  mlGroup.children.forEach(child => {
    child.rotation.x += 0.008;
    child.rotation.y += 0.008;
  });

  // Animate NLP torus knots
  nlpGroup.children.forEach(torus => {
    torus.rotation.x += 0.02;
    torus.rotation.y += 0.015;
  });

  // Animate the AI cube
  aiGroup.children.forEach(cube => {
    cube.rotation.x += 0.015;
    cube.rotation.y += 0.02;
  });

  renderer.render(scene, camera);
}

// ---------------------------
// GSAP SCROLL TRIGGER & UI ANIMATIONS
// ---------------------------
function initGSAPAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Animate sections on scroll
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 100,
      duration: 1.2,
      ease: 'power4.out'
    });
  });

  // Animate card hover effects (if any cards are present)
  gsap.utils.toArray('.project-card, .experience-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { scale: 1.05, duration: 0.3 });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { scale: 1, duration: 0.3 });
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
      const targetElement = document.querySelector(this.getAttribute('href'));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ---------------------------
// SECTION TRANSITION OVERLAY EFFECT
// ---------------------------
function initSectionTransition() {
  const overlay = document.querySelector('.section-transition-overlay');
  window.addEventListener('scroll', () => {
    gsap.to(overlay, { opacity: 0.5, duration: 0.3, ease: 'power2.out' });
    clearTimeout(window.sectionTransitionTimeout);
    window.sectionTransitionTimeout = setTimeout(() => {
      gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in' });
    }, 150);
  });
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
// PRELOADER FADE-OUT
// ---------------------------
function initPreloader() {
  window.addEventListener('load', () => {
    gsap.to("#preloader", { opacity: 0, duration: 0.5, onComplete: () => {
      document.getElementById("preloader").style.display = "none";
    }});
  });
}

// ---------------------------
// INITIALIZATION
// ---------------------------
document.addEventListener('DOMContentLoaded', () => {
  initThreeJS();
  initGSAPAnimations();
  initSmoothScroll();
  initSectionTransition();
  handleResize();
  initParallax();
  initButtonRipple();
  initPreloader();
  console.log('All scripts initialized successfully.');
});
