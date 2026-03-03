# 🧾 Inventory Management System

A full-stack Inventory & Billing System built using **ASP.NET Core Web API** and **Angular**, designed to manage products, customers, invoices, and real-time stock updates.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based login system
- Role-based access:
  - **Admin**: full access
  - **User**: invoice & history access

---

### 📦 Product Management (Admin)
- Add / Edit / Delete products
- Real-time stock tracking
- Low stock alerts

---

### 👥 Customer Management
- Add / Edit / Delete customers
- Accessible to Admin & Users

---

### 🧾 Invoice System
- Create invoices with multiple products
- Automatic stock deduction
- Prevents invoice creation if stock is insufficient
- Grand total auto-calculated

---

### 📜 Invoice History
- View all invoices
- Displays:
  - Customer
  - Items & quantities
  - Total amount
  - Status (Active / Cancelled)

---

### ❌ Cancel Invoice (Safe Delete)
- Restores product stock
- Marks invoice as **Cancelled**
- Maintains data integrity

---

### 🔍 Search & Filters
- Search by:
  - Customer name
  - Product name
- Filter by date
- Show / hide cancelled invoices

---

### 📄 Export & Actions
- Print invoice
- Export invoice to PDF
- Export invoice history to CSV
- Email invoice (mailto)

---

### 📊 Dashboard
- Revenue summary
- Total invoices
- Low stock alerts
- Chart visualizations (Chart.js)

---

### 🎨 UI Features
- Bootstrap responsive design
- Dark mode toggle
- Sidebar navigation
- Modern table layouts

---

## 🛠️ Tech Stack

### 🔹 Frontend
- Angular (Standalone Components)
- Bootstrap 5
- Chart.js
- jsPDF + AutoTable

### 🔹 Backend
- ASP.NET Core 8 Web API
- Entity Framework Core
- SQL Server
- JWT Authentication

---

## 📁 Project Structure
inventory-system/
│
├── backend/
│ └── InventoryApi/
│
├── frontend/
│ └── inventory-ui/
│
└── README.md


---

⚙️ How to Run the Project
1️⃣ Clone Repository
git clone [https://github.com/your-username/Inventory-system](https://github.com/moaadil10/Inventory-system).git
cd Inventory-system

2️⃣ Setup Backend (ASP.NET Core API)
cd BackendAPI
dotnet restore
dotnet run

✔ API runs at:
https://localhost:5001 or http://localhost:5000


3️⃣ Setup Frontend (Angular)
cd UI
npm install
ng serve

✔ App runs at:
http://localhost:4200

🧩 Database Setup

Create MySQL database:

CREATE DATABASE RestaurantInventory;

Update connection string in:
appsettings.json

"ConnectionStrings": {
  "DefaultConnection": "server=localhost;database=InventoryDB;user=root;password=yourpassword"
}

Run migrations:

dotnet ef database update



📸 Key Functional Flow


Select Customer

Load linked products

Enter quantity

System calculates total

Save order to database

🔒 Validation & Error Handling

Required field validation

Invalid quantity prevention

API error handling

User-friendly messages



🎯 Learning Outcomes


This project demonstrates:

Full-stack development

Angular & ASP.NET Core integration

REST API design

Entity Framework relationships

Real-world inventory logic

Clean project structure



🚧 Future Improvements

Docker deployment

Azure hosting


<img width="1910" height="901" alt="Users Invoice History" src="https://github.com/user-attachments/assets/dc279540-269a-4daa-ad11-ea9eb8f68524" />

👨‍💻 Author

Mohammed Aadil

