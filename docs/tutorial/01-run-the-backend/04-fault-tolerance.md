---
title: Add Fault Tolerance
parent: Run the Backend
---

<!-- prettier-ignore -->
<h1>Add Fault Tolerance</h1>
{: .no_toc }

When you now crash the backend by using malformed expressions the app will be automatically restarted.
But until the service is fully restarted the backend can't respond to requests. Therefore we will now
add fault tolerance.

<!-- prettier-ignore -->
1. toc
{:toc}

## Scale the deployment

A deployment consists of a given amount of replicas, each is a running pod with identical configuration.
Kubernetes allows us to scale up the deployment. This can be done in two ways:

### Edit and apply the service definition

1. Open the `backend.yml` and change the `.spec.replicas` to `2`.
2. Apply the changes with `kubectl apply -f k8s-files/`
3. Use `kubectl get deployments` to see the changed replica count:
   ```
   NAME                 DESIRED   CURRENT   UP-TO-DATE   AVAILABLE
   calculator-backend   2         2         2            2
   ```

### Scale with a `kubectl` command

1. Call `kubectl scale deployment calculator-backend --replicas 3`
2. Use `kubectl get deployments` to see the changed replica count:
   ```
   NAME                 DESIRED   CURRENT   UP-TO-DATE   AVAILABLE
   calculator-backend   3         3         3            3
   ```

Note, that when using `kubectl scale` the replica count will be overridden when applying the configuration
again as this only changes the configuration inside Kubernetes, not the configuration on your file system.

## Add load balancing

We can now see with `kubectl get pods` that we have three pods of the `calculator-backend`.

```
NAME                                  READY     STATUS    RESTARTS   AGE
calculator-backend-557c7f66d8-lxd8c   1/1       Running   0          1m
calculator-backend-557c7f66d8-pzzb7   1/1       Running   0          1m
calculator-backend-557c7f66d8-zdm9b   1/1       Running   0          30m
```

This means we need a solution to access a random pod of these three. Otherwise the requests will still fail
when the pod we access crashes.

In Kubernetes we can use a `service` as a load balancer between the pods started by the deployment. The
service does only provide access to the pods that are up and running. Crashed pods won't get any requests.

1. Inside the `backend.yml` you can define multiple resources by splitting them with `---`
2. Use `kubernetes-workshop/k8s-examples/service.yml` as an example to add the service to our `backend.yml`.
   The file should now look like this:
   ```yaml
   kind: Deployment
   apiVersion: apps/v1
   # ...
   ---
   kind: Service
   apiVersion: v1
   # ...
   ```
3. Use the correct selector at `.spec.selectors.'app.kubernetes.io/name'` to find the pods of your `calculator-backend`. The selector
   is used to identify the pods which should be load balanced by the service.
4. Set `.metadata.name` to `calculator-backend`.
5. Use the right `targetPort` so that the service can find our backend (look at `.spec.containers[].ports`).
   ![Diagram of port definitions between services](04-service-ports.svg)
6. Use `kubectl apply -f k8s-files/` to apply the changes.
7. `kubectl get services -o wide` should now show the service:
   ```
   NAME                 TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE       SELECTOR
   calculator-backend   ClusterIP   10.110.74.55   <none>        80/TCP    11m       app=calculator-backend
   ```

## Test load balancing

Now we have that we have a service we can try to use that service to access our backend. With the following
[link]($GCLOUD_SHELL_URL/api/v1/namespaces/default/services/calculator-backend/proxy/) you can access the
service instead of a single pod:

```
$GCLOUD_SHELL_URL/api/v1/namespaces/default/services/calculator-backend/proxy/
```

1. Open the link
2. Test a valid expression
3. The response should contain the instance that answered the request:
   ```json
   {
     "result": "5.905511811023622 inch",
     "instance": "calculator-backend-557c7f66d8-pzzb7"
   }
   ```
4. Repeat the requests and you will see different instances respond.

## Test the limits

Kubernetes restarts pods when they fail, but it does this using a back-off policy when restarting the pod.
This means when a pod frequently crashes it is restarted at a slower rate. We can test this.

1. Run an invalid expression, you'll get an error from the API.
2. Directly afterwards run a valid expression, it will succeed.
3. Use `kubectl get pods` to see the restart count:
   ```
   NAME                                  READY     STATUS    RESTARTS
   calculator-backend-557c7f66d8-lxd8c   1/1       Running   1
   calculator-backend-557c7f66d8-pzzb7   1/1       Running   0
   calculator-backend-557c7f66d8-zdm9b   1/1       Running   0
   ```
4. Start to execute more invalid requests, at some point the API will respond with:
   ```json
   {
     "kind": "Status",
     "apiVersion": "v1",
     "metadata": {},
     "status": "Failure",
     "message": "no endpoints available for service \"calculator-backend\"",
     "reason": "ServiceUnavailable",
     "code": 503
   }
   ```
5. Again, use `kubectl get pods` to see what happened:
   ```
   NAME                                  READY     STATUS             RESTARTS   AGE
   calculator-backend-557c7f66d8-lxd8c   0/1       CrashLoopBackOff   3          11m
   calculator-backend-557c7f66d8-pzzb7   0/1       CrashLoopBackOff   2          11m
   calculator-backend-557c7f66d8-zdm9b   0/1       CrashLoopBackOff   5          40m
   ```

All services are now in a state called `CrashLoopBackOff` is means Kubernetes will wait a while until it
will restart the service. You can retry a valid expression after some moments, it should work again.
And of course the pod should then be back in the state `Running`.
