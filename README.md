# ml-frontend-test
Repository for the ML practical frontend test.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

This project has a Vagrantfile for the ones who want to run the project on the VM i developed it. If you don't want to use vagrant for running the project you can skip this steps. 
So if you still want to run the project on vagrant see this [link](https://www.vagrantup.com/docs/installation/) for instructions on how to install vagrant on your pc. 
Once installed run:

```
$ vagrant up 
```

on your project root folder and you're good to go. 

You also must have git installed, if not you can check this [link](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Installing

Whether you're on a Vagrant VM or in your pc you must do this the following steps to install the app:

1. Clone the repo:
```
$ git clone https://github.com/goexrois/ml-frontend-test
```
2. Go to the app root folder and install the app.

```
$ cd project_root_folder/ml-app
$ npm install
```
3. Generate statics files

```
$ gulp build 
```
## Different approaches for the app
As the problem could be solved in more than way, I opted for two solutions: 

1. Server side manipulation of data. In this approach, all the API requests are solved in the backend, thus the client
does not have to run any script. This may be a good solution for no-javascript browsers.

To run this solution run the app in the `master` branch.

2. Client side requests for data. In this approach, the client sends AJAX requests to get the data from the implemented endpoints. This may be a good solution to leverage server load.

To run this solution run the app in the `ajax-approach` branch.

## Run the app

To run the app just run: 

```
$ cd project_root_folder/ml-app
$ node index.js
```

And then access to: 

```
http://localhost:3000
```
## TO DO 

* Tests for backend (API connection).
* Responsive design.
* High definition images for high resolution displays.
* Sprite for static images to reduce size. 
* Compatibility with legacy browsers. Tested on latest versions of Mozilla, Safari and Chrome.
* Improve build.
* React approach to solve the problem.

## Considerations

* I made one more request to get the breadcrumbs data, that wasn't present in the model but it was in the view.
* As it was not specified, the free shipping icon was not included in the product detail view. 
* I did not put the schema.org/Product description property because the majority of the items provided
had no plain text as description. 
* The favicon is missing because it was not provided.

## Built With

* [Vagrant](https://www.vagrantup.com/) - Development environment generator.
* [gulp](http://gulpjs.com/) - Task builder.
* [sass](http://sass-lang.com/) - Used to generate CSS.
* [node.js](https://nodejs.org/) - JavaScript runtime used for developing the app.
* [express.js](http://expressjs.com/) - Framework for nodejs for web apps development.
* [handlebars](http://handlebarsjs.com/) - Template engine.
* [BEM](https://en.bem.info/) - Arquitectura de componentes para desarrollo escalable y mantenible.

## Author

* **Gonzalo Exequiel Rodriguez Isleño** - *Initial work* - [goexrois](https://github.com/goexrois)

## Websites used as reference

* [schema.org](https://schema.org)
* [W3C](https://www.w3.org/)
* [W3 School](https://www.w3schools.com/)
* [Google Dev](https://developers.google.com/)
* [Stack Overflow](https://stackoverflow.com/)
* [node.js](https://nodejs.org/)
* [express.js](http://expressjs.com/)
* [gulp](http://gulpjs.com/)
* [CSS-TRICKS](https://css-tricks.com/)
* [BEM](https://en.bem.info/) - Arquitectura de componentes para desarrollo escalable y mantenible.
* [handlebars](http://handlebarsjs.com/) - Template engine.
