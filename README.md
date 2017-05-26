# ml-frontend-test
Repository for the ML practical frontend test.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

This project has a Vagrantfile for the ones who want to run the project on the VM i developed it. If you don't want to use vagrant for running the project you can skip this steps. 
So if you still want to run the project on vagrant see this [link](https://www.vagrantup.com/docs/installation/) for instructions on how to install vagrant on your pc. 
Once installed run:

```
$ git clone https://github.com/goexrois/ml-frontend-test
$ vagrant up 
```

on your project root folder and you're good to go. 


### Installing

Wether you're on a Vagrant VM or in your pc you must do this the following steps to install the app:

```
$ cd project_root_folder/ml-app
$ npm init
```
This step will install all the dependencies used by the app. 

Then run:
```
$ gulp build 
```
This step will generate all the static files that the app uses. 

## To do



## Built With

* [Vagrant](https://www.vagrantup.com/) - Development environment generator.
* [gulp](http://gulpjs.com/) - Task builder.
* [sass](http://sass-lang.com/) - Used to generate CSS.
* [node.js](https://nodejs.org/) - JavaScript runtime used for developing the app.
* [express.js](http://expressjs.com/) - Framework for nodejs for web apps development.
* [handlebars](http://handlebarsjs.com/) - Template engine.

## Author

* **Gonzalo Exequiel Rodriguez Isleño** - *Initial work* - [goexrois](https://github.com/goexrois)

## License

This project has no license.

## Websites used as reference

* [schema.org](https://schema.org)
* [W3C](https://www.w3.org/)
* [W3 School](https://www.w3schools.com/)
* [Google Dev](https://developers.google.com/)
* [Stack Overflow](https://stackoverflow.com/)
* [node.js](https://nodejs.org/)
* [express.js](http://expressjs.com/)
* [gulp](http://gulpjs.com/)
