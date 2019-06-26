---
title: Setup your k8s-Cluster
parent: Get Started
---

# Setup your Kubernetes Cluster

We have to create a Kubernetes cluster that we will interact with during the tutorial.
We will create a Kubernetes cluster v1.11 with one node per zone in the region Frankfurt.
Follow the guide to get it started.

1. Run the following command to create your cluster:
   ```
   gcloud container clusters create my-cluster --region europe-west3 --cluster-version 1.12.8-gke.10 --num-nodes 1
   ```
2. The output should look like the following:
   ```
   WARNING: ...truncated some lines...
   Creating cluster my-cluster in europe-west3... Cluster is being health-checked (master is healthy)...done.
   Created [https://container.googleapis.com/v1/projects/$GCLOUD_PROJECT_ID/zones/europe-west3/clusters/my-cluster].
   To inspect the contents of your cluster, go to: https://console.cloud.google.com/kubernetes/workload_/gcloud/europe-west3/my-cluster?project=$GCLOUD_PROJECT_ID
   kubeconfig entry generated for my-cluster.
   NAME        LOCATION      MASTER_VERSION  MASTER_IP     MACHINE_TYPE   NODE_VERSION   NUM_NODES  STATUS
   my-cluster  europe-west3  1.12.8-gke.10   35.234.67.59  n1-standard-1  1.12.8-gke.10  3          RUNNING
   ```
3. Test if `kubectl` can access the cluster, use `kubectl cluster-info`. This should return some similar output:
   ```
   Kubernetes master is running at https://35.234.67.59
   GLBCDefaultBackend is running at https://35.234.67.59/api/v1/namespaces/kube-system/services/default-http-backend:http/proxy
   Heapster is running at https://35.234.67.59/api/v1/namespaces/kube-system/services/heapster/proxy
   KubeDNS is running at https://35.234.67.59/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
   Metrics-server is running at https://35.234.67.59/api/v1/namespaces/kube-system/services/https:metrics-server:/proxy
   ```
4. You can also find your Kubernetes cluster in the [Console](https://console.cloud.google.com/kubernetes/clusters/details/europe-west3/my-cluster?project=$GCLOUD_PROJECT_ID)
