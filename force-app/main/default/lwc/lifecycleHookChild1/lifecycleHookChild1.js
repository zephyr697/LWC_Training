import { LightningElement } from 'lwc';

export default class LifecycleHookChild1 extends LightningElement {


    constructor(){
        super();
        console.log('In Child 1 constructor');
    }

    connectedCallback(){
        console.log('In Child 1 connected Callback');
    }

    renderedCallback(){
        console.log('In Child1 rendered Callback');
    }

    disconnectedCallback(){
        console.log('In Child1 Disconnected Callback');
    }
}