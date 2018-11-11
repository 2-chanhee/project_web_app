package com.example.soo.webapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioGroup;

import org.json.JSONException;
import org.json.JSONObject;

public class Enrollment extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_enrollment);

        Button insertBtn = (Button) findViewById(R.id.insertBtn);
        insertBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                EditText edit_title = (EditText) findViewById(R.id.title);
                EditText edit_content = (EditText) findViewById(R.id.content);
                EditText edit_author = (EditText) findViewById(R.id.price);
                /////radio bun/////
                RadioGroup radioGroup=(RadioGroup) findViewById(R.id.radio);
                int check =radioGroup.getCheckedRadioButtonId();
                String category = "notcheck";
                switch (check){
                    case R.id.book : category="책";break;
                    case R.id.elect : category="전자기기";break;
                    case R.id.etc : category="기타";break;
                    default: break;

                }

                /////

                JSONObject postDataParam = new JSONObject();
                try {
                    postDataParam.put("category", category);
                    postDataParam.put("title", edit_title.getText().toString());
                    postDataParam.put("content", edit_content.getText().toString());
                    postDataParam.put("price", edit_author.getText().toString());
                } catch (JSONException e) {
                    Log.e("등록창", "JSONEXception");
                }
                new InsertData(Enrollment.this).execute(postDataParam);
                new GetData(Enrollment.this).execute();
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

            case R.id.chat:
                Intent intent3=new Intent(getApplicationContext(),Category.class);
                startActivity(intent3);
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
