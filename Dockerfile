FROM node:18.16.1-alpine3.17

WORKDIR /src/worker

RUN npm install typescript -g

COPY package.json package-lock.json  ./

RUN npm ci --production

COPY tsconfig.json ./

COPY /src ./src/

RUN npm run build

CMD [ "npm", "run", "start" ]
