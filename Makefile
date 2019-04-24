
build-docker-images:
	cd services/calculator-backend && docker build -t quay.io/kubernetes-workshop/calculator-backend:latest .

publish-docker-images:
	docker push quay.io/kubernetes-workshop/calculator-backend:latest
