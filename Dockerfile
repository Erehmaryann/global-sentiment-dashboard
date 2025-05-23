# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY pnpm-lock.yaml ./
COPY package.json ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the app
COPY . .

# Build the app
RUN pnpm run build

# Production stage
FROM nginx:alpine

# Copy built app to nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
