---
title: Start the Deployment
parent: Add the Frontend
redirect_from:
  - /tutorial/02-add-the-frontend.html
---

# Start the Deployment

Now, that we have a working backend, we will add a frontend that provides a
better user experience for our calculator app.

## Create the configuration

We need a deployment and a service to deploy the frontend. This is pretty
similar to the backend configuration. Start by copy the `backend.yml` to
`frontend.yml`.

### Change the deployment

1. The deployment name, selector and label should be `calculator-frontend`.
2. The image name for the frontend is `quay.io/kubernetes-workshop/calculator-frontend:v1`.
3. The frontend container does listen on port `3000`.<br>
   Tip: Search for the port `8080` to find all places where the port is referenced.
4. The frontend uses a environment variable `CALCULATOR_BACKEND_BASE_URL` which
   is used to configure the base url of the backend. Set this to the url of the
   backend service `http://calculator-backend`.<br>
   Use `kubernetes-workshop/k8s-examples/deployment-with-env-vars.yml` as an example on
   how to configure environment variables.

### Change the service

1. Change the service name and selector to `calculator-frontend`.
2. Use the right `targetPort` for the frontend.

## Deploy the configuration

Now we are ready to deploy everything.

1. Run (like before) `kubectl apply -f k8s-files/`.
2. Check the pods status `kubectl get pods`:

```
NAME                                   READY     STATUS              RESTARTS   AGE
calculator-backend-799f978d88-47v6b    1/1       Running             0          30m
calculator-backend-799f978d88-ncdch    1/1       Running             0          30m
calculator-backend-799f978d88-qz4k4    1/1       Running             0          30m
calculator-frontend-6b5d85558c-5smzr   1/1       Running             0           1m
calculator-frontend-6b5d85558c-hc78z   0/1       Running             0           1m
calculator-frontend-6b5d85558c-lfckh   0/1       ContainerCreating   0           1m
```

3. Wait until all three pods are `Ready: 1/1` (check the status periodically).
4. Use the [link]($GCLOUD_SHELL_URL/api/v1/namespaces/default/services/calculator-frontend/proxy/) to access the frontend:
   ```
   $GCLOUD_SHELL_URL/api/v1/namespaces/default/services/calculator-frontend/proxy/
   ```
5. Try out the UI, execute valid and invalid expressions and look at the response.
6. Check with `kubectl get pods` and validate that everything works as you would expect.
