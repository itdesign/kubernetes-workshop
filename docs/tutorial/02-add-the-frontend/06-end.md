---
title: Last Steps
parent: Add the Frontend
---

# Last Steps

We are nearing the end, but lets deploy a version that is ready to be served in our cluster. `v2` this should be safe to deploy.

## Deploy a stable version

1. Change the image in the `fronted.yml` to `v2`.
2. Apply the changes and watch for pod changes:
   ```
   kubectl apply -f k8s-files/ && kubectl get pods -w
   ```
3. You should now see the new pods starting and the old pods shuting down:
   ```
   NAME                                   READY     STATUS              RESTARTS   AGE
   calculator-frontend-58968fd9b8-22np7   0/1       ContainerCreating   0          1s
   calculator-frontend-65876567ff-68p8s   1/1       Running             0          2m
   calculator-frontend-65876567ff-rvpvb   1/1       Running             0          34s
   calculator-frontend-65876567ff-wj62x   1/1       Running             0          46s
   calculator-frontend-58968fd9b8-22np7   0/1       Running             0          4s
   calculator-frontend-58968fd9b8-22np7   1/1       Running             0          6s
   calculator-frontend-65876567ff-rvpvb   1/1       Terminating         0          39s
   calculator-frontend-58968fd9b8-sfmhv   0/1       Pending             0          0s
   calculator-frontend-58968fd9b8-sfmhv   0/1       Pending             0          0s
   calculator-frontend-58968fd9b8-sfmhv   0/1       ContainerCreating   0          0s
   calculator-frontend-65876567ff-rvpvb   0/1       Terminating         0          40s
   calculator-frontend-58968fd9b8-sfmhv   0/1       Running             0          5s
   calculator-frontend-65876567ff-rvpvb   0/1       Terminating         0          44s
   calculator-frontend-65876567ff-rvpvb   0/1       Terminating         0          44s
   calculator-frontend-58968fd9b8-sfmhv   1/1       Running             0          9s
   calculator-frontend-65876567ff-wj62x   1/1       Terminating         0          1m
   calculator-frontend-58968fd9b8-w48gr   0/1       Pending             0          0s
   calculator-frontend-58968fd9b8-w48gr   0/1       Pending             0          0s
   calculator-frontend-58968fd9b8-w48gr   0/1       ContainerCreating   0          0s
   calculator-frontend-65876567ff-wj62x   0/1       Terminating         0          1m
   calculator-frontend-58968fd9b8-w48gr   0/1       Running             0          5s
   calculator-frontend-65876567ff-wj62x   0/1       Terminating         0          1m
   calculator-frontend-65876567ff-wj62x   0/1       Terminating         0          1m
   calculator-frontend-58968fd9b8-w48gr   1/1       Running             0          8s
   calculator-frontend-65876567ff-68p8s   1/1       Terminating         0          2m
   calculator-frontend-65876567ff-68p8s   0/1       Terminating         0          2m
   calculator-frontend-65876567ff-68p8s   0/1       Terminating         0          3m
   calculator-frontend-65876567ff-68p8s   0/1       Terminating         0          3m
   ```
4. The app should now be served in `v2`.

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
