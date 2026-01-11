FROM node:24-alpine

RUN apk add --no-cache bash git curl
ENV SHELL=/bin/bash

WORKDIR /workspace

# Cache layer for dependencies
COPY package*.json ./
RUN npm ci

# Copy rest of the files
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
