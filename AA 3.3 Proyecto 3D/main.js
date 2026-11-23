import * as THREE from 'three'; 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//renderizar canvas
const canvas = document.querySelector('#canvas');

//crear la escena
const escena = new THREE.Scene();
escena.background = new THREE.Color(0xFDF5E6);

//crear la cámara
const camara = new THREE.PerspectiveCamera(
    60, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);

camara.position.set(0, 5, 12);

//crear el renderizador
const renderizador = new THREE.WebGLRenderer({canvas, antialias: true});
renderizador.setSize(window.innerWidth, window.innerHeight);
renderizador.setPixelRatio(window.devicePixelRatio);

renderizador.shadowMap.enabled = true;
renderizador.shadowMap.type = THREE.PCFShadowMap;

//luz ambiental

const luzAmbiental = new THREE.AmbientLight(0x008080, 0.4);

escena.add(luzAmbiental);

const luzDireccional = new THREE.DirectionalLight(0x708090, 0.8);
luzDireccional.position.set(5, 10, 2);
luzDireccional.castShadow = true;
luzDireccional.shadow.mapSize.width = 2048;
luzDireccional.shadow.mapSize.height = 2048;
luzDireccional.shadow.bias = -0.0005;
escena.add(luzDireccional);

const control = new OrbitControls(camara, renderizador.domElement);
control.enableDamping = true;
control.dampingFactor = 0.05;

const texturaLoader = new THREE.TextureLoader();


const geometriaCubo = new THREE.BoxGeometry(1, 1, 1);
const materialCubo = new THREE.MeshStandardMaterial({
    color: 0xAFEEEEF,
    map: texturaLoader.load('https://threejs.org/examples/textures/crate.gif'),
    roughness: 0.7,
    metalness: 0.1
});
const cubo = new THREE.Mesh(geometriaCubo, materialCubo);
escena.add(cubo);
cubo.castShadow = true;


const pedestalArriba = 0.8;
const pedestalAbajo = 1.0;
const pedestalAltura = 0.2;
const separaciónPedestal = 0.8;
const pedestalSegmentos = 6;
const geometriaPedestal = new THREE.CylinderGeometry(pedestalArriba, pedestalAbajo, pedestalAltura, pedestalSegmentos);
const materialPedestal = new THREE.MeshStandardMaterial({color: 0x4169E1});
const pedestal = new THREE.Mesh(geometriaPedestal, materialPedestal);
pedestal.position.y = 0;
pedestal.castShadow = true;
pedestal.receiveShadow = true; //Recibir sombras
escena.add(pedestal);

const esferaRadio = 0.3;
const esferasegmentos = 32;
const geometriaEsfera = new THREE.SphereGeometry(esferaRadio, esferasegmentos, esferasegmentos);
const materialEsfera = new THREE.MeshStandardMaterial({color: 0x00FF00});
const esfera = new THREE.Mesh(geometriaEsfera, materialEsfera);
esfera.position.y = 2.5;
esfera.castShadow = true;
esfera.receiveShadow = true; //Recibir sombras
escena.add(esfera);

cubo.position.y = 0.2 + separaciónPedestal;

window.addEventListener('resize', () => {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
    renderizador.setPixelRatio(window.devicePixelRatio);
});

function animar() {

    cubo.rotation.y += 0.01; 
    esfera.rotation.x += 0.01;

    control.update();
    renderizador.render(escena, camara);
}
renderizador.setAnimationLoop(animar);
