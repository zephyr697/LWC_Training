import { LightningElement,track,wire } from 'lwc';
import getContacts from '@salesforce/apex/CompositionControllerLWC.getContacts';
import { NavigationMixin } from 'lightning/navigation';
import {
    publish,
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext
} from 'lightning/messageService';
import MC from "@salesforce/messageChannel/mc__c";
import MC1 from "@salesforce/messageChannel/mc1__c";

export default class CompositionChild extends NavigationMixin(LightningElement) {


subscription = null;
acctId;
@track contacts;
@track error;
//@wire(getContacts(),) contactList;
@wire(MessageContext)
    messageContext;
@wire(MessageContext)
    messageContext1;



handleMessage(message){
    this.acctId = message.recordId;
    this.getData();
}
subscribeToMessageChannel() {
    if (!this.subscription) {
        this.subscription = subscribe(
            this.messageContext,
            MC,
            (message) => this.handleMessage(message),
            { scope: APPLICATION_SCOPE }
        );
    }
}
unsubscribeToMessageChannel() {
    unsubscribe(this.subscription);
    this.subscription = null;
}
connectedCallback() {
    this.subscribeToMessageChannel();
}

disconnectedCallback() {
    this.unsubscribeToMessageChannel();
}

getData(){
    getContacts({ acctId : this.acctId })
    .then((result) => {
        this.contacts = result;
        this.error = undefined;
    })
    .catch((error) => {
        this.error = error;
        this.contacts = undefined;
    });
}

handleClick(event){
    const payload = { recordId: event.target.value };
    publish(this.messageContext1, MC1, payload);
}


}