public with sharing class AcctControllerLWC {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAcctList(){
        List<Account> listAcct =  [
                SELECT Id,Name,AccountNumber,Type,Website,BillingCountry
                FROM Account DSC 
                WITH SECURITY_ENFORCED
                LIMIT 7 
            ];
        return listAcct;
    }

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOptyList(){
        List<Opportunity> listAcct =  [
                SELECT Id,Name,Amount
                FROM Opportunity
                WITH SECURITY_ENFORCED
            ];
        return listAcct;
    }

    @AuraEnabled(cacheable=true)
    public static List<Lead> getLeadList(){
        List<Lead> listAcct =  [
                SELECT Id,Name
                FROM Lead
                WITH SECURITY_ENFORCED
            ];
        return listAcct;
    }
}