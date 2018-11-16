package com.example.soo.webapp;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v4.content.FileProvider;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RadioGroup;
import android.widget.Toast;
import android.widget.VideoView;

import com.amazonaws.auth.CognitoCachingCredentialsProvider;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferObserver;
import com.amazonaws.mobileconnectors.s3.transferutility.TransferUtility;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Enrollment extends AppCompatActivity {
    static final int REQUEST_VIDEO_CAPTURE = 2;
    final int REQUEST_EXTERNAL_STORAGE_FOR_MULTIMEDIA = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_enrollment);
        checkDangerousPermissions();

        Button insertBtn = (Button) findViewById(R.id.insertBtn);
        insertBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new Thread(){
                    public void run(){
                        s3upload();
                    }
                }.start();
                //네트워크특성상 가져오는 데이터 양이 정해져 있지 않기 때문에 쓰레드 추가해야 한다고 함..
                //
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
                    postDataParam.put("imgurl","https://s3.ap-northeast-2.amazonaws.com/webwep/"+mPhotoFileName);
                } catch (JSONException e) {
                    Log.e("등록창", "JSONEXception");
                }
                new InsertData(Enrollment.this).execute(postDataParam);
               // new GetData(Enrollment.this).execute();
                //////

            }
        });

        ////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////s3 접속시작/////////////////////////////////
        /////////////////////////////////oncrete()안////////////////////////////////
// Amazon Cognito 인증 공급자를 초기화합니다
        CognitoCachingCredentialsProvider credentialsProvider = new CognitoCachingCredentialsProvider(
                getApplicationContext(),
                "ap-northeast-2:1c649722-8ef1-464a-87e6-5c2c49fd2000", // 자격 증명 풀 ID
                Regions.AP_NORTHEAST_2 // 리전
        );

        AmazonS3 s3 = new AmazonS3Client(credentialsProvider);
        // S3 버킷의 Region 이 서울일 경우 아래와 같습니다.
        s3.setRegion(Region.getRegion(Regions.AP_NORTHEAST_2));
        s3.setEndpoint("s3.ap-northeast-2.amazonaws.com");

        TransferUtility transferUtility = new TransferUtility(s3, getApplicationContext());









///////////////////////////////
//        사진찍기 시작        //
///////////////////////////////
        Button imageCaptureBtn = findViewById(R.id.camara);
        imageCaptureBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dispatchTakePictureIntent();

            }
        });
    }
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu, menu);
        return super.onCreateOptionsMenu(menu);
    }

    //사진 찍기
    String mPhotoFileName;
    File mPhotoFile;
    static final int REQUEST_IMAGE_CAPTURE = 1;

    private String currentDateFormat(){
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd_HH_mm_ss");
        String  currentTimeStamp = dateFormat.format(new Date());
        return currentTimeStamp;
    }

    private void dispatchTakePictureIntent() {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);

        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
            //1. 카메라 앱으로 찍은 이미지를 저장할 파일 객체 생성
            mPhotoFileName = "IMG"+currentDateFormat()+".jpg";
            mPhotoFile = new File(getExternalFilesDir(Environment.DIRECTORY_PICTURES), mPhotoFileName);

            if (mPhotoFile !=null) {

                ///
                //2. 생성된 파일 객체에 대한 Uri 객체를 얻기
                Uri imageUri = FileProvider.getUriForFile(this, "com.example.soo.webapp", mPhotoFile);
                //authority에 패키지이름 고쳐주기
                Log.e("S3", mPhotoFileName+"제발..");
                //3. Uri 객체를 Extras를 통해 카메라 앱으로 전달
                takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT,imageUri);
                startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);

            } else
                Toast.makeText(getApplicationContext(), "file null", Toast.LENGTH_SHORT).show();
        }
    }

    /////7.0이상///
    //7.0이상 카메라 관련 코드 참고
    private File destination =null;
    protected void onActivityResult(int requestCode, int resultCode, Intent data){
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            if (mPhotoFileName != null) {
                mPhotoFile = new File(getExternalFilesDir(Environment.DIRECTORY_PICTURES), mPhotoFileName);

                ImageView ImageView = findViewById(R.id.camaraimage);
                ImageView.setImageURI(Uri.fromFile(mPhotoFile));
                //mAdapter.addItem(new MediaItem(MediaItem.SDCARD, mPhotoFileName, Uri.fromFile(mPhotoFile), MediaItem.IMAGE));
            }
        }
