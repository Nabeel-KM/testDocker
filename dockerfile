
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install --production

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/out ./out
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json


EXPOSE 3000

# CMD ["npm", "start"]

CMD [ "npx", "serve", "-s", "out" ]
