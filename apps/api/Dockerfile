FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/db/package*.json ./packages/db/
COPY packages/shared/package*.json ./packages/shared/

RUN npm install

COPY . .

RUN npm run build --workspace @drivingschool/api

EXPOSE 4000

CMD ["npm", "run", "start", "--workspace", "@drivingschool/api"]
