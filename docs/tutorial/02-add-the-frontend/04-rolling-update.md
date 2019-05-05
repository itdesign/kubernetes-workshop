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
3. Watch for the rolling update: `kubectl get pods -w`
   ```
   NAME                                   READY     STATUS              AGE
   calculator-frontend-6b5d85558c-4mh2s   1/1       Running             1h
   calculator-frontend-6b5d85558c-9nzh2   1/1       Running             1h
   calculator-frontend-6b5d85558c-msppb   1/1       Running             1h
   calculator-frontend-d69f59b46-fvp54    0/1       Pending             0s
   calculator-frontend-d69f59b46-fvp54    0/1       Pending             1s
   calculator-frontend-d69f59b46-fvp54    0/1       ContainerCreating   1s
   calculator-frontend-d69f59b46-fvp54    0/1       Running             5s
   calculator-frontend-d69f59b46-fvp54    1/1       Running             8s
   calculator-frontend-6b5d85558c-msppb   1/1       Terminating         1h
   calculator-frontend-d69f59b46-mfmpm    0/1       Pending             0s
   calculator-frontend-d69f59b46-mfmpm    0/1       Pending             0s
   calculator-frontend-d69f59b46-mfmpm    0/1       ContainerCreating   0s
   calculator-frontend-6b5d85558c-msppb   0/1       Terminating         1h
   calculator-frontend-d69f59b46-mfmpm    0/1       Running             4s
   calculator-frontend-6b5d85558c-msppb   0/1       Terminating         1h
   calculator-frontend-6b5d85558c-msppb   0/1       Terminating         1h
   calculator-frontend-d69f59b46-mfmpm    1/1       Running             8s
   calculator-frontend-6b5d85558c-9nzh2   1/1       Terminating         1h
   calculator-frontend-d69f59b46-v2vgv    0/1       Pending             0s
   calculator-frontend-d69f59b46-v2vgv    0/1       Pending             0s
   calculator-frontend-d69f59b46-v2vgv    0/1       ContainerCreating   0s
   calculator-frontend-6b5d85558c-9nzh2   0/1       Terminating         1h
   calculator-frontend-d69f59b46-v2vgv    0/1       Running             3s
   calculator-frontend-6b5d85558c-9nzh2   0/1       Terminating         1h
   calculator-frontend-6b5d85558c-9nzh2   0/1       Terminating         1h
   calculator-frontend-d69f59b46-v2vgv    1/1       Running             11s
   calculator-frontend-6b5d85558c-4mh2s   1/1       Terminating         1h
   ```
4. The old configuration is `-6b5d85558c-`. Each pod of the old configuration is terminated after a pod of the new configuration `-d69f59b46-` is running and ready `1/1`.
5. You can change the configuration back to `v1` and apply the changes.
6. With `kubectl rollout status deployment calculator-frontend` will see this output:
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
7. Now, one last rolling update. Change the frontend deployment again to `v2` and apply the changes.
8. Continuously refresh the page after applying the changes.
9. The page will be served with different layouts, this is because sometimes a pod of the old configuration
   and sometimes a pod of the new configuration answers your request.
10. After some time only the new layout should be returned.

## We did it! 🎉

You are now able to do the following things using Kubernetes:

- Deploy an application
- Inspect your application when something goes wrong
- Configure multiple replicas for fault tolerance
- Create a service for load balancing
- Expose an application to the public internet
- Update applications without any downtime

### Want to learn more?

Have a look at the new version of the frontend. It looks like history does not work correctly. 😉

We need to fix this! Try the [bonus chapters](../03-bonus.md).
