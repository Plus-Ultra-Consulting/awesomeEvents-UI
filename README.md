# awesomeEvents-UI - Vue 3 Frontend

A containerized Vue 3 frontend application to add user interface for java spring boot [backend server](https://github.com/Plus-Ultra-Consulting/awesomeEvents). This version uses a prebuilt Docker image from Docker Hub and runs using **Docker Compose**

--- 

## Quick start

Starting the application from a public docker image

> Docker Image:
> **`cotezzlapyx/awesome-events-ui:latest`**

---

### Requirements

Make sure you have the following installed:
- [Docker](https://docks.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

---

### Setup

In a new folder, create `compose.yaml` with the following content

```yaml
services:
  frontend:
    image: cotezzlapyx/awesome-events-ui:latest
    ports:
      - "3000:80"
    volumes:
      - ./config/config.json:/usr/share/nginx/html/config.json:ro
```

Then, in the same folder, create `config` folder and `confing.json` inside with following the content.

```json
{
  "VITE_API_URL": "http://localhost:8080"
}
```

---

### Deploy

Finally, run the following command in the terminal / CLI / etc. to start the server:

```bash
docker compose up -d
```

Now, web server is available at `http://localhost:3000/` or another port if you changed it in the configuration.

If you want to stop the server and remove the image, run:

```bash
docker compose down
```

If you want to access logs, run:

```bash
docker compose logs -f
```

---

## Manual build

To build the image manually using the source code, you must follow the next instructions.

---

### Requirements

Make sure you have the following installed:
- [Docker](https://docks.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

---

### Building the software

#### Building docker image

First, to build a docker image from project files, run:

```bash
docker compose build
```

---

###  Setup

Now, you have to set up the configuration create `config` folder in project root directory, and inside, create `confing.json` with following the content.

```json
{
  "VITE_API_URL": "http://localhost:8080"
}
```

---

### Deploy

Finally, run the following command in the terminal / CLI / etc. to start the server:

```bash
docker compose up -d
```

Web server is available at `http://localhost:3000/` or another port if you changed it in the configuration.

If you want to stop the server and remove the image, run:

```bash
docker compose down
```

If you want to access logs, run:

```bash
docker compose logs -f
```

---