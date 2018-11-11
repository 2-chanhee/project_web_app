package com.example.soo.webapp;

public class Contents {
    String id;
    String category;
    String title;
    String content;
    String price;


    public Contents(String id, String category, String title, String content,String price){
        this.id=id;
        this.category=category;
        this.title=title;
        this.content=content;
        this.price=price;
    }
    public String toString() {
        return String.format(" Category : %s \n Title : %s \n Content : %s \n price : %s ",category,title,content,price);
    }

}
