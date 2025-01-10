# LinkSnap Setup Guide

This project is organized as a monorepo, consisting of both a **backend** and a **frontend**. Below are the instructions on how to set up and run both parts of the application.

---

## Prerequisites

Ensure you have the following installed on your machine:

- **[Node.js](https://nodejs.org/)** (v22 or later recommended)
- **[pnpm](https://pnpm.io/)** (for managing dependencies in the monorepo)
- **[Auth0](https://auth0.com/)** (for authentication)

If you don’t have `pnpm` installed, you can install it globally using:

```bash
npm install -g pnpm
```

---

## Monorepo Structure

The repository is structured as follows:

```
monorepo/
|-- apps/
|   |-- backend/    # Backend application
|   |-- frontend/   # Frontend application
|-- package.json    # Root package.json for monorepo
|-- pnpm-workspace.yaml  # pnpm workspace configuration
|-- README.md       # Project documentation
|-- .gitignore      # Files and directories to ignore
```

The **backend** and **frontend** are managed as separate workspaces within the monorepo.

---

## Initial Setup

### 1. Clone the Repository

Clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd monorepo
```

### 2. Install Dependencies

Install dependencies for all workspaces (backend and frontend) with a single command:

```bash
pnpm install
```

This will install dependencies for both the backend and frontend applications as defined in the `pnpm-workspace.yaml` file.

---

## Backend Setup

### 1. Navigate to the Backend Directory

Change to the backend workspace directory:

```bash
cd apps/backend
```

### 2. Create the `.env` File

The backend requires an `.env` file for configuration. Create a file named `.env` in the `apps/backend/` directory with the following content:

```
PORT=4000
AUTH0_AUDIENCE=backend-url
AUTH0_BASE_URL=auth0-domain-url
FRONTEND_ORIGIN=frontend-url
DATABASE_URL="file:./dev.db"
```

### 3. Run the Backend

Start the backend server in development mode:

```bash
pnpm dev
```

The backend will be available at [http://localhost:4000](http://localhost:4000) (or the port specified in the `.env` file).

---

## Frontend Setup

### 1. Navigate to the Frontend Directory

Change to the frontend workspace directory:

```bash
cd apps/frontend
```

### 2. Create the `.env` File

Create a `.env` file in the `apps/frontend/` directory with the following content:

```txt
VITE_AUTH0_DOMAIN=your-domain
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=backend-url
```

### 3. Run the Frontend

Start the frontend development server:

```bash
pnpm dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000) (or the port specified in the `.env` file).

---

## Running Both Applications Simultaneously

To run both the backend and frontend simultaneously, you can use the following commands from the root directory:

```bash
pnpm --filter backend dev & pnpm --filter frontend dev
```

This will start the backend and frontend servers concurrently.

---

## Summary of Commands

- **Install all dependencies**: `pnpm install`
- **Start backend**: `pnpm --filter backend dev`
- **Start frontend**: `pnpm --filter frontend dev`
- **Run both applications**: `pnpm --filter backend dev & pnpm --filter frontend dev`

---

## Commit Message Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) standard to maintain a clean and understandable Git history. Use the following prefixes for commit messages:

- **`feat:`** (Features) – For new features or enhancements.
  - Example: `feat(auth): add user login API endpoint`
- **`fix:`** (Fixes) – For bug fixes.
  - Example: `fix(frontend): resolve navbar issue on mobile devices`
- **`docs:`** (Documentation) – For documentation updates.
  - Example: `docs: update README with new setup instructions`
- **`chore:`** (Maintenance) – For tasks like dependency updates.
  - Example: `chore: update pnpm-lock.yaml`
- **`style:`** (Styling) – For appearance changes.
  - Example: `style: adjust button padding`
- **`test:`** (Tests) – For adding or modifying tests.
  - Example: `test: add unit tests for user controller`

---

## How to Contribute

We welcome contributions to this project! Follow these steps to contribute:

1. **Fork the repository** and clone your fork.
2. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b <branch-name>
   ```
3. **Make changes** and write tests if necessary.
4. **Commit your changes** with a meaningful message:
   ```bash
   git commit -m "<commit-message>"
   ```
5. **Push your changes** to your fork:
   ```bash
   git push origin <branch-name>
   ```
6. **Submit a Pull Request** to the `main` branch of the original repository.

---

## Troubleshooting

- **Port conflicts**: Ensure the ports defined in `.env` files are not in use.
- **Dependency issues**: Clear the pnpm cache using `pnpm store prune` and try reinstalling dependencies.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
