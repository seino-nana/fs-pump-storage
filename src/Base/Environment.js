import * as THREE from "three";
import Base from './Base'
import GSAP from "gsap";

export default class Environment {
    constructor() {
        this.base = new Base();
        this.scene = this.base.scene;

        this.setSunlight()
    }
    setSunlight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;

        this.sunLight.position.set(0, 5, 10);
        this.scene.add(this.sunLight);
        //  const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        // this.scene.add(helper);
        this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
        this.scene.add(this.ambientLight);
    }
    resize() { }

    update() { }
}