# project_web_app

#### server: nodeJS
#### database: mongoDB
#### front: angular, android

# AWS에서 실행 방법
## 1. 사전준비
1. 키페어 생성하기
2. 보안그룹 생성하기
3. **AWS**에서 (Linux) 인스턴스 시작
4. (Linux) 인스턴스 연결
5. Android Studio 설치
6. Visual code 설치(Local)


## 2. NodeJS 설치
Package Manager를 통한 NodeJS 설치

- https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-basedlinux-distributions
참조

```
[ubuntu ~]$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
```

```
[ubuntu ~]$ sudo apt-get install -y nodejs
```
## 3. MongDB 설치
Install MongoDB Community Edition on Ubuntu

- https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

1. Import the public key used by the package management system.

	```
	[ubuntu ~]$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
	```

2. Create a list file for MongoDB.

	Ubuntu 16.04

	```
	[ubuntu ~]$ echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
	```
	
3. Reload local package database.

	```
	[ubuntu ~]$ sudo apt-get update
	```
	
4. Install the MongoDB packages.

	```
	[ubuntu ~]$ sudo apt-get install -y mongodb-org
	```

5. Start MongoDB.
6. 
	```
	[ubuntu ~]$ sudo service mongod start
  
## 4. Angular 설치 (Local)

1. Visual code 실행

2. view -> extentions 에서 Angular 6 Snippets 설치

3.

	```
	[ubuntu ~]$ npm install -g @angular/cli
	'''
	
	```
	[ubuntu ~]$ ng --version
	'''
angular cli 설치 후 ng --version으로 확인


## 5. 프로젝트 다운로드 및 실행
1. GitHub 저장소에서 프로젝트 다운로드

	```
	[ubuntu ~]$ git clone https://github.com/Kimjongsoo/Project_wepapp
	```

2. project_server 폴더로 이동

	```
	[ubuntu ~]$ cd project_server
	```

3. /config/config.json 안의 MongoDB_URI의 ip를 사용자의 ip로 수정

4. /web/src/app/environmnets/environment.ts의 ip를 사용자의 ip로 수정

5. /web/src/app/shared/emplyee.service.ts의 readonly baseURL을 사용자의 ip로 수정

6. /web/src/app/shared/emplyee.user.service.ts의 readonly baseURL을 사용자의 ip로 수정

7. /project_server로 이동 후 npm install

8. /project_server/web으로 이동 후 npm install

9. ng build 명령어 실행

10. build가 완료되면 cd .. 명령어를 사용해 /progect_server로 이동

11. node app.js로 서버 실행

12. 자신의 ip:3000로 실행

--여기까지 실행하면 웹과 서버를 실행할 수 있다--

13.Android studio를 실행시킨다.

14.GetBook GetData GetDataLgn GetData GetDataLgn GetDataLgnbyPost GetDataSearch GetElect GetEtc
   InsertData InsertLoginData 클라스에 있는 (AWS 주소/경로)를 본인 주소경로로 바꾸어 준다.
   ex) String serverURLStr = "http://aws주소/경로";
   
15.Enrollment클라스에서 s3upload메소드 안에 있는 Amazon Cognito 인증 공급자를 초기화하여야 한다.
   aws에 들어가 Cognito에서 identityPoolId를 가져오고 리전도 맞게 적어준다. 
   다음과 같이 s3.putObject("S3폴더이름",mPhotoFileName,mPhotoFile);로 S3버켓이름도 적어주면 된다.
   Aws S3에 들어가 버켓정책에서 public 설정도 해주어야 한다.

16.API버전 26이하로 AVD를 실행시킨다.

17.웹과 앱이 잘 연동되는지 확인한다.

