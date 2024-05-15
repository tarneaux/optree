FROM node:lts-alpine

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY svelte.config.js .
COPY vite.config.ts .

COPY src src
COPY static static

RUN npm i
RUN npm run build
EXPOSE 8080
CMD ["npm","run", "preview","--", "--host", "0.0.0.0", "--port", "8080"]
