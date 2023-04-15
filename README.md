# NomNom - Cloud-based SaaS Recommendation Application
NomNom is an innovative cloud-based SaaS recommendation application that revolutionises the way people discover and review restaurants in Singapore. <br>

This README includes detailed steps on how to test and set up the SaaS. <br>

For any enquiries or assistance on reproducing NomNom, please email tanzhuoyao@gmail.com. <br>

## Steps to Test the SaaS
1. Navigate to the url where the web application is deployed and you will be greeted with a landing page as shown:

![ScreenShot](https://user-images.githubusercontent.com/65531702/232206187-d6f215b3-340d-4917-a2bc-229951066271.png)

2. If you already have an account, click on the Login button to be redirected to the login page, where your login credentials will be verified by AWS Amplify. <br>
   If you don't have an account yet, click on the Signup button to sign up for an account, which includes email verification.

![ScreenShot](https://user-images.githubusercontent.com/65531702/232206280-0aa6171b-6877-4477-a657-be68b2095d52.png)

3. Once logged in, you will be redirected to the home page, where you can see the latest reviews of users that you are following:

![ScreenShot](https://user-images.githubusercontent.com/65531702/232206315-2d2f931a-a365-4b6f-b870-bf879850b8cb.png)

4. You can write a review about the latest restaurant you've been to and upload it:

![ScreenShot](https://user-images.githubusercontent.com/65531702/232206350-fcf8c2ce-0cce-449a-b91e-e950d7318f7d.png)

5. Once uploaded, the data will then be uploaded to Amazon RDS and S3 and be displayed on your feed:

![ScreenShot](https://user-images.githubusercontent.com/65531702/232206363-118ea143-f3c9-4289-8934-f676afe00548.png)

   The photo uploaded can also be found in the Amazon S3 bucket within the console:
   
   ![ScreenShot](https://user-images.githubusercontent.com/65531702/232206396-f28b8f7e-0ac8-46ad-bd74-7faa7b300d9a.png)
   

## Steps to Setup the SaaS
1. In  your EC2 (ubuntu) instance, run the following commands to set up the environment: <br>
  ```
  sudo apt-get update
  sudo apt-get install nginx
  sudo systemctl restart nginx
  sudo apt-get install curl
  curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
  sudo apt-get install -y nodejs
  sudo npm install pm2@latest -g
  sudo npm install -g serve
  ```


2. In the root directory, run the command:
  ```
  git clone https://github.com/tan-zhuoyao/NomNom.git
  ```


3. Change directory to `nomnom-app`, and create a `.env` file with the following variables:

   <img width="379" alt="image15" src="https://user-images.githubusercontent.com/65531702/232206867-010d343a-8b0e-4a79-8fe6-0cb61bfd84c9.png">

   Replace the `REACT_APP_SERVER_URL` with your own public ec2 instance IP.
   
   
4. Change directory to `nomnom-service`, and create a `.env` file with the following variables:

   <img width="530" alt="image20" src="https://user-images.githubusercontent.com/65531702/232206955-9ea31256-0bc2-412d-94ab-89e7b63b37ea.png">

   Replace `AWS_HOST`, `AWS_PORT`, `AWS_USER` and `AWS_PW`, `AWS_ACCESS_KEY`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` and `S3_BUCKET_URL` with your AWS RDS configurations.
 
 
5. Run `npm install` in both the `nomonom-app` and `nomnom-service` folders to install all relevant dependencies.


6. To do port forwarding using nginx to forward port 80 to 3000: <br>

    a. In root directory, run `cd /etc/nginx/sites-available` <br>
    
    b. `vim default` <br>
    
    c. Ensure that the file contains the configuration as shown below: <br>
  
    <img width="667" alt="image21" src="https://user-images.githubusercontent.com/65531702/232207163-6d20a90c-9516-4b5a-a82a-200bb04d6ce5.png">

7. To run nomnom-service: <br>

   Within nomnom-service, run `pm2 start server.js --name nomnom-server` and you should see the following output: <br>
  
   <img width="709" alt="image16" src="https://user-images.githubusercontent.com/65531702/232207186-3c745f7a-26f4-4f5d-87a8-482b4f11956a.png">

8. To run nomnom-app: <br>

    a. Within nomnom-app, run `npm run build` <br>
    
    b. To deploy and run the web application continuously on port 3000, run `pm2 serve build 3000 --spa --name nomnom-app` and you should see the following output: <br>

    <img width="704" alt="image17" src="https://user-images.githubusercontent.com/65531702/232207228-596503cf-b71d-468c-965e-0cdab06f8e00.png">

9. Run `pm2 status` to ensure services are up and running as following: <br>

   <img width="579" alt="image19" src="https://user-images.githubusercontent.com/65531702/232207250-17dfa22c-5b2e-4017-b2ac-f1ced5dc40a7.png">

   We can see that the web application is also now reachable: <br>
  
   ![ScreenShot](https://user-images.githubusercontent.com/65531702/232207273-c2a24c47-632e-472f-a24d-6c03db37574f.png)




  

