import { LightningElement,api,wire } from 'lwc';
import getAcctList from '@salesforce/apex/AcctControllerLWC.getAcctList';
import getOptyList from '@salesforce/apex/AcctControllerLWC.getOptyList';
import getLeadList from '@salesforce/apex/AcctControllerLWC.getLeadList';

export default class Assignment2Day5Child extends LightningElement {

    @api type;

    @wire(getAcctList) accts;
    @wire(getOptyList) opties;
    @wire(getLeadList) leads;


    @api showAccounts(){
        this.template.querySelector("lightning-card[data-type='Account']").classList.remove('slds-hide');
        this.template.querySelector("lightning-card[data-type='Account']").classList.add('slds-show');
        this.template.querySelector("lightning-card[data-type='Opty']").classList.add('slds-hide');
        this.template.querySelector("lightning-card[data-type='Lead']").classList.add('slds-hide');
    }

    @api showOpties(){
        this.template.querySelector("lightning-card[data-type='Opty']").classList.remove('slds-hide');
        this.template.querySelector("lightning-card[data-type='Opty']").classList.add('slds-show');
        this.template.querySelector("lightning-card[data-type='Account']").classList.add('slds-hide');
        this.template.querySelector("lightning-card[data-type='Lead']").classList.add('slds-hide');
    }

    @api showLeads(){
        this.template.querySelector("lightning-card[data-type='Lead']").classList.remove('slds-hide');
        this.template.querySelector("lightning-card[data-type='Lead']").classList.add('slds-show');
        this.template.querySelector("lightning-card[data-type='Account']").classList.add('slds-hide');
        this.template.querySelector("lightning-card[data-type='Opty']").classList.add('slds-hide');
    }
}