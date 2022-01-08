FROM node:14.15.4-alpine3.10

WORKDIR /src/worker

COPY package.json package-lock.json  ./

RUN npm ci --production

COPY tsconfig.json ./

COPY /src ./src/

RUN npm run build

CMD [ "npm", "run", "start" ]
