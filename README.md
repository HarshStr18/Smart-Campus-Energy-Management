# SmartSave – Intelligent Campus Energy Management System

> **Design Thinking Project:** *Lights On, Nobody Home – SmartSave: An Intelligent Electricity Saving System for Campus*  
> **Tagline:** *Detect. Automate. Save.*  
> **Tech Stack:** HTML5, CSS3, Vanilla JavaScript, Chart.js, Font Awesome, Web Audio API

---

## Overview

**SmartSave** is an interactive software prototype built for our university Design Thinking project using the **Stanford AEIOU observation framework**. It simulates IoT occupancy sensors across campus rooms to detect when spaces are left empty with lights or fans running, starts a 30-second grace countdown, automatically cuts off idle appliances, and restores power when someone returns.

> *Note: This is a pure client-side simulation using realistic appliance wattage and occupancy states—no physical sensors or live electrical relays are connected.*

---

## Design Thinking & AEIOU Fieldwork Findings

During campus audits across classrooms, hostel rooms, and shared study areas, we observed three distinct usage patterns:

| Location Type | Observed Status | Root Cause | SmartSave Approach |
| :--- | :--- | :--- | :--- |
| **Academic Classrooms (101–104)** | Lights & fans mostly OFF | Scheduled lectures have faculty and staff who switch off rooms after class. | Keeps rooms in eco-standby and prevents accidental overnight usage. |
| **Hostel Rooms (201–203)** | Lights & fans frequently left ON | Students rush to 8:00 AM classes; fixed hostel fees remove individual billing awareness. | Runs a 30-second grace countdown and shuts off idle lights and ceiling fans automatically. |
| **Hostel Study Room** | Lights & fans left ON 24/7 | *Tragedy of the commons*—late-night groups leave assuming someone else will turn switches off. | Eliminates continuous unattended power draw in shared spaces. |

---

## Key Features

- **Live Campus Metrics**: Tracks estimated electricity saved (`kWh`), estimated cost savings (at `₹8.50/kWh` institutional tariff), occupied vs. empty room count, and rooms currently wasting power.
- **8 Monitored Campus Zones** with category filters (*All Campus Zones*, *Academic Classrooms*, *Hostel & Study Rooms*):
  - **Academic Classrooms (4):** Classroom 101, Classroom 102, Classroom 103 (Seminar Hall), Classroom 104 (Tutorial Hall)
  - **Hostel & Study Rooms (4):** Hostel Room 201, Hostel Room 202, Hostel Room 203, Hostel Study Room
- **Smart Automation & 30s Grace Countdown**:
  - Automatically detects empty rooms with active appliances and starts a 30-second countdown before switching lights and fans OFF.
  - Restores configured lights and fans immediately when occupancy returns.
- **Manual Device Control & Override**:
  - Individual Light and Fan switches on every room card with real-time wattage display.
  - **Manual Override** toggle per room to keep lights/fans on continuously while sleeping or studying quietly.
- **Presenter Mode (One-Click Demo)**:
  - `1. Student Leaves` — Simulates departure in Hostel Room 201 and starts the countdown.
  - `2. Auto-Shutdown` — Completes the countdown immediately, shuts off appliances, and records energy savings.
  - `3. Student Returns` — Simulates re-entry and restores lights and fans.
  - `Reset Demo` — Resets all 8 rooms to their initial demo states.
- **Daily Energy Comparison Chart**: Interactive Chart.js curve comparing traditional unmonitored campus wastage against SmartSave automated shutoffs.
- **Help & Campus FAQ Section**:
  - Header shortcut button scrolling to `#help-section`.
  - Expandable 5-question FAQ accordion covering overrides, the 30-second grace timer, wall switch compatibility, savings math, and AEIOU fieldwork.
  - Interactive question box with quick-topic pills and keyword-based instant answers.
- **Light / Dark Theme & Sound Feedback**:
  - Architectural warm-stone & forest-teal light theme (default) with matte charcoal & sage-teal dark mode toggle.
  - Synthesized Web Audio feedback for switch clicks, relay shutoffs, and restoration chimes (with mute toggle).

---

## Project Structure

```text
smartsave/
├── index.html      # Main single-page dashboard, rooms grid, AEIOU table, chart & Help/FAQ
├── css/
│   └── styles.css  # Light/dark design tokens, responsive layout, card & FAQ styles
├── js/
│   └── app.js      # Room simulation engine, countdown timer, Chart.js setup & Q&A logic
└── README.md       # Project documentation
```

---

## How to Run

### Option 1: Open Directly
Open `smartsave/index.html` directly in any modern web browser (no build step or backend required).

### Option 2: Run with a Local HTTP Server
From the repository root:

```bash
python -m http.server 5173 --directory smartsave
```

Then open `http://localhost:5173/` in your browser.
