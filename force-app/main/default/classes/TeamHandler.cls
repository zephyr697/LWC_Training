public with sharing class TeamHandler {

    @AuraEnabled(cacheable=true)
    public static List<Team__c> getTeams(){
        List<Team__c> res = new List<Team__c>();
        try {
            res = [Select Id,Name,Team_Strength__c,Team_Name__c from Team__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
            
        }
        return res;
    }

}