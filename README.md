# Kubernetes Workshop

This repsitory contains everything to host a Kubernetes workshop.

## Repository structure

The repository contains all sources used in the hands-on parts of the workshop.

### Services

Under `services/` are all services with their source code and a Dockerfile to built the images.

- [calculator backend](services/calculator-backend/) - Small demonstration service to do the first steps with Kubernetes
- [calculator frontend](services/calculator-frontend/) - A service that relies on the backend to calculate expressions

### Kubernetes files

- Under `k8s-examples/` you can find examples for the resources we are going to create during the workshop
- Under `k8s-solutions/` you'll find all resource specifications for our services we use during the workshop.

### Documentation

The `docs/` folder contains all documentation available to the participants of the Workshop.

Available at [itdesign.github.io/kubernetes-workshop](https://itdesign.github.io/kubernetes-workshop/).

## Setup Google account structure

- Create a Google organization: https://gsuite.google.com/signup/gcpidentity/welcome
  - Use a custom domain which is verified using an TXT DNS record
  - Up to 50 users Google Identity is free: https://support.google.com/cloudidentity/answer/7295541
  - Create x accounts: user-$i@my-domain.com
- Add another account which hosts the projects
  - Enabled billing for the account
  - Request a limit increase for the project limit inside the billing account (default: 5)
  - Create x projects
  - Add each project to the user in Google Identity:
    ```bash
    for i in {1..30}; do gcloud projects add-iam-policy-binding k8sworkshop-xyz-$i --member user:user-$i@my-domain.com --role roles/editor; done
    ```
 
