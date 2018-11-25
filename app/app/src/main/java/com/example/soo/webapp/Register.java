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

import org.json.JSONException;
import org.json.JSONObject;

public class Register extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        final EditText rgrfullname=(EditText)findViewById(R.id.Rgrfullname);
        final EditText rgremail=(EditText)findViewById(R.id.Rgremail);
        final EditText rgrpassword=(EditText)findViewById(R.id.Rgrpassword);
        Button register=(Button)findViewById(R.id.Register);
        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                JSONObject postDataParam = new JSONObject();
                try {
                    postDataParam.put("fullname", rgrfullname.getText().toString());
                    postDataParam.put("email", rgremail.getText().toString());
                    postDataParam.put("password", rgrpassword.getText().toString());
//            postDataParam.put("price", edit_author.getText().toString());
//            postDataParam.put("imgurl","https://s3.ap-northeast-2.amazonaws.com/wpqkf/"+mPhotoFileName);
                } catch (JSONException e) {
                    Log.e("등록창", "JSONEXception");
                }
                new InsertLoginData(Register.this).execute(postDataParam);
//                 new GetDataLgn(Register.this).execute();
            }
        });

        /////


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
