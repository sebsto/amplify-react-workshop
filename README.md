# Amplify & React Native Demo

This code and readme was built to illustrate the demo of the AWS Dev Day 2019 talk: "Integrate your front end apps with serverless backend in the cloud"
This talk has been proposed to a couple of third-party conferences as well.

The original app idea and steps are taken from [this blog post](https://medium.com/open-graphql/create-a-multiuser-graphql-crud-l-app-in-10-minutes-with-the-new-aws-amplify-cli-and-in-a-few-73aef3d49545
) from my Australian Solution Architect colleague [Ed Lima](https://twitter.com/ednergizer).

## Before the demo

I strongly suggest to go through the prerequisites and the phase 0, the initial scaffolding for the app, **before** you start the demo, as these steps take 10-15 minutes to complete.

### Prerequisites

- Have a dev machine, either your laptop or [Cloud 9](https://aws.amazon.com/cloud9/getting-started/)

- Have `node` v8.x or later.  On Cloud9 , type :

```bash
# add Node 10.15 and make it default 
$ nvm install 10.15

# verify the installation
$ node --version 
v10.15.1
```

- Install `amplify` command line and `create-react-app`

```bash
# install amplify command line tools
$ npm install -g @aws-amplify/cli

# install create react app script (only required if you do not git clone this repo)
$ npm install -g create-react-app

# verify the installation 
$ amplify --version
1.1.3
$ create-react-app --version
2.1.5

# if you do not have AWS CLI installed, configure amplify
# and provide it with an IAM user name, access key and secret key
# this is not necessary on Cloud9 (see below)
$ amplify configure 
```

Alternatively, on Cloud9, you can just supply with an `~/.aws/config` file by typing :

```bash
$ cat <<EOF > ~/.aws/config
[default]
region=eu-west-1
EOF
```

### Phase 0 : create a basic app

I recommend to start from the github repo at https://github.com/sebsto/amplify-react-workshop

1. Scaffold the app 

```bash
$ git clone https://github.com/sebsto/amplify-react-workshop

# install dependencies (takes 4 minutes on an m4.large instance)
$ cd amplify-react-workshop
$ npm install
```

Should you want to build the experience from scratch by yourself, this is the way to scaffold your app :

```bash
# to do only if you did not clone the repo as instructed above
$ npx create-react-app amplify-react-workshop
$ cd amplify-react-workshop
$ npm install --save aws-amplify aws-amplify-react bootstrap
```

2. Initialize `ampify`

```bash
$ amplify init 
? Enter a name for the project amplifyreactworkshop
? Enter a name for the environment dev
? Choose your default editor: None
? Choose the type of app that you re building javascript
Please tell us about your project
? What javascript framework are you using react
? Source Directory Path:  src
? Distribution Directory Path: build
? Build Command:  npm run-script build
? Start Command: npm run-script start
Using default provider  awscloudformation


For more information on AWS Profiles, see:
https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html

? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use default
⠋ Initializing project in the cloud...

... (takes 3 minutes to complete) ...

✔ Successfully created initial AWS cloud resources for deployments.
✔ Initialized provider successfully.
Initialized your environment successfully.

Your project has been successfully initialized and connected to the cloud!
```

3. Customize the look and feel (optional)

Open `App.css` and locate `App-header` (line 10).  
Remove : `min-height` line  
Add : `height: 100px;`

The `App-Header` should look like this :

```css
.App-header {
  background-color: #282c34;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}
```

4. Start the app 

```
$ npm start 
```

Then open `Preview` => `Preview running application` in Cloud 9 or open a browser tab and connect to `http://localhost:8080/`

Alternatively, the `Preview` tab in Cloud9 will give you an URL you can connect from your laptop's browser.  This is often more convenient to debug as it gives you access to all the browser debugger tools.  The URL will look like `https://3371d7bc799f4d089970e430ebcd3dea.vfs.cloud9.eu-west-1.amazonaws.com`  The exact URL will be different for your environment.

Your app should look like this:

![phase0](images/phase0.png)

This should be the starting point of the live demo.

## Demo on stage

For each demo step, switch to the demo instruction when told so in the slide deck.  

```bash
amplify add auth
amplify push 
```

```
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import aws_exports from './aws-exports.js';
Amplify.configure(aws_exports);

export default withAuthenticator(App, { includeGreetings : true});
```

see ``src/App.1.js``

---

```
amplify add api 
amplify push
```

```
type Note @model @auth(rules: [{allow: owner}]){
  id: ID!
  note: String!
}
```

---


public/index.html : 
```
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
```

see src/App.2.js

--- 

amplify/backend/api/amplifynotes/schema.graphql 

```
type Note @model @auth(rules: [{allow: owner}]) @searchable {
  id: ID!
  note: String!
}
```

```
amplify push 
```

see src/App.3.js




