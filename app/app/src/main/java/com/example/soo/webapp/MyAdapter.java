package com.example.soo.webapp;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

/**
 * Created by Kwanwoo on 2016-09-05.
 */
public class MyAdapter extends BaseAdapter {
    private Context mContext;
    private int mResource;
    Bitmap bitmap;
    ImageView imageView;
    private ArrayList<Contents> mItems = new ArrayList<Contents>();

    public MyAdapter(Context context, int resource, ArrayList<Contents> items) {
        mContext = context;
        mItems = items;
        mResource = resource;
    }

    @Override
    public int getCount() {
        return mItems.size();
    }

    @Override
    public Object getItem(int position) {
        return mItems.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(final int position, View convertView, ViewGroup parent) {

        if (convertView == null) {
            LayoutInflater inflater = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(mResource, parent,false);
        }
        ////
         //url받아와서 이미지 출력 코드 봉인
    Thread mThread = new Thread() {
        public void run() {
            try {
                URL url = new URL(mItems.get(position).imgurl);
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
    mThread.start();//쓰레드실행
    try

    {
        mThread.join();
        imageView=(ImageView)convertView.findViewById(R.id.iconItem);
        imageView.setImageBitmap(bitmap);
    }catch(
    InterruptedException e)

    {
        e.printStackTrace();
    }





        //////////



        // Set Text 01
        TextView category = (TextView) convertView.findViewById(R.id.category);
        category.setText("카테고리: "+mItems.get(position).category);

        // Set Text 02
        TextView title = (TextView) convertView.findViewById(R.id.title);
        title.setText("제목: "+mItems.get(position).title);

        // Set Text 02
        TextView content = (TextView) convertView.findViewById(R.id.content);
        content.setText("내용: "+mItems.get(position).content);

        // Set Text 02
        TextView price = (TextView) convertView.findViewById(R.id.price);
        price.setText("학번,번호: "+mItems.get(position).price);



        return convertView;
    }
}

