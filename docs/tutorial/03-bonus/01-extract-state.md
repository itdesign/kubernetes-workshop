---
title: Move State to a Database
parent: Bonus Tutorials
---

# Move State to a Database

When having a detailed look at the history feature of the new frontend we can see that the
history changes on each page refresh and does not seem to contain all the calculations
we made previously.

The problem is that currently the backend stores a history of calculations only inside the
ephemeral container. This means the history is not shared between the multiple instances of the 
backend and will also be deleted upon a container restart.

When you request the history from one of the backends it will only return the history of the
calculations which were calculated by this backend (approximately one third of the total history).

This means we need to extract the history from the backend to have a truly stateless application.

The backend already has a feature to configure an external PostgreSQL database as the storage layer.

## Start a database

We will need a PostgreSQL database server. Ideally you would launch a managed service of the cloud
provider. This means reduced maintenance efforts and often higher availability.

But we will use a Kubernetes feature, `StatefulSets`. They are used to start stateful applications.
As a developer you would try to use as few as possible stateful applications because they are much
harder to maintain and scale.

### Add the configuration

We will now create a stateful set to start a PostgreSQL server. The server has only a single instance
and is not recommended for use in production, but to get familiar with the feature this should suffice.

Copy the example `kubernetes-workshop/k8s-examples/statefulset.yml` to `k8s-files/postgresql.yml`.

The example is for a MySQL database, we need to do some changes:

1. Change the name, serviceName, selector and label to `postgresql`.
2. Change the docker image to `postgresql:10.5`.
3. PostgreSQL does listen on port `5432`, change the `containerPort`.
4. PostgreSQL stored data in `/var/lib/postgresql/data` change the mount point of the volume.
5. PostgreSQL uses other environment variables to configure user, password and database.
6. Configure the user with `POSTGRES_USER` and set it to `postgres`.
7. Configure the password with `POSTGRES_PASSWORD` and set it to `postgres`.
8. Configure the database name with `POSTGRES_DB` and set it to `calculator`.
9. Don't forget to change the service configuration at the end of the file.

### Apply the configuration

1. Use `kubectl apply -f k8s-files/` to apply the new configuration.
2. Wait until the database is started: `kubectl get pods -w`:
   ```
   NAME                    READY     STATUS              RESTARTS  AGE
   postgresql-0            0/1       Pending             0         0s
   postgresql-0            0/1       Pending             0         0s
   postgresql-0            0/1       ContainerCreating   0         0s
   postgresql-0            1/1       Running             0         2s
   ```
3. Use `kubectl get pvc` to see the persistent volume requested by the stateful set we created:
   ```
   NAME                        STATUS    VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
   data-storage-postgresql-0   Bound     pvc-fc0f715c-6f43-11e9-8f0f-080027460d11   1Gi        RWO            standard       3m
   ```
4. In the background Kubernetes created a volume on Google Cloud which is then mounted into the pod.
   You can see the volume with `kubectl get pv`:
   ```
   NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS    CLAIM                               STORAGECLASS   REASON    AGE
   pvc-fc0f715c-6f43-11e9-8f0f-080027460d11   1Gi        RWO            Delete           Bound     default/data-storage-postgresql-0   standard                 3m
   ```
5. When the pod is restarted (e.g. due to a crash) the volume is attached to the new pod and all data is preserved.

## Configure the backend

Now we have a running database and need to update our backend to use the PostgreSQL database.

1. Change `backend.yml` and add an environment variable `PG_HOST` with the value `postgresql`.
2. Apply the changes `kubectl apply -f k8s-files/`.
3. Wait until the rollout completes: `kubectl rollout status deployment calculator-backend`

## Test changes

Now we are ready to test the new stateless backend.

1. Open the UI: [`http://$GCLOUD_PUBLIC_IP/`](http://$GCLOUD_PUBLIC_IP/)
2. Execute some expressions.
3. Open the history, all previous expression should appear.

You can now try to stop pods and check if the history is still available:

1. Use `kubectl delete pod <pod-name>` to delete a pod.
2. The deployment will automatically re-create a pod to fullfil the desired replica count.
3. You can even delete the pod of our database `kubectl delete pod postgresql-0`.
4. When the pod is successfully re-created, the history should be available again.
