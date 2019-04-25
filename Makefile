
build-and-push: backend frontend-v1 frontend-v2
	
backend:
	cd services/calculator-backend && \
	docker build -t quay.io/kubernetes-workshop/calculator-backend:v1 .
	docker push quay.io/kubernetes-workshop/calculator-backend:v1

frontend-v1:
	cd services/calculator-frontend && \
	docker build -t quay.io/kubernetes-workshop/calculator-frontend:v1 --build-arg appVersion=1 .
	docker push quay.io/kubernetes-workshop/calculator-frontend:v1

frontend-v2:
	cd services/calculator-frontend && \
	docker build -t quay.io/kubernetes-workshop/calculator-frontend:v2 --build-arg appVersion=2 .
	docker push quay.io/kubernetes-workshop/calculator-frontend:v2
