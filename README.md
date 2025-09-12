# Inventory Medical App

This project is a web application built with:
- **ASP.NET Core Web API** as the backend
- **React** as the frontend

---

## Database Setup

The backend uses **SQLite** as the database. To enable it, the following NuGet packages are installed:
- `Microsoft.EntityFrameworkCore.Sqlite`
- `Microsoft.EntityFrameworkCore.Tools`
- `Microsoft.EntityFrameworkCore.Design`

---

## Backend Structure

### Model
- **Article**  
  Defines the structure of an article and serves as the data blueprint.

### Data
- **DbContext** (inside the `Data` folder)  
  Configures the database connection and manages entity sets.

### Services
- Contains methods for interacting with the database.  
  These services handle the business logic and communicate with the `DbContext`.

### Controllers
- Receive requests from the client.
- Use the service layer to perform actions.
- Return responses back to the frontend.

### Program.cs
- Configures the application.
- Sets up the database connection.
- Registers controllers and executes their instructions.

---

## Frontend
The frontend is built with **React**, which communicates with the backend API to display and manage data.

---

