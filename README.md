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

### Cleaning Up AWS Resources

#### Delete a Feature

- `amplify remove auth`

#### Delete the Stack and Local Generated Files

- `amplify delete`

# CryptoApp API

## App Setup

```bash
npx create-react-app cryptoapp && cd cryptoapp
npm i aws-amplify
amplify init
```

Here, you'll have to answer the same prompts as before. Choose the defaults.

## Create a Serverless REST API

### Generate the Function Boilerplate

- `amplify add function`

Answer the prompts as follows:

```
? Select which capability you want to add: Lambda function (serverless function)
? Provide an AWS Lambda function name: cryptofunction
? Choose the runtime that you want to use: NodeJS
? Choose the function template that you want to use: Serverless ExpressJS function (Integration with API Gateway)

Available advanced settings:
- Resource access permissions
- Scheduled recurring invocation
- Lambda layers configuration

? Do you want to configure advanced settings? No
? Do you want to edit the local lambda function now? No
```

Take note of the output

```
Successfully added resource cryptofunction locally.

Next steps:
Check out sample function code generated in <project-dir>/amplify/backend/function/cryptofunction/src
"amplify function build" builds all of your functions currently in the project
"amplify mock function <functionName>" runs your function locally
"amplify push" builds all of your local backend resources and provisions them in the cloud
"amplify publish" builds all of your local backend and front-end resources (if you added hosting category) and provisions them in the cloud
```

### Edit the Function

- Note the generated files at `./cryptoapp/amplify/backend/function/cryptofunction`
- The function is an express app
- The routes are configured in src/app.js
- The API gateway event is proxied to the express server

#### Create a `/coins` Route

- Update app.js to add a `/coins` route that returns a static object

### Add the REST API

- `amplify add api`

Take note of the prompts

```
? Please select from one of the below mentioned services: REST
? Provide a friendly name for your resource to be used as a label for this category in the project: cryptoapi
? Provide a path (e.g., /book/{isbn}): /coins
? Choose a Lambda source Use a Lambda function already added in the current Amplify project
? Choose the Lambda function to invoke by this path cryptofunction
? Restrict API access No
? Do you want to add another path? No
```

### Deploy the API

- `amplify push`

## Create a React Client

- Add Amplify config to the index.js
- Create state data, and use `Amplify.API` to `get` the coin data
- Update the state and call the function in `useEffect`
- Iterate over the coin data and display
