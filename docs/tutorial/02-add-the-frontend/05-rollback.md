---
title: Rollback Changes
parent: Add the Frontend
---

# Rollback Changes

Sometimes a deploy has unexpected results. In this case we deployed a developer preview.
This is not what we want in production. So lets rollback our changes.

1. Run `kubectl rollout undo deployment calculator-frontend` to revert the latest changes.
2. Continuously refresh the page after applying the changes.
3. The page will be served with different layouts. This is because sometimes a pod with
   `v3` and sometimes a pod with `v1` answers your request.
4. After some time only `v1` of the calculator frontend should be visible.
5. You can verify this by running `kubectl rollout status deployment calculator-frontend`:
   ```
   deployment "calculator-frontend" successfully rolled out
   ```
