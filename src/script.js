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
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: "red" })
)
cube.position.x = -.05
cube.position.y = -.05
cube.position.z = -.05
scene.add(cube)

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.x = 5
scene.add(camera)

// gui.add(camera.position, "x").min(-15).max(15).step(.01)
// gui.add(camera.position, "y").min(-15).max(15).step(.01)
// gui.add(camera.position, "z").min(-15).max(15).step(.01)

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
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls 
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    // console.log(`Camera Position: X: ${camera.position.x} | Y: ${camera.position.y}, Z: ${camera.position.z}`)
    console.log(`Canvas info: Width: ${sizes.width} | Height: ${sizes.height}`)

}
tick()