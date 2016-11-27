# Workflow

## Prerequisite

**Node.js**  
https://nodejs.org/en/  
Download & install  
then open a terminal and type `npm -v` to verify npm is installed correctly.

## What's in the box
 - SCSS
    - compiled with node-sass
    - minified with clean-css
- JS & ES6, imports & exports
     - compiled with rollup & rollup-babel
     - mifified wih uglify-js
-  A node server
    - for static files
    - livereload with express-livereload

## 1. Installing

Open a terminal at your desired directory  
clone the repo   
`git clone https://bitbucket.org/idbbn/workflow`  

cd to it  
`cd workflow`

install  
`npm install`

## 2. Structure

```
build/
source/
    css/
        master.css
    js/
        app.js
```
**Where**

 - `.js` files go in the /source/js/ folder
    -  the source `app.js` file & all imports get compiled to `/build/js/bundle.js`
    -  check `rollup.config.js` for options
 - `.scss` files go in the /source/scss/ folder
    -  the source `master.scss` file & all imports get compiled to `/build/css/master.css`  

**Static files**  
place static files like images or fonts under the `/build/` folder
## 3. Developing

By default the repo has the following npm tasks:

`build-css` - compile the `.scss` files in `/source/css`  
`watch-css` - watch `.scss` files - run `build-css` on change  
`uglify-js` - uglify the generated js bundle  
`watch-js` - watch for a new bundle - run `uglify-js`
`rollup`  compile js - bundle imports & babelify from ES6 to ES5   
`server`  run a node express server with livereload  
`dev`  run all of the above  
`build`  generated minified files

These can be run with `npm run <task-name>`  
For development use `npm run dev` and `npm run server`

then open a browser and navigate to `http://localhost:1337`

**For builds**  

Run `npm run build` to generate `.min` files

-  use the minified `.min` files
- remove the livereload script `<!-- livereload, remove on production -->`

## 4. Misc

 - The scss folder has bootstrap included
    - check `_bootstrap.scss` form imports, comment out unecessary
- On crash restart the process `npm run dev`
