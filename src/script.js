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
const chessTexture = textureLoader.load("./textures/chess-texture.png")

/**
 * Models
 */
const gltfLoader = new GLTFLoader()

const letters = []

const mixers = []
let letterCount = []
const chessPieces = [
    "king",
    "queen",
    "bishop", 
    "rook", 
    "knight",
    "pawn"
]

let letterGenerationVariable
if(window.innerHeight / window.innerWidth < 0.45) { // ultrawide viewport
    letterGenerationVariable = 15
} else if (window.innerHeight / window.innerWidth > 0.9) { // mobile viewport
    letterGenerationVariable = 10
} else if (!window.innerHeight / window.innerWidth < 0.45) { //normal viewport
    letterGenerationVariable = 10
}

let nthItem = []
let nthItemStart = 0
let nthItemEnd = 0

let amountOfChroniclesGenerated

for(let i = 0; i < letterGenerationVariable; i++) {
    const randomIndex = Math.floor(Math.random() * chessPieces.length)
    gltfLoader.load(
        `./${chessPieces[randomIndex]}.glb`,
        function (gltf) {
            let letter = gltf.scene
            // letter.children[0].material.map = textureLoader.load("./textures/chess-texture.png")
            // letter.children[0].castShadow = true
            // letter.children[0].receiveShadow = true

            // letter.children[0].material.map = textureLoader.load("./textures/chess-texture.png")
            // letter.children[0].material.color = "white"

            // let mesh1 = gltf.scene.children[0].children[0]
            // let mesh2 = gltf.scene.children[0].children[1]

            // mesh1.castShadow = true
            // mesh1.receiveShadow = true

            // mesh2.castShadow = true
            // mesh2.receiveShadow = true

            // gltf.scene.castShadow = true
            // gltf.scene.receiveShadow = true

            // // Applying texture
            // mesh1.material.map = letterTexture
            // mesh1.material.color = null

            // mesh2.material.map = letterTexture
            // mesh2.material.color = null

            // // Animations
            const randomDecimal = Math.random()
            const randomNumber = Math.floor(randomDecimal * 3) + 1

            const animations = gltf.animations
            const mixer = new THREE.AnimationMixer(gltf.scene)
            const clip = THREE.AnimationClip.findByName(animations, `${chessPieces[randomIndex]}${randomNumber}`)
            const action = mixer.clipAction(clip)
            mixers.push(mixer)
            action.play()

            // size
            // letter.scale.x = 1.30
            // letter.scale.y = 1.30
            // letter.scale.z = 1.30

            letter.scale.x = .10
            letter.scale.y = .10
            letter.scale.z = .10

            if(chessPieces[randomIndex] == "rook") {
                letter.scale.x = .16
                letter.scale.y = .16
                letter.scale.z = .16
            }

            // letterRandomPositionX variable will project the cubes to fit the screen based on viewport on X axis (adjust as needed)
            // let letterRandomPositionX = window.innerHeight / window.innerWidth < 0.45 ? 15 : 10 // adjust as needed
            let letterRandomPositionX = null

            if(window.innerHeight / window.innerWidth < 0.45) { // ultrawide viewport
                letterRandomPositionX = 15
            } else if (window.innerHeight / window.innerWidth > 0.9) { // mobile viewport
                letterRandomPositionX = 3
            } else if (!window.innerHeight / window.innerWidth < 0.45) { //normal viewport
                letterRandomPositionX = 10 
            }

            // Setting a random X, Y, Z value for position
            // letter.position.y = ((Math.random() - 0.6) * 5) // Math.random() - 1 makes the objects generate from the top down, rather than from the middle (0.5)

            window.innerHeight / window.innerWidth > 0.9 ? letter.position.y = Math.round((Math.random() - 0.6) * 10) : letter.position.y = Math.round((Math.random() - 0.6) * 7)
            letter.position.z = ((Math.random() - 0.5) * 3) 
            letter.position.x = Math.round((Math.random() - 0.5) * letterRandomPositionX) // x variable will change based on viewport

            // letter.rotation.x = 0.5 
            letter.rotation.x = Math.random() - 0.5 * 1.2
            letter.rotation.y = Math.random() - 0.5 * 1.2
            letter.rotation.z = Math.random() - 0.5 * 1.2

            scene.add(gltf.scene)

            gltf.scene.children[0].chronicleNumber = i

            letters.push(gltf)
            letterCount.push(i)

            nthItem.push(i)
            nthItemEnd = nthItem.length

            i = letterGenerationVariable ? console.log(`displaying chronicles ${nthItemStart} to ${nthItemEnd}`) : null

            if(i = letterGenerationVariable) {
                amountOfChroniclesGenerated = nthItemEnd - nthItemStart
                console.log(`Amount of chronicles generated: ${amountOfChroniclesGenerated}`)
            }
        }
    )
}

