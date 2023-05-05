public with sharing class AccountHandler {
    
    
    public static Account insertNewAccount(String input){
        Account acc = new Account(Name=input);
        try {
            insert acc;
        } catch (Exception e) {
            System.debug(e.getMessage());
            return null;
        }

        Account acc1 = [Select id,name from Account where Name =:input];
        return acc1;
    }
}