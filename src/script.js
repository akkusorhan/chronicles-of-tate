import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from "lil-gui"

/**
 * Creating Home Page
 */
// home page
let homePageEnabled = true
let homePage = document.querySelector(".home-page")
let launchExperienceButton = document.querySelector(".launch-experience-btn")

let quotePreloaderEnabled = true
let quotePreloader = document.querySelector(".quote-preloader")

let sectionsEnabled = false
let chhronicleSections = document.querySelector(".sections")

let chroniclesOfTateSoundtrack = new Audio("./chronicles-of-tate-soundtrack.mp3")

let header = document.querySelector(".header")

let skipButton = document.querySelector(".skip-btn")

let skipButtonClicked = false
skipButton.addEventListener("click", () => {
    skipButtonClicked = true

    quotePreloader.style.opacity = 0

    chroniclesOfTateSoundtrack.currentTime = 41
    
    scene.remove(chessBoardObject[0])
    console.log("chessboard removed")

    renderer.outputEncoding = THREE.LinearEncoding
    renderer.gammaOutput = true
    
    setTimeout(() => {
        camera.position.x = 0
        pointLight.position.x = 0
        pointLight.position.z = 5 // 3.5
        pointLight.intensity = 0


        homePage.style.display = "none"
        quotePreloader.style.display = "none"

        sections.style.opacity = 1
        header.style.opacity = 1
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

        animateLightIntensity(ambientLight, 0.3, 2500)
        animateLightIntensity(pointLight, 300, 2500) //75 4500
        // ambientLight.intensity = 0.3
        // pointLight.intensity = 75
    }, 2500);
})

window.scrollTo({
    top: 0, 
    behavior: "smooth"
})

setTimeout(() => {
    document.body.style.overflow = "hidden"
}, 1000);

launchExperienceButton.addEventListener("click", () => {
    homePageEnabled = false
    homePage.style.opacity = 0
    chroniclesOfTateSoundtrack.play()

    // chessBoardObject[0].position.x = -2

    // Function to animate the object

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

    setTimeout(() => {
        quotePreloaderEnabled = true
        quotePreloader.style.opacity = 1
        launchExperienceButton.style.display = "none"
        document.body.style.backgroundColor = "#000000"

        setTimeout(() => {document.querySelector("#one").style.opacity = 1}, 1700); //500 2250
        setTimeout(() => {document.querySelector("#two").style.opacity = 1}, 2200); //1500
        setTimeout(() => {document.querySelector("#three").style.opacity = 1}, 4300); //3000
        setTimeout(() => {document.querySelector("#four").style.opacity = 1}, 6700); //5000
        setTimeout(() => {document.querySelector("#five").style.opacity = 1}, 9200); //7500
        setTimeout(() => {document.querySelector("#six").style.opacity = 1}, 11250); //8500
        setTimeout(() => {document.querySelector("#seven").style.opacity = 1}, 13250); //10000
        setTimeout(() => {document.querySelector("#eight").style.opacity = 1}, 16750); //12500
        setTimeout(() => {document.querySelector("#nine").style.opacity = 1}, 18750); //15000
        setTimeout(() => {document.querySelector("#ten").style.opacity = 1}, 20750); //17500
        setTimeout(() => {document.querySelector("#eleven").style.opacity = 1}, 24000); //21000
        setTimeout(() => {document.querySelector("#twelve").style.opacity = 1}, 26000); //25000
        setTimeout(() => {document.querySelector("#thirteen").style.opacity = 1}, 28000); //27000
        setTimeout(() => {document.querySelector("#fourteen").style.opacity = 1}, 30050); //29000
        setTimeout(() => {document.querySelector("#fifteen").style.opacity = 1}, 33000); //33000
    },  2500); //2500

    // paste here
    setTimeout(() => {
        if (skipButtonClicked) {

        } else if (homePageEnabled == false && skipButtonClicked == false) {
            scene.remove(chessBoardObject[0])
            console.log("chessboard removed")

            quotePreloaderEnabled = false
            quotePreloader.style.opacity = 0

            camera.position.x = 0
            pointLight.position.x = 0
            pointLight.position.z = 5 // 3.5
            pointLight.intensity = 0

            renderer.outputEncoding = THREE.LinearEncoding
            renderer.gammaOutput = true

            setTimeout(() => {
                homePage.style.display = "none"
                quotePreloader.style.display = "none"

                sections.style.opacity = 1
                header.style.opacity = 1
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
                animateLightIntensity(pointLight, 300, 2500) //75 2500
                // ambientLight.intensity = 0.3
                // pointLight.intensity = 75

                // document.body.style.backgroundColor = "#070707"
            }, 3500);
        }
    }, 40500); //40500
})

//mute button
const muteButton = document.querySelector(".mute-btn")
const mobileMuteButton = document.querySelector("#mute-btn-mobile")

muteButton.addEventListener("click", () => {
    muteButton.textContent == "mute" ? muteButton.textContent = "unmute" : muteButton.textContent = "mute"

    muteButton.textContent == "unmute" ? chroniclesOfTateSoundtrack.pause() : chroniclesOfTateSoundtrack.play()
})

mobileMuteButton.addEventListener("touchstart", () => {
    mobileMuteButton.src.includes("unmute") ? mobileMuteButton.src = "./mute-icon.png" : mobileMuteButton.src = "./unmute-icon.png"

    mobileMuteButton.src.includes("mute") ? chroniclesOfTateSoundtrack.pause() : null
    mobileMuteButton.src.includes("unmute") ? chroniclesOfTateSoundtrack.play() : null
})



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
    for (var i = 0; i < imageArray.length; i++) {
        var img = new Image();
        img.src = imageArray[i];
    }
}

preloadImages(images);
console.log(images.length)

