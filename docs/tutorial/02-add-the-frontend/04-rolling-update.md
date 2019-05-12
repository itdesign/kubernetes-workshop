---
title: Rolling Upgrades
parent: Add the Frontend
---

# Rolling Upgrades

The app is now working and is ready to be used. But you may want to update the application
from time to time. This could be due to new features, or because you need to fix a bug.

When an application is used heavily any downtime during an update is unacceptable. This means
we need to do a zero-downtime update of our application.

Kubernetes provides a built-in rolling update strategy to update the configuration of
deployments.

## Update the frontend

We will use test the rolling update with a new version (`v2`) of our frontend service.
It provides some new features we will look into later.

1. Change the docker image tag in your `frontend.yml` from `v1` to `v2`.
2. Apply the changes `kubectl apply -f k8s-files/`
3. With `kubectl rollout status deployment calculator-frontend` will see this output:
   ```
   Waiting for deployment "calculator-frontend" rollout to finish: 1 out of 3 new replicas have been updated...
   Waiting for deployment "calculator-frontend" rollout to finish: 1 out of 3 new replicas have been updated...
   Waiting for deployment "calculator-frontend" rollout to finish: 1 out of 3 new replicas have been updated...
   Waiting for deployment "calculator-frontend" rollout to finish: 2 out of 3 new replicas have been updated...
   Waiting for deployment "calculator-frontend" rollout to finish: 2 out of 3 new replicas have been updated...
   Waiting for deployment "calculator-frontend" rollout to finish: 1 old replicas are pending termination...
   Waiting for deployment "calculator-frontend" rollout to finish: 1 old replicas are pending termination...
   Waiting for deployment "calculator-frontend" rollout to finish: 1 old replicas are pending termination...
   deployment "calculator-frontend" successfully rolled out
   ```
4. When the command is completed you should now [see the updated version](http://$GCLOUD_PUBLIC_IP) of the calculator.
