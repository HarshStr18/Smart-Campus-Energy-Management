<<<<<<< HEAD
﻿# SmartSave – Intelligent Campus Energy Management System

> **Design Thinking Project:** *Lights On, Nobody Home – An Intelligent Electricity Saving System for Campus*  
> **Tagline:** *Detect. Automate. Save.*  
> **Target Rooms:** Classroom 101, Classroom 102, Hostel Room 201, Hostel Room 202, Hostel Study Room

---

## 1. Project Background & Observation (AEIOU Framework)

During our campus Design Thinking audit, our team noted a clear pattern:
- **Classroom 101 & 102**: Lights and fans were observed **OFF** because professors and building staff lock lecture halls when classes end.
- **Hostel Room 201 & 202**: Lights and fans were observed **ON in empty rooms** because students rush to 8:00 AM lectures in a hurry, and hostel fees are fixed without individual per-unit electric bills.
- **Hostel Study Room**: Lights and fans were observed **ON in empty rooms** because students leave late-night study sessions assuming someone else will turn them off.

**SmartSave** was built to solve this problem automatically using simulated occupancy sensing, an inactivity countdown, and instant restoration when students return.

---

## 2. Clean, Simple Architecture

- **Live Campus Rooms Grid**:
  - Shows all 5 rooms with instant status: `Occupied`, `Wasting Power (Empty & ON)`, or `Standby (OFF)`.
  - Realistic tactile switches for **Lights** and **Fans**.
  - Visible countdown timer when an empty room has active appliances (e.g. `Auto-off in: 18s`).
  - Simulation buttons on each card: **"Student Leaves"** and **"Student Enters"**.
  - **Manual Override** toggle for students studying quietly without movement.
- **One-Click Demo Presenter Controls**:
  - **1. Student Leaves**: Triggers departure in Hostel Room 201 and starts the countdown.
  - **2. Auto-Shutdown**: Forces the countdown to complete, switching devices OFF and logging savings.
  - **3. Student Returns**: Simulates arrival, immediately restoring lights and fans.
  - **Reset Demo**: Restores baseline demonstration values.
- **Design & Theme Match**:
  - Directly matches the portfolio's clean design tokens:
    - Deep navy background (`#0b0f19`)
    - Dark / Light theme toggle support
    - Ambient particle canvas and cursor spotlight
    - Accent colors: Sky blue (`#38bdf8`), indigo (`#6366f1`), emerald (`#10b981`), amber (`#f59e0b`)
    - Soft Web Audio relay clicks and chimes
- **Chart.js Comparison**:
  - Compares traditional campus consumption (continuous wasteful draw during empty hours) vs. SmartSave automated shutdown.

---

## 3. How to Run

1. Open `smartsave/index.html` in any web browser.
2. Or run locally:
   ```bash
   cd smartsave
   python -m http.server 8000
   ```
   Open `http://localhost:8000` in your browser.
=======
# Smart-Campus-Energy-Management
IoT-inspired Smart Campus Energy Management Design Thinking Prototype
>>>>>>> e53e9cb2d9c8cb27bf7657224cee56a3098c35fe
