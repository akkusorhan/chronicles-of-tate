import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from "lil-gui"
import chroniclesOfEmoryTate2011 from './chronicles.js'

/**
 * Creating Home Page Elements
 */
let homePageEnabled = true
let homePage = document.querySelector(".home-page")
let launchExperienceButton = document.querySelector(".launch-experience-btn")

let quotePreloaderEnabled = true
let quotePreloader = document.querySelector(".quote-preloader")

let sectionsEnabled = false
let chhronicleSections = document.querySelector(".sections")

let header = document.querySelector(".header")

/**
 * Loading Audio Files
 */
let chroniclesOfTateSoundtrack = new Audio("./chronicles-of-tate-soundtrack.mp3")

let hover1 = new Audio("./audio/hover/hover1.mp3")
let hover2 = new Audio("./audio/hover/hover2.mp3")
let hover3 = new Audio("./audio/hover/hover3.mp3")
let hover4 = new Audio("./audio/hover/hover4.mp3")
let hover5 = new Audio("./audio/hover/hover5.mp3")
let hover6 = new Audio("./audio/hover/hover6.mp3")
let hover7 = new Audio("./audio/hover/hover7.mp3")

let select1 = new Audio("./audio/select/select1.mp3")
let select2 = new Audio("./audio/select/select2.mp3")
let select3 = new Audio("./audio/select/select3.mp3")
let select4 = new Audio("./audio/select/select4.mp3")
let select5 = new Audio("./audio/select/select5.mp3")

let click1 = new Audio("./audio/click/click1.mp3")
let click2 = new Audio("./audio/click/click2.mp3")
let click3 = new Audio("./audio/click/click3.mp3")
let click4 = new Audio("./audio/click/click4.mp3")
let click5 = new Audio("./audio/click/click5.mp3")
let click6 = new Audio("./audio/click/click6.mp3")
let click7 = new Audio("./audio/click/click7.mp3")

// Placing click, hover, and select audio files into arrays, will later be used to play randomly on event trigger
let hoverSoundEffects = [
    hover1,
    hover2,
    hover3,
    hover4,
    hover5,
    hover6,
    hover7
]

let selectSoundEffects = [
    select1,
    select2,
    select3,
    select4,
    select5,
]

let clickSoundEffects = [
    click1,
    click2,
    click3,
    click4,
    click5,
    click6,
    click7,
]

/**
 * When page first loads, the app will scroll to top of page
 * by default. For all of the chess pieces to be in chronological
 * order and the app to start as intended, the app needs to be top 
 * of page. The chess pieces are anchored to the scroll position, 
 * so in case the app refreshes or does not load in top of page position, 
 * the app will scroll up for 1000 milliseconds initially. 
 */
window.scrollTo({
    top: 0, 
    behavior: "smooth"
})

setTimeout(() => {
    document.body.style.overflow = "hidden"
}, 1000);

launchExperienceButton.addEventListener("click", () => {
    /**
     * disabling the launcher HTML div element by giving it an opacity of 0 and 
     * saving its enabled/disabled state as a boolean to enable other site elements
     */
    homePageEnabled = false
    homePage.style.opacity = 0

    chroniclesOfTateSoundtrack.play()

    // Function to animate the chessboard on button click
    function animateObject() {
        const startTime = Date.now();
        const duration = 250000; // Animation duration in milliseconds

        function update() {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;

            if (elapsed < duration) {
                // Calculate progress
                const progress = elapsed / duration;

                // Update object properties
                chessBoardObject[0].rotation.x -= 0.4 * progress; // -0.3
                chessBoardObject[0].position.y += 0.6 * progress; // +0.5
                chessBoardObject[0].position.z += 6.9 * progress;

                // Render the scene
                renderer.render(scene, camera);

                // Continue the animation
                requestAnimationFrame(update);
            }
        }
        // Start the animation
        update();
    }
    
    animateObject()

    // removing home page launcher HTML element and loading quote preloader HTML element
    setTimeout(() => { 
        quotePreloaderEnabled = true // HTML div element "click on chess piece to view chronicle"
        homePage.style.display = "none"
        quotePreloader.style.opacity = 1
        launchExperienceButton.style.display = "none"
        document.body.style.backgroundColor = "#000000"

        scene.remove(chessBoardObject[0]) // removing chessboard from scene

        renderer.outputEncoding = THREE.LinearEncoding
        renderer.gammaOutput = true
    },  3500); //2500

    // visually removing (not disabling) quote preloader HTML element
    setTimeout(() => {
        quotePreloader.style.opacity = 0
    }, 5500);

    /**
     * Changing camera & lights position to view chess pieces,
     * optimizing lights intensity, enabling the HTML elements
     * for chess pieces, and disabling the quote preloader HTML
     * element.
     */
    setTimeout(() => {
        camera.position.x = 0
        pointLight.position.x = 0
        pointLight.position.z = 5 // 3.5
        pointLight.intensity = 0

        sections.style.opacity = 1
        header.style.opacity = 1
        sectionsEnabled = true

        document.body.style.overflow = ""

        function animateLightIntensity(light, targetIntensity, duration) { // animation to fade the lights in
            const startIntensity = light.intensity;
            let startTime;

            function update() {
                const currentTime = performance.now();
                const elapsed = currentTime - startTime;
                const progress = Math.min(1, elapsed / duration);

                const newIntensity = startIntensity + progress * (targetIntensity - startIntensity);
                light.intensity = newIntensity;

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }

            function startAnimation() {
                startTime = performance.now();
                update();
            }
            startAnimation();
    }

    animateLightIntensity(ambientLight, 0.3, 4500)
    animateLightIntensity(pointLight, 300, 2500) //75 2500
    }, 8100);
})

// function to change tab text when user exits tab but does not close tab & pause/unpause audio
function handleVisibilityChange() {
    if(document.hidden) {
        chroniclesOfTateSoundtrack.pause()
        document.title = "Finish the task at hand."
    } else if(!document.hidden && sectionsEnabled == true){
        chroniclesOfTateSoundtrack.play()
        document.title = "Chronicles of Emory Tate"
    } else {
        document.title = "Chronicles of Emory Tate"
    }
}

