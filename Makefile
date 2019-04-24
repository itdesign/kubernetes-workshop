
build-docker-images:
	cd services/calculator-backend && docker build -t quay.io/kubernetes-workshop/calculator-backend:latest .
	cd services/calculator-frontend && docker build -t quay.io/kubernetes-workshop/calculator-frontend:latest .

publish-docker-images:
	docker push quay.io/kubernetes-workshop/calculator-backend:latest
	docker push quay.io/kubernetes-workshop/calculator-frontend:latest
