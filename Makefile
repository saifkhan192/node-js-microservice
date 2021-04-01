.PHONY: _list
_list:
	@echo "Type make then a space then hit tab to see available commands"

build:
	cp -u .env.dist .env
	docker-compose --file docker/docker-compose.yml up -d --build
	@sleep 1

run_app:
	@google-chrome http://localhost:8080/
	@docker logs --follow express_app

run:
	make build
	make run_app

bash_app:
	docker exec -it express_app /bin/bash

recreate_app:
	docker-compose --file docker/docker-compose.yml up -d --force-recreate --no-deps --build express_app
	docker logs --follow express_app

run_all:
	docker container start mongodb || true
	docker container start express_app || true
	@google-chrome http://localhost:8080/

view_logs:
	# docker logs --follow pj_react
	docker logs --follow express_app

stop_all:
	docker container stop mongodb || true
	docker container stop express_app || true

run_tests:
	# docker exec -t express_app npm run test
	docker exec -t express_app bash -c "export NODE_ENV=test && tape src/tests/test-*.js"
