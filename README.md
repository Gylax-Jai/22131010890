# URL Shortener Microservice 

This project is a backend-only HTTP microservice built using Node.js ,Express.js and MongoDB. 
It allows users to shorten long URLs, optionally use custom shortcodes, track clicks, and view detailed analytics.

This project was developed as part of AffordMed’s campus hiring evaluation process.

---

##  Features Implemented

- REST API for creating, redirecting, and tracking shortened URLs
- Custom shortcodes (if provided) or automatic generation
- Short link expiry logic with default 30 minutes
- Analytics: total clicks, timestamps, referrer, IP location
- Logging:
  - File-based logging to `logs/server.log`
  - Reusable logging function that sends logs to external evaluation server (`http://20.244.56.144/evaluation-service/logs`)
- Error handling with proper HTTP status codes and JSON responses
- Modular folder structure (MVC pattern)

---

##  Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv
- axios (for log API)
- Postman (for testing)


