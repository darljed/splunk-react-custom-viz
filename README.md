# react-viz: React-Powered Splunk Custom Visualization

This project is an extended version of the [Splunk Custom Visualization Tutorial](https://docs.splunk.com/Documentation/Splunk/9.4.2/AdvancedDev/CustomVizTutorial), modified to integrate **React 18** for building dynamic and interactive user interfaces. It's designed to be open-source and flexible for your Splunk dashboard needs.

---

## 📖 Overview

**react-viz** is a Splunk custom visualization that lets you use **React components** to display and interact with your search data. This enables rich, modern UIs within your Splunk dashboards.

---

## ⚙️ Requirements

To get started, you'll need:

- **Node.js and npm** – for managing project dependencies and running build scripts.
- **Splunk Enterprise or Splunk Cloud** – to deploy and use the visualization.

---

## 🚀 Setup and Installation

Follow these steps to get the `react-viz` visualization running in your Splunk environment.

### 1. clone the repository in directly to your splunk apps directory 

Using `git` clone the `splunk-react-custom-viz` repository in your splunk app's directory

```
cd $SPLUNK_HOME/etc/apps/
git clone https://github.com/darljed/splunk-react-custom-viz.git
```

Replace `$SPLUNK_HOME` with the path for your Splunk home directory.

**Then restart Splunk.**

### 2. Place React and ReactDOM UMD Builds **(OPTIONAL)**

Even with a build process, it's good practice to ensure Splunk's RequireJS can locate React and ReactDOM independently.

**Download UMD Builds (React 18):**

- [React 18 UMD](https://unpkg.com/react@18/umd/react.production.min.js)
- [ReactDOM 18 UMD](https://unpkg.com/react-dom@18/umd/react-dom.production.min.js)

**Copy Files:**

Place the downloaded files into:

```
splunk-react-custom-viz/appserver/static/vendor/
```

Create the `vendor` folder if it doesn't exist.

---

### 3. Configure RequireJS **(OPTIONAL)**

In your Splunk app’s `appserver/static/app.js` file (create it if needed), add:

```javascript
require.config({
    paths: {
        'react': '/static/app/YOUR_APP_NAME/vendor/react.production.min',
        'react-dom': '/static/app/YOUR_APP_NAME/vendor/react-dom.production.min'
    },
    shim: {
        'react': {
            exports: 'React'
        },
        'react-dom': {
            deps: ['react'],
            exports: 'ReactDOM'
        }
    }
});
```

> 🔁 Replace `YOUR_APP_NAME` with the actual folder name of your Splunk application (e.g., `splunk-react-custom-viz`).

---

### 3. Install Project Dependencies

Navigate to the `react-viz` directory:

```bash
cd $SPLUNK_HOME/etc/apps/splunk-react-custom-viz/appserver/static/visualizations/react-viz/
npm install
```

---

### 4. Build the Visualization

Compile your React code into a single file:

```bash
npm run build
```

The output will be written to `visualization.js` inside the `react-viz` folder.

---

## 🧪 Running the Visualization

### Add to a Dashboard

1. Open or create a Splunk dashboard.
2. Add a new panel with your desired search query.
3. Choose **"My React Viz"** (or the label defined in your `visualizations.conf`) from the visualization picker.

---

## 🛠️ Development

To develop or modify React components:

1. Edit `src/visualization_source.js` – this is where your React logic lives.
2. Run watch mode to auto-rebuild on save:

```bash
npm run watch
```

3. Refresh your dashboard in the browser to view updates.

---

## 📄 License

This project is released under the [MIT License](LICENSE).  
Feel free to use, modify, and distribute it.

---

Happy Splunking! 🎉
