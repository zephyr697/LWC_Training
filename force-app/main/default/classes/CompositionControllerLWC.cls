public with sharing class CompositionControllerLWC {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String acctId){
        return [
            SELECT Id,Name,AccountId
            FROM Contact
            WHERE AccountId =:acctId
        ];
    }
}