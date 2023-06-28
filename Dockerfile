# Base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --quiet

# Copy the Next.js app files to the container
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the Next.js app port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
