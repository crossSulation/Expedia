FROM node:latest

ENV NODE_ENV production

# Set the working directory to /app
WORKDIR /usr/src/app

COPY ["package.json","tsconfig.json","gulpfile.js", "src","/usr/src/app/"]

RUN npm install gulp -g && \
    npm install

# need copy all the staff to container
COPY . .
# Make port 3000 available to the world outside this container
EXPOSE 3000

CMD npm run prod