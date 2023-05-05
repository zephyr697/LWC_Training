import { LightningElement } from 'lwc';

export default class Assignment2Day5Parent extends LightningElement {


    handleClick(event){
        if(event.target.value === 'Accounts'){
            let ele = this.template.querySelector('c-assignment2-day5-child');  
            ele.showAccounts();
        }else if(event.target.value === 'Opportunities'){
            this.template.querySelector('c-assignment2-day5-child').showOpties();
        }else if(event.target.value === 'Leads'){
            this.template.querySelector('c-assignment2-day5-child').showLeads();
        }
    }

}