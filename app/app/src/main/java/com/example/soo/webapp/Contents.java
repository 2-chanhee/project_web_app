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

    Bitmap bitmap;

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

    Thread mThread = new Thread() {
        public void run() {
            try {
                URL url = new URL(imgurl);
                //web에서 이미지 가져오고 imageview에 저장할 bitmap 생성
                HttpURLConnection con = (HttpURLConnection) url.openConnection();
                con.setDoInput(true);// 서버로부터 응답 수신
                con.connect();

                InputStream is = con.getInputStream();//InputStream값 가져오기
                bitmap = BitmapFactory.decodeStream(is);//Bitmap으로 변환
            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    };
    mThread.start();

}