document.addEventListener("visibilitychange", handleVisibilityChange, false)

//mute button logic
const muteButton = document.querySelector(".mute-btn")
const mobileMuteButton = document.querySelector("#mute-btn-mobile")
let muted = false

muteButton.addEventListener("click", () => {
    muteButton.textContent == "mute" ? muteButton.textContent = "unmute" : muteButton.textContent = "mute"
    muteButton.textContent == "mute" ? muted = false : muted = true

    muteButton.textContent == "unmute" ? chroniclesOfTateSoundtrack.pause() : chroniclesOfTateSoundtrack.play()
})

mobileMuteButton.addEventListener("touchstart", () => {
    mobileMuteButton.src.includes("unmute") ? mobileMuteButton.src = "./mute-icon.png" : mobileMuteButton.src = "./unmute-icon.png"

    mobileMuteButton.src.includes("mute") ? chroniclesOfTateSoundtrack.pause() : null
    mobileMuteButton.src.includes("mute") ? muted = true : null

    mobileMuteButton.src.includes("unmute") ? chroniclesOfTateSoundtrack.play() : null
    mobileMuteButton.src.includes("unmute") ? muted = false : null
})

// Loading images 
const images = [
    "/images/tateism.png" ,
    "/images/emory-tate-chess.png",
    "/images/emory-tate.png",
    "/images/the-tate-pride.png",
    "/images/emory-tate-with-mom.png",
    "/images/emory-tate-young.png",
    "/images/tate-pondering.png",
    "/images/emory1.png",
    "/images/emory2.png",
    "/images/emory3.png",
    "/images/emory4.png",
    "/images/emory5.png",
    "/images/emory6.png",
    "/images/emory7.png",
    "/images/emory8.png",
    "/images/emory9.png",
    "/images/emory10.png",
    "/images/emory11.png",
    "/images/emory12.png",
    "/images/emory13.png",
    "/images/emory14.png",
    "/images/emory15.png",
    "/images/emory16.png",
    "/images/emory17.png",
    "/images/emory18.png",
    "/images/emory19.png",
    "/images/emory20.png",
    "/images/emory21.png",
    "/images/emory22.png",
    "/images/emory23.png",
    "/images/emory24.png",
    "/images/emory25.png",
    "/images/emory26.png",
    "/images/emory27.png",
    "/images/emory28.png",
    "/images/emory29.png",
    "/images/emory30.png",
    "/images/emory31.png",
    "/images/emory32.png",
    "/images/emory33.png",
    "/images/emory34.png",
    "/images/emory35.png",
    "/images/emory36.png",
    "/images/emory37.png",
    "/images/emory38.png",
    "/images/emory39.png",
    "/images/emory40.png",
    "/images/emory41.png",
    "/images/emory42.png",
    "/images/emory43.png",
    "/images/emory44.png",
    "/images/emory45.png",
    "/images/emory46.png",
    "/images/emory47.png",
    "/images/emory48.png",
    "/images/emory49.png",
    "/images/emory50.png",
    "/images/emory51.png",
    "/images/emory52.png",
    "/images/emory53.png",
    "/images/emory54.png",
    "/images/emory55.png",
    "/images/emory56.png",
    "/images/emory57.png",
    "/images/emory58.png",
    "/images/emory59.png",
    "/images/emory60.png",
    "/images/emory61.png",
    "/images/emory62.png",
    "/images/emory63.png",
    "/images/emory64.png",
    "/images/emory65.png",
    "/images/emory66.png",
    "/images/emory67.png",
    "/images/emory68.png",
    "/images/emory69.png"
]

function preloadImages(imageArray) {
    for (var i = 0; i <= imageArray.length; i++) {
        var img = new Image();
        img.src = imageArray[i];
    }
}
preloadImages(images);

/**
 * Debug
 */
// const gui = new dat.GUI()

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Textures & Sprites
 */
// const spriteTexture = new THREE.TextureLoader().load('./textures/quote-sprite.png');
// const spriteMaterial = new THREE.SpriteMaterial({ map: spriteTexture });

// const sprite = new THREE.Sprite(spriteMaterial)
// sprite.position.y = -8
// sprite.scale.set(6, 2, 1)

// scene.add(sprite)

/**
 * Loading/Progress Bar Logic
 */
let threeJsLoaded = false
let htmlLoaded = false
const loadingBar = document.querySelector(".loading-bar")
const loadingText = document.querySelector(".loading-text")

const loadingManager = new THREE.LoadingManager(
    // loaded
    () => {
        threeJsLoaded = true
        loadingText.textContent = "loading content"
    }, 
    // progress
    (itemUrl, itemsLoaded, itemsTotal) => {
        loadingBar.style.transform = `scaleX(${(itemsLoaded / itemsTotal) * 0.65})`
        loadingText.textContent = "loading chess pieces"
        htmlLoaded = true
    }
)

