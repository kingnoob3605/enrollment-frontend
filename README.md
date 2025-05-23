# React Setup Guide for New Elementary System

## Quick Start Guide (Fresh Installation)

### Step 1: Install Required Software

1. Download and install Node.js from [nodejs.org](https://nodejs.org/)
2. Verify installation by opening Command Prompt or Terminal and typing:
   ```
   node -v
   npm -v
   ```
   Both commands should display version numbers if installed correctly.

### Step 2: Create a Fresh React Project

1. Open Command Prompt or PowerShell
2. Navigate to where you want to create the project:
   ```
   cd C:\Users\PC\Desktop
   ```
3. Create a new React app:
   ```
   npx create-react-app new-elementary-system
   ```
   This may take a few minutes to complete.
4. Navigate into your new project folder:
   ```
   cd new-elementary-system
   ```

### Step 3: Install Required Extensions/Packages

Install all required packages for the project:

```
npm install recharts xlsx axios
```

### Step 4: Migrate Your Content

1. Copy relevant components and files from your old project
2. Update your routing and configuration files as needed

### Step 5: Run the Application

1. In the same Command Prompt or PowerShell window, type:
   ```
   npm start
   ```
2. The application should automatically open in your browser at http://localhost:3000

## Login Credentials

Use the following credentials to access different user roles:

| Role    | Username | Password   |
| ------- | -------- | ---------- |
| Admin   | admin    | admin123   |
| Teacher | teacher  | teacher123 |
| Parents | parents  | parents123 |

## Troubleshooting

If you encounter any issues:

1. Make sure all files are in the correct folder
2. Try running `npm install` again
3. Check that you have the correct version of Node.js installed
4. Restart your computer and try again
5. If you see dependency errors, create a file named `.env` in your project root with the content:
   ```
   SKIP_PREFLIGHT_CHECK=true
   ```

## Video Tutorial

For a more detailed visual guide, watch this tutorial:
https://youtu.be/zuyH4QUuTZk?si=IhzqtCEmWV2clJ3W

## Common Commands

- `npm start`: Starts the development server
- `npm run build`: Creates a production build
- `npm test`: Runs tests
- `npm install [package-name]`: Installs a new package

## Windows-Specific Commands

If using PowerShell and need to delete node_modules:

```
Remove-Item -Recurse -Force node_modules
```

## Need More Help?

Reach out to your team lead if you need additional assistance.
