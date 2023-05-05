import { LightningElement,wire } from 'lwc';
import { registerListener,unregisterAllListeners } from 'c/pubsubLWC';
import{CurrentPageReference} from 'lightning/navigation';

export default class EventLWCSibling extends LightningElement {

    pageNumber=1;
    @wire(CurrentPageReference) pageRef;

    connectedCallback(){
        registerListener('next',this.handleNext,this);
        registerListener('prev',this.handlePrev,this);
    }

    disconnectedCallback(){
        unregisterAllListeners(this);
    }

    handleNext(){
        this.pageNumber += 1;
    }
    handlePrev(){
        this.pageNumber = (this.pageNumber > 1) ? this.pageNumber-1 : this.pageNumber;
    }

}