window.addEventListener("load", (event) => {
    loadingBar.style.transform = `scaleX(1)` // fully loaded, css delay added
    setTimeout(() => {
        loadingBar.style.opacity = 0
        loadingText.style.opacity = 0
    }, 900); // adding a delay to let the progress animation play

    // Once page loads, removing load/progress bar and loading chessboard into viewport from a lower position
    setTimeout(() => {
        loadingBar.style.display = "none"
        loadingText.style.display = "none"
        launchExperienceButton.style.display = "flex"
        launchExperienceButton.style.opacity = "0"

        const startTime = performance.now()
        const duration = animationDuration

        function animate(currentTime) { // animation to move chessboard into viewport
            const elapsed = currentTime - startTime
            const progress = Math.min(1, elapsed / duration)

            const easedProgress = easeInOut(progress)

            const value = (-5.1) + easedProgress * 4

            chessBoardObject[0].position.y = value

            if (elapsed < duration) {
                requestAnimationFrame(animate)
            }
        }

        function easeInOut(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        requestAnimationFrame(animate)
    }, 1100);

    /**
     * Visually enabling "launch experience" button once loading/progress bar
     * has loaded and chessboard has entered viewport
     */
    setTimeout(() => { 
        launchExperienceButton.style.opacity = "1"
    }, 3000);
});
  
/**
 * Loading Models
 */
const gltfLoader = new GLTFLoader(loadingManager)

const letters = [] 
const animationDuration = 1500
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

/**
 * Lettergenerationvariable will look at the viewport size, determine whether
 * its ultrawide, mobile, or normal desktop/laptop viewport. Then it will assign
 *  a value that will be used for generating the correct amount of chess pieces to fit
 * the designated viewport. If mobile, 10 chess pieces will be generated, ultrawide 15, 
 * and normal desktop/laptop 10 pieces.
 */
let letterGenerationVariable
if(window.innerHeight / window.innerWidth < 0.45) { // ultrawide viewport
    letterGenerationVariable = 15
} else if (window.innerHeight / window.innerWidth > 0.9) { // mobile viewport
    letterGenerationVariable = 10
} else if (!window.innerHeight / window.innerWidth < 0.45) { //normal viewport
    letterGenerationVariable = 10
}

/**
 * NthItem is the variable that will track which order of chronicles are assigned to the 
 * chess pieces that are currently in the viewport. When chess pieces first load (say 10 
 * pieces are loaded), nthItemStart will be 0 and nthItenEnd will be 9. Based on this, 
 * if a user clicks on a chess piece they will see a chronicle that is from index 0-9
 * from the chroniclesOfEmoryTate2011 array. When a user scrolls down a new chess piece 
 * will enter the viewport, nthItemStart will +1, and nthItem end will +1, and visa versa.
 * This way, the chess pieces that are in viewport are always viewing the correct chronicles 
 * in the correct order. 
 */
let nthItem = []
let nthItemStart = 0
let nthItemEnd = 0

let amountOfChroniclesGenerated

// Loading chessboard
let chessBoardObject = []
gltfLoader.load(
    "./tate-opening.glb",
    (gltf) => {
        let chessBoard = gltf.scene

        chessBoard.position.x = -20
        chessBoard.position.y = -5.1 // -1.1
        chessBoard.position.z = 2.7

        chessBoard.rotation.x = 0.3
        chessBoard.rotation.y = 2.35 // 3.148

        // gui.add(chessBoard.position, "x", -25, 15, 0.1).name("chessBoardX")
        // gui.add(chessBoard.position, "y", -15, 15, 0.1).name("chessBoardY")
        // gui.add(chessBoard.position, "z", -15, 15, 0.1).name("chessBoardZ")

        // gui.add(chessBoard.rotation, "x", -15, 15, 0.1).name("chessBoardXRot")
        // gui.add(chessBoard.rotation, "y", -4, 4, 0.1).name("chessBoardYRRot")
        // gui.add(chessBoard.rotation, "z", -15, 15, 0.1).name("chessBoardZTpr")
        
        scene.add(chessBoard)
        chessBoardObject.push(chessBoard)
    }
)

// Loading chess pieces
for (let i = 0; i < letterGenerationVariable; i++) {
    const randomIndex = Math.floor(Math.random() * chessPieces.length)
    gltfLoader.load(
        `./${chessPieces[randomIndex]}.glb`, // randomly loading pawn, rook, king, queen,, knight and bishop
        function (gltf) {
            let letter = gltf.scene // "letter" represents chess pieces

            // Creating AnimationMixers for each chess piece
            // Animations
            const randomDecimal = Math.random()
            const randomNumber = Math.floor(randomDecimal * 3) + 1

            const animations = gltf.animations
            const mixer = new THREE.AnimationMixer(gltf.scene)
            const clip = THREE.AnimationClip.findByName(animations, `${chessPieces[randomIndex]}${randomNumber}`)
            const action = mixer.clipAction(clip)
            mixers.push(mixer)
            gltf.mixer = mixer
            action.play()

            // size
            letter.scale.x = 0.15
            letter.scale.y = 0.15
            letter.scale.z = 0.15

            if (chessPieces[randomIndex] == "rook") {
                letter.scale.x = .24
                letter.scale.y = .24
                letter.scale.z = .24
            }

            // letterRandomPositionX variable will project the cubes to fit the screen based on viewport on X axis (adjust as needed)
            let letterRandomPositionX = null
            if (window.innerHeight / window.innerWidth < 0.45) { // ultrawide viewport
                letterRandomPositionX = 15
            } else if (window.innerHeight / window.innerWidth > 0.9) { // mobile viewport
                letterRandomPositionX = 2
            } else if (!window.innerHeight / window.innerWidth < 0.45) { //normal viewport
                letterRandomPositionX = 8
            }

            // Setting a random X, Y, Z value for position
            // letter.position.y = ((Math.random() - 0.6) * 5) // Math.random() - 1 makes the objects generate from the top down, rather than from the middle (0.5)

            window.innerHeight / window.innerWidth > 0.9 ? letter.position.y = Math.round((Math.random() - 0.6) * 10) : letter.position.y = Math.round((Math.random() - 0.6) * 7)
            letter.position.z = ((Math.random() - 0.5) * 3)

            // setting X position manually
            letterRandomPositionX == 15 ? letter.position.x = Math.round((Math.random() - 0.5) * letterRandomPositionX) : null // x variable will change based on viewport, random position set

            if(letterRandomPositionX == 8) { //normal viewport
                i == 0 ? letter.position.x = -2 : null
                i == 0 ? letter.position.y = 2 : null

                i == 1 ? letter.position.x = 2 : null
                i == 1 ? letter.position.y = 2 : null

                i == 2 ? letter.position.x = -4 : null
                i == 2 ? letter.position.y = 1 : null

                i == 3 ? letter.position.x = 1.5 : null
                i == 3 ? letter.position.y = -0.5 : null

                i == 4 ? letter.position.x = 4 : null
                i == 4 ? letter.position.y = 0 : null

                i == 5 ? letter.position.x = -4 : null
                i == 5 ? letter.position.y = -1.5 : null

                i == 6 ? letter.position.x = -3 : null
                i == 6 ? letter.position.y = -2 : null

                i == 7 ? letter.position.x = -0.75 : null
                i == 7 ? letter.position.y = -1.5 : null

                i == 8 ? letter.position.x = 1.5 : null
                i == 8 ? letter.position.y = -2 : null

                i == 9 ? letter.position.x = 3.5 : null
                i == 9 ? letter.position.y = -3 : null

            } else if (letterRandomPositionX == 2) { // mobile viewport
                i == 0 ? letter.position.x = 0 : null
                i == 0 ? letter.position.y = 2 : null

                i == 1 ? letter.position.x = 0.75 : null
                i == 1 ? letter.position.y = 1.75 : null

                i == 2 ? letter.position.x = -0.9 : null
                i == 2 ? letter.position.y = 1.65 : null

                i == 3 ? letter.position.x = 0.9 : null
                i == 3 ? letter.position.y = 0.3 : null

                i == 4 ? letter.position.x = -0.1 : null
                i == 4 ? letter.position.y = -4 : null

                i == 5 ? letter.position.x = 0 : null
                i == 5 ? letter.position.y = -1.35 : null

                i == 6 ? letter.position.x = 0.9 : null
                i == 6 ? letter.position.y = -3.5 : null

                i == 7 ? letter.position.x = -0.8 : null
                i == 7 ? letter.position.y = -1.85 : null

                i == 8 ? letter.position.x = 0.8 : null
                i == 8 ? letter.position.y = -2 : null

                i == 9 ? letter.position.x = -0.95 : null
                i == 9 ? letter.position.y = -3.5 : null
            }


            // Setting rotation 
            letter.rotation.x = Math.random() - 0.5 * 1.2
            letter.rotation.y = Math.random() - 0.5 * 1.2
            letter.rotation.z = Math.random() - 0.5 * 1.2

            // shadows
            letter.castShadow = false
            letter.receiveShadow = false

            scene.add(gltf.scene)

            /**
             * Giving each chess piece a chronicleNumber. This is the value that will determine the order of 
             * chronicles from chroniclesOfEmoryTate2011 array variable. For example, if 10 pieces are generated 
             * from this for loop, each will have a chronicleNumber from 0-9. When a user clicks on a chess piece, 
             * the chronicleNumber will be used to pull the correct chronicle from the chroniclesOfEmoryTate2011
             * array and display it to the user. This number also increments and decrements when the user scrolls
             * and chess pieces are cycled through the viewport.
             */
            gltf.scene.children[0].chronicleNumber = i

            letters.push(gltf)
            letterCount.push(i)

            // Setting nthItem values
            nthItem.push(i)
            nthItemEnd = nthItem.length

            // Displaying to console the range (nthItem) of chronicles displayed, and the amount generated
            i = letterGenerationVariable ? console.log(`displaying chronicles ${nthItemStart} to ${nthItemEnd}`) : null

            if (i = letterGenerationVariable) {
                amountOfChroniclesGenerated = nthItemEnd - nthItemStart
                console.log(`Amount of chronicles generated: ${amountOfChroniclesGenerated}`)
            }
        }
    )
}

/**
 * Lights
 */
// Ambient Light
const ambientLightColor = new THREE.Color("#ffe7d6")
const ambientLight = new THREE.AmbientLight(ambientLightColor)
ambientLight.intensity = 1

scene.add(ambientLight)

// Point Light (assigned to mouse position)
const pointLight = new THREE.PointLight("#FFF7DD", 75) // regular 75
pointLight.position.x = -20 // normally 0, reassigned once "launch experience" button cliked
pointLight.position.z = 9 // normally 3, reassigned once "launch experience" button cliked
pointLight.rotation.y = Math.PI / 2 // rotated to face chess pieces
pointLight.castShadow = false
pointLight.decay = 1.61
pointLight.distance = 100

scene.add(pointLight)

/**
 * Raycaster
 */

// Set up raycaster, used to detect hover and click on THREE.js chess pieces
var raycaster = new THREE.Raycaster();
var intersects = []; // Array to store intersected objects

const mouse = new THREE.Vector2()

// Handle mousemove events
let popupOpened = false
let hoveringOverChessPiece = false
let hoveredChessPiece

// hover sound effect
function hoverSoundEffect() {
    if(muted == false) {
        let randomNum = Math.floor(Math.random() * 7)
        hoverSoundEffects[randomNum].play()
        console.log("Mouse entered the element!");
    } else { null }

}

// click sound effect
function clickSoundEffect() {
    if(muted == false) {
        let clickRandomNum = Math.floor(Math.random() * 7)
        let selectRandomNum = Math.floor(Math.random() * 5)
    
        clickSoundEffects[clickRandomNum].play()
        setTimeout(() => {
            selectSoundEffects[selectRandomNum].play()
        }, 200);
    }
}

let intersectDetected = true
function chessPieceHoverSoundEffect() {
    if(intersectDetected == true) {
            hoverSoundEffect()
            intersects.length > 0 ? intersectDetected = false : null

    } else { null }
}

document.addEventListener("mousemove", (event) => {
    if(!isTouchScreen && sectionsEnabled) {
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
        intersects.length > 0 && !popupOpened && sectionsEnabled ? document.body.style.cursor = 'pointer' : document.body.style.cursor = 'auto'
        intersects.length > 0 && !popupOpened && sectionsEnabled ? chessPieceHoverSoundEffect() : intersectDetected = true
        // intersects.length > 0 ? console.log(intersects[0].object) : null

    } else {
        // pointLight.position.x = 0
        // pointLight.position.y = 0

        // Update the raycaster's origin and direction
        raycaster.setFromCamera(mouse, camera);

        // Check for intersections
        intersects = raycaster.intersectObjects(scene.children);

        // intersect detected
        intersects.length > 0 && sectionsEnabled ? console.log("intersect detected") : null
    }
})

function buttonMagnetHoverEffectMousein(button, e, offset) {
    const rect = button.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const deltaX = (mouseX - centerX) / 2; // The divisor controls the intensity of the effect
    const deltaY = (mouseY - centerY) / 2; // Adjust these values as needed

    button.style.transform = `translate(${deltaX * offset}px, ${deltaY * offset}px)`;
    button.style.transition = "transform 0.2s ease" /* Adjust timing and easing function as desired */
}

function buttonMagnetHoverEffectMouseout(button) {
    button.style.transform = ''; // Reset the transform on mouse leave
    button.style.transition = "transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)" /* Adjust timing and easing function as desired */
}

let aboutDesktopButton = document.querySelector("#about-desktop-btn");
let muteDesktopButton = document.querySelector("#mute-desktop-btn");
let closeChronicleDesktopButton = document.querySelector("#close-chronicle-desktop-btn");
let launchExperienceDesktopButton = document.querySelector("#launch-experience-desktop-btn");
let aboutSectionCloseButton = document.querySelector("#close-btn");
let chroniclesOfTateDesktopButton = document.querySelector("#chronicles-of-tate-desktop-btn");
// let skipBtn = document.querySelector(".skip-btn");

aboutDesktopButton.addEventListener("mousemove", (e) => {buttonMagnetHoverEffectMousein(aboutDesktopButton, e, 0.9)});
aboutDesktopButton.addEventListener("mouseover", (e) => {hoverSoundEffect()});
aboutDesktopButton.addEventListener("click", (e) => {clickSoundEffect()});

muteDesktopButton.addEventListener("mousemove", (e) => {buttonMagnetHoverEffectMousein(muteDesktopButton, e, 0.9)});
muteDesktopButton.addEventListener("mouseover", (e) => {hoverSoundEffect()});

let escBtnCounter = 0
closeChronicleDesktopButton.addEventListener("mousemove", (e) => {buttonMagnetHoverEffectMousein(closeChronicleDesktopButton, e, 0.9)});
closeChronicleDesktopButton.addEventListener("mouseover", (e) => {
    hoverSoundEffect()
    if(escBtnCounter <= 2) {
        closeChronicleDesktopButton.innerHTML = "close (esc)"
        escBtnCounter += 1
        console.log(escBtnCounter)
    }
});
closeChronicleDesktopButton.addEventListener("mouseleave", (e) => {
    escBtnCounter <= 3 ? closeChronicleDesktopButton.innerHTML = "close" : null
});
closeChronicleDesktopButton.addEventListener("click", (e) => {clickSoundEffect()});

launchExperienceDesktopButton.addEventListener("mousemove", (e) => {buttonMagnetHoverEffectMousein(launchExperienceDesktopButton, e, 0.125)});
launchExperienceDesktopButton.addEventListener("mouseover", (e) => {hoverSoundEffect()});

aboutSectionCloseButton.addEventListener("mousemove", (e) => {buttonMagnetHoverEffectMousein(aboutSectionCloseButton, e, 0.9)});
aboutSectionCloseButton.addEventListener("mouseover", (e) => {hoverSoundEffect()});
aboutSectionCloseButton.addEventListener("click", (e) => {clickSoundEffect()});

// skipBtn.addEventListener("mousemove", (e) => {buttonMagnetHoverEffectMousein(skipBtn, e, 0.9)});
// skipBtn.addEventListener("mouseover", (e) => {hoverSoundEffect()});

chroniclesOfTateDesktopButton.addEventListener("mouseover", (e) => {hoverSoundEffect()})
chroniclesOfTateDesktopButton.addEventListener("mousemove", (e) => {
    if(!isTouchScreen) {
        buttonMagnetHoverEffectMousein(chroniclesOfTateDesktopButton, e, 0.175)
        chroniclesOfTateDesktopButton.innerHTML = '<a href="https://customer-29d3r31yjz332bf4.cloudflarestream.com/7687dd63dda8179060bddef2ffdd15bc/iframe?poster=https%3A%2F%2Fcustomer-29d3r31yjz332bf4.cloudflarestream.com%2F7687dd63dda8179060bddef2ffdd15bc%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D10s%26height%3D600\" target="_blank">Master Wudan</a>'
    } else {null}
});

aboutDesktopButton.addEventListener("mouseleave", () => {buttonMagnetHoverEffectMouseout(aboutDesktopButton)});
muteDesktopButton.addEventListener("mouseleave", () => {buttonMagnetHoverEffectMouseout(muteDesktopButton)});
closeChronicleDesktopButton.addEventListener("mouseleave", () => {buttonMagnetHoverEffectMouseout(closeChronicleDesktopButton)});
launchExperienceDesktopButton.addEventListener("mouseleave", () => {buttonMagnetHoverEffectMouseout(launchExperienceDesktopButton)});
aboutSectionCloseButton.addEventListener("mouseleave", () => {buttonMagnetHoverEffectMouseout(aboutSectionCloseButton)});
// skipBtn.addEventListener("mouseleave", () => {buttonMagnetHoverEffectMouseout(skipBtn)});
chroniclesOfTateDesktopButton.addEventListener("mouseleave", () => {
    if(!isTouchScreen) {
        buttonMagnetHoverEffectMouseout(chroniclesOfTateDesktopButton)
        chroniclesOfTateDesktopButton.innerHTML = '<a href="https://customer-29d3r31yjz332bf4.cloudflarestream.com/7687dd63dda8179060bddef2ffdd15bc/iframe?poster=https%3A%2F%2Fcustomer-29d3r31yjz332bf4.cloudflarestream.com%2F7687dd63dda8179060bddef2ffdd15bc%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D10s%26height%3D600\" target="_blank">Chronicles Of Tate</a>'
    } else {null}
});



// Handle mouse click events
let chroniclePopUp = document.querySelector(".chronicle")
let chronicleContent = document.querySelector(".chronicle-content")
let chronicleTextContent = document.querySelector(".chronicle-text-content")
let chronicleTextContentDate = document.querySelector("#chronicle-text-content-date")
let chronicleImageContent = document.querySelector(".chronicle-image-content")
let sections = document.querySelector(".sections")

let aboutButton = document.querySelector(".about-btn")
let aboutSection = document.querySelector(".about")
let aboutCloseButton = document.querySelector("#close-btn")

let clickedChronicleIteration

document.addEventListener('click', () => {
    // Check for intersections
    let intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0 && isTouchScreen == false && popupOpened == false && sectionsEnabled) {
        clickSoundEffect()
        popupOpened = true

        let chronicleIteration = intersects[0].object.chronicleNumber !== undefined ? intersects[0].object.chronicleNumber : intersects[0].object.parent.chronicleNumber
        clickedChronicleIteration = chronicleIteration
        console.log(`clickedChronicleIteration: ${clickedChronicleIteration}`)

        document.body.style.backgroundSize = "70%"
        mobileBackground.style.backgroundSize = "70%"

        chroniclePopUp.style.display = 'flex'
        chroniclePopUp.style.opacity = '1'
        sections.style.opacity = 0
        chronicleTextContent.innerHTML = `${chroniclesOfEmoryTate2011[chronicleIteration].quote}`
        chronicleTextContentDate.textContent = `${chroniclesOfEmoryTate2011[chronicleIteration].date}`

        let chronicleImage = chroniclesOfEmoryTate2011[chronicleIteration].image == null ? images[Math.floor(Math.random() * 77)] : chroniclesOfEmoryTate2011[chronicleIteration].image

        chronicleImageContent.src = `${chronicleImage}`
        // chroniclePopUp.classList.remove("show")

        // hide and disable header
        // header.style.opacity = 0
        // setTimeout(() => {
        //     header.style.display = "none"
        // }, 1600);

        // move clicked piece forward
        for(let i = 0; i < letters.length; i++) {
            if(letters[i].scene.children[0].chronicleNumber == chronicleIteration) {
                console.log("iteration found")
                // letters[i].scene.position.z += 4

                const itemZ = letters[i].scene.position.z

                const startTime = performance.now()
                const duration = animationDuration
        
                function animate(currentTime) {
                    const elapsed = currentTime - startTime
                    const progress = Math.min(1, elapsed / duration)
        
                    const easedProgress = easeInOut(progress)
        
                    const value =  itemZ + easedProgress * 4 // from itemZ to itemZ + 4 units

                    letters[i].scene.position.z = value
        
                    if (elapsed < duration) {
                        requestAnimationFrame(animate)
                    }
                }
        
                function easeInOut(t) {
                    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                }
        
                requestAnimationFrame(animate)

            } else {
                null
            }
        }

        // move the camera rearwards


        // log the object that was clicked
        console.log('Object clicked:', chronicleIteration);
        console.log('Object clicked:', intersects[0].object);

        const startTime = performance.now()
        const duration = animationDuration

        function animate(currentTime) {
            const elapsed = currentTime - startTime
            const progress = Math.min(1, elapsed / duration)

            const easedProgress = easeInOut(progress)

            const value = 10 + easedProgress * 5 // from 10 to 15
            const lightValue = 5 + easedProgress * 5 // from 5 to 10

            camera.position.z = value
            pointLight.position.z = lightValue

            if (elapsed < duration) {
                requestAnimationFrame(animate)
            }
        }

        function easeInOut(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        requestAnimationFrame(animate)
    } 

}, false);

document.querySelector(".close-chronicle-btn").addEventListener('click', () => {   
    console.log("clicked")
    popupOpened = false

    document.body.style.backgroundSize = "100%"
    mobileBackground.style.backgroundSize = "100%"

    chroniclePopUp.style.opacity = "0"
    sections.style.opacity = 1
    header.style.opacity = 1
    // chroniclePopUp.classList.add("hide")

    // move clicked piece backward
    setTimeout(() => {
        for (let i = 0; i < letters.length; i++) {
            if (letters[i].scene.children[0].chronicleNumber == clickedChronicleIteration) {
                console.log("iteration found")
                // letters[i].scene.position.z += 4
    
                const itemZ = letters[i].scene.position.z
    
                const startTime = performance.now()
                const duration = animationDuration
    
                function animate(currentTime) {
                    const elapsed = currentTime - startTime
                    const progress = Math.min(1, elapsed / duration)
    
                    const easedProgress = easeInOut(progress)
    
                    const value = itemZ - easedProgress * 4
                    const lightValue = 10 - easedProgress * 5 // from 10 to 5
    
                    letters[i].scene.position.z = value
                    pointLight.position.z = lightValue
    
                    if (elapsed < duration) {
                        requestAnimationFrame(animate)
                    }
                }
    
                function easeInOut(t) {
                    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                }
    
                requestAnimationFrame(animate)
    
            } else {
                null
            }
        }
    }, 750);

    const startTime = performance.now()
        const duration = animationDuration

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

        setTimeout(() => {
            chroniclePopUp.style.display = 'none'
        }, 1600);
})

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popupOpened == true && aboutPopupOpened == false) {

        popupOpened = false
        clickSoundEffect()

        document.body.style.backgroundSize = "100%"
        mobileBackground.style.backgroundSize = "100%"

        chroniclePopUp.style.opacity = "0"
        sections.style.opacity = 1
        header.style.opacity = 1

        // move clicked piece backward
        setTimeout(() => {
            for (let i = 0; i < letters.length; i++) {
                if (letters[i].scene.children[0].chronicleNumber == clickedChronicleIteration) {
                    console.log("iteration found")
                    // letters[i].scene.position.z += 4

                    const itemZ = letters[i].scene.position.z

                    const startTime = performance.now()
                    const duration = animationDuration

                    function animate(currentTime) {
                        const elapsed = currentTime - startTime
                        const progress = Math.min(1, elapsed / duration)

                        const easedProgress = easeInOut(progress)

                        const value = itemZ - easedProgress * 4
                        const lightValue = 10 - easedProgress * 5 // from 10 to 5

                        letters[i].scene.position.z = value
                        pointLight.position.z = lightValue

                        if (elapsed < duration) {
                            requestAnimationFrame(animate)
                        }
                    }

                    function easeInOut(t) {
                        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                    }

                    requestAnimationFrame(animate)

                } else {
                    null
                }
            }
        }, 750);

        const startTime = performance.now()
        const duration = animationDuration

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

        setTimeout(() => {
            chroniclePopUp.style.display = 'none'
        }, 1600);

    } else { null }
})

