NBA-WEB-AI
=================

Production-ready Django app that predicts NBA game winners using a pre-trained model.

Quickstart
----------

1) Clone and configure environment:

```bash
cp env.example .env
# Edit .env as needed
```

2) Run with Docker (recommended):

```bash
docker compose up --build
```

App: http://localhost:8000/

Environment Variables
---------------------

See `.env.example` for defaults. Key variables:
- `SECRET_KEY`
- `DEBUG` (True/False)
- `ALLOWED_HOSTS` (comma-separated)
- `DATABASE_URL` (optional, e.g., postgres://...)
- Or explicit `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`

Local Development (without Docker)
----------------------------------

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Deployment Notes
----------------

- Static files served via WhiteNoise; run `collectstatic`
- Gunicorn used in Docker for production run
- Healthcheck configured in `docker-compose.yml`

Testing
-------

E2E tests live in `e2e/` (Playwright). To run:

```bash
cd e2e && npm ci && npx playwright test
```