// for(let i = 0; i < 189; i++) {
//     gltfLoader.load(
//         "./letter.glb",
//         function (gltf) {
//             let letter = gltf.scene

//             let mesh1 = gltf.scene.children[0].children[0]
//             let mesh2 = gltf.scene.children[0].children[1]

//             mesh1.castShadow = true
//             mesh1.receiveShadow = true

//             mesh2.castShadow = true
//             mesh2.receiveShadow = true

//             // Applying texture
//             mesh1.material.map = letterTexture
//             mesh1.material.color = null

//             mesh2.material.map = letterTexture
//             mesh2.material.color = null

//             // letterRandomPositionX variable will project the cubes to fit the screen based on viewport (only for widescreen aspect ratios)
//             let letterRandomPositionX = window.innerHeight / window.innerWidth < 0.45 ? 15 : 10 // adjust as needed

//             // Setting a random X, Y, Z value for position
//             letter.position.y = ((Math.random() - 1) * 110) // Math.random() - 1 makes the objects generate from the top down, rather than from the middle
//             letter.position.z = ((Math.random() - 0.5) * 3) 
//             letter.position.x = ((Math.random() - 0.5) * letterRandomPositionX) // x variable will change based on viewport

//             letter.rotation.x = 0.5 
//             letter.rotation.x = Math.random() - 0.1
//             letter.rotation.y = Math.random() - 0.5
//             letter.rotation.z = Math.random() - 0.5

//             scene.add(gltf.scene)
//             letters.push(gltf)


//         }
//     )
// }

console.log(letters)
console.log(mixers)
console.log(letterCount)

// console.log(`Displaying items ${nthItemStart} to ${nthItem.length}`)

/**
 * Lights
 */
// Ambient Light
const ambientLightColor = new THREE.Color("#ffe7d6")
const ambientLight = new THREE.AmbientLight(ambientLightColor)
ambientLight.intensity = 0.3

gui.add(ambientLight, "intensity", 0, 10, 0.1).name("ambientLightIntensity")
gui.addColor(ambientLight, "color").name("ambientLightColor")

scene.add(ambientLight)

// Point Light (assigned to mouse position)
const pointLight = new THREE.PointLight("#FFF7DD", 75) // regular 50
pointLight.position.z = 3
pointLight.castShadow = true
// pointLight.decay = 1.8
pointLight.distance = 1000
scene.add(pointLight)

// const pointLightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(pointLightHelper)

/**
 * Raycaster
 */

// Set up raycaster
var raycaster = new THREE.Raycaster();
var intersects = []; // Array to store intersected objects

const mouse = new THREE.Vector2()

// Handle mousemove events
document.addEventListener("mousemove", (event) => {
    if(!isTouchScreen) {
        // Convert mouse coordinates to a normalized value between -1 and 1
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

        // console.log(mouse.x)
        // console.log(mouse.y)

        // Update light position based on mouse position
        pointLight.position.x = mouse.x * 3.5
        pointLight.position.y = mouse.y * 3.5

        // Update the raycaster's origin and direction
        raycaster.setFromCamera(mouse, camera);

        // Check for intersections
        intersects = raycaster.intersectObjects(scene.children);

        // intersect detected
        intersects.length > 0 ? intersects[0].object.position.z + 1.7 : null
        intersects.length > 0 ? document.body.style.cursor = 'pointer' : document.body.style.cursor = 'auto'

    } else {
        pointLight.position.x = 0
        pointLight.position.y = 0

        // Update the raycaster's origin and direction
        raycaster.setFromCamera(mouse, camera);

        // Check for intersections
        intersects = raycaster.intersectObjects(scene.children);

        // intersect detected
        intersects.length > 0 ? console.log("intersect detected") : null
    }
})