chronicleContent.addEventListener("click", (event) => {
    event.stopPropagation()

})

chroniclePopUp.addEventListener("click", (event) => {
    console.log("parent element clicked")

    popupOpened = false
    clickSoundEffect()

    document.body.style.backgroundSize = "100%"
    mobileBackground.style.backgroundSize = "100%"

    chroniclePopUp.style.opacity = "0"
    sections.style.opacity = 1
    header.style.opacity = 1

    // move clicked piece backward
    setTimeout(() => {
        for (let i = 0; i < letters.length; i++) {
            if (letters[i].scene.children[0].chronicleNumber == clickedChronicleIteration) {
                console.log("iteration found")
                // letters[i].scene.position.z += 4

                const itemZ = letters[i].scene.position.z

                const startTime = performance.now()
                const duration = animationDuration

                function animate(currentTime) {
                    const elapsed = currentTime - startTime
                    const progress = Math.min(1, elapsed / duration)

                    const easedProgress = easeInOut(progress)

                    const value = itemZ - easedProgress * 4
                    const lightValue = 10 - easedProgress * 5 // from 10 to 5

                    letters[i].scene.position.z = value
                    pointLight.position.z = lightValue

                    if (elapsed < duration) {
                        requestAnimationFrame(animate)
                    }
                }

                function easeInOut(t) {
                    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                }

                requestAnimationFrame(animate)

            } else {
                null
            }
        }
    }, 750);

    const startTime = performance.now()
    const duration = animationDuration

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

    setTimeout(() => {
        chroniclePopUp.style.display = 'none'
    }, 1600);
    
})

