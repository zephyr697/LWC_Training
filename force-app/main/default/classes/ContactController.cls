public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(){
        List<Contact> listContact =  [
                SELECT Id,Name,LastName
                FROM Contact
                
            ];
        return listContact;
    }
}