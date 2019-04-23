
build-docker-images:
	cd services/calculator && docker build -t quay.io/kubernetes-workshop/calculator:latest .

publish-docker-images:
	docker push quay.io/kubernetes-workshop/calculator:latest
