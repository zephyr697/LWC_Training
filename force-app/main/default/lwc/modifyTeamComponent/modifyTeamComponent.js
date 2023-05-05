import { LightningElement,wire,track } from 'lwc';
import { registerListener,unregisterAllListeners } from 'c/pubsubLWC';
import{CurrentPageReference} from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getPlayers from '@salesforce/apex/PlayerHandler.getPlayers';
import associatePlayers from '@salesforce/apex/PlayerHandler.associatePlayers';
import NAME_FIELD from '@salesforce/schema/Player__c.Name';
import COUNTRY_FIELD from '@salesforce/schema/Player__c.Country__c';
import ROLE_FIELD from '@salesforce/schema/Player__c.Role__c';
import CAPTAIN_FIELD from '@salesforce/schema/Player__c.Is_Captain__c';
import VICE_CAPTAIN_FIELD from '@salesforce/schema/Player__c.Is_Vice_Captain__c';
import KEEPER_FIELD from '@salesforce/schema/Player__c.Is_Wicket_Keeper__c';


const FCOLS = [
    {
        label: 'Name',
        fieldName: NAME_FIELD.fieldApiName,
        editable: false
    },
    {
        label: 'Role',
        fieldName:ROLE_FIELD.fieldApiName,
        editable: false
    },
    {
        label: 'Country',
        fieldName: COUNTRY_FIELD.fieldApiName,
        editable: false
    },
    {
        label: 'Is Captain',
        fieldName: CAPTAIN_FIELD.fieldApiName,
        editable: false,
        type: 'boolean'
    },
    {
        label: 'Is Vice Captain',
        fieldName: VICE_CAPTAIN_FIELD.fieldApiName,
        editable: false,
        type: 'boolean'
    },
    {
        label: 'Is Wicket Keeper',
        fieldName: KEEPER_FIELD.fieldApiName,
        editable: false,
        type: 'boolean'
    },
]

const COLS = [
    {
        label: 'Name',
        fieldName: NAME_FIELD.fieldApiName,
        editable: false
    },
    {
        label: 'Role',
        fieldName:ROLE_FIELD.fieldApiName,
        editable: false
    },
    {
        label: 'Country',
        fieldName: COUNTRY_FIELD.fieldApiName,
        editable: false
    },
    {
        label: 'Is Wicket Keeper',
        fieldName: KEEPER_FIELD.fieldApiName,
        editable: false,
        type: 'boolean'
    },

];

export default class ModifyTeamComponent extends LightningElement {

    showTabOne = true;
    showTabTwo = false;
    showTabThree = false;
    showTabFour = false;

    @track players;
    @track selectedPlayers;
    @track selectedCaptain;
    @track error;
    
    finalTeam;
    teamId;
    selectedCaptainID;
    selectedVCID;
    columns = COLS;
    finalListCols = FCOLS;
    showButton = true;
    numTeams;

    @wire(CurrentPageReference) pageRef;

    @wire(getPlayers)
    wiredPlayers({error,data}){
        if(data){
            this.players = data;
            this.error = undefined;
            this.numTeams = Math.floor(this.players.length / 11);
    }else if(error){
            this.error = error.toString();
            this.data = undefined;
        }
    }

    connectedCallback(){
        registerListener('modify',this.handleModify,this);
    }

    disconnectedCallback(){
        unregisterAllListeners(this);
    }

    handleModify(teamId){
        this.teamId = teamId;
    }

    handleProceed(){
        
        if(this.showTabOne){
            let el = this.template.querySelector('lightning-datatable[data-type="players"]');
            let selected = el.getSelectedRows();
            this.showTabOne=false;
            this.showTabTwo = true;
            this.selectedPlayers = selected;
        }else if(this.showTabTwo){
            let el = this.template.querySelector('lightning-datatable[data-type="captain"]');
            let selectedCaptainRow = el.getSelectedRows();
            // console.log(selectedCaptainRow);
            // console.log(selectedCaptainRow[0].Id);
            this.selectedCaptainID = selectedCaptainRow[0].Id;
            // console.log('Captain: '+this.selectedCaptainID);
            this.selectedCaptain = [];
            this.selectedPlayers.forEach(currentItem => {
                if(currentItem.Id !== this.selectedCaptainID){
                    // console.log(currentItem.Name);
                    this.selectedCaptain.push(currentItem);
                }
            });
            // console.log(this.selectedCaptain);
            this.showTabTwo=false;
            this.showTabThree = true;
        }else if(this.showTabThree){
            let el = this.template.querySelector('lightning-datatable[data-type="vicecaptain"]');
            let selectedViceCaptainRow = el.getSelectedRows();
            this.selectedVCID = selectedViceCaptainRow[0].Id;
            console.log('Vice Captain        '+ selectedViceCaptainRow[0].Name);
            this.validateInput();
            this.showTabThree = false;
            this.showTabFour = true;
        }
    }

    validateInput(){
        let numBat=0,numBowl=0,numAllRounder=0,numWK=0;
        let strength=0;
        
        console.log(this.selectedPlayers);
        this.selectedPlayers.forEach(element => {
            strength++;
            if(element.Role__c === 'Batsman'){numBat+=1;}
            else if(element.Role__c === 'Bowler'){numBowl+=1;}
            else if(element.Role__c === 'All Rounder'){numAllRounder+=1;}

            if(element.Is_Wicket_Keeper__c){
                numWK+=1;
            }

        });
        console.log(numBat,numBowl,numAllRounder,numWK);
        if(!this.validateCountryCondition() || numBat < 4 || numBowl <3 || numAllRounder <2 || numWK <1 || strength < 11 ){
            const event = new ShowToastEvent({
                title: 'Invalid input.',
                variant:'error',
                message:
                    'Your team does not meet the required standards. Please read the guidelines and try again.',
            });
            this.dispatchEvent(event);
        }else{
            this.saveData();
        }
    }

    saveData(){
        const playerId = this.selectedPlayers.map(ele => ele.Id);
        associatePlayers({teamId : this.teamId, playerIDs : playerId, captainId: this.selectedCaptainID, viceCaptainID : this.selectedVCID})
        .then((result) => {
               console.log(result);
               this.finalTeam = result;
               this.showButton = false;
               const event = new ShowToastEvent({
                title: 'Success',
                variant:'success',
                message:
                    'Your team configuration was saved.',
            });
            this.dispatchEvent(event);
        })
        .catch((error) => {
            console.log(error);
        })

    }

    validateCountryCondition(){
        const countryMap = new Map();
        // eslint-disable-next-line consistent-return
        this.selectedPlayers.forEach(element => {
            if(!countryMap.has(element.Country__c)){
                countryMap.set(element.Country__c,1);
            }else{
                let value = countryMap.get(element.Country__c);
                countryMap.set(element.Country__c,(value+1));
            }
        });
        console.log(countryMap);
        for (let value of countryMap.values()){
            if(value > 5) {return false;}
        }
        return true;
    }
}