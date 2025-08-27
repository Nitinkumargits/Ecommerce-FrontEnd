##############
# Build stage #
##############
FROM node:22-alpine AS build

# Work inside /app for the frontend
WORKDIR /app

# Copy only package manifests first to leverage Docker layer caching
COPY package*.json ./

# Install dependencies (prefer ci when lockfile is present, fallback to install)
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund

# Optional build-time API base URL; if provided and .env isn't copied, we'll create it
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

# Copy the rest of the frontend source
COPY . ./

# Build static assets
RUN npm run build

################
# Runtime stage #
################
FROM nginx:1.27-alpine AS production

# Replace default nginx site with SPA-friendly config
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts to nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]