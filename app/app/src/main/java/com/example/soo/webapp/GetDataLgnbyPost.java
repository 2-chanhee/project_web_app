package com.example.soo.webapp;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

public class GetDataLgnbyPost extends PostRequestLgn{
    public GetDataLgnbyPost(Activity activity) {
        super(activity);
    }

    @Override
    protected void onPreExecute() {
        //EditText server =  activity.findViewById(R.id.server);
        String serverURLStr = "http://13.125.246.86:3000/api/register";
        try {
            url = new URL(serverURLStr);  // 여기서 AWS 주소를 넣어야 한다.
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }



    @Override
    protected void onPostExecute(String jsonString) {
        if (jsonString == null)
            return;
//        ArrayList<Logininfo> arrayList = getArrayListFromJSONString(jsonString);

        if(getArrayListFromJSONString(jsonString)){
            Toast.makeText(activity.getApplicationContext(), "Login Succes", Toast.LENGTH_SHORT).show();
            Intent intent1=new Intent(activity.getApplicationContext(),MainActivity.class);
            activity.startActivity(intent1);
        }
        if(getArrayListFromJSONString(jsonString)==false) {
            Toast.makeText(activity.getApplicationContext(), "Login failed", Toast.LENGTH_SHORT).show();
        }
//        textView.setText(arrayList.indexOf(0));

    }


    protected boolean getArrayListFromJSONString(String jsonString) {
        ArrayList<Logininfo> output = new ArrayList();
        boolean loginresult=false;
        try {

            JSONArray jsonArray = new JSONArray(jsonString);

            for (int i = 0; i < jsonArray.length(); i++) {

                JSONObject jsonObject = (JSONObject) jsonArray.get(i);
                EditText email=(EditText)activity.findViewById(R.id.email);
                EditText password=(EditText)activity.findViewById(R.id.password);
                Log.e("login", email.getText().toString()+"과 "+jsonObject.getString("email"));
                if(email.getText().toString().equals(jsonObject.getString("email"))&&password.getText().toString().equals(jsonObject.getString("password"))){

                    loginresult=true;
                    Log.e("login", String.valueOf(loginresult));
                }

            }
        } catch (JSONException e) {
            Log.e("hihi", "Exception in processing JSONString.", e);
            e.printStackTrace();
        }
        return loginresult;
    }
}
