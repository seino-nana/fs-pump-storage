import * as THREE from "three";
import Base from '../Base'
import GSAP from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";

export default class Controls {
    constructor() {
        this.base = new Base()
        this.scene = this.base.scene
        this.sizes = this.base.sizes
        this.camera = this.base.camera

        this.pump = this.base.world.actualPump
        // this.circleFirst = this.base.world.floor.circleFirst;

        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";
       
        if (
            !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            this.setSmoothScroll();
        }
        this.setScrollTrigger();
    }
    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.1,
            disableRaf: true,
        });

        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }
    setSmoothScroll() {
        this.asscroll = this.setupASScroll();
    }
    setScrollTrigger() {
        ScrollTrigger.matchMedia({
            "(min-width:969px)": () => {
                // this.pump.scale.set(0.1, 0.1, 0.1)
                // this.pump.position.set(0, 0, 0)
                // First section -----------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: '.first-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                })
                this.firstMoveTimeline.fromTo(
                    this.pump.position,
                    { x: 0, y: 0, z: 0 },
                    {
                        x: () => {
                            return this.sizes.width * 0.0012;
                        },
                    }
                );
                // Second section -----------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                })
                    .to(
                        this.pump.position,
                        {
                            x: () => {
                                return - 2;
                            },
                            z: () => {
                                return this.sizes.height * 0.003;
                            },
                        },
                        "same"
                    )
                    .to(
                        this.pump.scale,
                        {
                            x: 3.5,
                            y: 3.5,
                            z: 3.5,
                        },
                        "same"
                    )


                // Third section -----------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(
                    this.pump.position,
                    {
                        x: () => {
                            return 0;
                        }
                    },
                    "same"
                )
            },
            // Mobile
            "(max-width: 968px)": () => {
                console.log('mobile');
            },
            // all
            all: () => {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section) => {
                    this.progressWrapper =
                        section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if (section.classList.contains("right")) {
                        // GSAP.to(section, {
                        //     borderTopLeftRadius: 10,
                        //     scrollTrigger: {
                        //         trigger: section,
                        //         start: "top bottom",
                        //         end: "top top",
                        //         scrub: 0.6,
                        //     },
                        // });
                        // GSAP.to(section, {
                        //     borderBottomLeftRadius: 1000,
                        //     scrollTrigger: {
                        //         trigger: section,
                        //         start: "bottom bottom",
                        //         end: "bottom top",
                        //         scrub: 0.6,
                        //     },
                        // });
                    } else {
                        // GSAP.to(section, {
                        //     borderTopRightRadius: 10,
                        //     scrollTrigger: {
                        //         trigger: section,
                        //         start: "top bottom",
                        //         end: "top top",
                        //         scrub: 0.6,
                        //     },
                        // });
                        // GSAP.to(section, {
                        //     borderBottomRightRadius: 700,
                        //     scrollTrigger: {
                        //         trigger: section,
                        //         start: "bottom bottom",
                        //         end: "bottom top",
                        //         scrub: 0.6,
                        //     },
                        // });
                    }
                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        },
                    });
                });

                // this.firstCircle = new GSAP.timeline({
                //     scrollTrigger: {
                //         trigger: ".first-move",
                //         start: "top top",
                //         end: "bottom bottom",
                //         scrub: 0.6,
                //     },
                // }).to(this.circleFirst.scale, {
                //     x: 10,
                //     y: 10,
                //     z: 10,
                // });
            },
        })
    }

    resize() { }

    update() { }
}