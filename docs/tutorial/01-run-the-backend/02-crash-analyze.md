---
title: Analyze the Crash
parent: Run the Backend
---

# Analyze the Crash

We executed an invalid expression and the server does no longer respond.
It is time to check what happened.

## Check the pod status

Use `kubectl get pods` to check the status of the pod:

```
NAME                 READY     STATUS    RESTARTS   AGE
calculator-backend   0/1       Error     0          12m
```

The pod is no longer running, the state is `Error`.

## Check the pod details

Get more details by calling `kubectl describe pod calculator-backend`:

```
Name:             calculator-backend
...
Status:           Failed
...
Containers:
service:
    ...
    Image:        quay.io/kubernetes-workshop/calculator-backend:v1
    ...
    State:        Terminated
    Reason:       Error
    Exit Code:    1
    Started:      Wed, 01 May 2019 19:03:12 +0200
    Finished:     Wed, 01 May 2019 19:03:47 +0200
    Ready:        False
    ...
Conditions:
Type              Status
Initialized       True
Ready             False
ContainersReady   False
PodScheduled      True
...
Events:
...
```

We can see that the pod state is `Terminated` and that the reason for termination is `Error` with an exit code `1`.

## Check the logs

Use the `kubectl logs calculator-backend` to get more details about the crash:

```
yarn run v1.15.2
$ node ./dist/index.js
Started calculator service on port 8080.
Caught an unhandled promise rejection "undefined". Will exit process... Error: Undefined symbol Hello
    at undef (/app/node_modules/mathjs/lib/expression/node/SymbolNode.js:104:11)
    at /app/node_modules/mathjs/lib/expression/node/SymbolNode.js:74:100
    at ...
error Command failed with exit code 1.
...
```

The log shows that the application will exit on any invalid input.

As we are not able to change the source code we need to prevent major downtimes when the backend service crashes.
