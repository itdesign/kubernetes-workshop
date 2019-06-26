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
  - Enable billing for the account
  - Add at least $50 to the account to allow limit increases
  - Request a limit increase for the project limit inside the billing account (default: 5)
  - Create x projects
    ```
    for i in {1..30}; do gcloud projects create k8s-workshop-xyz-$i; done
    ```
  - Add each project to the user in Google Identity:
    ```bash
    for i in {1..30}; do gcloud projects add-iam-policy-binding k8s-workshop-xyz-$i --member user:user-$i@my-domain.com --role roles/editor; done
    ```
  - Enable billing and GKE clusters for all projects
    ```
    for {each project} do
      visit https://console.cloud.google.com/apis/api/container.googleapis.com/overview?project=k8s-workshop-xyz-$i
    done
    ```
  - Create a Kubernetes cluster in each project
    ```
    for i in {1..30}; do gcloud config set project k8s-workshop-xyz-$i -q; gcloud container clusters create my-cluster --region europe-west3 --cluster-version 1.12.8-gke.10 --num-nodes 1 --async; done
    ```
  - Test the status of each cluster
    ```
    for i in {1..30}; do gcloud config set project k8s-workshop-xyz-$i -q; gcloud container clusters list; done
    ```
  - Test the connection to the cluster
    ```
    for i in {1..30}; do gcloud config set project k8s-workshop-xyz-$i -q;  gcloud container clusters get-credentials my-cluster --region europe-west3; kubectl cluster-info; done
    ```  
  - Delete each cluster
    ```
    for i in {1..30}; do gcloud config set project k8s-workshop-xyz-$i -q; gcloud container clusters delete my-cluster --async; done
    ```
