# OSC-VisualMonitor

This project contains a visual monitoring software for OSC-based synchronization.

It is a browser-based interface that listens to OSC messages in real time and displays beat, time, and measure information visually. It also includes a stopwatch timer managed by the server and provides interactive audio feedback and customization via an integrated settings menu.

---

## Requirements

- Node.js (v16 or later recommended)
- `npm` (Node Package Manager)

You must install the following Node.js modules:

- `express`
- `socket.io`
- `osc`

> The `node_modules` folder is **not** included in the repository. You must install the dependencies manually (see below).

---

## Project Setup

1. **Clone or download the repository**

2. **Navigate to the project folder in your terminal:**

   ```bash
   cd /path/to/OSC-VisualMonitor
   ```

3. **Install dependencies:**
   ```bash
   npm install express socket.io osc
   ```

---

## Running the Server

To start the server, run:

```bash
node server.js
```

By default, the server listens on port `3000`.

You should see:

```
listening on port:3000
```

---

## Accessing the Web Interface

To view the application from **any device on the same local network**, follow these steps:

### 1. Connect devices to the same **Wi-Fi LAN** or use **Ethernet** cable

- All devices (server and clients) must be connected to the same network.
- **Avoid being connected to multiple Wi-Fi networks at once.** We recommend "forgetting" all other Wi-Fi networks on your devices to avoid unintentional disconnection during use.

### 2. Find the server's **local IP address**

On the machine running the server:

- **Mac**:  
  Go to `System Preferences > Network` and find the IP (e.g., `192.168.1.42`)

- **Windows**:  
  Run `ipconfig` in the Command Prompt. Look for the `IPv4 Address` under your active network.

### 3. Set a **static IP address** on the server machine

This ensures consistent access without IP changes.

#### macOS:
- Go to `System Preferences > Network`
- Select your active interface (Wi-Fi or Ethernet)
- Click `Advanced > TCP/IP`
- Change "Configure IPv4" to "Manually"
- Enter:
  - IP address: (e.g., `192.168.1.42`)
  - Subnet mask: usually `255.255.255.0`
  - Router: your network gateway (e.g., `192.168.1.1`)

#### Windows:
- Go to `Settings > Network & Internet > Change adapter options`
- Right-click your connection > `Properties`
- Select `Internet Protocol Version 4 (TCP/IPv4)` > `Properties`
- Set:
  - IP address (e.g., `192.168.1.42`)
  - Subnet mask (`255.255.255.0`)
  - Default gateway (`192.168.1.1`)

> Consult your router documentation if unsure about the gateway address.

### 4. Open the interface on any device

In a browser, enter:

```
http://<your-server-ip>:3000
```

For example:

```
http://192.168.1.42:3000
```

> It is also recommended to configure all device (both server and clients) to prevent sleep/standby mode, to avoid unexpected disconnections during the performance.
---

## Settings Menu

Click the gear icon (⚙️) on the top right to access the **settings panel**, where you can:

- Show/hide the following sections:
  - **Time (OSC)**
  - **Time (server)**
  - **Metronome**
  - **Measure**
- Enable/disable **audio feedback** using the Web Audio API

These settings are useful for tailoring the interface to different performance or rehearsal needs.

---

## OSC Controls

The application listens to the following OSC messages:

- `/beat/str` — Sends the current measure and beat, separated by a dot.
- `/time/str` — Sends the elapsed time in the format `hh:mm:ss.ms`
- `/start` — Starts the stopwatch timer
- `/stop` — Stops the stopwatch timer
- `/resume` — Resumes the stopwatch timer
- `/set` — Sets the stopwatch time

You can use **any OSC-capable software** to control this application.

---

## Examples (Coming Soon)

Examples demonstrating integration with Max MSP and Reaper are currently under development and will be added in a future update.

If you want to contribute examples or request specific integrations, feel free to open an issue or contact the author.


---

## Author

Originally developed by **sggfnc00**


---
