FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json .
RUN npm ci 
COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist/

COPY --from=build /app/package*.json .

COPY --from=build /app/env/ ./env/

RUN npm ci --only=production

EXPOSE 8091

CMD ["npm", "run" ,"start:prod"]