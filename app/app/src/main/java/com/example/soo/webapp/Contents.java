package com.example.soo.webapp;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class Contents {
    String id;
    String category;
    String title;
    String content;
    String price;
    String imgurl;



    public Contents(String id, String category, String title, String content, String price, String imgurl) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.content = content;
        this.price = price;
        this.imgurl = imgurl;
    }

    public String toString() {
        return String.format(" Category : %s \n Title : %s \n Content : %s \n price : %s \n Imgurl : %s", category, title, content, price, imgurl);
    }


}
