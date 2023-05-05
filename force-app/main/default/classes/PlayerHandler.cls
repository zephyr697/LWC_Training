public with sharing class PlayerHandler {
   
    @AuraEnabled(cacheable=true)
    public static List<Player__c> getPlayers(){
        List<Player__c> data;
        try {
            data = [Select Id,Name,	Country__c,Is_Alloted__c,Is_Captain__c,Is_Vice_Captain__c,Is_Wicket_Keeper__c,Role__c,Team__c From Player__c Where Is_Alloted__c = false];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return data;
    }

    @AuraEnabled(cacheable=true)
    public static List<Player__c> getPlayersByTeam(String teamId){
        List<Player__c> data;
        try {
            data = [Select Id,Name,	Country__c,Is_Alloted__c,Is_Captain__c,Is_Vice_Captain__c,Is_Wicket_Keeper__c,Role__c,Team__c From Player__c Where Is_Alloted__c = false And Team__c =:teamId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return data;
    }

    @AuraEnabled
    public static List<Player__c> associatePlayers(String teamId, List<ID> playerIDs, String captainId, String viceCaptainID){
        
        List<Player__c> playerList = [Select Id,Name,	Country__c,Is_Alloted__c,Is_Captain__c,Is_Vice_Captain__c,Is_Wicket_Keeper__c,Role__c,Team__c From Player__c Where Id IN :playerIDs];

        Team__c team = [Select Id,Team_Strength__c From Team__c WHERE Id =:teamId];

        for(Player__c p : playerList){
            p.Team__c = teamId;
            p.Is_Alloted__c = true;
            if(p.Id == captainId){p.Is_Captain__c = true;}
            if(p.Id == viceCaptainID){p.Is_Vice_Captain__c = true;}
        }
        team.Team_Strength__c = playerList.size();
        update team;
        update playerList;
        return playerList;
    }
}