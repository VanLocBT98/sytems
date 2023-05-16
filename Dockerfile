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
RUN yarn build

# Bundle static assets with nginx
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

ENV RENDERTRON_HOST=rendertron.default:3000