// 아래 비디온대 필요없지만 일단 주석
//        else if (requestCode == REQUEST_VIDEO_CAPTURE && resultCode == RESULT_OK) {
//            if (mVideoFileName != null) {
//                destination = new File(getExternalFilesDir(Environment.DIRECTORY_MOVIES), mVideoFileName);
//                videoView = (VideoView) findViewById(R.id.videoView);
//                videoView.setVideoURI(Uri.fromFile(destination));
//
//                videoView.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
//                    public void onPrepared(MediaPlayer player) {
//                        videoView.seekTo(0);
//                        videoView.start();
//                    }
//                });
//            }
//            else
//                Toast.makeText(getApplicationContext(), "!!! null video.", Toast.LENGTH_LONG).show();
//        }

    }


    //////사진찍기마지막////

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
    /////////////권한시작/////////
    private void checkDangerousPermissions() {
        String[] permissions = {
                Manifest.permission.READ_EXTERNAL_STORAGE,
                Manifest.permission.WRITE_EXTERNAL_STORAGE,
        };

        int permissionCheck = PackageManager.PERMISSION_GRANTED;
        for (int i = 0; i < permissions.length; i++) {
            permissionCheck = ContextCompat.checkSelfPermission(this, permissions[i]);
            if (permissionCheck == PackageManager.PERMISSION_DENIED) {
                break;
            }
        }

        if (permissionCheck != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, permissions, REQUEST_EXTERNAL_STORAGE_FOR_MULTIMEDIA);

        }
    }//외부메모리 확인되지 않을시 멈추는거

//오디온듯 일단주석
//    public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
//        if (grantResults.length > 0
//                && grantResults[0] == PackageManager.PERMISSION_GRANTED) { // permission was granted
//            switch (requestCode) {
//                case REQUEST_EXTERNAL_STORAGE_FOR_MULTIMEDIA:
//                    playAudioFromExternalStorage();
//                    break;
//            }
//        } else { // permission was denied
//            Toast.makeText(getApplicationContext(),"접근 권한이 필요합니다",Toast.LENGTH_SHORT).show();
//        }
//    }//외부메모리에서 allow누르면 바로 노래 재생 권한설정
//권한끝//
public void s3upload(){//s3upload관련해서 따로 메소드 만듬
    // Amazon Cognito 인증 공급자를 초기화합니다
    CognitoCachingCredentialsProvider credentialsProvider = new CognitoCachingCredentialsProvider(
            getApplicationContext(),
            "ap-northeast-2:1c649722-8ef1-464a-87e6-5c2c49fd2000", // 자격 증명 풀 ID
            Regions.AP_NORTHEAST_2 // 리전
    );

    AmazonS3 s3 = new AmazonS3Client(credentialsProvider);
    // S3 버킷의 Region 이 서울일 경우 아래와 같습니다.
    s3.setRegion(Region.getRegion(Regions.AP_NORTHEAST_2));
    s3.setEndpoint("s3.ap-northeast-2.amazonaws.com");

    TransferUtility transferUtility = new TransferUtility(s3, getApplicationContext());
    Log.e("S3", mPhotoFileName+"제발..");
//                TransferObserver observer = transferUtility.upload(
//
//                        "webwep",     /* 업로드 할 버킷 이름 */
//                        mPhotoFileName,    /* 버킷에 저장할 파일의 이름 */
//                        mPhotoFile        /* 버킷에 저장할 파일  */
//                );
    s3.putObject("webwep",mPhotoFileName,mPhotoFile);
}
}
