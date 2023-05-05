import { LightningElement,wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class ConditionalRendering extends LightningElement {

    contacts;

    @wire(getContactList)
    wiredContacts({error,data}) {
        if(error){
            console.error(error);
        }
        else if(data){
            this.contacts = data.map((contact) => {
                let res = {
                    contact : contact,
                    isValid : contact.LastName.startsWith('B') ? true :
                              contact.LastName.startsWith('b') ? true : false
                }
                
                return res;
            });
        }
    }
}