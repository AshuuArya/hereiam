# offline — a quiet internet story 🌌

> *"well this convo can take any turn… but it depends on what road you choose."*

A cinematic late-night scroll about slowly getting attached to a stranger through messages. This is an interactive web experience capturing the story of two people who unexpectedly started mattering to each other.

---

## 🚀 Getting Started

### 📋 Prerequisites

To run this project locally, you will need:
*   **Node.js**: Version 18.0.0 or higher.
*   **npm**: Installed by default with Node.js. (Alternatively, you can use `pnpm` or `yarn`).

---

## 🛠️ Installation & Setup

1.  **Clone or Open the Project Directory**:
    Navigate to the root directory where the project files are located:
    ```bash
    cd APA
    ```

2.  **Install Dependencies**:
    Install all required packages and standard plugins using `npm`:
    ```bash
    npm install
    ```

---

## 💻 Running the Application

### 1️⃣ Local Development Server

Run the development server locally:
```bash
npm run dev
```
Once started, the application will be available at:
*   **URL**: `http://localhost:5173/` (or the port shown in your terminal)

In development mode:
*   **Hot Module Replacement (HMR)** is fully enabled. Any changes you make to the UI will instantly reflect in the browser without losing state.
*   **File Routing** is dynamically monitored and updated by TanStack Start.

---

### 2️⃣ Production Build

To build the application for production deployment (optimized, minified, and server-side rendered):
```bash
npm run build
```

This will bundle:
1.  **Client Assets** into `.output/public`
2.  **Server Middleware & Handlers** for deployment

---

### 3️⃣ Local Preview (Cloudflare Workers)

This project is fully ready for **Cloudflare Workers** utilizing `@cloudflare/vite-plugin`. To preview the production build locally under the actual Cloudflare environment:
```bash
npx wrangler dev
```
This runs the local `workerd` runtime matching your configuration in `wrangler.jsonc`.

---

## 📂 Project Structure

```
APA/
├── src/
│   ├── assets/          # Images and visual story assets
│   ├── components/      # UI components (shadcn/ui layout modules)
│   ├── lib/             # Utility files, classes, and error handlers
│   ├── routes/          # File-based routing definitions
│   │   ├── __root.tsx   # Root shell and global app configuration
│   │   └── index.tsx    # Interactive story experience entry point
│   ├── styles.css       # Global design system & animations
│   ├── server.ts        # Cloudflare / SSR fetch handler
│   └── start.ts         # TanStack Start framework middleware
├── vite.config.ts       # Standard Vite and plugin configurations
└── wrangler.jsonc       # Cloudflare Workers configuration
```

---

## 🎨 Technology Stack

*   **Framework**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (React 19)
*   **Routing**: [TanStack Router](https://tanstack.com/router/v1/docs/guide/routing/introduction) (File-based, type-safe routing)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS variables
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Runtime Environment**: Cloudflare Workers ready (`wrangler`)
