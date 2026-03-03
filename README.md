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

<p float="left">
<img width="400" alt="Login" src="https://github.com/user-attachments/assets/ed417d3b-8a28-420d-920d-d1f8185dba52" />
<img width="400" alt="Dashboard" src="https://github.com/user-attachments/assets/fdde2f39-3c39-4cd5-80e0-24a9173a7a80" />
<img width="400" alt="Products" src="https://github.com/user-attachments/assets/a71fdca0-a639-42fb-8a4e-056a11b0e010" />
<img width="400" alt="Customers" src="https://github.com/user-attachments/assets/b8e7cea6-7142-4950-b530-60dc1f5dbd80" />
<img width="400" alt="Create Invoice" src="https://github.com/user-attachments/assets/4395dd9a-f8da-4249-9c19-e484836ac687" />
<img width="400" alt="Invoice History" src="https://github.com/user-attachments/assets/5add1d2b-82a7-4935-b384-3f1346597421" />
<img width="400" alt="Admin User Management" src="https://github.com/user-attachments/assets/14d855cf-7e32-4606-9e88-0c34f8782fd8" />
<img width="400" alt="Users Create Invoice" src="https://github.com/user-attachments/assets/ba5fc435-a8bd-4b32-8ed6-a5b8464938aa" />
<img width="400" alt="Users Customer Page" src="https://github.com/user-attachments/assets/bfd50080-82eb-4a7d-8d2c-935e668c5eba" />
<img width="400" alt="Users Invoice History" src="https://github.com/user-attachments/assets/317ff2a5-279f-4c15-b814-78791f83c1b0" />
<img width="400" alt="Dark Mode" src="https://github.com/user-attachments/assets/a29d6658-e2da-44ea-84fc-0ac0c3862a3b" />
</p>



👨‍💻 Author

Mohammed Aadil

