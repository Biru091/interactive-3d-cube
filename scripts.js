import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// First we should create a scene
const scene=new THREE.Scene() //This create a Scence ,it is like creating virtual room //

//Second we should create camera

const camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000)
camera.position.z=5
//Now we should add camera in our scene
scene.add(camera)

//Now we should create MESH ,it is combination of shape of object and material

const cubeGeometry=new THREE.BoxGeometry(1,1,1) //This is shape of our object
const cubeMaterial=new THREE.MeshBasicMaterial({ //this is material of our object we provide color to our object
    color:0x00FF00
})

const cube= new THREE.Mesh(cubeGeometry,cubeMaterial) //we add mesh in cube variable
scene.add(cube) //now we add cube in our scene

const light=new THREE.DirectionalLight(0xFFFFFF,3)
light.position.set(5, 5, 5);



scene.add(light)

const renderer=new THREE.WebGLRenderer()
renderer.setSize(innerWidth,innerHeight)

document.body.appendChild(renderer.domElement)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;     // Smooth movement
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;
function animate(){
    controls.update()
    cube.rotation.y+=0.01
    cube.rotation.x+=0.01
        cube.rotation.z+=0.01


    renderer.render(scene,camera)
}
renderer.setAnimationLoop(animate)

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(cube);

    if (intersects.length > 0) {
        console.log("Cube clicked!");

        gsap.to(cube.position, {
            x: gsap.utils.random(-3,3),
            y: gsap.utils.random(-3,3),
            duration: 1,
            ease: "power2.out"
        });
        
    }
});
