import * as THREE from "three";
import Base from './Base'
export default class Renderer{
    constructor(){
        this.base = new Base()
        this.sizes = this.base.sizes
        this.scene = this.base.scene
        this.canvas = this.base.canvas
        this.camera = this.base.camera
        this.setRenderer()
    }
    setRenderer(){
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        // this.renderer.physicallyCorrectLights = true;
        // this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }
    resize(){
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }
    update(){
        this.renderer.render(this.scene, this.camera.perspectiveCamera);
    }
}