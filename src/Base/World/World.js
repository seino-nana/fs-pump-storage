import * as THREE from "three";
import Base from '../Base'
import Environment from "../Environment";
import { EventEmitter } from "events";
import GSAP from "gsap";

import Floor from './Floor'
import Controls from './Controls'
export default class World extends EventEmitter {
    constructor() {
        super();
        this.base = new Base();
        this.scene = this.base.scene;
        this.canvas = this.base.canvas;
        this.camera = this.base.camera;
        this.resources = this.base.resources

        this.resources.on("ready",()=> {
            console.log('加载完毕');
            // 开启灯光
            this.environment = new Environment();
            // floor
            this.floor = new Floor()
            // pump
            this.pump = this.resources.items.pump
            this.actualPump = this.pump.scene
            this.createPump()
            // 发出事件给proloader开始动画
            this.emit("worldready");
        })
        
        // 鼠标事件
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };
        this.onMouseMove();
    }
    createPump(){
        this.actualPump.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }
        })
        this.scene.add(this.actualPump);
        this.actualPump.scale.set(.2,.2,.2);
    }
   
    // 鼠标事件
    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation =
                ((e.clientX - window.innerWidth / 2)) / window.innerWidth;
            this.lerp.target = this.rotation * Math.PI * 2;
        });
    }
    resize() {}

    update() {
        if(this.actualPump){
            // this.lerp.current = GSAP.utils.interpolate(
            //     this.lerp.current,
            //     this.lerp.target,
            //     this.lerp.ease
            // );
            // this.actualPump.rotation.y = this.lerp.current;
            this.actualPump.rotation.y += 0.005;
        }
        
    }
}
