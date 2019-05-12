---
title: Allow Public Access
parent: Add the Frontend
---

# Allow Public Access

Currently we can only access our frontend using the proxy provided by Kubernetes and Google Cloud Shell.
This means our potential users wouldn't be able to access the calculator app.

We will now expose the frontend to the public internet.

## Change the configuration

1. Edit the `frontend.yml` and set the service to `LoadBalancer`. You need to have a look into the [API documentation](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.11/#servicespec-v1-core) of Kubernetes.
2. Apply the configuration: `kubectl apply -f k8s-files/`.
3. Watch for the service to update: `kubectl get svc -w`
4. The service changed the type to `LoadBalancer` and external-ip changed into the state `<pending>`, we will now wait until an IP is assigned.
5. The output should finally be like the following:
   ```
   NAME                  TYPE           CLUSTER-IP     EXTERNAL-IP     PORT(S)        AGE
   calculator-backend    ClusterIP      10.3.255.163   <none>          80/TCP         1h
   calculator-frontend   LoadBalancer   10.3.248.49    <pending>       80:31311/TCP   3s
   calculator-frontend   LoadBalancer   10.3.248.49    35.246.160.32   80:31311/TCP   1m
   ```
   <div class="customization">
   Enter the external IP of your service, this will customize the tutorial:<br>
   <input id="gcloud-public-ip" placeholder="35.246.160.32" style="width:400px"> <button id="gcloud-public-ip-apply">Apply</button>
   </div>
6. You can now access your frontend using [`http://$GCLOUD_PUBLIC_IP/`](http://$GCLOUD_PUBLIC_IP/).

The following chapter will give you more details about the network architecture in the background.
