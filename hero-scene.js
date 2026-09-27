import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

const canvas = document.querySelector('#heroScene');
const visual = canvas?.parentElement;

if (canvas && visual) {
  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
    camera.position.set(0, 0, 6.4);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    scene.add(new THREE.AmbientLight(0xffffff, 2.1));

    const keyLight = new THREE.DirectionalLight(0xe5ffc0, 3.2);
    keyLight.position.set(-3, 4, 5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x70d6ad, 18, 8);
    rimLight.position.set(3, 1, -1);
    scene.add(rimLight);

    const composition = new THREE.Group();
    scene.add(composition);

    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(1.82, 0.012, 8, 140),
      new THREE.MeshBasicMaterial({ color: 0xd7f36a, transparent: true, opacity: 0.48 })
    );
    orbit.rotation.set(1.08, -0.22, -0.24);
    composition.add(orbit);

    const orbitInner = new THREE.Mesh(
      new THREE.TorusGeometry(1.48, 0.006, 6, 140),
      new THREE.MeshBasicMaterial({ color: 0x8ed9b5, transparent: true, opacity: 0.23 })
    );
    orbitInner.rotation.set(0.88, 0.32, 0.38);
    composition.add(orbitInner);

    const panel = new THREE.Group();
    panel.position.set(0, 0.02, 0.12);
    panel.rotation.set(-0.12, -0.18, 0.035);
    composition.add(panel);

    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x29483b,
      metalness: 0.52,
      roughness: 0.28,
    });
    const frame = new THREE.Mesh(new THREE.BoxGeometry(2.62, 1.76, 0.16), frameMaterial);
    panel.add(frame);

    const edgeLines = new THREE.LineSegments(
      new THREE.EdgesGeometry(frame.geometry),
      new THREE.LineBasicMaterial({ color: 0x9cb990, transparent: true, opacity: 0.65 })
    );
    panel.add(edgeLines);

    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(2.48, 1.62),
      new THREE.MeshStandardMaterial({
        color: 0x183128,
        emissive: 0x10241b,
        emissiveIntensity: 0.55,
        roughness: 0.72,
      })
    );
    screen.position.z = 0.083;
    panel.add(screen);

    const gridMaterial = new THREE.LineBasicMaterial({ color: 0x668276, transparent: true, opacity: 0.2 });
    for (const y of [-0.47, -0.12, 0.23, 0.56]) {
      const gridLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-1.06, y, 0.09),
          new THREE.Vector3(1.06, y, 0.09),
        ]),
        gridMaterial
      );
      panel.add(gridLine);
    }

    const headerMaterial = new THREE.MeshBasicMaterial({ color: 0xa7bdad });
    const header = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.045, 0.025), headerMaterial);
    header.position.set(-0.79, 0.59, 0.11);
    panel.add(header);

    const subheader = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.024, 0.025),
      new THREE.MeshBasicMaterial({ color: 0x6f8c7d })
    );
    subheader.position.set(-0.91, 0.48, 0.11);
    panel.add(subheader);

    const heights = [0.46, 0.72, 0.58, 0.95, 0.78];
    const barMaterial = new THREE.MeshStandardMaterial({
      color: 0xd7f36a,
      emissive: 0x637c24,
      emissiveIntensity: 0.42,
      metalness: 0.12,
      roughness: 0.32,
    });

    heights.forEach((height, index) => {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.17, height, 0.055), barMaterial);
      bar.position.set(-0.68 + index * 0.34, -0.59 + height / 2, 0.13);
      panel.add(bar);
    });

    const growthPoints = [
      new THREE.Vector3(-0.82, -0.12, 0.17),
      new THREE.Vector3(-0.42, 0.05, 0.17),
      new THREE.Vector3(-0.05, -0.03, 0.17),
      new THREE.Vector3(0.36, 0.34, 0.17),
      new THREE.Vector3(0.83, 0.43, 0.17),
    ];
    const growthCurve = new THREE.CatmullRomCurve3(growthPoints);
    panel.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(growthCurve, 48, 0.018, 8, false),
        new THREE.MeshBasicMaterial({ color: 0xf4ffe1 })
      )
    );

    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xf4ffe1 });
    growthPoints.forEach((point) => {
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 12), nodeMaterial);
      node.position.copy(point);
      panel.add(node);
    });

    const stand = new THREE.Mesh(
      new THREE.BoxGeometry(0.72, 0.3, 0.42),
      new THREE.MeshStandardMaterial({ color: 0x244438, metalness: 0.45, roughness: 0.35 })
    );
    stand.position.set(0, -1.02, -0.02);
    composition.add(stand);

    const base = new THREE.Mesh(
      new THREE.BoxGeometry(1.62, 0.12, 0.82),
      new THREE.MeshStandardMaterial({ color: 0x426653, metalness: 0.48, roughness: 0.3 })
    );
    base.position.set(0, -1.23, 0.02);
    composition.add(base);

    const satelliteMaterial = new THREE.MeshStandardMaterial({
      color: 0xd7f36a,
      emissive: 0x526b2b,
      emissiveIntensity: 0.6,
      metalness: 0.2,
      roughness: 0.26,
    });
    const satellite = new THREE.Mesh(new THREE.IcosahedronGeometry(0.13, 1), satelliteMaterial);
    satellite.position.set(1.55, 0.98, 0.18);
    composition.add(satellite);

    const smallSatellite = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.075, 1),
      new THREE.MeshStandardMaterial({ color: 0x8ed9b5, metalness: 0.2, roughness: 0.28 })
    );
    smallSatellite.position.set(-1.58, -0.54, 0.24);
    composition.add(smallSatellite);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const clock = new THREE.Clock();
    let isVisible = true;
    let animationFrame = 0;

    function resizeScene() {
      const width = visual.clientWidth;
      const height = visual.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.position.z = width < 440 ? 7.1 : 6.4;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    }

    function renderFrame() {
      if (!isVisible || reducedMotion.matches) {
        animationFrame = 0;
        return;
      }
      const elapsed = clock.getElapsedTime();
      target.x = pointer.y * 0.1;
      target.y = pointer.x * 0.15;
      composition.rotation.x += (target.x - composition.rotation.x) * 0.035;
      composition.rotation.y += (target.y - composition.rotation.y) * 0.035;
      composition.position.y = Math.sin(elapsed * 0.8) * 0.045;
      satellite.rotation.x = elapsed * 0.38;
      satellite.rotation.y = elapsed * 0.62;
      smallSatellite.rotation.y = -elapsed * 0.5;
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(renderFrame);
    }

    visual.addEventListener('pointermove', (event) => {
      const bounds = visual.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    });

    visual.addEventListener('pointerleave', () => {
      pointer.x = 0;
      pointer.y = 0;
    });

    new ResizeObserver(resizeScene).observe(visual);
    new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !reducedMotion.matches && !animationFrame) {
        animationFrame = window.requestAnimationFrame(renderFrame);
      }
    }).observe(visual);

    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        renderer.render(scene, camera);
      } else if (isVisible && !animationFrame) {
        animationFrame = window.requestAnimationFrame(renderFrame);
      }
    });

    resizeScene();
    visual.classList.add('webgl-ready');
    if (!reducedMotion.matches) animationFrame = window.requestAnimationFrame(renderFrame);
  } catch (error) {
    console.warn('The 3D hero could not be started; showing the static artwork instead.', error);
  }
}