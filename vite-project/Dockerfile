# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 5173

RUN npm install --save-exact axios@^0.27.2

# Start server
CMD [ "npm", "run", "dev" ]