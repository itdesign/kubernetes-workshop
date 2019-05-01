---
title: Create a deployment
parent: Run the Backend
---

# Create a deployment

The pod does not provide enough automation to revive a failed process. The deployment ensures that a given amount of pods is always started.

We will change the configuration to use a deployment instead of a manually created pod.

## Delete the pod

1. Delete the previously created pod: `kubectl delete pod calculator-backend`
2. The result will be:
   ```
   pod "calculator-backend" deleted
   ```

## Write the deployment definition

To get started copy the contents of `kubernetes-workshop/k8s-examples/deployment.yml` into your `backend.yml`.

1. Under `.spec.template.spec` you'll find the similar fields like in the pod configuration, make the same changes as previously.
2. The two new configuration items `livenessProbe` and `readinessProbe` need to configured with the correct port of your service, otherwise the health checks will fail.
3. Ensure that the deployment has the name `calculator-backend`.
4. Also ensure that `.template.metadata.labels.app` is set to the same value, we will need this later.

## Apply the pod definition

Like previously, use `kubectl apply -f k8s-files/`.

The console should display the following:

```
deployment.apps "calculator-backend" created
```

## Inspect the created resources

The previous command as created multiple resources.

1. With `kubectl get deployment` you can see the created deployment:
   ```
   NAME                 DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
   calculator-backend   1         1         1            1           3m
   ```
2. With `kubectl get pods` the automatically created pod is returned:
   ```
   NAME                                  READY     STATUS    RESTARTS   AGE
   calculator-backend-557c7f66d8-zdm9b   1/1       Running   0          3m
   ```
3. In comparison to the last pod the name changed, `-557c7f66d8-zdm9b` was added as a suffix.<br>
   `557c7f66d8` is the identifier for this specific configuration inside the deployment.<br>
   `zdm9b` is a random string that identifies this pod, a deployment can start multiple pods, each will get its own random id.

## Access the pod

The pod can be accessed like before, just replace the placeholder with your pod name.

```
$GCLOUD_SHELL_URL/api/v1/namespaces/default/pods/<your-pod-name-here>/proxy/
```

## Trigger a restart

1. Run `kubectl get pods -w` to show changes on the pods.
2. Crash the pod again with an invalid expression, e.g. `sqrt(Hello World)`
3. The output should now look like this:
   ```
   NAME                                  READY     STATUS    RESTARTS   AGE
   calculator-backend-557c7f66d8-zdm9b   1/1       Running   0          12m
   calculator-backend-557c7f66d8-zdm9b   0/1       Error     0          12m
   calculator-backend-557c7f66d8-zdm9b   0/1       Running   1          12m
   calculator-backend-557c7f66d8-zdm9b   1/1       Running   1          12m
   ```
4. Afterwards you can test again to calculate results for valid expressions, the pod will now again answer your requests.
