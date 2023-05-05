import { LightningElement,api,track } from 'lwc';

export default class LifecycleHookParent extends LightningElement {

    @api pubProp;
    @track trackProp;
    _globalVar;
    @api testFunct(){
        console.log('in Test Function');
    }

    constructor(){
        super();
        // eslint-disable-next-line @lwc/lwc/no-api-reassignments
        // this.pubProp = 'sample';
        // this.trackProp = 'sample';
        // this._globalVar = 'sample';
        console.log('In Parent constructor');
        // console.log('Constructor this.pubProp ---->'+this.pubProp);
        // console.log('this._globalVar--->'+this._globalVar);
        // console.log('this.trackProp--->'+this.trackProp);
        // this.testFunct();
    }

    connectedCallback(){
        // var inputElement = this.template.querySelector("p");
        console.log('In Parent Connected callback');
        // console.log('Connected this.pubProp ---->'+this.pubProp);
        // eslint-disable-next-line @lwc/lwc/no-api-reassignments
        // this.pubProp = 'sample';
        // console.log('Connected this.pubProp ---->'+this.pubProp);
        // inputElement.innerText = 'Default Value';
    }

    renderedCallback(){
        var inputElement = this.template.querySelector("p");
        console.log('In Parent rendered Callback');
        inputElement.innerText = 'Default Value';
    }
    disconnectedCallback(){
        console.log('In Parent Disconnected Callback');
    }
}