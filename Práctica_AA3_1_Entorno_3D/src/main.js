import * as THREE from 'three';

// CONFIGURACIÓN DEL ESCENARIO BASE

const scene = new THREE.Scene();

// Cámara con perspectiva
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6; // Nos alejamos un poco más para que quepa todo el semáforo

// Renderizador WebGL
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



// 1. CREACIÓN DEL SEMÁFORO

// 1. La caja del semáforo
const cajaGeometry = new THREE.BoxGeometry(1, 3.5, 1);
const cajaMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 }); // Gris oscuro
const cajaSemaforo = new THREE.Mesh(cajaGeometry, cajaMaterial);
scene.add(cajaSemaforo);

// 2. Las tres esferas
const esferaGeometry = new THREE.SphereGeometry(0.4, 32, 32);

// Esfera Roja
const materialRojo = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const esferaRoja = new THREE.Mesh(esferaGeometry, materialRojo);
esferaRoja.position.y = 1.2; // Posición indicada en tu guía
esferaRoja.position.z = 0.6; 

// Esfera Amarilla
const materialAmarillo = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
const esferaAmarilla = new THREE.Mesh(esferaGeometry, materialAmarillo);
esferaAmarilla.position.y = 0; // Posición indicada en tu guía
esferaAmarilla.position.z = 0.6; 

// Esfera Verde
const materialVerde = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const esferaVerde = new THREE.Mesh(esferaGeometry, materialVerde);
esferaVerde.position.y = -1.2; // Posición indicada en tu guía
esferaVerde.position.z = 0.6; 

// Añadir las esferas a la escena
scene.add(esferaRoja);
scene.add(esferaAmarilla);
scene.add(esferaVerde);



// 2. EL CORAZÓN 

// Para el corazón usaremos un cubo.

// 1. Activar la propiedad de malla de alambre 
const cuboCentralGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
const cuboCentralMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true });
const cuboCentral = new THREE.Mesh(cuboCentralGeometry, cuboCentralMaterial);

// usamos esto para evitar que el cubo se choque con el semáforo
cuboCentral.position.x = 2.5; 
scene.add(cuboCentral);

// 4. BUCLE DE ANIMACIÓN CONTINUA

function animate() {
  requestAnimationFrame(animate);

  // Animacion del corazón 
  // se usa la función trigonométrica Math.sin() para simular la respiración
  let escala = 1 + Math.sin(Date.now() * 0.003) * 0.3;
  cuboCentral.scale.set(escala, escala, escala);

  // Rotamos levemente el cubo central para que luzca más dinámico en 3D
  cuboCentral.rotation.x += 0.01;
  cuboCentral.rotation.y += 0.01;

  // Renderizar la escena con los cambios
  renderer.render(scene, camera);
}

// Iniciar la animación
animate();