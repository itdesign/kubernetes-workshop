# Calculator service

The calculator service is a small microservice that provides an API to evaluate an mathematical expression. The backend is using [`math.js`](https://mathjs.org/) to calculate the result.

The service provides an API documentation where the API of the service can tested.

## Run the service

The service is published as a docker image on quay.io under the image name `quay.io/kubernetes-workshop/calculator-backend:v1`

## The flaw

The service has a major flaw, it will terminate when an invalid expression is passed in as an attribute.

For example the expression `Hello World` will kill the service.

## Developing the service

The service is implemented using Typescript, express.js and node.

You can start the service locally by calling `yarn dev`.

The service is then running on [localhost:8080](http://localhost:8080).
