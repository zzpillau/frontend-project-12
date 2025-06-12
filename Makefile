lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/dist

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/dist
	npm run build


kill-5001:
	bkill -9 $(lsof -t -i :5001)

kill-5002:
	bkill -9 $(lsof -t -i :5002)
