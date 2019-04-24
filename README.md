# Kubernetes Workshop

This repsitory contains everything to host a Kubernetes workshop.

## Repository structure

The repository contains all sources used in the hands-on parts of the workshop.

### Services

Under `services/` are all services with their source code and a Dockerfile to built the images.

- [calculator backend](services/calculator-backend/) - Small demonstration service to do the first steps with Kubernetes

### Kubernetes files

Under `k8s-files/` you can find all resource specifications for our services we use during the workshop.

### Documentation

The `docs/` folder contains all documentation available to the participants of the Workshop.

Available at [meisterplan.github.io/kubernetes-workshop](https://meisterplan.github.io/kubernetes-workshop/).
