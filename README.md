# 🛍️ E-Com Backend API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Express-1f6f8b?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Database-MongoDB-2d6a4f?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Validation-Joi-f4a261?style=for-the-badge" alt="Joi" />
  <img src="https://img.shields.io/badge/Uploads-Cloudinary-457b9d?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />
</p>

<p align="center">
  A modular, scalable Node.js backend for an e-commerce platform.<br/>
  Built with clean routing, validation, media upload support, and account activation flow.
</p>

---

## ✨ Highlights

- ⚡ Express 5 powered REST API
- 🧩 Modular feature folders (`auth`, `banner`, `categories`, `users`)
- ✅ Joi-based request validation middleware
- 🔐 Password hashing with bcrypt
- ☁️ Image upload integration via Cloudinary + Multer
- 📨 Account activation email workflow
- 🗃️ MongoDB with Mongoose models and auto-indexing

---

## 🧱 Tech Stack

| Layer          | Technology         |
| -------------- | ------------------ |
| Runtime        | Node.js            |
| Framework      | Express 5          |
| Database       | MongoDB + Mongoose |
| Validation     | Joi                |
| File Upload    | Multer             |
| Cloud Storage  | Cloudinary         |
| Auth Utilities | bcryptjs           |
| Dev Tooling    | Nodemon, pnpm      |

---

## 📂 Project Structure

```text
Backend/
├── index.js
├── package.json
└── src/
    ├── config/
    ├── middleware/
    ├── modules/
    │   ├── auth/
    │   ├── banner/
    │   ├── categories/
    │   └── users/
    ├── Services/
    └── utilities/
```

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create a `.env` file in the root and add values for the keys below.

```env
ENVIROMENT=local

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRETE=your_cloudinary_api_secret

MONGODB_URL=your_mongodb_connection_string
MONGODB_DB=your_database_name

PG_URL=your_postgres_url_optional

SMTP_PROVIDER=gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASSWORD=your_app_password
SMTP_FROM=your_email

FRONTEND_URL=http://localhost:5173
APP_URL=http://localhost:9005
JWT_SECRET=your_jwt_secret

KHALTI_API_KEY=your_khalti_api_key
KHALTI_URL=https://dev.khalti.com/api/v2/
```

### 3. Run development server

```bash
pnpm dev
```

Server runs on:

```text
http://localhost:9005
```

Base API prefix:

```text
/api/v1
```

---

## 🔌 API Snapshot

### Auth

- `POST /api/v1/auth/register`

`multipart/form-data` fields:

- `name` (string, min 2)
- `email` (valid email)
- `password` (8-25 chars with upper/lower/number/special)
- `confirmPassword` (must match `password`)
- `role` (`customer` or `seller`, default `customer`)
- `image` (optional file)

Example request:

```bash
curl -X POST http://localhost:9005/api/v1/auth/register \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "password=Strong@123" \
  -F "confirmPassword=Strong@123" \
  -F "role=customer" \
  -F "image=@/path/to/avatar.png"
```

---

## 🛡️ Error Handling

- Global 404 handler for unknown routes
- Centralized error middleware with structured JSON response

---

## 🧪 Scripts

```bash
pnpm dev      # Start development server with nodemon
pnpm start    # Uses package start script
```

---

## 🗺️ Roadmap Ideas

- 🔑 Login + JWT auth guards
- 🧾 Product and order modules
- ❤️ Wishlist and cart system
- 💳 Payment integration completion (Khalti)
- 📊 Admin analytics endpoints

---

## 🤝 Contributing

Contributions, refactors, and improvements are welcome.

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## 📬 Contact

For suggestions or collaboration, feel free to open an issue or connect with the maintainer.

---

<p align="center"><b>Made with ❤️ for scalable commerce backends</b></p>
