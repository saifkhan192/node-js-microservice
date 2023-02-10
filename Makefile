.PHONY: _list
_list:
	@echo "Type make then a space then hit tab to see available commands"

build:
	cp -u src/.env.dist src/.env
	docker-compose --file docker/docker-compose.yml up -d --build
	@sleep 1

rebuild_all:
	cp -u src/.env.dist src/.env
	docker-compose --file docker/docker-compose.yml up -d --force-recreate --build
	@sleep 1


run_app:
	@google-chrome http://localhost:8080/tabs
	@docker logs --follow express_app

run:
	make build
	make run_app

bash_app:
	docker exec -it express_app /bin/bash

down:
	docker-compose --file docker/docker-compose.yml down

up:
	docker-compose --file docker/docker-compose.yml up -d

recreate_app:
	# docker-compose --file docker/docker-compose.yml up -d --force-recreate --no-deps --build express_app
	docker-compose --file docker/docker-compose.yml up -d --force-recreate --no-deps express_app
	docker logs --follow express_app

rebuild_app:
	docker-compose --file docker/docker-compose.yml up -d --force-recreate --no-deps --build express_app
	docker logs --follow express_app


run_all:
	docker container start mongodb || true
	docker container start mysql || true
	docker container start express_app || true
	# @google-chrome http://localhost:8080/user/get
	make view_logs

view_logs:
	docker logs --follow --tail 250 express_app

view_logs2:
	# docker logs --follow express_app  2>&1 | ccze -m ansi
	# docker logs --follow express_app  2>&1 | ccze -m ansi
	docker logs --follow --tail 250 express_app  2>&1 | ccze -m ansi

run:
	make run_all
	make view_logs

stop_all:
	docker container stop mongodb || true
	docker container stop express_app || true
	docker container stop mysqldb || true
	docker container stop cache || true

run_tests:
	# docker exec -t express_app npm run test
	# docker exec -t express_app bash -c "export NODE_ENV=test && tape src/tests/test-*.js"
	docker exec -t express_app bash -c "export NODE_ENV=test && jest --config=src/tests/jest.config.js --detectOpenHandles  --forceExit"

run_tests_debug_working1:
	docker exec -t express_app bash -c "export NODE_ENV=test PORT=8082 && node --inspect=0.0.0.0:9230 --inspect-brk src/tests/test-*.js"

run_tests_debug:
	docker exec -t express_app bash -c "export NODE_ENV=test && node --inspect=0.0.0.0:9230 --inspect-brk /app/node_modules/jest/bin/jest --config=/app/src/tests/jest.config.js --forceExit"

	
pm2_start:
	# https://pm2.keymetrics.io/docs/usage/application-declaration/
	pm2 start app.js --name myapp --watch --log pm2_myapp.log

run_client_install:
	docker exec -t express_app bash -c "cd client && if [ ! -d './node_modules/.bin/' ]; then npm install; fi"

run_client_watch:
	make run_client_install
	docker exec -t express_app bash -c "cd client && npm run watch"



push:
	git push -f -u origin main

ammend:
	git add .
	git commit --amend --no-edit
