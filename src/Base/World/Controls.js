import * as THREE from "three";
import Base from '../Base';
import GSAP from 'gsap'
export default class Controls {
    constructor() {
        this.base = new Base()
        this.scene = this.base.scene
        this.resources = this.base.resources
        this.camera = this.base.camera
        this.time = this.base.time;

        this.progress = 0
        this.back = false
        // this.dummyVector = new THREE.Vector3(0, 0, 0);

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1
        }
        this.position = new THREE.Vector3(0, 0, 0);
        this.lookAtposition = new THREE.Vector3(0, 0, 0);
        this.setPath()
        this.onWheel()
    }
    setPath() {
        this.curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-10, 0, 10),
            new THREE.Vector3(-5, 5, 5),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(5, -5, 5),
            new THREE.Vector3(10, 0, 10)
        ], true);



        const points = this.curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

        // Create the final object to add to the scene
        const curveObject = new THREE.Line(geometry, material);
        this.scene.add(curveObject);
    }
    onWheel() {
        window.addEventListener('wheel', (e) => {
            if (e.deltaY > 0) {
                this.back = false
                this.lerp.target += 0.1
            } else {
                this.lerp.target -= 0.1
                this.back = true
            }
        })
    }
    resize() {

    }
    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current, 
            this.lerp.target, 
            this.lerp.ease
        )
        if(this.back){
            this.lerp.target -= 0.001
        } else {
            this.lerp.target += 0.001
        }
        // this.lerp.target +=0.001
        this.lerp.target = GSAP.utils.clamp(0,1,this.lerp.target)
        this.lerp.current = GSAP.utils.clamp(0,1,this.lerp.current)
        
        this.curve.getPointAt(this.lerp.current, this.position)
        this.curve.getPointAt(this.lerp.current+0.00001, this.lookAtposition)

        this.camera.orthographicCamera.position.copy(this.position)
        this.camera.orthographicCamera.lookAt(this.lookAtposition)
    }
}