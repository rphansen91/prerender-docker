## Prerender Docker

Prerender web applications by supplying the static src as a volume.

# Build Images

npm run build

# Start Docker Compose

npm start

# Variables

```.env

LOGGER=debug
PUBLIC_DIST=/src/app/public
PUBLIC_SRC=./<path_to_web_app>
PRERENDER_URL=http://prerender-server:3000/

# USE PRERENDER HOSTED SERVER

# PRERENDER_URL=https://service.prerender.io/
# PRERENDER_TOKEN=<YOUR_TOKEN>

```