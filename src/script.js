import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from "lil-gui"

/**
 * Debug
 */
const gui = new dat.GUI()


/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Models
 */
// Group
const group = new THREE.Group()

for(let i = 0; i < 189; i++) {
    // Generate random values for red, green, and blue (0 to 255)
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Create an RGB color string
    const randomColor = `rgb(${red}, ${green}, ${blue})`;

    let cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshBasicMaterial({ color: randomColor })
    )
    // Setting a random X, Y, Z value for position
    const min = -1.5;
    const max = 1.5;
    const random = Math.random() * (max - min) + min;

    cube.position.y = (Math.random() - 0.5) * 50 +- Math.random()
    cube.position.z = (Math.random() - 0.5) * 1 +- Math.random()
    cube.position.x = (Math.random() - 0.5) * 10 +- Math.random()

    group.add(cube)
}

scene.add(group)

/**
 * Lights
 */

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
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


/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height)
camera.position.z = 10
scene.add(camera)

gui.add(camera.position, "x").min(-15).max(15).step(.01)
gui.add(camera.position, "y").min(-15).max(15).step(.01)
gui.add(camera.position, "z").min(-15).max(15).step(.01)

/**
 * Controls
 */
const controls = new OrbitControls(camera, document.querySelector(".webgl"))
controls.enableDamping = true

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


// Canvas scene animation (tick function)
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls 
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    console.log(`Camera Position: X: ${camera.position.x} | Y: ${camera.position.y}, Z: ${camera.position.z}`)
    // console.log(`Canvas info: Width: ${sizes.width} | Height: ${sizes.height}`)

}
tick()