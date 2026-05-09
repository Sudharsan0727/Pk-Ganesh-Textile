# P.K. Ganesh Textile - Premium Wholesale Platform

This guide will help you set up and run the P.K. Ganesh Textile platform on a new device from scratch.

---

## 🛠️ Step 1: Prepare Your Machine
Before starting, ensure you have these 3 things installed:
1.  **Node.js**: [Download here](https://nodejs.org/) (Version 18+)
2.  **PostgreSQL**: [Download here](https://www.postgresql.org/)
3.  **Git**: [Download here](https://git-scm.com/)

---

## 📂 Step 2: Get the Code
Open your terminal (PowerShell or CMD) and run:
```powershell
# 1. Clone the repository
git clone https://github.com/Sudharsan0727/Pk-Ganesh-Textile.git

# 2. Enter the folder
cd Pk-Ganesh-Textile

# 3. Install main project tools
npm install
```

---

## 🏗️ Step 3: Setup the Database
1.  **Open PostgreSQL** (pgAdmin or terminal) and create a new database named: `textile_db`
2.  **Create an Environment File**:
    *   Go into the `server` folder.
    *   Create a new file named `.env`
    *   Paste this inside (replace `password` with your PostgreSQL password):
    ```env
    DATABASE_URL="postgresql://postgres:password@localhost:5432/textile_db?schema=public"
    JWT_SECRET="pk_ganesh_secret_key"
    ```
3.  **Install Server Tools**:
    ```powershell
    cd server
    npm install
    ```
4.  **Build the Database Structure**:
    ```powershell
    npx prisma migrate dev --name init
    npx prisma generate
    ```

---

## 💾 Step 4: Import Your Backup Data
If you have a backup file (like `db_backup_...json`), follow these steps:
1.  Place the backup file in the main `Pk-Ganesh-Textile` folder.
2.  Run this command (replace `FILENAME` with your actual file name):
    ```powershell
    node server/import-db.js FILENAME.json
    ```
    *Example: node server/import-db.js db_backup_2026-05-09.json*

---

## 🚀 Step 5: Run the Platform
Now you are ready! Run this command from the **main folder**:
```powershell
npm run dev
```
*   **Storefront**: http://localhost:5173
*   **Admin Panel**: http://localhost:5173/admin
*   **Backend API**: http://localhost:5000

---

## 📝 Maintenance Commands
*   **Create a new Backup**: `node server/export-db.js`
*   **Build for Production**: `npm run build`
*   **Clear Database**: `npx prisma migrate reset` (⚠️ Warning: This deletes everything!)

---
Developed for **P.K. Ganesh Tex**.