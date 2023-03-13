//Importing three.js library
import * as THREE from 'three'

//Scene - Start
const scene = new THREE.Scene();

//Light
//Declaring a new pointlight ()
const light = new THREE.PointLight(0xFFFFFF, 1, 100);
light.position.set(0, 10, 10)
scene.add(light)


//Camera
//Declaring a perspective camera (FOV, Width Aspect Ratio / Height Aspect Ratio, near clipping point, far clipping point)
const camera = new THREE.PerspectiveCamera(45, 800 / 600, 0.1, 100);
camera.position.z = 20 // Moving the camera on Z axis by 20 units
scene.add(camera) //Adding the camera to the scene!


//Geometry
const geometry = new THREE.SphereGeometry(3, 64, 64) //Parameters - Radius (size), width segements and height segments (faces)
const material = new THREE.MeshStandardMaterial({ //Defining a new material, this is seen as an object, the properties correspond to Principled BSDF shader
    color: "#3A9BDC",
    roughness: 1
})
const mesh = new THREE.Mesh(geometry, material) //Adding the material and geometry to the final mesh. This is our "final" 3d object.
scene.add(mesh); //Adding the mesh to the scene!


// End - Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({canvas}) //Asking the webGL renderer to render <canvas> in index.html
renderer.setSize(800, 600)
renderer.render(scene, camera)