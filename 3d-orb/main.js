
import * as THREE from 'three' //Importing three.js library
import "./style.css" //Importing styles
import gsap from "gsap" //Importing timeline editing
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls" //Importing the controls to manipulate the sphere!

//Scene - Start
const scene = new THREE.Scene();

//Sizes - Making the scene fill the entire webpage window
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Light
//Declaring a new pointlight ()
const light = new THREE.PointLight(0xFFFFFF, 1, 100);
light.position.set(0, 10, 10)
scene.add(light)


//Camera
//Declaring a perspective camera (FOV, Width Aspect Ratio / Height Aspect Ratio, near clipping point, far clipping point)
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
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
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2) // Makes the object appear smoother and more aliased on the edges
renderer.render(scene, camera)


//Controls
const controls = new OrbitControls(camera, canvas) //Allows the user to orbit the sphere by clicking and holding
controls.enableDamping = true //Adds some physical properties that make the movement of the sphere appear more natural
controls.enablePan = false //Stops the user from panning the object with right click
controls.enableZoom = false //Stops the zoom in and zoom out
controls.autoRotate = true
controls.autoRotateSpeed = 5


//Resize 
window.addEventListener("resize", () => { //Waiting for the user to resize the window
    //Updating window sizes
    sizes.width = window.innerWidth //Sets the width and height to the new resized window's width and height
    sizes.height = window.innerHeight
    //Update Camera
    camera.updateProjectionMatrix() //Updates the camera
    camera.aspect = sizes.width / sizes.height //Resets the cameras aspect ratio to resized height and width
    renderer.setSize(sizes.width, sizes.height) //Resets the renderer's aspect ratio to resized height and width
})


const loop = () => { //Making a loop for the renderer to update to keep updating the scene and camera
    controls.update();
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}

loop();

//Timeline - Taking our mesh and changing it's scale from 0.5 to 1 over a period of 1 second. This is what scales it in when page is loaded!
const t1 = gsap.timeline({defaults: {duration: 1} })
t1.fromTo(mesh.scale, {z:0.5, y:0.5, x:0.5}, {z:1, y:1, x:1})


//Mouse animation - I honestly don't know how this works but it does
let mouseDown = false
let rgb = [];
window.addEventListener('mousedown', () => (mouseDown = true))
window.addEventListener('mouseup', () => (mouseDown = true))
window.addEventListener('mousemove', (e) => {
    if(mouseDown) {
        rgb = [
            Math.round ((e.pageX / sizes.width * 255)),
            Math.round ((e.pageY / sizes.height * 255)), 150
        ]
    //Animating
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {r:newColor.r, g:newColor.g, b:newColor.b})
    }
})