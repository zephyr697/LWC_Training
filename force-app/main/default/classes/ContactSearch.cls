public with sharing class ContactSearch {
    
    public static List<Contact> searchForContacts(String param1, String param2){
        List<Contact> contacts = [Select Id,Name From Contact Where LastName=:param1 And MailingPostalCode=:param2];

        return contacts;
    }
}