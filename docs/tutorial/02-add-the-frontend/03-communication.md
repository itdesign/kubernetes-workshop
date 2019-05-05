---
title: Communication Insights
parent: Add the Frontend
---

# Communication Insights

We have now a publicly accessible service that can calculate arbitrary expression.
This chapter gives a little more insight into the communication between all components.

## Check the UI

The UI provides details about the pods used to fulfill the request. Have a look at the footer of the page.

![Screenshot of the footer](03-pod-names.png)

- The pod name of the backend is only displayed when communication with the backend happened.
- You can see, the names change on every request. This is because the service routes
  the requests to the pods with [round-robin scheduling](https://en.wikipedia.org/wiki/Round-robin_scheduling).

## The network

From a network perspective this is a bit more complex:

![Diagram of the network](03-network.svg)

### What happened?

- By adding `type: LoadBalancer` to the service Kubernetes opened a port on each node of the cluster.
- Google automatically provisioned a load balancer in the background that points to the opened port on all nodes.
  You can find the load balancer [here](https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list?project=$GCLOUD_PROJECT_ID) in the Google Cloud Console.

### How does it work?

When accessing the IP address from the browser the following will happen:

1. The browser is sending an HTTP request to the Google Load Balancer.
2. The Load Balancer will forward the request to the port of a random node in the cluster.
3. The node will forward the request to the frontend service assigned to the `NodePort`.
4. The frontend service will forward the request to a random frontend pod (possibly on another node).
5. The frontend pod will create a new HTTP request to the backend service on the same node.
6. The backend service will forward the request to a random backend pod.
7. The backend pod will calculate the result and return the response.
8. The frontend pod will receive the response and return it to the user.
