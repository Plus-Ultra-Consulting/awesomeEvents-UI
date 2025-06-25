# awesomeEvents-UI - Vue3 Frontend

A containerized Vue3 frontend application to add user interface for java spring boot [backend server](https://github.com/Plus-Ultra-Consulting/awesomeEvents). This version uses a prebuilt Docker image from Docker Hub and runs using **Docker Compose**

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
    environment:
      VITE_API_URL: ${VITE_API_URL}
```

Then, in the same folder, create `.env` file with following the content.

```dotenv
VITE_API_URL=http://localhost:8080
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
docker-compose logs -f
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

To build a docker image from a project file, run:

```bash
docker compose build
```

---


###  Setup

Now, when all required files are built, you must set up the environment variables.

In project root folder, create `.env` file with the following content.

```dotenv
VITE_API_URL=http://localhost:8080
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
docker-compose logs -f
```

---

## Additional info

---

### Environment configuration

gvTo set up the environment, you can do it manually.
These are the example commands to do it:
- cmd: `set VAR_NAME=value`
- bash: `export VAR_NAME=value`
- powershell: `$env:VAR_NAME="value"`

Or you can create `.env` file in the main folder,
and configure everything there.