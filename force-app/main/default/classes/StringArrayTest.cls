public with sharing class StringArrayTest {
    

    public static List<String> generateStringArray(Integer n){

        List<String> res = new List<String>();
        String str = 'Test';
        for(Integer i=0; i<n; i++){
            res.add(str + ' ' + (i+1));
        }
        return res;
    }
}