let aboutPopupOpened = false
aboutButton.addEventListener("click", () => {
    popupOpened = true
    aboutPopupOpened = true

    aboutSection.style.display = "flex"
    aboutSection.style.zIndex = 1
    document.body.style.backgroundSize = "70%"
    sections.style.opacity = 0
    header.style.opacity = 1

    setTimeout(() => {
        aboutSection.style.opacity = 1
    }, 100);

    const startTime = performance.now()
    const duration = animationDuration

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
    requestAnimationFrame(animate)
})

aboutCloseButton.addEventListener("click", () => {
    popupOpened = false
    aboutPopupOpened = false

    document.body.style.backgroundSize = "100%"
    mobileBackground.style.backgroundSize = "100%"
    sections.style.opacity = 1
    header.style.opacity = 1
    aboutSection.style.opacity = 0

    setTimeout(() => {
        aboutSection.style.display = "none"
    }, 1600);

    const startTime = performance.now()
    const duration = animationDuration

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

    setTimeout(() => {
        chroniclePopUp.style.display = 'none'
    }, 1600);
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

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height)
camera.position.x = -20
camera.position.z = 10

scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(".webgl"),
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
// renderer.outputEncoding = THREE.LinearEncoding
// renderer.gammaOutput = true
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

    // Check for intersections
    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0 && popupOpened == false && sectionsEnabled) {
        // log the object that was clicked
        console.log('Object touched on mobile:', intersects[0].object);
        clickSoundEffect()
        popupOpened = true

        let chronicleIteration = intersects[0].object.chronicleNumber !== undefined ? intersects[0].object.chronicleNumber : intersects[0].object.parent.chronicleNumber
        clickedChronicleIteration = chronicleIteration

        mobileBackground.style.backgroundSize = "70%"

        chroniclePopUp.style.display = 'flex'
        chroniclePopUp.style.opacity = '1'
        // header.style.opacity = 0
        sections.style.opacity = 0
        chronicleTextContent.innerHTML = `${chroniclesOfEmoryTate2011[chronicleIteration].quote}`
        chronicleTextContentDate.textContent = `${chroniclesOfEmoryTate2011[chronicleIteration].date}`

        let chronicleImage = chroniclesOfEmoryTate2011[chronicleIteration].image == null ? images[Math.floor(Math.random() * 77)] : chroniclesOfEmoryTate2011[chronicleIteration].image

        chronicleImageContent.src = `${chronicleImage}`

        // move clicked piece forward
        console.log(`clickedChronicleIteration: ${clickedChronicleIteration}`)
        for(let i = 0; i < letters.length; i++) {
            if(letters[i].scene.children[0].chronicleNumber == chronicleIteration) {
                console.log("iteration found")
                // letters[i].scene.position.z += 4

                const itemZ = letters[i].scene.position.z

                const startTime = performance.now()
                const duration = animationDuration
        
                function animate(currentTime) {
                    const elapsed = currentTime - startTime
                    const progress = Math.min(1, elapsed / duration)
        
                    const easedProgress = easeInOut(progress)
        
                    const value =  itemZ + easedProgress * 4

                    letters[i].scene.position.z = value
        
                    if (elapsed < duration) {
                        requestAnimationFrame(animate)
                    }
                }
        
                function easeInOut(t) {
                    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                }
        
                requestAnimationFrame(animate)

            } else {
                null
            }
        }

        const startTime = performance.now()
        const duration = animationDuration

        function animate(currentTime) {
            const elapsed = currentTime - startTime
            const progress = Math.min(1, elapsed / duration)

            const easedProgress = easeInOut(progress)

            const value = 10 + easedProgress * 5
            const lightValue = 5 + easedProgress * 5 // from 5 to 10

            camera.position.z = value
            pointLight.position.z = lightValue

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
})

