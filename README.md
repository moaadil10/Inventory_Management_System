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
<br>
cd Inventory-system

<br>
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
<img width="600" alt="Login" src="https://github.com/user-attachments/assets/d52b8e79-c631-4305-97f8-18969527754d" />
<img width="600" alt="Products" src="https://github.com/user-attachments/assets/ea92e381-aa1f-47ea-9b4c-ed32e51f081d" />
<img width="600" alt="Customers" src="https://github.com/user-attachments/assets/e04ecc83-a10c-4dd1-a480-ad177d17df59" />
<img width="600" alt="Create Invoice" src="https://github.com/user-attachments/assets/c9ac39c1-1d00-4c3c-9bb7-c3797182caee" />
<img width="600" alt="Invoice History" src="https://github.com/user-attachments/assets/b62e5167-8517-45d1-93f7-71f9e0d1080e" />
<img width="600" alt="Admin User Management" src="https://github.com/user-attachments/assets/1445e932-5f2d-4b5a-a394-ec00906d04ec" />
<img width="600" alt="Users Create Invoice" src="https://github.com/user-attachments/assets/f2a43568-0b29-411e-963a-4270ec424b68" />
<img width="600" alt="Users Customer Page" src="https://github.com/user-attachments/assets/9c4336d2-735e-4563-b74d-89c54a32fa78" />
<img width="600" alt="Users Invoice History" src="https://github.com/user-attachments/assets/afceeea0-36f1-4179-87de-ce7f6e873c97" />
<img width="600" alt="Dark Mode" src="https://github.com/user-attachments/assets/66ec8494-bc82-49e2-a513-e9a52722c0c4" />
<img width="600" alt="Dark Dashboard" src="https://github.com/user-attachments/assets/ce58c0ca-e765-4e4f-a8c1-09a297e6a10c" />
</p>




👨‍💻 Author

Mohammed Aadil

