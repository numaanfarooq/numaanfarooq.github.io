// Wait until the DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function () {
  // Initialize our 3D background (see function below)
  init3DBackground();

  // Set up IntersectionObserver to add scroll animations to each section
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view', 'section-loaded');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Add simple tap (mousedown/up) effects to cards for a 3D “press” effect
  document.querySelectorAll('.project-card, .experience-card').forEach((card) => {
    card.addEventListener('mousedown', () => {
      card.classList.add('active-3d');
    });
    card.addEventListener('mouseup', () => {
      card.classList.remove('active-3d');
    });
  });
});

/* =====================================================
   Three.js background with multiple rotating 3D objects
   ===================================================== */
function init3DBackground() {
  // Create (or use) a container element for our Three.js canvas.
  let container = document.getElementById('threejs-background');
  if (!container) {
    container = document.createElement('div');
    container.id = 'threejs-background';
    document.body.prepend(container);
  }

  // Set up Three.js basics: scene, camera, and renderer.
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 10;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Add ambient and point lights to illuminate our 3D objects.
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  // ---------------------------------------------------
  // Create several 3D objects with distinct “tech” effects
  // ---------------------------------------------------

  // 1. Rotating Torus Knot (as a Deep Learning effect)
  const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
  const torusKnotMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    roughness: 0.5,
    metalness: 0.1,
  });
  const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
  torusKnot.position.set(-3, 0, 0);
  scene.add(torusKnot);

  // 2. DNA Strand – a simple helix curve using TubeGeometry
  class HelixCurve extends THREE.Curve {
    constructor(scale = 1) {
      super();
      this.scale = scale;
    }
    getPoint(t, optionalTarget = new THREE.Vector3()) {
      // A basic helix: 4 full rotations over its length
      const angle = 2 * Math.PI * 4 * t;
      const x = Math.cos(angle) * this.scale;
      const y = Math.sin(angle) * this.scale;
      const z = 10 * t - 5; // center the helix along z
      return optionalTarget.set(x, y, z);
    }
  }
  const helixCurve = new HelixCurve(0.5);
  const helixGeometry = new THREE.TubeGeometry(helixCurve, 100, 0.05, 8, false);
  const helixMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const helix = new THREE.Mesh(helixGeometry, helixMaterial);
  helix.position.set(3, 0, 0);
  scene.add(helix);

  // 3. Rotating Cube with an “NLP” placeholder effect (could be replaced with a 3D logo)
  const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(0, 3, 0);
  scene.add(cube);

  // 4. Rotating Sphere as an additional Deep Learning effect
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(0, -3, 0);
  scene.add(sphere);

  // 5. Extra “DNA‐like” double helix: two intertwined curves with a phase offset
  const group = new THREE.Group();
  const curve1 = new HelixCurve(0.3);
  const geometryCurve1 = new THREE.TubeGeometry(curve1, 100, 0.03, 8, false);
  const materialCurve1 = new THREE.MeshStandardMaterial({ color: 0x00ffff });
  const strand1 = new THREE.Mesh(geometryCurve1, materialCurve1);
  group.add(strand1);

  const curve2 = new HelixCurve(0.3);
  const geometryCurve2 = new THREE.TubeGeometry(curve2, 100, 0.03, 8, false);
  const materialCurve2 = new THREE.MeshStandardMaterial({ color: 0xff00ff });
  const strand2 = new THREE.Mesh(geometryCurve2, materialCurve2);
  // Offset the second strand by a 180° phase shift
  strand2.rotation.z = Math.PI;
  group.add(strand2);

  group.position.set(0, 0, -5);
  scene.add(group);

  // ---------------------------------------------------
  // Animate all objects continuously
  // ---------------------------------------------------
  function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    helix.rotation.x += 0.005;
    helix.rotation.y += 0.005;
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    sphere.rotation.y += 0.015;
    group.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();

  // Update renderer & camera on window resize for responsiveness
  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
