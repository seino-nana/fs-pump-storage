import * as THREE from "three";
import Base from '../Base';
import Pump from './Pump'
import Controls from "./Controls.js";
import Environment from "./Environment.js";
import { EventEmitter } from "events";
export default class World extends EventEmitter  {
    constructor() {
        super()
        this.base = new Base()
        this.scene = this.base.scene
        this.resources = this.base.resources
        this.resources.on("ready",() => {
            this.environment = new Environment();
            this.pump= new Pump()
            this.controls = new Controls();
            console.log('created pump');
        })
    }
    update(){
        if(this.pump) {
            this.pump.update();
        }
        if(this.controls){
            this.controls.update()
        }
    }
}