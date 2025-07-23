# 🛍️ Angular E-Commerce App

Welcome to my E-Commerce shopping cart application! This responsive Angular app allows users to browse products, view details, add items to a cart, benefit from discounts based on total amount, place orders and cancel orders. 

---

## 🎯 Features

✅ **Product Listing** — Browse all products   
🔍 **Smart Search & Filter** — Search by product title, category, decsription or filter by category  
👁️ **Product Details** — View more info by clicking the eye icon on any product  
🛒 **Shopping Persistant Cart**  
  - Add/Remove products  
  - Adjust product quantities  
  - Clear the entire cart  
  - Toggle cart view via the cart icon in the header  
  - 💸 **Dynamic Discounts**  
  - 🎉 Get a **10% discount** if your cart total exceeds **$100**  
  - 🧠 If total exceeds **$50**, a message prompts the user to keep shopping to unlock the discount 
  - place orders, cancel orders, and view your orders
  

---

## 🏗️ Architecture

This project is built using the latest **Standalone Components** approach introduced in Angular 15+, eliminating the need for traditional `NgModules`. Additionally, **NgRx** is used for robust `state management`, enabling a reactive, predictable flow of data and side effects throughout the app.

---

## ⚡ Performances

This project was built with performance in mind, using modern Angular best practices:

- 🧠 **OnPush Change Detection**:  
  All components use the `ChangeDetectionStrategy.OnPush` to reduce unnecessary DOM updates and re-renders. Only components with changed inputs or signals are re-evaluated, which significantly boosts performance.

- 🌟 **Angular Signals**:  
  Reactive state management is powered by Angular's new `Signals` API. This reduces boilerplate code, improves data flow clarity, and avoids triggering the full component tree for every change.

- 🔍 **Smart Search Bar**:  
  The search bar is optimized with:
  - Debounced input handling to limit filtering on every keystroke  
  - Case-insensitive search queries  
  - Real-time responsiveness without performance drops

- 🎯 **Minimal Change Detection**:  
  Using signals and OnPush together ensures Angular only checks what's truly necessary.

- 🧩 **Efficient Component Design**:  
  Standalone, focused components are used to isolate logic, improve reusability, and avoid performance bottlenecks.

- 📱 **Responsive Rendering**:  
  Layouts are optimized for all screen sizes without unnecessary rendering overhead.
---
##  🧩 Used Frameworks 

🎨 **Tailwind CSS Integration**  
  The UI is styled using **Tailwind CSS**, which provides:
  - Utility-first CSS classes directly in your templates
  - Rapid UI building with consistent spacing, sizing, and typography
  - Responsive design out-of-the-box with mobile-first breakpoints
---
## 🚀 Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Run the app
ng serve

