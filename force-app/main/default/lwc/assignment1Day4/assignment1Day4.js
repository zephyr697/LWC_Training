import { LightningElement,track } from 'lwc';

export default class Assignment1Day4 extends LightningElement {
    @track message = '';

    handleChange(event){
        this.message = event.target.value;
    }

}