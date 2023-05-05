import { LightningElement,track } from 'lwc';
// //import getAcctList from '@salesforce/apex/AcctControllerLWC.getAcctList';
// import NAME_FIELD from '@salesforce/schema/Account.Name';
// import NUMBER_FIELD from '@salesforce/schema/Account.AccountNumber';
// import TYPE_FIELD from '@salesforce/schema/Account.Type';
// import WEBSITE_FIELD from '@salesforce/schema/Account.Website';
// import COUNTRY_FIELD from '@salesforce/schema/Account.BillingCountry';

const COLS = [
    {
        label: 'Name',
        fieldName: 'title',
        editable: true
    },
    {
        label: 'Price',
        fieldName: 'price',
        editable: true
    },
    {
        label: 'Rating',
        fieldName:'rating',
        editable: true
    }
];


export default class Datatable extends LightningElement {

    columnsList=COLS;

    // @wire(getAcctList) 
    @track accts;

    connectedCallback(){
        this.logJSONData();
        console.log('.................'+this.accts);
    }

    logJSONData() {
        fetch("https://dummyjson.com/products")
        .then((response) => response.json())
        .then((data) => {console.log(data.products);
                         this.accts = data.products;   });
        
      }
}