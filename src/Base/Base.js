import * as THREE from "three";
import Camera from './Camera'
import Renderer from "./Renderer";
import Preloader from "./Preloader";

import World from './World/World'
import Controls from './World/Controls'

import Sizes from "./Utils/Sizes";
import Time from './Utils/Time'
import Resources from './Utils/Resources';
import assets from './Utils/assets';

// import 
export default class Base {
    static instance;
    constructor(canvas) {
        if (Base.instance) {
            return Base.instance
        }
        Base.instance = this
        this.canvas = canvas
        this.scene = new THREE.Scene()
        this.sizes = new Sizes()
        this.time = new Time()
        this.camera = new Camera()
        this.renderer = new Renderer()
         
        this.resources = new Resources(assets);
        this.world = new World()
        this.preloader = new Preloader();
        // 动画结束后，启用Controls
        this.preloader.on("enablecontrols", () => {
            console.log('启用controls');
            this.controls = new Controls();
            
        });
        

        this.sizes.on("resize", () => {
            this.resize();
        });
        this.time.on("update", () => {
            this.update();
        });
    }
    resize() {
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
    }
    update() {
        this.preloader.update();
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }
}