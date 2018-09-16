# express_project
>**express_project** - server rendering [***Pug***](https://pugjs.org/api/getting-started.html) temlates by [***Express***](http://expressjs.com) & save data in database

#### The project launch command:

clone a project to a local machine:
```bash
$ git clone https://github.com/morecodemore/express_project.git
```

install *dependencies* & build *style/js*:
```bash  
$ cd express_project
$ npm i
$ npm run build
```

start server by [***Nodemon***](https://nodemon.io):
```bash
$ node_modules/.bin/nodemon server/app.js
```
    
or (*if the nodemon is globally*):
```bash
$ nodemon server/app.js
```
    
or by node:
```
$ node server/app.js
```
    
test **Email**: *`testnodejscourse@gmail.com / testnodejscourse123456`*

test **User**: `admin / admin`

if you want to overwrite *login* and *password* values **User**:

```bash
node server/models/addAdmin.js
```
