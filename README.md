## Overview

The New app is created with React JS, Typescript, Redux JS, and Tailwind css.

## Dockerization
### Dockerfile

The Dockerfile defines the steps to build the Docker image for the application.

### Use an official Node.js runtime as a parent image
`FROM node:20 AS build`

### Set the working directory in the container
`WORKDIR /app`

### Copy package.json and package-lock.json files
`COPY package*.json ./`

### Install the dependencies
`RUN npm install`

### Copy the rest of the application files
`COPY . .`

### Build the React app
`RUN npm run build`

### Use a smaller image for serving the app
`FROM nginx:alpine`

### Copy the build files from the build stage to the Nginx HTML directory
`COPY --from=build /app/build /usr/share/nginx/html`

### Expose port 80 to access the app
`EXPOSE 80`

### Start Nginx server
`CMD ["nginx", "-g", "daemon off;"]`

### Setup and Dockerization
1. Clone the Repository:

	git clone https://github.com/nitha-pushparajan/news-aggregator.git

	cd news-aggregator

2. Install Docker:

	Ensure Docker is installed on your machine. You can download it from Docker's official website.

3. Build the Docker Image:

	`docker build -t news-app .`

4. Run the Docker Container:
	
	`docker run -p 80:80 news-app`
	
5. Access the Application:

	Open your web browser and go to http://localhost to see the application running.