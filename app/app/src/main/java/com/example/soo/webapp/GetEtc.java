package com.example.soo.webapp;

import android.app.Activity;
import android.util.Log;
import android.widget.ListView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

public class GetEtc extends GetRequest{
    public GetEtc(Activity activity) {
        super(activity);
    }
    protected void onPreExecute() {

        String serverURLStr = "http://13.125.246.86:3000/employees";
        try {
            url = new URL(serverURLStr+"/get"+"-"+"data");  // 여기서 AWS 주소를 넣어야 한다.
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onPostExecute(String jsonString) {
        if (jsonString == null)
            return;
        ArrayList<Contents> arrayList = getArrayListFromJSONString(jsonString);

//        ArrayAdapter adapter = new ArrayAdapter(activity,
//                android.R.layout.simple_list_item_1,
//                arrayList.toArray());
        MyAdapter adapter =new MyAdapter(activity, R.layout.adapter,arrayList);
        ListView txtList = activity.findViewById(R.id.listviewcategory);
        txtList.setAdapter(adapter);
        txtList.setDividerHeight(10);
    }



    protected ArrayList<Contents> getArrayListFromJSONString(String jsonString) {
        ArrayList<Contents> output = new ArrayList();
        try {

            JSONArray jsonArray = new JSONArray(jsonString);

            for (int i = 0; i < jsonArray.length(); i++) {

                JSONObject jsonObject = (JSONObject) jsonArray.get(i);
                if(jsonObject.getString("category").equals("기타")) {
                    Contents book = new Contents(jsonObject.getString("_id"),
                            jsonObject.getString("category"),
                            jsonObject.getString("title"),
                            jsonObject.getString("content"),
                            jsonObject.getString("price"),
                            jsonObject.getString("imgurl"));

                    output.add(book);
                }
            }
        } catch (JSONException e) {
            Log.e(TAG, "Exception in processing JSONString.", e);
            e.printStackTrace();
        }
        return output;
    }
}
