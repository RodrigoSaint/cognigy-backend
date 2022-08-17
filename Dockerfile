FROM node:18-alpine

ENV PORT=3000
ENV NODE_PATH=/var/app/build

RUN mkdir /var/app -p
WORKDIR /var/app

RUN echo "Running"
COPY . .
EXPOSE ${PORT}

CMD npm start