let infoButton = document.querySelector(".hamburger-menu-icon")
let mobileBackground = document.querySelector(".mobile-background")

infoButton.addEventListener("touchstart", () => {
    clickSoundEffect()
    popupOpened = true

    aboutSection.style.display = "flex"
    aboutSection.style.zIndex = 1
    mobileBackground.style.backgroundSize = "70%"
    sections.style.opacity = 0
    header.style.opacity = 1

    setTimeout(() => {
        aboutSection.style.opacity = 1
    }, 100);

    const startTime = performance.now()
    const duration = animationDuration

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

    requestAnimationFrame(animate)
})

let initialScrollPosition = 0
let scrollInteration
let deltaScrollPosition = null
// let section2011Vh = 700
// let section2012Vh = 1000
// let section2013vh = 400
let section2011Vh = 200
let section2012Vh = 200
let section2013vh = 100

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
            // sprite.position.y += deltaScrollPosition * 0.0007
        }

    } else if (currentScrollPosition > lastScrollPosition) {
        // console.log("Scrolled down")

        for (const mesh of letters) {
            mesh.scene.position.y += deltaScrollPosition * 0.007 // scrollSpeed * ((window.innerWidth / window.innerHeight) * isTouchScreen ? 0.1 : 0.02)
            // sprite.position.y += deltaScrollPosition * 0.0007
        }
    }

    lastScrollPosition = currentScrollPosition
    // console.log(lastScrollPosition)

    // Extend section-2011 height
    // Check for target div in viewport
    const section2011End = document.querySelector('.section-2011-end');
    const section2012End = document.querySelector('.section-2012-end')
    const section2013End = document.querySelector('.section-2013-end')

    if (isInViewport(section2011End) && letterCount.length < 52) { // 58, 6 tweets removed from original
        section2011Vh += 10
        document.querySelector(".section-2011").style.height = `${section2011Vh}vh`
        console.log("extend...")
    } 
    
    if (isInViewport(section2012End) && letterCount.length < 146) {
        section2012Vh += 10
        document.querySelector(".section-2012").style.height = `${section2012Vh}vh`
        console.log("extend...")
    } 
    
    if (isInViewport(section2013End) && nthItemEnd < chroniclesOfEmoryTate2011.length) { //letterCount.length < 162
        section2013vh += 10
        document.querySelector(".section-2013").style.height = `${section2013vh}vh`
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

setTimeout(() => {
    window.addEventListener("scroll", debouceScroll)
}, 2500);

// Canvas scene animation (tick function)
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    // console.log(pointLight.position.z)
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Animate camera
    // camera.position.y = - scrollY * 0.008  // / sizes.height * distance

    // Update animations mixer
    for(const mixer of mixers) {
        mixer.update(deltaTime)
    }

    // Update mesh position based on scroll
    for(let i = 0; i < letters.length; i++) {

        let letter = letters[i].scene

        // Setting X again for random position
        let letterRandomPositionX = null

        if (window.innerHeight / window.innerWidth < 0.45) {
            letterRandomPositionX = 15
        } else if (window.innerHeight / window.innerWidth > 0.9) {
            letterRandomPositionX = 2
        } else if (!window.innerHeight / window.innerWidth < 0.45) {
            letterRandomPositionX = 8
        }

        function scrollDown() {

            // letter.position.y = -3.94 + Math.random() * ( -4.05 - (-3.94) ) // random number between -3.94 and -4.54
            // window.innerHeight / window.innerWidth > 0.9 ? letter.position.y = -3.95 - Math.random() * 10 : letter.position.y = -3.95 + Math.random() * (-10.95 - (-3.95))
            letter.position.y = -3.95 + Math.random() * ( -4.04 - (-3.94) ) // random number between -3.95 and -4.04
            
            // letter.position.y = -3.94
            // letter.position.x = (Math.random() - 0.5) * letterRandomPositionX //randomize x on scroll down
            // letterRandomPositionX == 2 ? letter.position.x += ((Math.random() - 0.5)) : letter.position.x += ((Math.random() - 0.5)) // add -0.5 to +0.5 to x on scroll down


            letter.rotation.x += ((Math.random() - 0.5) * 0.1) // add -0.5 to +0.5 to x rotation on scroll down
            letter.rotation.y += ((Math.random() - 0.5) * 0.1) // add -0.5 to +0.5 to y rotation on scroll down
            letterCount.push(letterCount.length)
            // console.log(letterCount)
        }

        function scrollUp() {
            letter.position.y = 3.95
            // letter.position.x = Math.round((Math.random() - 0.5) * letterRandomPositionX) //randomize x on scroll up
            // letter.position.x += (Math.random() - 0.5) // add -0.5 to +0.5 to x position on scroll up
            // letterRandomPositionX == 2 ? letter.position.x += ((Math.random() - 0.5)) : letter.position.x += ((Math.random() - 0.5)) // add -0.5 to +0.5 to x on scroll up

            letter.rotation.x += ((Math.random() - 0.5) * 0.1) // add -0.5 to +0.5 to x rotation on scroll up
            letter.rotation.y += ((Math.random() - 0.5) * 0.1) // add -0.5 to +0.5 to y rotation on scroll up
            letterCount.pop()
            // console.log(letterCount)                
        }

        function scroll() {
            if (letter.position.y > 3.95 && nthItemEnd < chroniclesOfEmoryTate2011.length) { // 3.95
                scrollDown()

                nthItemStart = nthItemStart + 1
                nthItemEnd = nthItemEnd + 1

                letter.children[0].chronicleNumber = nthItemEnd - 1
                console.log(letter.children[0].chronicleNumber)
                console.log(`Displaying chronicles ${nthItemStart} to ${nthItemEnd}`)
    
            } else if (letter.position.y < -4.05) { // -4.05 
                scrollUp()
                nthItemStart = nthItemStart - 1
                nthItemEnd = nthItemEnd - 1

                letter.children[0].chronicleNumber = nthItemStart
                console.log(letter.children[0].chronicleNumber)
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