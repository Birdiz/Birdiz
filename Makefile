SHELL := /bin/bash

WEB_DIR := web
API_DIR := api
NPM := npm

.PHONY: help install install-web install-api dev dev-web dev-api start-web start-api build-web build-api build lint lint-web lint-api prettier prettier-web prettier-api typecheck typecheck-web typecheck-api test test-web test-api docker-build-api docker-up-api docker-up check clean

help:
	@echo "Available targets:"
	@echo "  make install      - Install dependencies for web and api"
	@echo "  make install-web  - Install dependencies for web"
	@echo "  make install-api  - Install dependencies for api"
	@echo "  make dev          - Run web and api dev servers together"
	@echo "  make dev-web      - Run Next.js dev server"
	@echo "  make dev-api      - Run API server in dev mode"
	@echo "  make start-web    - Run Next.js production server"
	@echo "  make start-api    - Run API server from dist"
	@echo "  make build-web    - Build Next.js app"
	@echo "  make build-api    - Build API TypeScript output"
	@echo "  make docker-build-api - Build API Docker image (production runtime)"
	@echo "  make docker-up-api    - Build and start API container"
	@echo "  make docker-up        - Build and start full Docker stack"
	@echo "  make build        - Build web app"
	@echo "  make lint         - Run lint in web and api"
	@echo "  make prettier     - Run Prettier in web and api"
	@echo "  make typecheck    - Run type checks in web and api"
	@echo "  make test         - Run tests in web and api"
	@echo "  make check        - Run lint and typecheck in both services"
	@echo "  make clean        - Remove local node_modules and web build output"

install: install-web install-api

install-web:
	$(NPM) --prefix $(WEB_DIR) install

install-api:
	$(NPM) --prefix $(API_DIR) install

dev-web:
	$(NPM) --prefix $(WEB_DIR) run dev

dev-api:
	$(NPM) --prefix $(API_DIR) run dev

dev:
	@set -euo pipefail; \
	trap 'kill 0' INT TERM EXIT; \
	$(NPM) --prefix $(API_DIR) run dev & \
	$(NPM) --prefix $(WEB_DIR) run dev & \
	wait

start-web:
	$(NPM) --prefix $(WEB_DIR) run start

start-api:
	$(NPM) --prefix $(API_DIR) run start

build-web:
	$(NPM) --prefix $(WEB_DIR) run build

build-api:
	$(NPM) --prefix $(API_DIR) run build

build: build-web

docker-build-api:
	docker compose build api

docker-up-api:
	docker compose up --build api

docker-up:
	docker compose up --build

lint-web:
	$(NPM) --prefix $(WEB_DIR) run lint

lint-api:
	$(NPM) --prefix $(API_DIR) run lint

lint: lint-web lint-api

prettier-web:
	$(NPM) --prefix $(WEB_DIR) exec -- prettier --write $(WEB_DIR)

prettier-api:
	$(NPM) --prefix $(API_DIR) exec -- prettier --write $(API_DIR)

prettier: prettier-web prettier-api

typecheck-web:
	$(NPM) --prefix $(WEB_DIR) run typecheck

typecheck-api:
	$(NPM) --prefix $(API_DIR) run typecheck

typecheck: typecheck-web typecheck-api

test-web:
	$(NPM) --prefix $(WEB_DIR) run test

test-api:
	$(NPM) --prefix $(API_DIR) run test

test: test-web test-api

check: lint typecheck

clean:
	rm -rf $(WEB_DIR)/node_modules $(API_DIR)/node_modules $(WEB_DIR)/.next