const chroniclesOfEmoryTate2011 = [
    {
        quote: '"Cowards die a thousand deaths, a brave man only one.  Stand against mediocrity.  <span class="red-text">Fight brainwashing</span>."',
        display: true,
        date: `Oct. 19, 2011`,
        image: null
    },
    {
        quote: '"Andrew is now the Cobra, but he was born a Tiger.  Such a combination will never be beat!!!  <span class="red-text">Go team Cobra</span>"',
        display: true,
        date: `Nov 12, 2011`,
        image: "/images/emory-tate-with-mom.png"
    },
    {
        quote: '"Only adverts and sports replay on the orange channel link.  Are the lower fights not being shown?  Will they cut in for ANdrew?"',
        display: true,
        date: `Nov 12, 2011`,
        image: null
    },
    {
        quote: '"The orange TV link is a bust so far."',
        display: true,
        date: `Nov 12, 2011`,
        image: null
    },
    {
        quote: '".<span class="red-text">Fighting  demands guts</span>.  Cobra fought, to win, for the contract.  Even a loss on his record was not worth his integrity as a superstar"',
        display: true,
        date: `Nov 12, 2011`,
        image: null
    },
    {
        quote: '"And so we find time marches on.  Miracles happen  I am happy and I am sad that my son fought so hard.  All 7 rounds What a tough guy. <span class="red-text">Always</span>"',
        display: true,
        date: `Nov 14, 2011`,
        image: null
    },
    {
        quote: '"Tristan is unleashed upon the world.... Love him or hate him.  <span class="red-text">he probly dont care</span>."',
        display: true,
        date: `Nov 15, 2011`,
        image: null
    },
    {
        quote: '"Jason Bourne is the man.Yet he is fiction,one step above a cartoon.Want your ass kicked? Break my security space then?Move toward the light!"',
        display: true,
        date: `Dec 3, 2011`,
        image: null
    },
    {
        quote: '"Jason Bourne really is the man... the lonely hero.  F$$K with him and you are ffkkkkin with the man.  Too bad it is fiction.  Tate"',
        display: true,
        date: `Dec 5, 2011`,
        image: null
    },
    {
        quote: '"Music does soothe the savage beast.  I listened to a harp and felt calm.  Now back to reality as I must go prowl among the sheep AGAIN!"',
        display: true,
        date: `Dec 6, 2011`,
        image: null
    },
    {
        quote: '"Joining a group protest is not for my Tate personality.  I take it straight to the source of corruption.  And I stay alive!  <span class="red-text">Walk the walk</span>."',
        display: true,
        date: `Dec 6, 2011`,
        image: null
    },
    {
        quote: '"The word homophobic needs to be rethought.  Nobody is afraid, actually.  The real word is homo-intolerant.  <span class="red-text">I refuse to be called afraid<span>."',
        display: true,
        date: `Dec 7, 2011`,
        image: null
    },
    {
        quote: '"Every wants to be a tough guy.Which of you have tasted your own blood.  When I was three,busted head.I <span class="red-text">DRANK</span> my blood.Daddy panicked. <span class="red-text">not me</span>"',
        display: true,
        date: `Dec 8, 2011`,
        image: null
    },
    {
        quote: '"How has it become that I no longer can tell male thought from female thought.  Yes, I cry... <span class="red-text">but that does not mean I think like a woman</span>."',
        display: true,
        date: `Dec 8, 2011`,
        image: null
    },
    {
        quote: '"It really is getting so much harder to identify a credible enemy anymore.  <span class="red-text">Could it be that all these people killed were not hostile at all?</span>"',
        display: true,
        date: `Dec 11, 2011`,
        image: null
    },
    {
        quote: `"I appears to me that if I concentrate on happy ideas, no one can make me sad.  After all, I am the best that I've ever seen!! <span class="red-text">So are you</span>."`,
        display: true,
        date: `Dec 11, 2011`,
        image: null
    },
    {
        quote: '"These people who know me, know by now they shoulda put me in charge.  I have never seen such a consistent record of failure in my life.  <span class="red-text">Sad</span>"',
        display: true,
        date: `Dec 11, 2011`,
        image: null
    },
    {
        quote: '"OCCUPY Twitter!!!  How u like me now, mo fo?"',
        display: true,
        date: `Dec 11, 2011`,
        image: null
    },
    {
        quote: `"Vodka and guava juice at 3am, alone in a hotel room.negro gotta have a screw loose. I say "tighten up".don't lighten up, tighten up.  buzzed"`,
        display: true,
        date: `Dec 11, 2011`,
        image: null
    },
    {
        quote: '"It does get a bit tricky when the only two bad ass men who could kick my ass happen to be my two sons.<span class="red-text">Everybody else better watch the fk out</span>"',
        display: true,
        date: `Dec 11, 2011`,
        image: null
    },
    {
        quote: '"Without a baseline for truth, we (humans) are like savage apes, doing dirt in the dark, and smiling by day. <span class="red-text">Animals</span>.Still, noone is perfect."',
        display: true,
        date: `Dec 12, 2011`,
        image: null
    },
    {
        quote: '"I took a trip to Anhedonia! Do you know what I mean,I mean this place is hard to describe. Google maps places it between ennui and dejection"',
        display: true,
        date: `Dec 12, 2011`,
        image: null
    },
    {
        quote: '"Does being imprisoned in America mean free health care?Seems like a good trade-off.Go on a crime-spree then get meds in jail. Some sex too?!"',
        display: true,
        date: `Dec 12, 2011`,
        image: null
    },
    {
        quote: '"Chess is somewhat underrated.  A cerebral exercise, for certain,yet the war strategy aspect is often overlooked.  <span class="red-text">War is everywhere</span>. Believe"',
        display: true,
        date: `Dec 12, 2011`,
        image: null
    },
    {
        quote: '"Caught between the longing for love and the struggle for the legal tender (The Pretender) song"',
        display: true,
        date: `Dec 12, 2011`,
        image: null
    },
    {
        quote: '"There is no Kyoto protocol.There is no way to control pollution.I see human pollution.Cant control it. <span class="red-text">these people think that they matter?</span>"',
        display: true,
        date: `Dec 12, 2011`,
        image: null
    },
    {
        quote: '"I am honored to be (humble servant of the future) yet I am myself.  I am honored to be to your. dad.  no kidding.  <span class="red-text">Who could want more?</span>"',
        display: true,
        date: `Dec 12, 2011`,
        image: null
    },
    {
        quote: `"I've been a bit remiss by not flexing my vernacular. Now is time to <span class="red-text">hearken to the brazeness of modern men, hiding their true craven nature</span>"`,
        display: true,
        date: `Dec 13, 2011`,
        image: null
    },
    {
        quote: `"Anhedonia is a little-known place, far beyond equanimity. Tate
        A strange place to visit, but I don't wann live there.  <span class="red-text">Gotta find a new drug</span>"`,
        display: true,
        date: `Dec 13, 2011`,
        image: null
    },
    {
        quote: '"Inaction is, of itself, <span class="red-text">an action</span>.  Sun Xu.  <span class="red-text">Idiots run the world and they are cowards too</span>.  Tate.  Dont fuk with me. Tateism"',
        display: true,
        date: `Dec 13, 2011`,
        image: null
    },
    {
        quote: '"I knew this woul happen.no kidding, <span class="red-text">my actions forstall the inevitable but, in the end futile</span>.Think how many tweeters dont know futilility"',
        display: true,
        date: `Dec 13, 2011`,
        image: null
    },
    {
        quote: '"Liege Belgium in the news (wrong reasons).The train to Maastricht Nederland is quite cheap. Eurolines bus from London is adequate.Back door"',
        display: true,
        date: `Dec 14, 2011`,
        image: null
    },
    {
        quote: '"Everybody wants to be a tuf guy, but so few pay the price to get there.  These pretend clones in public make me uneasy.  <span class="red-text">I abhor cowards.</span>"',
        display: true,
        date: `Dec 15, 2011`,
        image: null
    },
    {
        quote: `"The problem with cowards is that they can get you killed when <span class="red-text">THEY</span> panic!
        You might have to deal with the primary threat and <span class="red-text">K O the coward</span>"`,
        display: true,
        date: `Dec 15, 2011`,
        image: null
    },
    {
        quote: '"The only way to explain the technical failure, moral and ethical failure and disregard for the truth??  <span class="red-text">Realize it was deliberate,  They win</span>"',
        display: true,
        date: `Dec 15, 2011`,
        image: null
    },
    {
        quote: '"Whereas it seems impossible for one man to be smarter that all the rest put together, <span class="red-text">One man can be right while everyone else is wrong. I</span>"',
        display: true,
        date: `Dec 15, 2011`,
        image: null
    },
    {
        quote: `"All the inaction and failure I witnessed made angry, I asked my mom why wouldn't people do something.  <span class="red-text">You cain't do what you cain't think!</span>"`,
        display: true,
        date: `Dec 16, 2011`,
        image: null
    },
    {
        quote: '"Jealousy drives envy till they imitate, unable to emulate.  After practice, delusion follows and they try to erase the original.  <span class="red-text">Parasites</span>"',
        display: true,
        date: `Dec 16, 2011`,
        image: null
    },
    {
        quote: '"It appears to me that wisdom is replaced by knowledge. This fact undermines the elder statesman, and threatens all society.  <span class="red-text">Amateurs</span>."',
        display: true,
        date: `Dec 21, 2011`,
        image: null
    },
    {
        quote: '"These fukkers on the train behind me started loud chat about computer stuff, incomprehensible!Can they be polite? <span class="red-text">can they stop my fist?</span>fail"',
        display: true,
        date: `Dec 21, 2011`,
        image: null
    },
    {
        quote: `"Old people are somehow "funny" All dead mf's who died young must be absolutely hilarious. (group laughter) <span class="red-text">Is the very meaning of life lost?</span>"`,
        display: true,
        date: `Dec 21, 2011`,
        image: null
    },
    {
        quote: '"Becoming old means my enemies had to fail... had to hide, had to return to the roots of cowardice.<span class="red-text">To face me is to lose</span>, Tateism."',
        display: true,
        date: `Dec 21, 2011`,
        image: null
    },
    {
        quote: '"Imagine deer, antelope, allowed the adolescent males to break in all the females.Unproven sperm through the bloodline. <span class="red-text">The alpha dies</span>. Shit."',
        display: true,
        date: `Dec 21, 2011`,
        image: null
    },
    {
        quote: '"No need for debate about Jesus, here at Christmas time. Find the ways that you are crucified.  <span class="red-text">Seek your enemies, and stop the torture</span>. Tate"',
        display: true,
        date: `Dec 23, 2011`,
        image: null
    },
    {
        quote: '"The envious cowards of my generation have shown me many things. And they talk, talk. I have seen a lot, but I HAVE HEARD IT ALL!!  <span class="red-text">Silence!</span>"',
        display: true,
        date: `Dec 24, 2011`,
        image: null
    },
    {
        quote: `"Today is a good day to evaluate your belief system. Looks like pure christianity is fading away, the priests' true perversions revealed.<span class="red-text">Damn</span>"`,
        display: true,
        date: `Dec 25, 2011`,
        image: null
    },
    {
        quote: '"He who hesitates is lost I once hesitated to protect a system. <span class="red-text">The system is broken</span> What to do now? Cowards,traitors,amateurs.Epic fail. Sad"',
        display: true,
        date: `Dec 25, 2011`,
        image: null
    },
    {
        quote: '"To achieve brilliance is a wonderful thing.<span class="red-text">To act brilliantly is rare</span>.Take action and where you fit in on the brilliance scale?"',
        display: true,
        date: `Dec 26, 2011`,
        image: null
    },
    {
        quote: '"God only knows.  Should I go to Vegas (big chess tournament) or should I wait in fear for another year.  Dammit man....answer me.  Tweeters?"',
        display: true,
        date: `Dec 26, 2011`,
        image: null
    },
    {
        quote: '"The point is this.  Can you take the heat?  Fuking then shut up.. sit down.  take whatever comes.  Become a clone.<span class="red-text">Or choose individualism.</span>"',
        display: true,
        date: `Dec 26, 2011`,
        image: null
    },
    {
        quote: '"It is not just that I am better than you.  <span class="red-text">I am simply superior</span>.  Proven. No question.  You wanna ask questions?  <span class="red-text">Ask my world-class boys</span>."',
        display: true,
        date: `Dec 30, 2011`,
        image: null
    },
    {
        quote: '"When you no longer care about your family, the psycholgy breaks deep inside.From that point all love becomes a mathematical calculation. <span class="red-text">Bad</span>"',
        display: true,
        date: `Dec 31, 2011`,
        image: null
    },
    {
        quote: '"Brock Lesnar had too much muscle to punch effectively.Bulk, not quick-twitch fiber. When this happens to a man he is called muscle-bound."',
        display: true,
        date: `Dec 31, 2011`,
        image: null
    },
    {
        quote: '"Personally I have spent much of my life staring-down muscle-bound bullies.  Somehow they know, deep inside, to touch a man like me is <span class="red-text">DEATH</span>"',
        display: true,
        date: `Dec 31, 2011`,
        image: null
    },
    {
        quote: '"How is it that  Nov 12 election 4 prez dominates the news daily?Do these damn narcissists even believe that they will survive till Nov?News?"',
        display: true,
        date: `Dec 31, 2011`,
        image: null
    },
    {
        quote: '"they are teaching gay issues to 7-yr old kids. <span class="red-text">BY LAW</span>.  A pure homosexual can not reproduce, <span class="red-text">so they need your children for new partners</span>. OK"',
        display: true,
        date: `Dec 31, 2011`,
        image: null
    },
    {
        quote: '"Even as New Year approaches West Coast, I seek the correct feeling.  The "E" word.Not ecstasy per se, rather Equanimity.<span class="red-text">A core professional</span>"',
        display: true,
        date: `Dec 31, 2011`,
        image: null
    },
    {
        quote: `"2hrs15 min till New Year's yet I am keenly aware that I've not made it yet.No time for mental laziness,<span class="red-text">enemies are so profuse</span>."`,
        display: true,
        date: `9:45pm Dec 31, 2011`,
        image: null
    },
    {
        quote: `"He who hesitates is lost I once hesitated to protect a system. <span class="red-text">The system is broken</span> What to do now? Cowards,traitors,amateurs.Epic fail.Sad"`,
        display: true,
        date: `Jan 1, 2012`,
        image: null
    },
    {
        quote: `"Old people are somehow "funny" All dead mf's who died young must be absolutely hilarious.(group laughter) <span class="red-text">Is the very meaning of life lost?</span>"`,
        display: true,
        date: `Jan 1, 2012`,
        image: null
    },
    {
        quote: `"An old man told me(I was 20 yrs) Never scare a coward.I told him"I aint scary".YES YOU ARE <span class="red-text">Now a generation of cowards are afraid of me</span>.OOPS"`,
        display: true,
        date: `Jan 1, 2012`,
        image: null
    },
    {
        quote: `"I watch the most capable athletes in the world,but feel no envy.When it was my turn(as a man) I conquered. <span class="red-text">Find achievement and be capable.</span>"`,
        display: true,
        date: `Jan 2, 2012`,
        image: null
    },
    {
        quote: `"It appears to me that many Chinese live without that common feeling of human <span class="red-text">ENVY</span>. They seem to be so driven.They are just being themselves."`,
        display: true,
        date: `Jan 8, 2012`,
        image: null
    },
    {
        quote: `"A highly-educated (formal education) PHD quips (to me) maybe I could have been you and you could have been the phd.He doesn't get it.No tks."`,
        display: true,
        date: `Jan 8, 2012`,
        image: null
    },
    {
        quote: `"WORDGAME.  BRIGADOON.Why would groups of morons assume that I seek and live in brigadoon. Are they not the ones divorced from reality? <span class="red-text">Hell</span>"`,
        display: true,
        date: `Jan 8, 2012`,
        image: null
    },
    {
        quote: `"Their children struggle with the chasm between the real and the farcical.  <span class="red-text">Psychologies break</span> and harsh drugs try to "fix" the problem. Hell"`,
        display: true,
        date: `Jan 8, 2012`,
        image: null
    },
    {
        quote: `"AND SO,young man with big hair smiles a death-smile,athletic. White dude flips me the middle finger.I'm in my 50's.Can you believe it?<span class="red-text">weak</span>."`,
        display: true,
        date: `Jan 9, 2012`,
        image: null
    },
    {
        quote: `"BIG AD CAMPAIGN ! To protect you from MAYHEM, like ALLSTATE.  Is that not a dangling modifier?  What?  Allstate become the mayhem.  <span class="red-text">Idiots</span>."`,
        display: true,
        date: `Jan 9, 2012`,
        image: null
    },
    {
        quote: `"We must protect you from terror like the American government. Must be, "We can protect you like the govt DOES.  <span class="red-text">Perhaps the semantics fail</span>."`,
        display: true,
        date: `Jan 9, 2012`,
        image: null
    },
    {
        quote: `"With children like mine, Janine Tristan and Andrew, it is easy to be proud. Then I remember that I am the Man.  Not narcissistic.  <span class="red-text">Fact</span>."`,
        display: true,
        date: `Jan 13, 2012`,
        image: null
    },
    {
        quote: `"I must admit, the clowns who perpetrate their "games" on free society are no longer funny."funny?" .<span class="red-text">Not out here on the sharp end</span>.  Shut up"`,
        display: true,
        date: `Jan 13, 2012`,
        image: null
    },
    {
        quote: `"Physical force is underrated,S.Do something more effective than "walking off" and pretending.He must learn his place in life"`,
        display: true,
        date: `Jan 15, 2012`,
        image: null
    },
    {
        quote: `"Confusing knowledge with wisdom is a dangerous trend. Life may seem like a game,but in fact is deadly serious. <span class="red-text">Wisdom breeds action</span>, Tateism"`,
        display: true,
        date: `Jan 16, 2012`,
        image: null
    },
    {
        quote: `"He who shuns the dust of the arena, shall not sit in the shade of the olive tree.  Fight! or <span class="red-text">live in the shadow of one's own cowardice</span>. Fail"`,
        display: true,
        date: `Jan 16, 2012`,
        image: null
    },
    {
        quote: `"Caught between the longing for love and the struggle for the legal tender.
        Was this a doub entendre all along?  "The Pretender" Classic song"`,
        display: true,
        date: `Jan 16, 2012`,
        image: null
    },
    {
        quote: `"I now think of our men at war and we veterans and wonder.  <span class="red-text">Did we sacrifice to protect a greedy super-elite?</span> That would be a life-changer."`,
        display: true,
        date: `Jan 20, 2012`,
        image: null
    },
    {
        quote: `"Again I worry, if gays can not have children,all they need is <span class="red-text">YOUR</span> children to continue their sex lives.<span class="red-text">How could this logic be flawed?</span> Tate"`,
        display: true,
        date: `Jan 22, 2012`,
        image: null
    },
    {
        quote: `"Turning a "blind eye" does not make you cool. A non-reaction isnt "smooth"  <span class="red-text">It makes you weak,unaware and a walking target for hostile acts</span>"`,
        display: true,
        date: `Jan 23, 2012`,
        image: null
    },
    {
        quote: `"When you are sharing important matters with a friend,and they make inane jokes while you try to share.They are your enemy. <span class="red-text">Poisoning the air</span>"`,
        display: true,
        date: `Jan 25, 2012`,
        image: null
    },
    {
        quote: `"These politicians are funny.Curiously so. We must stop selling our factories and jobs <span class="red-text">NOW</span>. Bring back our stuff.Stop bleeding, then fix it."`,
        display: true,
        date: `Jan 25, 2012`,
        image: null
    },
    {
        quote: `"Never slowin down and I shoulda started runnin' <span class="red-text">a long time ago....</span>"`,
        display: true,
        date: `Jan 25, 2012`,
        image: null
    },
    {
        quote: `"The first human reaction to FEAR, is <span class="red-text">SILENCE</span>. Learned helplessness. Difficult to induce, Impossible to maintain. Tateism. I TWITTER. chirp?"`,
        display: true,
        date: `Feb 7, 2012`,
        image: null
    },
    {
        quote: `"How is it nobody ever talks about the future act of having a family.  Sure the world is rough, but somebody brought YOU here.  <span class="red-text">Sell Fish!!</span>"`,
        display: true,
        date: `Feb 13, 2012`,
        image: null
    },
    {
        quote: `"I visited Anhedonia! Can you find its location?? Google maps places it midway between Ennui and Dejection.
        WTF you say!? Speak English pls"`,
        display: true,
        date: `Feb 13, 2012`,
        image: null
    },
    {
        quote: `"Rape in the military terrible. But when a fem soldier foreplays on some dude's face and leaves a dude with blue-balls, <span class="red-text">did she rape him?</span> yes"`,
        display: true,
        date: `Feb 14, 2012`,
        image: null
    },
    {
        quote: `"When your name is Tristan Tate, the people love to hate. They can't duplicate, nor even emulate. It's sad to imitate. <span class="red-text">Silence all debate</span>."`,
        display: true,
        date: `Feb 27, 2012`,
        image: null
    },
    {
        quote: `"Tristan is champ in the ring 
        On Shipwrecked he was Fire King
        He has a REAL skill
        You'll not break his will
        A kick and the bell will go DING"`,
        display: true,
        date: `Feb 27, 2012`,
        image: null
    },
    {
        quote: `"If one thing I have learned, cowards hunt in packs.  Some cowards join gangs or even, , police forces or secret centers of power.  <span class="red-text">Beware</span>."`,
        display: true,
        date: `Mar 4, 2012`,
        image: null
    },
    {
        quote: `"Some moron recommends that I "pay attention". For each thing you see there is something else you miss.  I should have told him <span class="red-text">STFU</span>. #Child"`,
        display: true,
        date: `Mar 5, 2012`,
        image: null
    },
    {
        quote: `"Lonely housewife tells handsome handyman to paint indoor walls as well as outside.  After that it was inner and outer, inner and outer."`,
        display: true,
        date: `Mar 6, 2012`,
        image: null
    },
    {
        quote: `"Anhedonia. A place without pleasure, beyond the grasp of pain.Only real events catch the attention.Vision is black + white.  
        <span class="red-text">No cure needed</span>"`,
        display: true,
        date: `Mar 7, 2012`,
        image: null
    },
    {
        quote: `"The Tate problem, conundrum (if you will) is not whether they accept me in their world.  Question is; <span class="red-text">Do I allow them entrance into MINE</span>."`,
        display: true,
        date: `Mar 7, 2012`,
        image: null
    },
    {
        quote: `"One must admit that the racial hatreds have gone "underground".  They don't shout NIGGER anymore, <span class="red-text">they just quietly discriminate and ignore</span>."`,
        display: true,
        date: `Mar 9, 2012`,
        image: null
    },
    {
        quote: `"The ability to read minds develops after many decades. Still, it is becoming useless now as empty-headed "cool" people are tuned out. #lost"`,
        display: true,
        date: `Mar 9, 2012`,
        image: null
    },
    {
        quote: `"My mind-reading skills are rendered neutral, as the streets fill with empty-headed youth, no goals, and very little self-respect. #PIERCEME"`,
        display: true,
        date: `Mar 11, 2012`,
        image: null
    },
    {
        quote: `"Living in a state of paranoia and looking is dangerous to one's physical and mental health and also results in poor security. 
        <span class="red-text">Rodent-like</span>."`,
        display: true,
        date: `Mar 15, 2012`,
        image: null
    },
    {
        quote: `"Many animals are immune to their own poison. The toxic HUMAN realizes that his  toxin kills even himself, <span class="red-text">toxifies his kids, all</span>. #epicfail"`,
        display: true,
        date: `Mar 20, 2012`,
        image: null
    },
    {
        quote: `"Conformity is the touchstone of failed genius.  Show conformist, <span class="red-text">I will show you average</span>. BTW tattoo and piercing is another way to conform."`,
        display: true,
        date: `Mar 20, 2012`,
        image: null
    },
    {
        quote: `"Problem with small-minded people is that one can always tell what they are thinking. <span class="red-text">It is rarely even original, good, or safe</span>. #idiotbuddy"`,
        display: true,
        date: `Mar 21, 2012`,
        image: null
    },
    {
        quote: `"I allow manipulation to find out where my enemy wants me to go. Then I <span class="red-text">use my mind to break the trap and punish the perpetrators</span>. #alwayswin"`,
        display: true,
        date: `Mar 21, 2012`,
        image: null
    },
    {
        quote: `"No big fan of group causes I admit that killing a young black man in cold blood has me angry.  <span class="red-text">These mo fo's would kill us all</span>, if they cud"`,
        display: true,
        date: `Mar 25, 2012`,
        image: null
    },
    {
        quote: `"Few people know the terror of being hunted down by armed assassins. Fewer survive. Ask me. TRAYVON's last scream of "HELP" <span class="red-text">chills my soul</span>."`,
        display: true,
        date: `Mar 25, 2012`,
        image: null
    },
    {
        quote: `"The soft underbelly of the "New World Order" is exposed-"CONNECTED" people steal all wealth. Idiots march in lockstep. <span class="red-text">Mimic then DIE</span>#zombie"`,
        display: true,
        date: `Mar 26, 2012`,
        image: null
    },
    {
        quote: `"Action remains when we run out of excuses.Contentment is left when we exhaust our lust. Ashes remain from fire, <span class="red-text">we all return to the dust</span>."`,
        display: true,
        date: `Mar 27, 2012`,
        image: null
    },
    {
        quote: `"Now the new form of evil scientist has fucked up the behavioural matrix.Parent to child, woman toward man, <span class="red-text">weak man vs alpha male</span>. #epicfail"`,
        display: true,
        date: `Mar 28, 2012`,
        image: null
    },
    {
        quote: `"What's the difference between seeing and comprehending?'tween moving, and taking action.'tween focus and distraction, <span class="red-text">love and satisfaction?</span>"`,
        display: true,
        date: `Mar 28, 2012`,
        image: null
    },
    {
        quote: `"difference between seeing and comprehending?' moving, and taking action.'tween focus and distraction, love and satisfaction?
        @Elena_Petreska"`,
        display: true,
        date: `Mar 28, 2012`,
        image: null
    },
    {
        quote: `"The former taste of love, of feelings shared, of feeling lost, A faded memory now, <span class="red-text">our passion cold beneath the frost</span>.  #exlover"`,
        display: true,
        date: `Mar 29, 2012`,
        image: null
    },
    {
        quote: `"The truth is underestimated, often is manipulated, oft-times unanticipated,rarely unappreciated,never to be mitigated,<span class="red-text">often to be celebrated</span>"`,
        display: true,
        date: `Mar 29, 2012`,
        image: null
    },
    {
        quote: `"Enemies of Alpha males are weak.<span class="red-text">They hunt in packs</span>.They invent motives to harm. Mostly, they pretend to be the alpha's friends, <span class="red-text">to get close</span>"`,
        display: true,
        date: `Mar 30, 2012`,
        image: null
    },
    {
        quote: `"Honestly. There is a problem with the hoodie. Just like the burkha or the assassin's balaclava. It is not a racial thing, <span class="red-text">it is a disguise</span>."`,
        display: true,
        date: `Mar 30, 2012`,
        image: null
    },
    {
        quote: `"Intelligence wins against cunning! Not that some fk can't bash your head with a rock  Even if it kills you he can't say <span class="red-text">"I am smarter!"</span>#fail"`,
        display: true,
        date: `Apr 11, 2012`,
        image: null
    },
    {
        quote: `"Can cowards tell you to "have courage" Can athiests say "God help me" Can narcissists say "I love you" <span class="red-text">Can dictators say "Freedom"</span> #puzzling"`,
        display: true,
        date: `Apr 12, 2012`,
        image: null
    },
    {
        quote: `"Zimmerman has had enough time to detox from the crystal meth and alcohol from the night of the shooting. A fresh haircut kills the hair test"`,
        display: true,
        date: `Apr 12, 2012`,
        image: null
    },
    {
        quote: `"Get the fk out of Afghanistan.  This is a  killing ground, and is built for the task.If the bad guy dont getchya you still die.
        #commonsense"`,
        display: true,
        date: `Apr 17, 2012`,
        image: null
    },
    {
        quote: `"The real question about legal drugs and prostitution is this.  Will those in power ever take the bootheel off the little man's neck. #prison"`,
        display: true,
        date: `Apr 17, 2012`,
        image: null
    },
    {
        quote: `"Being real means NOT being a reflection of pop culture.  <span class="red-text">How can you be an individual when your very thoughts are cloned</span>. Be urself. #fake"`,
        display: true,
        date: `Apr 19, 2012`,
        image: null
    },
    {
        quote: `"Game? The Russians are playing Chess, the Americans - checkers/drafts The Chinese play Go, and the E U - tic-tac-dough. #wtf
        #winthefuture"`,
        display: true,
        date: `Apr 24, 2012`,
        image: null
    },
    {
        quote: `"After America's double-jump in checkers, they were checkmated by Russia, who was surrounded by Go stones from China. The EU lost money #fail"`,
        display: true,
        date: `Apr 25, 2012`,
        image: null
    },
    {
        quote: `"Does no one realize that Killing Bin Laden was the coward's way?  Take him alive, and trace the Pakistani networks. <span class="red-text">Brave</span>. #idiots #oldman"`,
        display: true,
        date: `Apr 27, 2012`,
        image: null
    },
    {
        quote: `"One wonders what they might sell off next?  We sold our manufacturing base and we even sold out some special people. <span class="red-text">It is a National shame</span>"`,
        display: true,
        date: `Apr 28, 2012`,
        image: null
    },
    {
        quote: `"Watching cobraacademy of martial arts http://livestre.am/D5Iu via 
        @livestream"`,
        display: true,
        date: `Apr 29, 2012`,
        image: null
    },
    {
        quote: `"livestream.com/cobraacademy
        Watch TRISTAN Tate fight.  Live now.  Coming soon.... European TITLE Belt"`,
        display: true,
        date: `Apr 29, 2012`,
        image: null
    },
    {
        quote: `"livestream.com/cobraacademy  Watch my son fight.  Check his older brother (my namesake) King Cobra Tate. World Champ now.  They idolize you."`,
        display: true,
        date: `Apr 29, 2012`,
        image: null
    },
    {
        quote: `"TRISTAN HAS NOT FOUGHT YET... I had bad info.  TRISTAN must WIN.  Tweeters, tune in NOW NOW http://livestream.com/cobraacademy
        The truth shall be revealed"`,
        display: true,
        date: `Apr 29, 2012`,
        image: null
    },
    {
        quote: `"Beyond betrayal and treason - the fact that They are proud of it.Billions tax-free. <span class="red-text">Heroes homeless</span>. Now U S kids say "epic fail". #sadfools"`,
        display: true,
        date: `May 2, 2012`,
        image: null
    },
    {
        quote: `"The comic book killed Superman, Obama stopped NASA space shuttles.Kids nowadays find "epic fail" funny <span class="red-text">and kill themselves on f/b</span>. #mindfuck"`,
        display: true,
        date: `May 2, 2012`,
        image: null
    },
    {
        quote: `"I uncover mask of the assassins'.They walk around telling inane jokes,insinuating harmful action. The tone is bored. Ennui.
        #bland #disfunct"`,
        display: true,
        date: `Jun 5, 2012`,
        image: null
    },
    {
        quote: `"Money on the line, fight judges cheat.  Pacquio judges - one million cash while Kotrijk judges had to split 1000 euros to cheat Andrew.#fkme"`,
        display: true,
        date: `Jun 11, 2012`,
        image: null
    },
    {
        quote: `"FAILURE tastes like a thick,bitter liquid  hard to swallow. <span class="red-text">With an aftertaste of unmentionable rankness</span>. This is what I am told.#neverfail"`,
        display: true,
        date: `Jun 18, 2012`,
        image: null
    },
    {
        quote: `"Why do inferior males always have something smart to say, when with a group or gang.  <span class="red-text">Alone they are as silent as frightened birds</span>. #coward"`,
        display: true,
        date: `Jun 22, 2012`,
        image: null
    },
    {
        quote: `"When you run out of cliche and pop-culture knowledge your real thoughts seem so useless Right?  <span class="red-text">Look at what they have done to you</span>. #Improve"`,
        display: true,
        date: `Jul 1, 2012`,
        image: null
    },
    {
        quote: `"Work Consume Die. Good Luck Life goes on Take care Hang in there Nothing lasts forever Does not kill makes you stronger.  <span class="red-text">Forgive and forget</span>"`,
        display: true,
        date: `Jul 1, 2012`,
        image: null
    },
    {
        quote: `"We "congratulate" Ander Cooper when he OUTS himself, or Frankie Ocean. Explain the ACHIEVEMENT of being gay. <span class="red-text">I made children</span>. #Nobodycares."`,
        display: true,
        date: `Jul 4, 2012`,
        image: null
    },
    {
        quote: `"The truth is if I could clone myself. I would not.  The better versions of me already walk the planet. <span class="red-text">Love was my link to the future</span>. kids#"`,
        display: true,
        date: `Jul 16, 2012`,
        image: null
    },
    {
        quote: `"As the problem reveals itself I know that people realize that they are their own worst enemy.  <span class="red-text">As such they turn their hate outward</span>. #fail"`,
        display: true,
        date: `Jul 29, 2012`,
        image: null
    },
    {
        quote: `"Perhaps "we" should arm the all non-white countries. Automatic weapons.  Shooting brings peace. "They" reproduce too much anyway. #genocide"`,
        display: true,
        date: `Jul 29, 2012`,
        image: null
    },
    {
        quote: `"A combination of my sheer indefagitability, and my unequalled perspicacity makes me a feared adversary, <span class="red-text">regardless of field of endeavour</span>"`,
        display: true,
        date: `Aug 24, 2012`,
        image: null
    },
    {
        quote: `"Anybody who thinks they have children in my kid's league, tell me! I know we all truly love our kids. Still, <span class="red-text">I am certain mine are "perfect"</span>"`,
        display: true,
        date: `Sep 4, 2012`,
        image: null
    },
    {
        quote: `"A dude circulates a list that unsucessful people watch TV but sucessful ones (like him?) dont. In response watch eastenders omnibus.2X"`,
        display: true,
        date: `Sep 7, 2012`,
        image: null
    },
    {
        quote: `"All these people talking forgiveness.It is appropriate to get on your knees while begging.  <span class="red-text">Men should never forget wrongs</span> #perservere"`,
        display: true,
        date: `Sep 10, 2012`,
        image: null
    },
    {
        quote: `"Ochocino not NFL? Chad Johnson?Got arrested beating a woman? Now, like or not, we got a real brotha.#bleed  they will have ur money!! Tyson"`,
        display: true,
        date: `Sep 13, 2012`,
        image: null
    },
    {
        quote: `"Life only has 3 categories.  Cause and effect.  Purpose and intent. Action and reaction.  <span class="red-text">When you master all three realms you begin Tateism</span>"`,
        display: true,
        date: `Sep 22, 2012`,
        image: null
    },
    {
        quote: `"Obamacare question.. when some family sends a check to cover the mandate, and that check bounces. bank fees, no food, no gas.. what next?"`,
        display: true,
        date: `Oct 5, 2012`,
        image: null
    },
    {
        quote: `"When the final mind-game is played, and death awaits, you might wonder.<span class="red-text">If I did not mind did it matter</span>.  Your moves, sand on the beach.#fear"`,
        display: true,
        date: `Oct 7, 2012`,
        image: null
    },
    {
        quote: `"My 83 yr  mom, pulls a stuck mower/tractor out of mud at pond..No motor help. Her reply "If I stop doin' it I won't be able to do it." <span class="red-text">ninja</span>"`,
        display: true,
        date: `Nov 12, 2012`,
        image: null
    },
    {
        quote: `"People say "I am a vegetarian".  No such thing. Human species.  Better stated one  practices vegetarianism.  <span class="red-text">It is religion, not a reality</span>."`,
        display: true,
        date: `Feb 8, 2013`,
        image: null
    },
    {
        quote: `"The  average human in the postmodern world works to have leisure  time. Work to sit and relax. <span class="red-text">We must break the work,consume, die  cycle</span>"`,
        display: true,
        date: `Feb 8, 2013`,
        image: null
    },
    {
        quote: `"It appears the insanity of the ruling elite is exposed worldwide now.  <span class="red-text">They will kill you</span>.  Keep your mouths shut, behave as sheep. #sadlife"`,
        display: true,
        date: `Feb 28, 2013`,
        image: null
    },
    {
        quote: `"Look in a mirror and ask yourself, <span class="red-text">who is leading me.Why do I act this way?</span>If you believe the people on Tele =leaders, remain a puppet!#fool"`,
        display: true,
        date: `Mar 2, 2013`,
        image: null
    },
    {
        quote: `"It is curious how the majority of old people seem beaten down.Not in my family. Even a stroke leaves no reminders.  <span class="red-text">Mom is original Ninja</span>."`,
        display: true,
        date: `Mar 3, 2013`,
        image: null
    },
    {
        quote: `"The psychological effects of mind-fuck are not understood.<span class="red-text">We learned nothing from the Nazi failure</span>.Get  into lock-step.Lose ur mind. #puppet"`,
        display: true,
        date: `Mar 3, 2013`,
        image: null
    },
    {
        quote: `"A man does not acquire a full skill-set to be told,"Take Care" be careful" by amateurs.  Raw
        action solves everything. <span class="red-text">Caution breeds fear</span>."`,
        display: true,
        date: `Mar 6, 2013`,
        image: null
    },
    {
        quote: `"Some dude is called "cannibal cop" convicted by a jury of panicked Americans to life in prison for internet chat.<span class="red-text">He never did a thing</span>. #fail"`,
        display: true,
        date: `Mar 13, 2013`,
        image: null
    },
    {
        quote: `""Who chains us.and who holds the key that can  set us free? It's you. You have all the weapons you need. Now fight!" (MOVIE SUCKER PUNCH)"`,
        display: true,
        date: `Mar 15, 2013`,
        image: null
    },
    {
        quote: `"Gays (esp men) <span class="red-text">can't reproduce so they need YOUR children</span>.Men will marry men to get tax break/govt benefits.Gay divorce will clog courts.#NO"`,
        display: true,
        date: `Mar 28, 2013`,
        image: null
    },
    {
        quote: `"The problem with modern dudes is that their main sex organ is the tongue. Favourite position,head between thighs.<span class="red-text">I fail and now have 3 kids</span>."`,
        display: true,
        date: `Apr 15, 2013`,
        image: null
    },
    {
        quote: `"How can We still fund military biofuel? Result?We burn food and greenage in order to make fuel to wage war! <span class="red-text">Fuck a starving baby</span> .#killall"`,
        display: true,
        date: `Apr 15, 2013`,
        image: null
    },
    {
        quote: `"Lack of leadership can kill sure as a bullet. Just ask me (alive) or Ambassador Stevens (RIP).<span class="red-text">Cries for assistance unanswered</span>, leaders fail."`,
        display: true,
        date: `Sep 9, 2013`,
        image: null
    },
    {
        quote: `"Zimmer's whole story was a lie on TV and they played it and entered it as court record.  ZIMM was not sworn in!!!!!!!!!!  Television.  WTF"`,
        display: true,
        date: `Sep 10, 2013`,
        image: null
    },
    {
        quote: `"Perjury is a zero-sum game. Both can't win. He had the gun or she lied to  911. <span class="red-text">One must go to jail</span>. Zim in jail or she violates plea deal."`,
        display: true,
        date: `Sep 10, 2013`,
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

// const spriteTexture = new THREE.TextureLoader().load('./textures/quote-sprite.png');
// const spriteMaterial = new THREE.SpriteMaterial({ map: spriteTexture });

// const sprite = new THREE.Sprite(spriteMaterial)
// sprite.position.y = -8
// sprite.scale.set(6, 2, 1)

// scene.add(sprite)

/**
 * Models
 */
let threeJsLoaded = false
let htmlLoaded = false
const loadingBar = document.querySelector(".loading-bar")
const loadingText = document.querySelector(".loading-text")

const loadingManager = new THREE.LoadingManager(
    // loaded
    () => {
        console.log("three js loaded")
        threeJsLoaded = true

        loadingText.textContent = "loading content"
    }, 
    // progress
    (itemUrl, itemsLoaded, itemsTotal) => {
        console.log("three js loading")
        console.log(itemsLoaded / itemsTotal)
        loadingBar.style.transform = `scaleX(${(itemsLoaded / itemsTotal) * 0.65})`
        loadingText.textContent = "loading chess pieces"
        htmlLoaded = true
    }
)

window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    loadingBar.style.transform = `scaleX(1)`
    setTimeout(() => {
        loadingBar.style.opacity = 0
        loadingText.style.opacity = 0
    }, 900);

    setTimeout(() => {
        loadingBar.style.display = "none"
        loadingText.style.display = "none"
        launchExperienceButton.style.display = "flex"
        launchExperienceButton.style.opacity = "0"

        const startTime = performance.now()
        const duration = animationDuration

        function animate(currentTime) {
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

    setTimeout(() => {
        launchExperienceButton.style.opacity = "1"
    }, 3000);
    console.log(event);
});
  

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

let chessBoardObject = []

gltfLoader.load(
    "./tate-opening.glb",
    (gltf) => {
        let chessBoard = gltf.scene
        console.log(gltf)

        chessBoard.position.x = -20
        chessBoard.position.y = -5.1 // -1.1
        chessBoard.position.z = 2.7

        chessBoard.rotation.x = 0.3
        chessBoard.rotation.y = 2.35 // 3.148

        // gui.add(chessBoard.position, "x", -15, 15, 0.1).name("chessBoardX")
        // gui.add(chessBoard.position, "y", -15, 15, 0.1).name("chessBoardY")
        // gui.add(chessBoard.position, "z", -15, 15, 0.1).name("chessBoardZ")

        // gui.add(chessBoard.rotation, "x", -15, 15, 0.1).name("chessBoardXRot")
        // gui.add(chessBoard.rotation, "y", -4, 4, 0.1).name("chessBoardYRRot")
        // gui.add(chessBoard.rotation, "z", -15, 15, 0.1).name("chessBoardZTpr")
        
        scene.add(chessBoard)
        chessBoardObject.push(chessBoard)
    }
)

console.log(chessBoardObject)

// chess board animations




for (let i = 0; i < letterGenerationVariable; i++) {
    const randomIndex = Math.floor(Math.random() * chessPieces.length)
    gltfLoader.load(
        `./${chessPieces[randomIndex]}.glb`,
        function (gltf) {
            let letter = gltf.scene

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

            // letter.scale.x = .10
            // letter.scale.y = .10
            // letter.scale.z = .10

            if (chessPieces[randomIndex] == "rook") {
                // letter.scale.x = .16
                // letter.scale.y = .16
                // letter.scale.z = .16

                letter.scale.x = .24
                letter.scale.y = .24
                letter.scale.z = .24
            }

            // letterRandomPositionX variable will project the cubes to fit the screen based on viewport on X axis (adjust as needed)
            // let letterRandomPositionX = window.innerHeight / window.innerWidth < 0.45 ? 15 : 10 // adjust as needed
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
            letter.position.x = Math.round((Math.random() - 0.5) * letterRandomPositionX) // x variable will change based on viewport

            // letter.rotation.x = 0.5 
            letter.rotation.x = Math.random() - 0.5 * 1.2
            letter.rotation.y = Math.random() - 0.5 * 1.2
            letter.rotation.z = Math.random() - 0.5 * 1.2

            // shadows
            letter.castShadow = false
            letter.receiveShadow = false

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
ambientLight.intensity = 1

// gui.add(ambientLight, "intensity", 0, 10, 0.1).name("ambientLightIntensity")
// gui.addColor(ambientLight, "color").name("ambientLightColor")

scene.add(ambientLight)

// Point Light (assigned to mouse position)
const pointLight = new THREE.PointLight("#FFF7DD", 75) // regular 75
pointLight.position.x = -20 // normally 0
pointLight.position.z = 9 // normally 3
pointLight.rotation.y = Math.PI / 2
pointLight.castShadow = false
// pointLight.decay = 1.8
pointLight.decay = 1.61
pointLight.distance = 100

// gui.add(pointLight, "decay", 0, 2, 0.01).name("pointLightDecay")
// gui.add(pointLight, "distance", 0, 1000, 1).name("pointLightDecay")

scene.add(pointLight)

console.log(pointLight.position)

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
let hoveringOverChessPiece = false
let hoveredChessPiece

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
        // intersects.length > 0 ? intersects[0].object.position.z + 1.7 : null
        intersects.length > 0 && !popupOpened && sectionsEnabled ? document.body.style.cursor = 'pointer' : document.body.style.cursor = 'auto'
        // intersects.length > 0 ? console.log(intersects[0].object) : null

        if(intersects.length > 0) {
            hoveringOverChessPiece = true
            hoveredChessPiece = intersects[0].object
            console.log(hoveringOverChessPiece)
        } else {
            hoveringOverChessPiece = false

            console.log(hoveringOverChessPiece)
        }

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
let skipBtn = document.querySelector(".skip-btn");

aboutDesktopButton.addEventListener("mousemove", (e) => {buttonMagnetHoverEffectMousein(aboutDesktopButton, e, 0.9)});
muteDesktopButton.addEventListener("mousemove", (e) => {buttonMagnetHoverEffectMousein(muteDesktopButton, e, 0.9)});
closeChronicleDesktopButton.addEventListener("mousemove", (e) => {buttonMagnetHoverEffectMousein(closeChronicleDesktopButton, e, 0.9)});
launchExperienceDesktopButton.addEventListener("mousemove", (e) => {buttonMagnetHoverEffectMousein(launchExperienceDesktopButton, e, 0.125)});
aboutSectionCloseButton.addEventListener("mousemove", (e) => {buttonMagnetHoverEffectMousein(aboutSectionCloseButton, e, 0.9)});
skipBtn.addEventListener("mousemove", (e) => {buttonMagnetHoverEffectMousein(skipBtn, e, 0.9)});
chroniclesOfTateDesktopButton.addEventListener("mousemove", (e) => {
    buttonMagnetHoverEffectMousein(chroniclesOfTateDesktopButton, e, 0.175)
    chroniclesOfTateDesktopButton.innerHTML = '<a href="https://www.cobratate.com/the-tales-of-wudan" target="_blank">Master Wudan</a>'
});

aboutDesktopButton.addEventListener("mouseleave", () => {buttonMagnetHoverEffectMouseout(aboutDesktopButton)});
muteDesktopButton.addEventListener("mouseleave", () => {buttonMagnetHoverEffectMouseout(muteDesktopButton)});
closeChronicleDesktopButton.addEventListener("mouseleave", () => {buttonMagnetHoverEffectMouseout(closeChronicleDesktopButton)});
launchExperienceDesktopButton.addEventListener("mouseleave", () => {buttonMagnetHoverEffectMouseout(launchExperienceDesktopButton)});
aboutSectionCloseButton.addEventListener("mouseleave", () => {buttonMagnetHoverEffectMouseout(aboutSectionCloseButton)});
skipBtn.addEventListener("mouseleave", () => {buttonMagnetHoverEffectMouseout(skipBtn)});
chroniclesOfTateDesktopButton.addEventListener("mouseleave", () => {
    buttonMagnetHoverEffectMouseout(chroniclesOfTateDesktopButton)
    chroniclesOfTateDesktopButton.innerHTML = '<a href="https://www.cobratate.com/the-tales-of-wudan" target="_blank">Chronicles Of Tate</a>'
});



// Handle mouse click events
let chroniclePopUp = document.querySelector(".chronicle")
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

    // show and enable header
    // header.style.display = "flex"
    // header.style.opacity = 0
    // setTimeout(() => {
    //     header.style.opacity = 1
    // }, 500);

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

aboutButton.addEventListener("click", () => {
    popupOpened = true

    aboutSection.style.display = "flex"
    aboutSection.style.zIndex = 1
    document.body.style.backgroundSize = "70%"
    // mobileBackground.style.backgroundSize = "100%"
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
camera.position.x = -20
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
    // imported line (update at some point)

    // Check for intersections
    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0 && popupOpened == false && sectionsEnabled) {
        // log the object that was clicked
        console.log('Object touched on mobile:', intersects[0].object);
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

        // chroniclePopUp.classList.remove("show")

        // hide and disable header
        // header.style.opacity = 0
        // setTimeout(() => {
        //     header.style.display = "none"
        // }, 1600);

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

    // end of imported line
})

let infoButton = document.querySelector(".hamburger-menu-icon")
let mobileBackground = document.querySelector(".mobile-background")

infoButton.addEventListener("touchstart", () => {
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

let scrollChessPieces = true
const viewportEnter1 = document.querySelector(".viewport-enter1")
const viewportExit1 = document.querySelector(".viewport-exit1")
const viewportEnter2 = document.querySelector(".viewport-enter2")
const viewportExit2 = document.querySelector(".viewport-exit2")
const viewportEnter3 = document.querySelector(".viewport-enter3")
const viewportExit3 = document.querySelector(".viewport-exit3")
const viewportEnter4 = document.querySelector(".viewport-enter4")
const viewportExit4 = document.querySelector(".viewport-exit4")
const viewportEnter5 = document.querySelector(".viewport-enter5")
const viewportExit5 = document.querySelector(".viewport-exit5")
const viewportEnter6 = document.querySelector(".viewport-enter6")
const viewportExit6 = document.querySelector(".viewport-exit6")


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

    // Check if chess pieces overlap with quote
    // function scrollDownCheck() {
    //     if (isInViewport(viewportEnter1)) {
    //         scrollChessPieces = false
    //         console.log("viewport enter in viewport")
    //     } 
        
    //     if (isInViewport(viewportExit1)) {
    //         scrollChessPieces = true
    //         console.log("viewport exit in viewport")
    //     }
    
    //     if (isInViewport(viewportEnter2)) {
    //         scrollChessPieces = false
    //         console.log("viewport enter in viewport")
    //     } 
        
    //     if (isInViewport(viewportExit2)) {
    //         scrollChessPieces = true
    //         console.log("viewport exit in viewport")
    //     }
    
    //     if (isInViewport(viewportEnter3)) {
    //         scrollChessPieces = false
    //         console.log("viewport enter in viewport")
    //     } 
        
    //     if (isInViewport(viewportExit3)) {
    //         scrollChessPieces = true
    //         console.log("viewport exit in viewport")
    //     }
    
    //     if (isInViewport(viewportEnter4)) {
    //         scrollChessPieces = false
    //         console.log("viewport enter in viewport")
    //     } 
        
    //     if (isInViewport(viewportExit4)) {
    //         scrollChessPieces = true
    //         console.log("viewport exit in viewport")
    //     }
    
    //     if (isInViewport(viewportEnter5)) {
    //         scrollChessPieces = false
    //         console.log("viewport enter in viewport")
    //     } 
        
    //     if (isInViewport(viewportExit5)) {
    //         scrollChessPieces = true
    //         console.log("viewport exit in viewport")
    //     }
    
    //     if (isInViewport(viewportEnter6)) {
    //         scrollChessPieces = false
    //         console.log("viewport enter in viewport")
    //     } 
        
    //     if (isInViewport(viewportExit6)) {
    //         scrollChessPieces = true
    //         console.log("viewport exit in viewport")
    //     }
    // }

    // scrollDownCheck()

    // Extend section-2011 height
    // Check for target div in viewport
    const section2011End = document.querySelector('.section-2011-end');
    const section2012End = document.querySelector('.section-2012-end')
    const section2013End = document.querySelector('.section-2013-end')

    if (isInViewport(section2011End) && letterCount.length < 58) {
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
            letterRandomPositionX = 8
        }

        function scrollDown() {

            // letter.position.y = -3.94 + Math.random() * ( -4.05 - (-3.94) ) // random number between -3.94 and -4.54
            // window.innerHeight / window.innerWidth > 0.9 ? letter.position.y = -3.95 - Math.random() * 10 : letter.position.y = -3.95 + Math.random() * (-10.95 - (-3.95))
            letter.position.y = -3.95 + Math.random() * ( -4.04 - (-3.94) ) // random number between -3.95 and -4.04
            
            // letter.position.y = -3.94
            letter.position.x = (Math.random() - 0.5) * letterRandomPositionX //randomize x on scroll down
            letterCount.push(letterCount.length)
            // console.log(letterCount)
        }

        function scrollUp() {
            letter.position.y = 3.95
            // letter.position.x = Math.round((Math.random() - 0.5) * letterRandomPositionX) //randomize x on scroll up
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