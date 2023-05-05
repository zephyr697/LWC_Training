import { LightningElement,wire } from 'lwc';
import  getTeams  from '@salesforce/apex/TeamHandler.getTeams';
import { NavigationMixin } from 'lightning/navigation';
import { CurrentPageReference } from 'lightning/navigation'; 
import  {fireEvent}  from 'c/pubsubLWC';

export default class TeamList extends NavigationMixin(LightningElement) {

@wire(getTeams)
teams;
@wire(CurrentPageReference) pageRef; 

handleCreateTeam(){
    this[NavigationMixin.Navigate]({
        type: 'standard__objectPage',
        attributes: {
            objectApiName: 'Team__c',
            actionName: 'new'
        }
    });
}

handleModifyTeam(event){
    let teamId = event.target.value;
    fireEvent(this.pageRef,'modify',`${teamId}`);
}

}