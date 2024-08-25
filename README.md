
# What is your Ripple Effect?: Track Your Water Footprint
 Ripple Effect is a mobile Progressive Web App (PWA) designed to empower you to understand and manage your water footprint. It guides you through calculating your water consumption based on your dietary choices, tracks your progress over time, and allows you to share your water footprint data for positive social impact.

## Getting Started
### Prerequisites:
### Development Environment:
- Node.js and npm (or yarn): Ensure these tools are installed for server-side development.
- TypeScript: This statically typed language is used for building the server. Make sure you have it installed globally or locally.
### Android Environment:
- Android Studio: Download and install the latest version to develop the app.
- Android SDK: Set up the necessary Android SDK components within Android Studio.
- Java Development Kit (JDK): A compatible JDK is required for Android development. Android Studio might bundle one, but you may need a specific version.
## Setting Up the Server:
### 1. Clone the repository: 
```
git clone https://github.com/arghyam/ripple-effect.git
```
### 2. Install dependencies:
Navigate to the server directory and run:
```
cd ripple-effect/server
npm install
```
### 3. Configure Environment Variables:
Create a .env.local file at the root of the server directory and add the following variables, replacing placeholders with your actual values:

| Environment Variable | Description |
|---|---|
| DB_DIALECT | Database dialect (e.g., postgres, mysql) |
| DB_HOST | Database host address |
| DB_PORT | Database port number |
| DB_NAME | Database name |
| DB_USERNAME | Database username |
| DB_PASSWORD | Database password |
| SERVER_PORT | Server port number (e.g., 3000) |
| JWT_SECRET | Secret key for JSON Web Tokens |
| NODEMAILER_HOST | Email server host (if used for notifications) |
| NODEMAILER_PORT | Email server port (default for SMTP) |
| NODEMAILER_AUTH_USER | Email authentication username (if used) |
| NODEMAILER_AUTH_PASSWORD | Email authentication password (if used) |
| NODEMAILER_SENDER_MAIL | Email address used for sending notifications (if used) |

### 4. Optional: Build TypeScript Code:
If your project has a build step, run:
```
tsc
```
### 5. Start the server:
Navigate to the dist directory and run:
```
cd dist
node index.js
```

## Building the Android App:
### 6. Clone the Repository (if not already done):
See step 1 from the server setup.
### 7. Open Project in Android Studio:
- Launch Android Studio.
- Click "Open an existing Android Studio project".
- Select the client directory of the cloned repository.

### 8. Sync Project:
Wait for Android Studio to synchronize the project with Gradle. This might take some time.

### 9. Run the App:
- Click the green "Run" button in the toolbar.
- Choose an emulator or connected device to run the app.

## Building a Signed APK for Release:
### 1. Configure Build Types:
Open the app-level build.gradle file and ensure you have defined debug and release build types. For the release type, configure signing configurations:

```
buildTypes {
    release {
        isMinifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'   

    }
}
```
### 2. Generate a Signed APK:

Go to Build -> Generate Signed Bundle / APK.
Choose APK and click Next.
Select your keystore and provide the necessary passwords.
Choose the output directory and build type (release).
Click Finish.
Replace placeholders with your actual keystore information.

## Finding the Generated APK:
The signed APK will be located in the output directory you specified in the previous step.

### Choosing a Build Environment:

Development: Use the debug build type for testing


## Expected Outcome
A mobile (PWA) app that users can interact with. It will allow users to
Calculate their water footprint by entering the food they consume
Track their water footprint
Share their water footprint chart on social media

## Implementation Details
Any other frameworks can be used
NextJS
NodeJS
MySQL
Android Studio
VS Code
PgAdmin

### Contributor : Keval Kanpariya

| Image 1 | Image 2 | Image 3 |
|---|---|---|
| ![](https://github.com/user-attachments/assets/3b678598-5ecd-4abc-bc81-034e44fd473f) | ![](https://github.com/user-attachments/assets/879d81c0-465f-4324-917f-4145175445f1) | ![](https://github.com/user-attachments/assets/3610e46e-1a43-411f-b94a-e88d75e65542) |
| Image 4 | Image 5 | Image 6 |
| ![](https://github.com/user-attachments/assets/74b68503-398c-4648-9605-05d777cbef86) | ![](https://github.com/user-attachments/assets/5afeee9c-b2e2-4abc-a7b1-8a1662bbe846) | ![](https://github.com/user-attachments/assets/d963e7fe-9542-41b2-b920-bd880632c9c9) |
| Image 7 | Image 8 | Image 9 |
| ![](https://github.com/user-attachments/assets/450571a0-0c48-4726-85ef-cc0fa8a11af6) | ![](https://github.com/user-attachments/assets/f61c6e56-2491-44ec-b2b9-31bbb39be4e1) | ![](https://github.com/user-attachments/assets/a46464a9-c130-47f6-87a6-69e364108b77) |
| Image 10 | Image 11 | Image 12 |
| ![](https://github.com/user-attachments/assets/6098809c-f742-4d21-9a2f-200152631e72) | ![](https://github.com/user-attachments/assets/65b0c595-fa85-48db-a0c4-564265689bba) | ![](https://github.com/user-attachments/assets/e6ad038f-b356-4405-8877-4b19adeb5962) |


 










