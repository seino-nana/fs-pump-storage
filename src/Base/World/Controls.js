import * as THREE from "three";
import Base from '../Base';
export default class Controls {
    constructor() {
        this.base = new Base()
        this.scene = this.base.scene
        this.resources = this.base.resources
        this.camera = this.base.camera
        this.time = this.base.time;
        
        this.progress = 0
        this.dummyVector = new THREE.Vector3( 0, 0, 0 );

        this.setPath()
        this.onWheel()
    }
    setPath(){
        this.curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -10, 0, 10 ),
            new THREE.Vector3( -5, 5, 5 ),
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 5, -5, 5 ),
            new THREE.Vector3( 10, 0, 10 )
        ], true);
        
        

        const points = this.curve.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        
        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
        
        // Create the final object to add to the scene
        const curveObject = new THREE.Line( geometry, material );
        this.scene.add( curveObject );
    }
    onWheel(){
      window.addEventListener('wheel',(e) => {
        if(e.deltaY > 0){
            this.progress += 0.1
        } else {
            this.progress -= 0.1
            if(this.progress < 0){
                this.progress = 1
            }
        }
      })
    }
    resize(){

    }
    update(){
  
        this.curve.getPointAt(this.progress%1,this.dummyVector)
        // this.progress -= 0.01
        
        this.camera.orthographicCamera.position.copy(this.dummyVector)
    }
}