import { LightningElement,wire } from 'lwc';
import getAcctList from '@salesforce/apex/AcctControllerLWC.getAcctList';
import { publish, MessageContext } from 'lightning/messageService';
import MC from "@salesforce/messageChannel/mc__c";

export default class CompositionParent extends LightningElement {


    @wire(getAcctList) accts;
    @wire(MessageContext)
    messageContext;


    handleClick(event){
        const payload = { recordId : event.target.value};
        publish(this.messageContext, MC, payload);
    }

}