import { LightningElement } from 'lwc';

export default class FormLWC extends LightningElement {


    gender = 'male';
    formData = {};

    get options() {
        return [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
        ];
    }
    handlePicklistValueChange(event) {
        this.gender = event.detail.value;
    }

    handleSubmit(){
        const formElements = this.template.querySelectorAll('lightning-input[id^="horizontal-input-id-"]');
        formElements.forEach((ele) => {
            this.formData[`${ele.name}`] = ele.value;
        });
        this.formData.gender = this.gender;
        console.log(this.formData);
    }
}