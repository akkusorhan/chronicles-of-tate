import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from "lil-gui"

/**
 * Creating Home Page
 */
let homePageEnabled = true
let homePage = document.querySelector(".home-page")
let launchExperienceButton = document.querySelector(".launch-experience-btn")

let quotePreloaderEnabled = true
let quotePreloader = document.querySelector(".quote-preloader")

let sectionsEnabled = false
let chhronicleSections = document.querySelector(".sections")

let chroniclesOfTateSoundtrack = new Audio("./chronicles-of-tate-soundtrack.mp3")

document.body.style.overflow = "hidden"

launchExperienceButton.addEventListener("click", () => {
    homePageEnabled = false
    homePage.style.opacity = 0
    chroniclesOfTateSoundtrack.play()
    
    setTimeout(() => {
        quotePreloaderEnabled = true
        quotePreloader.style.opacity = 1

        setTimeout(() => {document.querySelector("#one").style.opacity = 1}, 500);
        setTimeout(() => {document.querySelector("#two").style.opacity = 1}, 1500);
        setTimeout(() => {document.querySelector("#three").style.opacity = 1}, 3000);
        setTimeout(() => {document.querySelector("#four").style.opacity = 1}, 5000);
        setTimeout(() => {document.querySelector("#five").style.opacity = 1}, 7500);
        setTimeout(() => {document.querySelector("#six").style.opacity = 1}, 8500);
        setTimeout(() => {document.querySelector("#seven").style.opacity = 1}, 10000);
        setTimeout(() => {document.querySelector("#eight").style.opacity = 1}, 12500);
        setTimeout(() => {document.querySelector("#nine").style.opacity = 1}, 15000);
        setTimeout(() => {document.querySelector("#ten").style.opacity = 1}, 17500);
        setTimeout(() => {document.querySelector("#eleven").style.opacity = 1}, 21000);
        setTimeout(() => {document.querySelector("#twelve").style.opacity = 1}, 25000);
        setTimeout(() => {document.querySelector("#thirteen").style.opacity = 1}, 27000);
        setTimeout(() => {document.querySelector("#fourteen").style.opacity = 1}, 29000);
        setTimeout(() => {document.querySelector("#fifteen").style.opacity = 1}, 33000);
    }, 2500);

    setTimeout(() => {
        quotePreloaderEnabled = false
        quotePreloader.style.opacity = 0

        setTimeout(() => {
            homePage.remove()
            quotePreloader.remove()

            sections.style.opacity = 1
            sectionsEnabled = true

            document.body.style.overflow = ""

            function animateLightIntensity(light, targetIntensity, duration) {
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
            animateLightIntensity(pointLight, 75, 4500)
            // ambientLight.intensity = 0.3
            // pointLight.intensity = 75
        }, 3500);
    }, 40500);
})




const images = [
    "/images/tateism.png" ,
    "/images/emory-tate-chess.png",
    "/images/emory-tate.png",
    "/images/the-tate-pride.png",
    "/images/emory-tate-with-mom.png",
    "/images/emory-tate-young.png",
    "/images/tate-pondering.png",
]

function preloadImages(imageArray) {
    for (var i = 0; i < imageArray.length; i++) {
        var img = new Image();
        img.src = imageArray[i];
    }
}

preloadImages(images);

const chroniclesOfEmoryTate2011 = [
    {
        quote: '"Cowards die a thousand deaths, a brave man only one.  Stand against mediocrity.  Fight brainwashing."',
        display: true,
        image: null
    },
    {
        quote: '"Andrew is now the Cobra, but he was born a Tiger.  Such a combination will never be beat!!!  Go team Cobra"',
        display: true,
        image: "/images/emory-tate-with-mom.png"
    },
    {
        quote: '"Only adverts and sports replay on the orange channel link.  Are the lower fights not being shown?  Will they cut in for ANdrew?"',
        display: true
    },
    {
        quote: '"The orange TV link is a bust so far."',
        display: true,
        image: null
    },
    {
        quote: '".Fighting  demands guts.  Cobra fought, to win, for the contract.  Even a loss on his record was not worth his integrity as a superstar"',
        display: true,
        image: null
    },
    {
        quote: '"And so we find time marches on.  Miracles happen  I am happy and I am sad that my son fought so hard.  All 7 rounds What a tough guy. Always"',
        display: true,
        image: null
    },
    {
        quote: '"Tristan is unleashed upon the world.... Love him or hate him.  he probly dont care."',
        display: true,
        image: null
    },
    {
        quote: '"Jason Bourne is the man.Yet he is fiction,one step above a cartoon.Want your ass kicked? Break my security space then?Move toward the light!"',
        display: true,
        image: null
    },
    {
        quote: '"Jason Bourne really is the man... the lonely hero.  F$$K with him and you are ffkkkkin with the man.  Too bad it is fiction.  Tate"',
        display: true,
        image: null
    },
    {
        quote: '"Music does soothe the savage beast.  I listened to a harp and felt calm.  Now back to reality as I must go prowl among the sheep AGAIN!"',
        display: true,
        image: null
    },
    {
        quote: '"Joining a group protest is not for my Tate personality.  I take it straight to the source of corruption.  And I stay alive!  Walk the walk."',
        display: true,
        image: null
    },
    {
        quote: '"The word homophobic needs to be rethought.  Nobody is afraid, actually.  The real word is homo-intolerant.  I refuse to be called afraid."',
        display: true,
        image: null
    },
    {
        quote: '"Every wants to be a tough guy.Which of you have tasted your own blood.  When I was three,busted head.I DRANK my blood.Daddy panicked. not me"',
        display: true,
        image: null
    },
    {
        quote: '"How has it become that I no longer can tell male thought from female thought.  Yes, I cry... but that does not mean I think like a woman."',
        display: true,
        image: null
    },
    {
        quote: '"It really is getting so much harder to identify a credible enemy anymore.  Could it be that all these people killed were not hostile at all?"',
        display: true,
        image: null
    },
    {
        quote: `"I appears to me that if I concentrate on happy ideas, no one can make me sad.  After all, I am the best that I've ever seen!! So are you."`,
        display: true,
        image: null
    },
    {
        quote: '"These people who know me, know by now they shoulda put me in charge.  I have never seen such a consistent record of failure in my life.  Sad"',
        display: true,
        image: null
    },
    {
        quote: '"OCCUPY Twitter!!!  How u like me now, mo fo?"',
        display: true,
        image: null
    },
    {
        quote: `"Vodka and guava juice at 3am, alone in a hotel room.negro gotta have a screw loose. I say "tighten up".don't lighten up, tighten up.  buzzed"`,
        display: true,
        image: null
    },
    {
        quote: '"It does get a bit tricky when the only two bad ass men who could kick my ass happen to be my two sons.Everybody else better watch the fk out"',
        display: true,
        image: null
    },
    {
        quote: '"Without a baseline for truth, we (humans) are like savage apes, doing dirt in the dark, and smiling by day. Animals.Still, noone is perfect."',
        display: true,
        image: null
    },
    {
        quote: '"I took a trip to Anhedonia! Do you know what I mean,I mean this place is hard to describe. Google maps places it between ennui and dejection"',
        display: true,
        image: null
    },
    {
        quote: '"Does being imprisoned in America mean free health care?Seems like a good trade-off.Go on a crime-spree then get meds in jail. Some sex too?!"',
        display: true,
        image: null
    },
    {
        quote: '"Chess is somewhat underrated.  A cerebral exercise, for certain,yet the war strategy aspect is often overlooked.  War is everywhere. Believe"',
        display: true,
        image: null
    },
    {
        quote: '"Caught between the longing for love and the struggle for the legal tender (The Pretender) song"',
        display: true,
        image: null
    },
    {
        quote: '"There is no Kyoto protocol.There is no way to control pollution.I see human pollution.Cant control it. these people think that they matter?"',
        display: true,
        image: null
    },
    {
        quote: '"I am honored to be (humble servant of the future) yet I am myself.  I am honored to be to your. dad.  no kidding.  Who could want more?"',
        display: true,
        image: null
    },
    {
        quote: `"I've been a bit remiss by not flexing my vernacular. Now is time to hearken to the brazeness of modern men, hiding their true craven nature"`,
        display: true,
        image: null
    },
    {
        quote: `"Anhedonia is a little-known place, far beyond equanimity. Tate
        A strange place to visit, but I don't wann live there.  Gotta find a new drug"`,
        display: true,
        image: null
    },
    {
        quote: '"Inaction is, of itself, an action.  Sun Xu.  Idiots run the world and they are cowards too.  Tate.  Dont fuk with me. Tateism"',
        display: true,
        image: null
    },
    {
        quote: '"I knew this woul happen.no kidding, my actions forstall the inevitable but, in the end futile.Think how many tweeters dont know futilility"',
        display: true,
        image: null
    },
    {
        quote: '"Liege Belgium in the news (wrong reasons).The train to Maastricht Nederland is quite cheap. Eurolines bus from London is adequate.Back door"',
        display: true,
        image: null
    },
    {
        quote: '"Everybody wants to be a tuf guy, but so few pay the price to get there.  These pretend clones in public make me uneasy.  I abhor cowards."',
        display: true,
        image: null
    },
    {
        quote: `"The problem with cowards is that they can get you killed when THEY panic!
        You might have to deal with the primary threat and K O the coward"`,
        display: true,
        image: null
    },
    {
        quote: '"The only way to explain the technical failure, moral and ethical failure and disregard for the truth??  Realize it was deliberate,  They win"',
        display: true,
        image: null
    },
    {
        quote: '"Whereas it seems impossible for one man to be smarter that all the rest put together, One man can be right while everyone else is wrong. I"',
        display: true,
        image: null
    },
    {
        quote: `"All the inaction and failure I witnessed made angry, I asked my mom why wouldn't people do something.  You cain't do what you cain't think!"`,
        display: true,
        image: null
    },
    {
        quote: '"Jealousy drives envy till they imitate, unable to emulate.  After practice, delusion follows and they try to erase the original.  Parasites"',
        display: true,
        image: null
    },
    {
        quote: '"It appears to me that wisdom is replaced by knowledge. This fact undermines the elder statesman, and threatens all society.  Amateurs."',
        display: true,
        image: null
    },
    {
        quote: '"These fukkers on the train behind me started loud chat about computer stuff, incomprehensible!Can they be polite? can they stop my fist?fail"',
        display: true,
        image: null
    },
    {
        quote: `"Old people are somehow "funny" All dead mf's who died young must be absolutely hilarious. (group laughter) Is the very meaning of life lost?"`,
        display: true,
        image: null
    },
    {
        quote: '"Becoming old means my enemies had to fail... had to hide, had to return to the roots of cowardice.To face me is to lose, Tateism."',
        display: true,
        image: null
    },
    {
        quote: '"Imagine deer, antelope, allowed the adolescent males to break in all the females.Unproven sperm through the bloodline. The alpha dies. Shit."',
        display: true,
        image: null
    },
    {
        quote: '"No need for debate about Jesus, here at Christmas time. Find the ways that you are crucified.  Seek your enemies, and stop the torture. Tate"',
        display: true,
        image: null
    },
    {
        quote: '"The envious cowards of my generation have shown me many things. And they talk, talk. I have seen a lot, but I HAVE HEARD IT ALL!!  Silence!"',
        display: true,
        image: null
    },
    {
        quote: `"Today is a good day to evaluate your belief system. Looks like pure christianity is fading away, the priests' true perversions revealed.Damn"`,
        display: true,
        image: null
    },
    {
        quote: '"He who hesitates is lost I once hesitated to protect a system. The system is broken What to do now? Cowards,traitors,amateurs.Epic fail. Sad"',
        display: true,
        image: null
    },
    {
        quote: '"To achieve brilliance is a wonderful thing.To act brilliantly is rare.Take action and where you fit in on the brilliance scale?"',
        display: true,
        image: null
    },
    {
        quote: '"God only knows.  Should I go to Vegas (big chess tournament) or should I wait in fear for another year.  Dammit man....answer me.  Tweeters?"',
        display: true,
        image: null
    },
    {
        quote: '"The point is this.  Can you take the heat?  Fuking then shut up.. sit down.  take whatever comes.  Become a clone.Or choose individualism."',
        display: true,
        image: null
    },
    {
        quote: '"It is not just that I am better than you.  I am simply superior.  Proven. No question.  You wanna ask questions?  Ask my world-class boys."',
        display: true,
        image: null
    },
    {
        quote: '"When you no longer care about your family, the psycholgy breaks deep inside.From that point all love becomes a mathematical calculation. Bad"',
        display: true,
        image: null
    },
    {
        quote: '"Brock Lesnar had too much muscle to punch effectively.Bulk, not quick-twitch fiber. When this happens to a man he is called muscle-bound."',
        display: true,
        image: null
    },
    {
        quote: '"Personally I have spent much of my life staring-down muscle-bound bullies.  Somehow they know, deep inside, to touch a man like me is DEATH"',
        display: true,
        image: null
    },
    {
        quote: '"How is it that  Nov 12 election 4 prez dominates the news daily?Do these damn narcissists even believe that they will survive till Nov?News?"',
        display: true,
        image: null
    },
    {
        quote: '"they are teaching gay issues to 7-yr old kids. BY LAW.  A pure homosexual can not reproduce, so they need your children for new partners. OK"',
        display: true,
        image: null
    },
    {
        quote: '"Even as New Year approaches West Coast, I seek the correct feeling.  The "E" word.Not ecstasy per se, rather Equanimity.A core professional"',
        display: true,
        image: null
    },
    {
        quote: `"2hrs15 min till New Year's yet I am keenly aware that I've not made it yet.No time for mental laziness,enemies are so profuse."`,
        display: true,
        image: null
    },
    
]

console.log(chroniclesOfEmoryTate2011.length)

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

// gltfLoader.load(
//     "./chess-board.glb",
//     (gltf) => {
//         let chessBoard = gltf.scene
//         console.log(gltf)

//         gui.add(chessBoard.position, "x", -15, 15, 0.1).name("chessBoardX")
//         gui.add(chessBoard.position, "y", -15, 15, 0.1).name("chessBoardY")
//         gui.add(chessBoard.position, "z", -15, 15, 0.1).name("chessBoardZ")
        
//         scene.add(chessBoard)
//     }
// )


for (let i = 0; i < letterGenerationVariable; i++) {
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

            if (chessPieces[randomIndex] == "rook") {
                letter.scale.x = .16
                letter.scale.y = .16
                letter.scale.z = .16
            }

            // letterRandomPositionX variable will project the cubes to fit the screen based on viewport on X axis (adjust as needed)
            // let letterRandomPositionX = window.innerHeight / window.innerWidth < 0.45 ? 15 : 10 // adjust as needed
            let letterRandomPositionX = null

            if (window.innerHeight / window.innerWidth < 0.45) { // ultrawide viewport
                letterRandomPositionX = 15
            } else if (window.innerHeight / window.innerWidth > 0.9) { // mobile viewport
                letterRandomPositionX = 2
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

            if (i = letterGenerationVariable) {
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
ambientLight.intensity = 0

gui.add(ambientLight, "intensity", 0, 10, 0.1).name("ambientLightIntensity")
gui.addColor(ambientLight, "color").name("ambientLightColor")

scene.add(ambientLight)

// Point Light (assigned to mouse position)
const pointLight = new THREE.PointLight("#FFF7DD", 0) // regular 50
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
let popupOpened = false

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
        intersects.length > 0 && !popupOpened && sectionsEnabled ? document.body.style.cursor = 'pointer' : document.body.style.cursor = 'auto'

    } else {
        pointLight.position.x = 0
        pointLight.position.y = 0

        // Update the raycaster's origin and direction
        raycaster.setFromCamera(mouse, camera);

        // Check for intersections
        intersects = raycaster.intersectObjects(scene.children);

        // intersect detected
        intersects.length > 0 && sectionsEnabled ? console.log("intersect detected") : null
    }
})

// Handle mouse click events
let chroniclePopUp = document.querySelector(".chronicle")
let chronicleTextContent = document.querySelector(".chronicle-text-content")
let chronicleImageContent = document.querySelector(".chronicle-image-content")
let sections = document.querySelector(".sections")

document.addEventListener('click', () => {
    // Check for intersections
    let intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0 && isTouchScreen == false && popupOpened == false && sectionsEnabled) {
        popupOpened = true

        let chronicleIteration = intersects[0].object.chronicleNumber !== undefined ? intersects[0].object.chronicleNumber : intersects[0].object.parent.chronicleNumber

        chroniclePopUp.style.display = 'flex'
        chroniclePopUp.style.opacity = '1'
        sections.style.opacity = 0
        chronicleTextContent.textContent = `${chroniclesOfEmoryTate2011[chronicleIteration].quote}`

        let chronicleImage = chroniclesOfEmoryTate2011[chronicleIteration].image == null ? images[Math.floor(Math.random() * 7)] : chroniclesOfEmoryTate2011[chronicleIteration].image

        chronicleImageContent.src = `${chronicleImage}`
        // chroniclePopUp.classList.remove("show")

        // log the object that was clicked
        console.log('Object clicked:', chronicleIteration);

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

        requestAnimationFrame(animate)
    } 

}, false);

