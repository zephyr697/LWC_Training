import { LightningElement } from 'lwc';

export default class EventLWCParent extends LightningElement {

    pageNumber;

    connectedCallback(){
        this.pageNumber = 1;
    }

    nextHandler(){
        this.pageNumber += 1;
    }

    prevHandler(){
        this.pageNumber = (this.pageNumber > 1) ? this.pageNumber-1 : this.pageNumber;
    }
}