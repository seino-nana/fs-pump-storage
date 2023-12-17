import * as THREE from "three";
import Base from '../Base';
export default class Pump {
    constructor() {
        this.base = new Base()
        this.scene = this.base.scene
        this.resources = this.base.resources
        this.time = this.base.time;
        this.pump = this.resources.items.pump;
        this.actualPump = this.pump.scene;

        this.setModel();
        this.setAnimation();
    }
    setModel(){
        this.actualPump.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }
            if (child.name === "Aquarium") {
                // console.log(child);
                child.children[0].material = new THREE.MeshPhysicalMaterial();
                child.children[0].material.roughness = 0;
                child.children[0].material.color.set(0xf1f1f1);
                child.children[0].material.ior = 3;
                child.children[0].material.transmission = 1;
                child.children[0].material.opacity = 1;
                child.children[0].material.depthWrite = false;
                child.children[0].material.depthTest = false;
            }

            if (child.name === "Computer") {
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }

            // if (child.name === "Mini_Floor") {
            //     child.position.x = -0.289521;
            //     child.position.z = 8.83572;
            // }

        })

        this.scene.add(this.actualPump)
        this.actualPump.scale.set(0.11, 0.11, 0.11);
    }
    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualPump);
        this.swim = this.mixer.clipAction(this.pump.animations[0]);
        this.swim.play();
    }
    resize(){

    }
    update(){
        this.mixer.update(this.time.delta * 0.0009);
    }
}