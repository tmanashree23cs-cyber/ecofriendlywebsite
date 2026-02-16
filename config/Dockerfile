# Use official Node.js LTS version
FROM node:22

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the rest of the project files
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Set environment variables (optional, you can override with Docker run or Docker Compose)
# ENV MYSQLHOST=your_mysql_host
# ENV MYSQLUSER=your_mysql_user
# ENV MYSQLPASSWORD=your_mysql_password
# ENV MYSQLDATABASE=your_mysql_db
# ENV MYSQLPORT=3306

# Start the application
CMD ["node", "app.js"]
