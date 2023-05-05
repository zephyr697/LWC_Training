import { LightningElement } from 'lwc';

export default class LifecycleHookChild2 extends LightningElement {
    constructor(){
        super();
        console.log('In Child 2 constructor');
    }

    connectedCallback(){
        console.log('In Child 2 connected Callback');
    }

    renderedCallback(){
        console.log('In Child2 rendered Callback');
    }

    disconnectedCallback(){
        console.log('In Child2 Disconnected Callback');
    }
}