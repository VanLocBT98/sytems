FROM node:gallium-alpine AS builder
# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json yarn.lock ./
COPY patches patches
RUN yarn install --frozen-lockfile

# Copy app files
COPY . .

# Build the app
RUN yarn build-storybook

# Bundle static assets with nginx
FROM nginx:stable-alpine

# Copy built assets from builder
COPY --from=builder /app/storybook-static /usr/share/nginx/html
