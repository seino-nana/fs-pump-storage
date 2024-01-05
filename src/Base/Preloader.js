import { EventEmitter } from "events";
import Base from './Base'
import GSAP from "gsap";
import convert from "./Utils/covertDivsToSpans.js";

export default class Preloader extends EventEmitter {
    constructor() {
        super()
        this.base = new Base()
        this.scene = this.base.scene
        this.sizes = this.base.sizes
        this.resources = this.base.resources
        this.camera = this.base.camera
        this.world = this.base.world
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        this.world.on('worldready', () => {
            console.log('开始动画');
            this.setAssets();
            this.playIntro();
        })
    }
    setAssets() {
        convert(document.querySelector(".intro-text"));

        // convert(document.querySelector(".hero-main-title"));
        // convert(document.querySelector(".hero-main-description"));

        this.pump = this.base.world.actualPump;

    }
    firstIntro() {
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", { y: 0, yPercent: 100 });
            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 1,
                onComplete: () => {
                    document
                        .querySelector(".preloader")
                        .classList.add("hidden");
                },
            });
            if (this.device === "desktop") {
                this.timeline
                    .to(this.pump.scale, {
                        x: .3,
                        y: .3,
                        z: .3,
                        ease: "back.out(2.5)",
                        duration: 0.7,
                    })
                    .to(this.pump.position, {
                        x: -1.1,
                        ease: "power1.out",
                        duration: 0.7,
                    });
            } else {
                this.timeline
                    .to(this.pump.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.5)",
                        duration: 0.7,
                    })
                    .to(this.pump.position, {
                        z: -1,
                        ease: "power1.out",
                        duration: 0.7,
                    });
            }
            this.timeline
                .to(".intro-text .animatedis", {
                    yPercent: 0,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                })
                .to(
                    ".arrow-svg-wrapper",
                    {
                        opacity: 1,
                        onComplete: resolve,
                    },
                    "same"
                )
        })
    }
    secondIntro() {
        return new Promise((resolve) => {

            this.secondTimeline = new GSAP.timeline();
            this.secondTimeline
                .to(
                    ".intro-text .animatedis",
                    {
                        yPercent: 100,
                        stagger: 0.05,
                        ease: "back.in(1.7)",
                    },
                    "fadeout"
                )
                .to(
                    ".arrow-svg-wrapper",
                    {
                        opacity: 0,
                    },
                    "fadeout"
                )
                .to(
                    this.pump.position,
                    {
                        x: 0,
                        y: 0,
                        z: 0,
                        ease: "power1.out",
                    },
                    "same"
                )
                .to(
                    this.pump.rotation,
                    {
                        y: 2 * Math.PI + Math.PI / 2,
                    },
                    "same"
                )
                .to(
                    this.pump.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,

                    },
                    "same"
                )
                // 在 "heroin" 标签之后开始 .hero-main-title 的动画
                .to(".hero-main-title", {
                    duration: 0.5,
                    ease: "power2.out",
                    className: "hero-main-title animate__animated animate__fadeIn"
                })
                .to(".hero-main-title", { 
                    duration: 0.2, 
                    opacity: 1, 
                    ease: "power2.in" }
                )
                .to(".hero-main-description", {
                    duration: 0.2,
                    ease: 'power2.out',
                    className: "hero-main-description animate__animated animate__fadeIn"
                })
                .to(".hero-main-description", { 
                    duration: 0.2, 
                    opacity: 1, 
                    ease: "power2.in" 
                })
                .to(".arrow-svg-wrapper", {
                    opacity: 1,
                    onComplete: resolve,
                });
        });
    }
    onScroll(e) {
        if (e.deltaY > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e) {
        this.initalY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initalY - currentY;
        if (difference > 0) {
            console.log("swipped up");
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.intialY = null;
    }
    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }
    async playIntro() {
        this.scaleFlag = true;
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);

        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }
    async playSecondIntro() {
        this.moveFlag = false;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("enablecontrols");
    }

    move() {
        // if (this.device === "desktop") {
        //     this.pump.position.set(-1, 0, 0);
        // } else {
        //     this.pump.position.set(0, 0, -1);
        // }
    }

    scale() {
        // if (this.device === "desktop") {
        //     this.pump.scale.set(1, 1, 1);
        // } else {
        //     this.pump.scale.set(0.07, 0.07, 0.07);
        // }
    }
    update() {
        if (this.moveFlag) {
            this.move();
        }

        if (this.scaleFlag) {
            this.scale();
        }
    }
}