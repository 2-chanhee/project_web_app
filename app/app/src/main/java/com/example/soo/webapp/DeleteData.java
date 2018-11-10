package com.example.soo.webapp;

import android.app.Activity;
import android.widget.EditText;

import java.net.MalformedURLException;
import java.net.URL;

public class DeleteData extends PostRequest {
    public DeleteData(Activity activity) {
            super(activity);
        }

        @Override
        protected void onPreExecute() {
           // EditText server = activity.findViewById(R.id.server);
          //  String serverURLStr = server.getText().toString();
            String serverURLStr = "13.125.217.167";
            try {
                url = new URL(serverURLStr + "/delete");
            } catch (MalformedURLException e) {
                e.printStackTrace();
            }
        }
}
