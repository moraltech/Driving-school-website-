FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
COPY packages/shared/package*.json ./packages/shared/

RUN npm install

COPY . .

RUN npm run build --workspace @drivingschool/web

EXPOSE 3000

CMD ["npm", "run", "start", "--workspace", "@drivingschool/web"]
