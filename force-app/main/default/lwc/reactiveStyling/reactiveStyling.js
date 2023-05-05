import { LightningElement } from 'lwc';

export default class ReactiveStyling extends LightningElement {

    isChecked = false;

    handleClick(){
        this.isChecked = !(this.isChecked);
    }
}