document.querySelector(".close-chronicle-btn").addEventListener('click', () => {   
    popupOpened = false

    chroniclePopUp.style.display = 'none'
    chroniclePopUp.style.opacity = "0"
    sections.style.opacity = 1
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

    if (intersects.length > 0 && popupOpened == false && sectionsEnabled) {
        // log the object that was clicked
        console.log('Object touched on mobile:', intersects[0].object);
        popupOpened = true

        let chronicleIteration = intersects[0].object.chronicleNumber !== undefined ? intersects[0].object.chronicleNumber : intersects[0].object.parent.chronicleNumber

        chroniclePopUp.style.display = 'flex'
        chroniclePopUp.style.opacity = '1'
        sections.style.opacity = 0
        chronicleTextContent.textContent = `${chroniclesOfEmoryTate2011[chronicleIteration].quote}`

        let chronicleImage = chroniclesOfEmoryTate2011[chronicleIteration].image == null ? images[Math.floor(Math.random() * 7)] : chroniclesOfEmoryTate2011[chronicleIteration].image

        chronicleImageContent.src = `${chronicleImage}`
        // chroniclePopUp.classList.remove("show")

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
            letterRandomPositionX = 2
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

                letter.children[0].chronicleNumber = nthItemEnd - 1
                console.log(letter.children[0].chronicleNumber)
                console.log(`Displaying chronicles ${nthItemStart} to ${nthItemEnd}`)
    
            } else if (letter.position.y < -4.05) {
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