// Handle mouse click events
let chroniclePopUp = document.querySelector(".chronicle")

document.addEventListener('click', () => {
    // Check for intersections
    let intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0 && isTouchScreen == false) {
        // chroniclePopUp.style.display = 'flex'
        // chroniclePopUp.style.opacity = '1'
        // chroniclePopUp.classList.remove("show")

        // log the object that was clicked
        console.log('Object clicked:', intersects[0].object.chronicleNumber !== undefined ? intersects[0].object.chronicleNumber : intersects[0].object.parent.chronicleNumber);

        const startTime = performance.now()
        const duration = 1500

        function animate(currentTime) {
            const elapsed = currentTime - startTime
            const progress = Math.min(1, elapsed / duration)

            const easedProgress = easeInOut(progress)

            const value = 10 + easedProgress * 5

            camera.position.z = value

            if (elapsed < duration) {
                requestAnimationFrame(animate)
            }
        }

        function easeInOut(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        // requestAnimationFrame(animate)
    } 

}, false);

document.querySelector(".close-chronicle-btn").addEventListener('click', () => {   
    chroniclePopUp.style.display = 'none'
    chroniclePopUp.style.opacity = "0"
    // chroniclePopUp.classList.add("hide")

    const startTime = performance.now()
        const duration = 1500

        function animate(currentTime) {
            const elapsed = currentTime - startTime
            const progress = Math.min(1, elapsed / duration)

            const easedProgress = easeInOut(progress)

            const value = 15 - easedProgress * 5

            camera.position.z = value

            if (elapsed < duration) {
                requestAnimationFrame(animate)
            }
        }

        function easeInOut(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        requestAnimationFrame(animate)
})

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
camera.position.z = 10
// camera.position.z = window.innerHeight / window.innerWidth > 0.9 ? 16 : 10 // adjust as needed (mobile responsiveness), camera will move back on Z axis if on mobile
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
// Function to check if the element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


// Scroll animation
let scrollY = window.scrollY
let lastScrollPosition = window.scrollY

let prevScrollPos = window.scrollY;
let prevTimestamp = performance.now();

let scrollSpeed
const verticalScrollDistance = window.scrollY;

let isTouchScreen = false

window.addEventListener("touchstart", (event) => {
    isTouchScreen = true
    console.log("touched")

    const touches = event.touches;
    if (touches.length === 1) {
        // Get normalized device coordinates from the touch position
        mouse.x = (touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touches[0].clientY / window.innerHeight) * 2 + 1;

        // Update the raycaster with the new touch coordinates
        raycaster.setFromCamera(mouse, camera);

        // Check for intersections
        const intersects = raycaster.intersectObjects(scene.children);
    }

    // imported line (update at some point)

    // Check for intersections
    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        // log the object that was clicked
        console.log('Object touched on mobile:', intersects[0].object);

        const startTime = performance.now()
        const duration = 1500

        function animate(currentTime) {
            const elapsed = currentTime - startTime
            const progress = Math.min(1, elapsed / duration)

            const easedProgress = easeInOut(progress)

            const value = 10 + easedProgress * 5

            camera.position.z = value

            chroniclePopUp.style.display = 'flex'
            chroniclePopUp.style.opacity = '1'

            if (elapsed < duration) {
                requestAnimationFrame(animate)
            }
        }

        function easeInOut(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        requestAnimationFrame(animate)
    }

    // end of imported line
})

let initialScrollPosition = 0
let scrollInteration
let deltaScrollPosition = null
let section2011Vh = 700
let section2012Vh = 1000

function handleScroll() {
    scrollY = window.scrollY 
    scrollInteration = scrollY
    deltaScrollPosition = scrollInteration - initialScrollPosition 
    initialScrollPosition = scrollY

    const currentTimestamp = performance.now();
    const currentScrollPos = window.scrollY;

    const timeDiff = currentTimestamp - prevTimestamp;
    const scrollDiff = currentScrollPos - prevScrollPos;

    // Calculate scroll speed in pixels per millisecond
    scrollSpeed = scrollDiff / timeDiff;

    // Update the previous values for the next calculation
    prevScrollPos = currentScrollPos;
    prevTimestamp = currentTimestamp;

    // console.log(`Scroll speed: ${scrollSpeed} pixels per millisecond`);



    const currentScrollPosition = window.scrollY
    let scrollDamp
    if (window.innerHeight / window.innerWidth < 0.45) {
        scrollDamp = 0.08
    } else if (window.innerHeight / window.innerWidth > 0.9) {
        scrollDamp = 0.09
    } else if (!window.innerHeight / window.innerWidth < 0.45) {
        scrollDamp = 0.05
    }

    if(window.innerHeight / window.innerWidth > 1.34 && window.innerHeight / window.innerWidth < 1.45 && isTouchScreen == true) {
        scrollDamp = 0.8
    }


    if (currentScrollPosition < lastScrollPosition) {
        // console.log("Scrolled up")

        for (const mesh of letters) {
            mesh.scene.position.y += deltaScrollPosition * 0.007 // scrollSpeed * ((window.innerWidth / window.innerHeight) * isTouchScreen ? 0.1 : 0.02)
        }

    } else if (currentScrollPosition > lastScrollPosition) {
        // console.log("Scrolled down")

        for (const mesh of letters) {
            mesh.scene.position.y += deltaScrollPosition * 0.007 // scrollSpeed * ((window.innerWidth / window.innerHeight) * isTouchScreen ? 0.1 : 0.02)
        }
    }

    lastScrollPosition = currentScrollPosition
    // console.log(lastScrollPosition)

    // Extend section-2011 height
    // Check for target div in viewport
    const section2011End = document.querySelector('.section-2011-end');
    const section2012End = document.querySelector('.section-2012-end');

    if (isInViewport(section2011End) && letterCount.length < 58) {
        section2011Vh += 10
        document.querySelector(".section-2011").style.height = `${section2011Vh}vh`
        console.log("extend...")
    } else if (isInViewport(section2012End) && letterCount.length < 146) {
        section2012Vh += 10
        document.querySelector(".section-2012").style.height = `${section2012Vh}vh`
        console.log("extend...")
    }

}

function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const debouceScroll = debounce(handleScroll, 0.1 )

window.addEventListener("scroll", debouceScroll)

// Canvas scene animation (tick function)
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Animate camera
    // camera.position.y = - scrollY * 0.008  // / sizes.height * distance

    // Update animations mixer
    for(const mixer of mixers) {
        mixer.update(deltaTime)
    }
    
    
    let initialScrollUpTriggered = false


    // Update mesh position based on scroll
    for(let i = 0; i < letters.length; i++) {

        let letter = letters[i].scene

        // Setting X again for random position
        let letterRandomPositionX = null

        if (window.innerHeight / window.innerWidth < 0.45) {
            letterRandomPositionX = 15
        } else if (window.innerHeight / window.innerWidth > 0.9) {
            letterRandomPositionX = 5
        } else if (!window.innerHeight / window.innerWidth < 0.45) {
            letterRandomPositionX = 10
        }

        function scrollDown() {
            letter.position.y = -3.95 // random number between -5 and -6.5
            letter.position.x = Math.round((Math.random() - 0.5) * letterRandomPositionX) //randomize x on scroll down
            letterCount.push(letterCount.length)
            // console.log(letterCount)
        }

        function scrollUp() {
            letter.position.y = 3.95
            // letter.position.x = Math.round((Math.random() - 0.5) * letterRandomPositionX) //randomize x on scroll up
            letterCount.pop()
            // console.log(letterCount)                
        }

        let viewportEnter = document.querySelector(".viewport-enter")
        let viewportExit = document.querySelector(".viewport-enter")

        function scroll() {
            if (letter.position.y > 3.95) {
                scrollDown()

                nthItemStart = nthItemStart + 1
                nthItemEnd = nthItemEnd + 1

                console.log(letter)
                console.log(`Displaying chronicles ${nthItemStart} to ${nthItemEnd}`)
    
            } else if (letter.position.y < -4.05) {
                scrollUp()
                nthItemStart = nthItemStart - 1
                nthItemEnd = nthItemEnd - 1
                console.log(`Displaying chronicles ${nthItemStart} to ${nthItemEnd}`)
            }
        }

        scroll()
    }



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