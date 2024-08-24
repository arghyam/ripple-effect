# Whats your Ripple Effect

## Setup/Installation
### Prerequisites for Server
 Node.js and npm (or yarn): Ensure Node.js and a package manager are installed.
 TypeScript: Make sure TypeScript is installed globally or locally in your project.
### Steps to run Server
1. Clone the repository: git clone https://github.com/arghyam/ripple-effect.git
2. Install dependencies:
cd ripple-effect/server
npm install
3. Create an .env.local file in server root directory and add environment variables:

DB_DIALECT= postgres
DB_HOST=
DB_PORT=
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
SERVER_PORT=
JWT_SECRET=
NODEMAILER_HOST=
NODEMAILER_PORT=587
NODEMAILER_AUTH_USER=
NODEMAILER_AUTH_PASSWORD=
NODEMAILER_SENDER_MAIL=

4. Build the TypeScript code (optional): If you have a build step, run it:
tsc
5. Start the server:
cd dist
node index.js

### Prerequisites for Android
 Android Studio: Download and install the latest version of Android Studio from
https://developer.android.com/studio.
 Android SDK: Ensure you have the necessary Android SDK components installed. You can
manage them through the Android Studio SDK Manager.
 Java Development Kit (JDK): Make sure you have a compatible JDK installed. Android Studio
usually bundles one, but you might need a specific version for your project.

### Steps to run Android Project
6. Clone the repository: git clone https://github.com/arghyam/ripple-effect.git
7. Open the project in Android Studio:
 Launch Android Studio.
 Click on &quot;Open an existing Android Studio project&quot;.
 Navigate to the cloned project directory client and select it.  
8. Sync the project: Wait for Android Studio to sync the project with the Gradle build system.
This might take a few minutes.
9. Run the app:
 Click on the green &quot;Run&quot; button in the Android Studio toolbar.
 Choose an emulator or connected device to run the app.

### Building a Signed APK for Release
1. Configure build types:
o Open your app-level build.gradle file.
o Ensure you have debug and release build types defined.
o For the release build type, configure signing configurations:

buildTypes {
release {
isMinifyEnabled = false
proguardFiles(
getDefaultProguardFile(&quot;proguard-android-
optimize.txt&quot;),
&quot;proguard-rules.pro&quot;
)
}
}

o Replace the placeholders with your actual keystore information.
### 2. Generate a signed APK:
o Go to Build -&gt; Generate Signed Bundle / APK.
o Choose APK and click Next.
o Select your keystore and provide the necessary passwords.
o Choose the desired output directory and build type (release).
o Click Finish.

### Finding the Generated APK
The signed APK will be located in the output directory you specified in the previous step.
Choosing a Build Environment

 Development environment: Use the debug build type for testing and development
purposes.
 Production environment: Use the release build type for creating the final app to be
distributed.

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

![image](https://github.com/user-attachments/assets/3b678598-5ecd-4abc-bc81-034e44fd473f)
![image](https://github.com/user-attachments/assets/879d81c0-465f-4324-917f-4145175445f1)
![image](https://github.com/user-attachments/assets/3610e46e-1a43-411f-b94a-e88d75e65542)
![image](https://github.com/user-attachments/assets/74b68503-398c-4648-9605-05d777cbef86)
![image](https://github.com/user-attachments/assets/5afeee9c-b2e2-4abc-a7b1-8a1662bbe846)
![image](https://github.com/user-attachments/assets/d963e7fe-9542-41b2-b920-bd880632c9c9)
![image](https://github.com/user-attachments/assets/450571a0-0c48-4726-85ef-cc0fa8a11af6)
![image](https://github.com/user-attachments/assets/f61c6e56-2491-44ec-b2b9-31bbb39be4e1)
![image](https://github.com/user-attachments/assets/a46464a9-c130-47f6-87a6-69e364108b77)
![image](https://github.com/user-attachments/assets/6098809c-f742-4d21-9a2f-200152631e72)
![image](https://github.com/user-attachments/assets/65b0c595-fa85-48db-a0c4-564265689bba)
![image](https://github.com/user-attachments/assets/e6ad038f-b356-4405-8877-4b19adeb5962)

 










