# Full Stack Serverless

# First steps

## Install and Configure

```bash
npm i -g @aws-amplify/cli
amplify configure
```

This will take you through the workflow for creating a new user. If you have an existing user, just enter that user's name, and follow along, just cancelling out the opened browser windows (i.e. Don't create the new user in IAM). At the end, you'll be able to simply enter the existing user's Access Key ID and Secret Access Key

## First Project

### Install Dependencies

```bash
npx create-react-app amplify-app && cd amplify-app
npm i aws-amplify @aws-amplify/ui-react
```

### Initialize Project

```bash
amplify init
```

#### Amplify Init Prompts

```
? Enter a name for the project (amplifyapp)
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react
? Source Directory Path:  src
? Distribution Directory Path: build
? Build Command:  npm run-script build
? Start Command: npm run-script start
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use: amplify-pdamra
```

Amplify then sets up the project using CloudFormation
The output will appear similar to:

```
CREATE_COMPLETE amplify-amplifyapp-dev-151919 AWS::CloudFormation::Stack Sat Jan 02 2021 15:19:49 GMT-0700 (Mountain Standard Time)
✔ Successfully created initial AWS cloud resources for deployments.
✔ Initialized provider successfully.
Initialized your environment successfully.

Your project has been successfully initialized and connected to the cloud!

Some next steps:
"amplify status" will show you what you've added already and if it's locally configured or deployed
"amplify add <category>" will allow you to add features like user login or a backend API
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify console" to open the Amplify Console and view your project status
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud

Pro tip:
Try "amplify add api" to create a backend API and then "amplify publish" to deploy everything
```

Additional details about generated files provided in Amplify README: [Amplify Generated Readme](./amplify-app/amplify/README.md)

### Create Your First Service

#### Add Auth Service

```bash
amplify add auth
```

Follow the prompts, selecting the defaults:

```
Do you want to use the default authentication and security configuration? Default configuration
 Warning: you will not be able to edit these selections.
 How do you want users to be able to sign in? Username
 Do you want to configure advanced settings? No, I am done.
Successfully added auth resource amplifyappe36fdbd1 locally

Some next steps:
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud
```

#### Deploy the Service

```bash
amplify push
```

This will trigger a deployment using CloudFormation.

### Add Amplify to UI

- Use `Amplify` and the config from `./aws-exports` to configure the app to use Amplify
- Use the `withAuthenticator` and `AmplifySignOut` components from `@aws-amplify/ui-react` to add Auth

This will wrap the entire `<App />` in a generated auth component with built in Auth flow

- Sign up form
- Sign in form
- Reset password
- Email 2FA on signup
- MFA confirmation form
