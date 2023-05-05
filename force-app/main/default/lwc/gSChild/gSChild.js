import { LightningElement, api } from 'lwc';

export default class GSChild extends LightningElement {

    @api 
    contact;

    get mobile(){
        return `+91-${this.contact.mobile}`; 
    }

    get fullname(){
        return this.contact.fullname;
    } 
}