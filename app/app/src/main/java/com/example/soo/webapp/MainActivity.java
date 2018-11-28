package com.example.soo.webapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Adapter;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListView;

import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button enroll=(Button)findViewById(R.id.enroll);
        enroll.setOnClickListener(new OnClickListener() {
                                      @Override
                                      public void onClick(View v) {
        Intent enrollintent=new Intent(getApplicationContext(),Enrollment.class);
        startActivity(enrollintent);

                                      }
                                  });


        new GetData(MainActivity.this).execute();//첫 화면부터 db불러옴
        /////
        ListView txtList = (ListView) findViewById(R.id.listview);
        txtList.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Adapter adapter = adapterView.getAdapter();
                JSONObject postDataParam = new JSONObject();
                try {
                    postDataParam.put("id", ((Contents)adapter.getItem(i)).id);
                } catch (JSONException e) {
                    Log.e("listview", "JSONEXception");
                }
                new DeleteData(MainActivity.this).execute(postDataParam);//관리자페이지는 아니지만 관리하기 편하게 임시로 구현
                new GetData(MainActivity.this).execute();
            }
        });

        /////

        Button search =(Button)findViewById(R.id.searchbtn);
        search.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                new GetDataSearch(MainActivity.this).execute();
            }
        });
    }
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu, menu);
        return super.onCreateOptionsMenu(menu);
    }
    public boolean onOptionsItemSelected(MenuItem item){
        switch (item.getItemId()){
            case R.id.home:
                Intent intent=new Intent(getApplicationContext(),MainActivity.class);
                startActivity(intent);
                return true;

            case R.id.category:
                Intent intent1=new Intent(getApplicationContext(),Category.class);
                startActivity(intent1);
                return true;

            case R.id.login:
                Intent intent2=new Intent(getApplicationContext(),Login.class);
                startActivity(intent2);
                return true;

                default:
                    return super.onOptionsItemSelected(item);
        }

    }
}
