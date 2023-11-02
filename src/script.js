import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from "lil-gui"

/**
 * Debug
 */
const gui = new dat.GUI()

/**
 * Scene
 */
const scene = new THREE.Scene()

// Scene conversion factor (adjust as needed)
const pixelsPerUnit = 100

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const letterTexture = textureLoader.load("./textures/letter-texture.png")

/**
 * Models
 */
const gltfLoader = new GLTFLoader()

const letters = []

for(let i = 0; i < 189; i++) {
    gltfLoader.load(
        "./letter.glb",
        function (gltf) {
            let letter = gltf.scene

            let mesh1 = gltf.scene.children[0].children[0]
            let mesh2 = gltf.scene.children[0].children[1]

            mesh1.castShadow = true
            mesh1.receiveShadow = true

            mesh2.castShadow = true
            mesh2.receiveShadow = true

            // Applying texture
            mesh1.material.map = letterTexture
            mesh1.material.color = null

            mesh2.material.map = letterTexture
            mesh2.material.color = null

            // letterRandomPositionX variable will project the cubes to fit the screen based on viewport (only for widescreen aspect ratios)
            let letterRandomPositionX = window.innerHeight / window.innerWidth < 0.45 ? 15 : 10 // adjust as needed

            // Setting a random X, Y, Z value for position
            letter.position.y = ((Math.random() - 1) * 110) // Math.random() - 1 makes the objects generate from the top down, rather than from the middle
            letter.position.z = ((Math.random() - 0.5) * 3) 
            letter.position.x = ((Math.random() - 0.5) * letterRandomPositionX) // x variable will change based on viewport

            letter.rotation.x = 0.5 
            letter.rotation.x = Math.random() - 0.1
            letter.rotation.y = Math.random() - 0.5
            letter.rotation.z = Math.random() - 0.5

            scene.add(gltf.scene)
            letters.push(gltf)


        }
    )
}

console.log(letters)

/**
 * Lights
 */
// Ambient Light
const ambientLight = new THREE.AmbientLight("white")
ambientLight.intensity = 0.3

gui.add(ambientLight, "intensity", 0, 10, 0.1).name("ambientLightIntensity")

scene.add(ambientLight)

// Point Light (assigned to mouse position)
// const pointLight = new THREE.PointLight("white", 50)
// pointLight.position.z = 3
// pointLight.castShadow = true
// scene.add(pointLight)

// const pointLightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(pointLightHelper)

// const mouse = new THREE.Vector2()

// document.addEventListener("mousemove", (event) => {
//     // Convert mouse coordinates to a normalized value between -1 and 1
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

//     console.log(mouse.x)
//     console.log(mouse.y)

//     // Update light position based on mouse position
//     pointLight.position.x = mouse.x * 5
//     pointLight.position.y = mouse.y * 5
// })

/**
 * Sizes
 */
let sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    cameraZ: window.innerHeight / window.innerWidth
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Calculate height of scene
let highestObject = null
let lowestObject = null
let distance = null

// scene.traverse(object => {
//     if (object instanceof THREE.Group) {
//         if (highestObject === null || object.position.y > highestObject.position.y) {
//             highestObject = object
//         } else if (lowestObject === null || object.position.y < lowestObject.position.y) {
//             lowestObject = object
//         }
//     }
// })

// if (highestObject && lowestObject) {
//     distance = highestObject.position.distanceTo(lowestObject.position)

//     console.log("Distance between highest and lowest objects on the Y-axis: " + distance)
// } else {
//     console.log("No valid objects found in the scene, error. Check code.")
// }

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height)
camera.position.z = window.innerHeight / window.innerWidth > 0.9 ? 16 : 10 // adjust as needed (mobile responsiveness), camera will move back on Z axis if on mobile
// camera.position.y = highestObject.position.y

scene.add(camera)

gui.add(camera.position, "x").min(-15).max(15).step(.01)
gui.add(camera.position, "y").min(-120).max(60).step(.01)
gui.add(camera.position, "z").min(-15).max(45).step(.01)


/**
 * Controls
 */
// const controls = new OrbitControls(camera, document.querySelector(".webgl"))
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(".webgl"),
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

/**
 * Animate
 */
let scrollY = window.scrollY

window.addEventListener("scroll", () => {
    scrollY = window.scrollY
})



// Canvas scene animation (tick function)
const clock = new THREE.Clock()
let previousTime = 0


const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Animate camera
    camera.position.y = - scrollY * 0.008  // / sizes.height * distance

    // Update controls 
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    // console.log(`Camera Position: X: ${camera.position.x} | Y: ${camera.position.y}, Z: ${camera.position.z}`)
    // console.log(`Canvas info: Width: ${sizes.width} | Height: ${sizes.height}`)

}
tick()