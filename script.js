// Import necessary Three.js components
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { PointerLockControls } from 'https://cdn.rawgit.com/mrdoob/three.js/r128/examples/jsm/controls/PointerLockControls.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create terrain
const terrainSize = 100;
const terrainHeight = 10;
const terrainGeometry = new THREE.PlaneGeometry(terrainSize, terrainSize, 32, 32);
const terrainMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22, side: THREE.DoubleSide });
const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
terrain.rotation.x = -Math.PI / 2;
scene.add(terrain);

// Generate terrain height
const heightData = new Float32Array(terrainGeometry.attributes.position.count);
for (let i = 0; i < heightData.length; i++) {
    heightData[i] = Math.sin(i / 2) * Math.random() * terrainHeight;
}
terrainGeometry.attributes.position.needsUpdate = true;

// Create player controls
const controls = new PointerLockControls(camera, document.body);
document.body.appendChild(controls.getObject());
document.addEventListener('click', () => {
    controls.lock();
});

// Player movement
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const speed = 0.1;

function movePlayer() {
    if (controls.isLocked) {
        direction.z = Number(keyState['s']) - Number(keyState['w']);
        direction.x = Number(keyState['d']) - Number(keyState['a']);
        direction.normalize(); // Normalize the direction vector
        if (keyState['Shift']) {
            velocity.x += direction.x * speed * 2; // Sprint
            velocity.z += direction.z * speed * 2; // Sprint
        } else {
            velocity.x += direction.x * speed;
            velocity.z += direction.z * speed;
        }
        controls.moveRight(velocity.x);
        controls.moveForward(velocity.z);
        velocity.set(0, 0, 0); // Reset velocity
    }
}

// Key state tracking
const keyState = {};
document.addEventListener('keydown', (event) => {
    keyState[event.key] = true;
});
document.addEventListener('keyup', (event) => {
    keyState[event.key] = false;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    movePlayer();
    renderer.render(scene, camera);
}

animate();
