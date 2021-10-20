FROM node:14

RUN npm install -g serve

WORKDIR /app

COPY ./dist ./

EXPOSE 5000

CMD ["serve"]
