TODO - update this README

Original article : 
https://medium.com/open-graphql/create-a-multiuser-graphql-crud-l-app-in-10-minutes-with-the-new-aws-amplify-cli-and-in-a-few-73aef3d49545


```
npx create-react-app amplifynotes
cd amplifynotes
npm install --save aws-amplify aws-amplify-react bootstrap
amplify init 
```

App.css => App-header => height: 100px; and remove min-height

```
npm start 
open preview 
```

--- 

```
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




