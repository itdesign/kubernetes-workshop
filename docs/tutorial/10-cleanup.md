---
title: Cleanup
---

# Cleanup

The Kubernetes cluster consumes resources on GCloud an these are payed unless the cluster is deleted.

Therefore we are now cleaning up our resources.

1. Delete the cluster with `gcloud container clusters delete my-cluster --zone europe-west3`.
2. Confirm by typing `y`.
3. The cluster will be shutdown:
   ```
   The following clusters will be deleted.
   – [my-cluster] in [europe-west3]
   Do you want to continue (Y/n)? y
   Deleting cluster my-cluster...done.
   Deleted [https://container.googleapis.com/v1/projects/$GCLOUD_PROJECT_ID/zones/europe-west3/clusters/my-cluster].
   ```

**That's it! We hope you enjoyed the practical part of the workshop.**
