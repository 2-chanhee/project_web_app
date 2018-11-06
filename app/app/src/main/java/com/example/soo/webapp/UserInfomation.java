package com.example.soo.webapp;

public class UserInfomation {
    String id;
    String pass;
    String email;


    public UserInfomation(String id,String pass, String email,String address){
        this.id=id;
        this.pass=pass;
        this.email=email;

    }
    public String toString() {
        return String.format("ID = %s \n pass = %s \n email = %s ",id,pass,email);
    }

}
