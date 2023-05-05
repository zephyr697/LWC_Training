public with sharing class ContactAndLeadSearch {

    public static List<List<SObject>> searchContactsAndLeads(String param){

        List<List<SObject>> res = [Find :param In Name Fields Returning Lead(Name,Phone), Contact(Name,Phone)];
        return res;
    }


}