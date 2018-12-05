package com.example.soo.webapp;

public class Logininfo {
    String id;
    String fullName;
    String email;
    String password;



    public Logininfo(String id, String fullName, String email, String password) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;

    }

//    public String toString() {
//        return String.format(" Category : %s \n Title : %s \n Content : %s \n price : %s \n Imgurl : %s", category, title, content, price, imgurl);
//    }


}
