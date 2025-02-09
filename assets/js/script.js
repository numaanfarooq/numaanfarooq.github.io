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

// Update createDNAHelix function
function createDNAHelix() {
  const numSegments = 100;
  const radius = 5;
  const height = 40;
  const geometry = new THREE.SphereGeometry(0.3, 16, 16);
  const material = new THREE.MeshStandardMaterial({ 
    color: 0x00BFFF,
    emissive: 0x0066FF,
    metalness: 0.7,
    roughness: 0.2
  });

  // Create double helix structure
  for (let i = 0; i < numSegments; i++) {
    const angle = (i / numSegments) * Math.PI * 8;
    const y = (i / numSegments) * height - height/2;
    
    // First strand
    const sphere1 = new THREE.Mesh(geometry, material);
    sphere1.position.set(
      radius * Math.sin(angle),
      y,
      radius * Math.cos(angle)
    );
    dnaGroup.add(sphere1);

    // Second strand
    const sphere2 = new THREE.Mesh(geometry, material);
    sphere2.position.set(
      radius * Math.sin(angle + Math.PI),
      y,
      radius * Math.cos(angle + Math.PI)
    );
    dnaGroup.add(sphere2);

    // Connecting lines
    if (i % 5 === 0) {
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        sphere1.position,
        sphere2.position
      ]);
      const line = new THREE.Line(
        lineGeometry,
        new THREE.LineBasicMaterial({ color: 0xFFFFFF })
      );
      dnaGroup.add(line);
    }
  }

  // Add rotating base platform
  const baseGeometry = new THREE.CylinderGeometry(8, 8, 0.5, 32);
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    metalness: 0.8,
    roughness: 0.3
  });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = -height/2 - 2;
  dnaGroup.add(base);
}

// Add ML neural network visualization
function createMLNetwork() {
  const nodes = [];
  const layers = [4, 6, 4]; // Number of nodes per layer
  
  layers.forEach((nodeCount, layerIndex) => {
    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.5),
        new THREE.MeshStandardMaterial({
          color: 0xFF4500,
          emissive: 0xFF3300,
          metalness: 0.5
        })
      );
      node.position.x = layerIndex * 5 - 5;
      node.position.y = (i - nodeCount/2) * 2;
      mlGroup.add(node);
      nodes.push(node);
      
      // Create connections to previous layer
      if (layerIndex > 0) {
        const prevLayerNodes = nodes.filter(n => 
          n.position.x === (layerIndex-1)*5 -5
        );
        
        prevLayerNodes.forEach(prevNode => {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            prevNode.position,
            node.position
          ]);
          const line = new THREE.Line(
            lineGeometry,
            new THREE.LineBasicMaterial({
              color: 0xFF4500,
              opacity: 0.3,
              transparent: true
            })
          );
          mlGroup.add(line);
        });
      }
    }
  });
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
// Update GSAP animations
function initGSAPAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Section entry animations
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 90%',
        end: 'bottom 10%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 100,
      duration: 1.5,
      ease: 'power4.out'
    });
  });

  // Card hover effects
  gsap.utils.toArray('.project-card, .experience-card').forEach(card => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'back.out(1.7)'
    });

    // Hover effect
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.05,
        boxShadow: '0 25px 40px rgba(0,0,0,0.3)',
        duration: 0.3
      });
      if(card.querySelector('img')) {
        gsap.to(card.querySelector('img'), {
          scale: 1.1,
          rotate: 2,
          duration: 0.5
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        duration: 0.3
      });
      if(card.querySelector('img')) {
        gsap.to(card.querySelector('img'), {
          scale: 1,
          rotate: 0,
          duration: 0.5
        });
      }
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
