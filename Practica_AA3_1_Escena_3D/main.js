import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const lienzo = document.querySelector('#mi-canvas');
const escena = new THREE.Scene();
escena.background = new THREE.Color(0x121a2b);

const relacion = window.innerWidth / window.innerHeight;
const camara = new THREE.PerspectiveCamera(60, relacion, 0.1, 1000);
camara.position.set(0, 1, 6);

const renderizador = new THREE.WebGLRenderer({
  canvas: lienzo,
  antialias: true
});
renderizador.setSize(window.innerWidth, window.innerHeight);
renderizador.setPixelRatio(window.devicePixelRatio);

// Objetos geométricos diferentes
const geometriaToro = new THREE.TorusGeometry(1, 0.35, 16, 50);
const materialToro = new THREE.MeshStandardMaterial({
  color: 0x22ddff,
  metalness: 0.6,
  roughness: 0.25
});
const toro = new THREE.Mesh(geometriaToro, materialToro);
toro.position.set(-2.2, 0, 0);
escena.add(toro);

const geometriaDodecaedro = new THREE.DodecahedronGeometry(0.9);
const materialDodecaedro = new THREE.MeshStandardMaterial({
  color: 0xdd22ff,
  metalness: 0.4,
  roughness: 0.35
});
const dodecaedro = new THREE.Mesh(geometriaDodecaedro, materialDodecaedro);
dodecaedro.position.set(0, 0, 0);
escena.add(dodecaedro);

const geometriaCono = new THREE.ConeGeometry(0.7, 1.6, 32);
const materialCono = new THREE.MeshStandardMaterial({
  color: 0xffdd22,
  metalness: 0.2,
  roughness: 0.5
});
const cono = new THREE.Mesh(geometriaCono, materialCono);
cono.position.set(2.2, 0, 0);
escena.add(cono);

// Iluminación
const luzAmbiental = new THREE.AmbientLight(0xffffff, 0.35);
escena.add(luzAmbiental);

const luzDireccional = new THREE.DirectionalLight(0xffffff, 0.75);
luzDireccional.position.set(4, 6, 3);
escena.add(luzDireccional);

const luzMovil = new THREE.PointLight(0x22ff88, 0.55, 18);
luzMovil.position.set(-2, 1.5, 1);
escena.add(luzMovil);

// Animaciones distintas
function animar() {
  requestAnimationFrame(animar);

  toro.rotation.x += 0.008;
  toro.rotation.z += 0.012;

  dodecaedro.rotation.y += 0.018;

  cono.rotation.z += 0.01;

  luzMovil.position.x = Math.sin(Date.now() * 0.0008) * 2.5;
  luzMovil.position.z = Math.cos(Date.now() * 0.0012) * 2;

  renderizador.render(escena, camara);
}
animar();

// Ajuste de pantalla
window.addEventListener('resize', () => {
  camara.aspect = window.innerWidth / window.innerHeight;
  camara.updateProjectionMatrix();
  renderizador.setSize(window.innerWidth, window.innerHeight);
})
