import { LightningElement } from 'lwc';

export default class Comp1_Day1 extends LightningElement {

    text = '';

    handleClick(event){
        this.text = event.target.label + ' button was clicked!';
        var element = this.template.querySelector('[data-id="text"]');
        console.log(element);
        if(event.target.label == 'Red'){
            element.classList.remove("textblue");
            element.classList.add("textred");
        }else if(event.target.label == 'Blue'){
            element.classList.remove("textred");
            element.classList.add("textblue");
        }
    }
}