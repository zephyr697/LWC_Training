import { LightningElement,wire } from 'lwc';
import  {fireEvent}  from 'c/pubsubLWC';
import{CurrentPageReference} from 'lightning/navigation';

export default class EventLWCChild extends LightningElement {

    @wire(CurrentPageReference) pageRef; 

    handleClick(event){
        if(event.target.value === 'next'){
            this.dispatchEvent(new CustomEvent('next'));
            fireEvent(this.pageRef,'next','next');
        }else if(event.target.value === 'prev'){
            this.dispatchEvent(new CustomEvent('prev'));
            fireEvent(this.pageRef,'prev','prev');
        }
    }

}