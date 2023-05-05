import { LightningElement } from 'lwc';
import getOptyList from '@salesforce/apex/AcctControllerLWC.getOptyList';
export default class OptyListLWC extends LightningElement {

    opties;

    connectedCallback(){
        getOptyList()
        .then(result => {
            this.opties = result;
        })
    }

    renderedCallback(){
        let nodes = this.template.querySelectorAll('span[data-type="amt"]');
        nodes.forEach(ele => {
            if(Number(ele.innerText) > 100000){
                let parent = ele.parentNode;
                parent.classList.add('green');
            }else{
                let parent = ele.parentNode;
                parent.classList.add('red');
            }
        });
    }

}