FROM node:21-alpine3.18 as BUILD_IMAGE
WORKDIR /app/react-app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
FROM node:21-alpine3.18 as PRODUCTION_IMAGE
WORKDIR /app/react-app
COPY --from=BUILD_IMAGE /app/react-app/dist/ /app/react-app/dist/
EXPOSE 3000
COPY package.json .
COPY vite.config.ts .
RUN npm install typescript
EXPOSE 3000
CMD ["npm", "run", "start", "preview"]