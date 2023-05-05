import { LightningElement,wire } from 'lwc';
import getAcctList from '@salesforce/apex/AcctControllerLWC.getAcctList';

export default class Iterators extends LightningElement {

    @wire(getAcctList) accts;
}