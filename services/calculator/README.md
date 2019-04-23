# Calculator service

The calculator service is a small microservice that allows the user to evaluate an expression.

![screenshot of the service UI](https://i.imgur.com/ImsxZRa.png)

The backend is using [`math.js`](https://mathjs.org/) to calculate the result.

## The flaw

The service has a major flaw, it will terminate when an invalid expression is passed in as an attribute.

For example the expression `Hello World` will kill the service.

![screenshot of the error](https://i.imgur.com/6kEc9Jd.png)

## Building the service

The service is implemented using Typescript, express.js and node.

You can start the service locally by calling `yarn dev`.
