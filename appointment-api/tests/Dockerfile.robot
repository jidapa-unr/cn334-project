FROM python:3.10-slim

RUN apt-get update && apt-get install -y chromium chromium-driver

WORKDIR /tests

COPY requirements-test.txt .
RUN pip install --no-cache-dir -r requirements-test.txt

CMD ["robot", "-d", "results", "."]