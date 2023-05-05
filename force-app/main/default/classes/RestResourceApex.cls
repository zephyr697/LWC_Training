@RestResource(urlMapping='/Account/*')
global with sharing class RestResourceApex {
    
    @HttpGet
    global static Boolean checkAccountExists() {
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
        String accountName = req.requestURI.substring(req.requestURI.lastIndexOf('/')+1);
        List<Account> result = [SELECT Id, Name, Phone, Website FROM Account WHERE Name = :accountName];
        return result.size() > 0 ? true : false;
    }
}