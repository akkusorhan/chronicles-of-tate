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
        (gltf) => {
            let letter = gltf.scene

            // Applying texture
            gltf.scene.children[0].material.map = letterTexture
            gltf.scene.children[0].material.color = null

            gltf.scene.children[1].material.map = letterTexture
            gltf.scene.children[1].material.color = null

            gltf.scene.children[2].material.map = letterTexture
            gltf.scene.children[2].material.color = null

            gltf.scene.children[3].material.map = letterTexture
            gltf.scene.children[3].material.color = null

            // letterRandomPositionX variable will project the cubes to fit the screen based on viewport (only for widescreen aspect ratios)
            let letterRandomPositionX = window.innerHeight / window.innerWidth < 0.45 ? 15 : 10 // adjust as needed

            // Setting a random X, Y, Z value for position
            letter.position.y = ((Math.random() - 1) * 110)
            letter.position.z = ((Math.random() - 0.5) * 3) 
            letter.position.x = ((Math.random() - 0.5) * letterRandomPositionX)

            letter.rotation.x = 0.5
            letter.rotation.x = Math.random() - 0.1
            letter.rotation.y = Math.random() - 0.5
            letter.rotation.z = Math.random() - 0.5

            scene.add(gltf.scene)
            letters.push(letter)
        }
    )

    // let cube = new THREE.Mesh(
    //     new THREE.BoxGeometry(0.5, 0.5, 0.5),
    //     new THREE.MeshBasicMaterial({ color: randomColor })
    // )
    
    // // cubeRandomPositionX variable will project the cubes to fit the screen based on viewport (only for widescreen aspect ratios)
    // let cubeRandomPositionX = window.innerHeight / window.innerWidth < 0.45 ? 15 : 10 // adjust as needed

    // // Setting a random X, Y, Z value for position
    // cube.position.y = ((Math.random() - 1) * 120)
    // cube.position.z = ((Math.random() - 0.5) * 1) 
    // cube.position.x = ((Math.random() - 0.5) * cubeRandomPositionX)

    // scene.add(cube)
}

/**
 * Lights
 */
// Ambient Light
const ambientLight = new THREE.AmbientLight("white")
ambientLight.intensity = 0.3

gui.add(ambientLight, "intensity", 0, 10, 0.1).name("ambientLightIntensity")

scene.add(ambientLight)

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

    console.log(sizes.height / sizes.width)
})

// Calculate height of scene
let highestObject = null
let lowestObject = null
let distance = null

// scene.traverse(object => {
//     if (object instanceof THREE.Mesh) {
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
camera.position.z = window.innerHeight / window.innerWidth > 0.9 ? 16 : 10 // adjust as needed (mobile responsiveness)
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
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

/**
 * Animate
 */
let scrollY = window.scrollY

window.addEventListener("scroll", () => {
    scrollY = window.scrollY

    console.log(scrollY)
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

    // Animate meshes

    for(const mesh of letters) {
        // mesh.rotation.x += deltaTime * 0.1
        // mesh.rotation.y += deltaTime * 0.1

        mesh.position.x += Math.sin(elapsedTime * 0.5 + 0.5) * 0.0007

        // mesh.position.y += (Math.random() - 0.5) * 60
        // mesh.position.z = (Math.random() - 0.5) * 1 + 1
        // mesh.position.x = (Math.random() - 0.5) * 10 
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    // console.log(`Camera Position: X: ${camera.position.x} | Y: ${camera.position.y}, Z: ${camera.position.z}`)
    // console.log(`Canvas info: Width: ${sizes.width} | Height: ${sizes.height}`)

}
tick()