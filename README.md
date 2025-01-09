# Project Setup Guide

This project consists of both a **backend** and a **frontend**. Below are the instructions on how to get started with both parts of the application.

## Prerequisites

Make sure you have the following installed on your machine:

- **[Node.js](https://nodejs.org/)** (v22 or later recommended)
- **[pnpm](https://pnpm.io/)** (for managing backend dependencies)
- **[Vite](https://vitejs.dev/)** (for the frontend)
- **[Auth0](https://auth0.com/)** (for authentication)

If you don't have `pnpm` installed, you can install it globally using:

```bash
npm install -g pnpm
```

---

## Backend Setup

The backend is a Node.js application managed using `pnpm`. Here’s how to set it up:

### 1. Install Dependencies

Navigate to the `backend` directory and install the required dependencies:

```bash
cd backend
pnpm install
```

### 2. Create the `.env` File

The backend requires an environment variable file to run. Create a `.env` file in the `backend/` directory with the following content:

```
PORT=4000
AUTH0_AUDIENCE=backend-url
AUTH0_BASE_URL=auth0-domain-url
DATABASE_URL="file:./dev.db"
```

You can replace `4000` with any port number you prefer.

### 3. Run the Backend

Once the dependencies are installed and the `.env` file is set up, you can start the backend server using the following command:

```bash
pnpm dev
```

The backend will now be running locally. By default, it will be available at [http://localhost:4000](http://localhost:3000) (or the port you specified in the `.env` file).

---

## Frontend Setup

The frontend is built using [Vite](https://vitejs.dev/), a fast development server for modern web applications.

### 1. Install Dependencies

Navigate to the `frontend` directory and install the necessary dependencies:

```bash
cd frontend
pnpm install
```

### 2. Create the `.env` File 

The frontend may also require a `.env` file (e.g., for API URLs or other configuration). If needed, create a `.env` file in the `frontend/` directory and configure it as necessary.

```txt
VITE_AUTH0_DOMAIN=your-domain
VITE_AUTH0_CLIENT_ID=your-clint-id
VITE_AUTH0_AUDIENCE=backend-url
```

### 3. Run the Frontend

After the dependencies are installed and your `.env` file is configured, you can start the frontend development server:

```bash
pnpm dev
```

The frontend should now be available at [http://localhost:3000](http://localhost:3000) (or the port specified in the `.env` file, if applicable).

---

## Summary of Commands

- **Install backend dependencies**: `cd backend && pnpm install`
- **Start backend**: `cd backend && pnpm dev`
- **Install frontend dependencies**: `cd frontend && pnpm install`
- **Start frontend**: `cd frontend && pnpm dev`

---

## Directory Structure

- `backend/`: The backend codebase and configuration.
- `frontend/`: The frontend codebase powered by Vite.
- `.gitignore`: Specifies files and directories to ignore in Git, including `node_modules/` and `.env` files.
- `README.md`: This file.

---

## Commit Message Conventions

To maintain a clean and understandable Git history, we follow the [Conventional Commits](https://www.conventionalcommits.org/) standard. Please use the following prefixes for commit messages:

- **`feat:`** (Features) – For new features or enhancements added to the project.
    - Example: `feat(auth): add user login API endpoint`
- **`fix:`** (Fixes) – For bug fixes or patches to the project.
    - Example: `fix(frontend): resolve navbar issue on mobile devices`
- **`docs:`** (Documentation) – For changes or improvements to the documentation.
    - Example: `docs: update README with new setup instructions`
- **`chore:`** (Chores) – For maintenance tasks like updating dependencies or refactoring code without changing functionality.
    - Example: `chore: update pnpm-lock.yaml`
- **`style:`** (Styling) – For changes that affect the appearance of the project, like CSS or formatting changes.
    - Example: `style: adjust button padding for consistency`
- **`test:`** (Tests) – For adding or modifying tests.
    - Example: `test: add unit tests for user controller`

### Example Commit Messages

- **`feat(user-auth): add JWT authentication to the backend`**
- **`fix(frontend): resolve issue with 404 error on invalid routes`**
- **`docs: add contributing guidelines to README`**

---

## How to Contribute

We welcome contributions to this project! If you'd like to contribute, please follow these steps:

1. **Fork the repository** and clone your fork to your local machine.
2. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b <branch-name>
   ```
    - For example, `git checkout -b feat/user-auth` for adding authentication.
3. **Make your changes** on the new branch. Be sure to follow the code style and structure of the project.
4. **Write tests** (if applicable) to ensure your changes don’t break existing functionality.
5. **Commit your changes** following the commit message conventions mentioned above.
6. **Push your changes** to your fork:
   ```bash
   git push origin <branch-name>
   ```
7. **Create a Pull Request** from your fork’s branch to the `main` branch of the original repository.
    - In your PR description, be clear about the changes you’ve made, and reference any issues your PR addresses.

---

## Troubleshooting

- **Issue**: Port conflicts or other environment variable-related issues.
    - **Solution**: Check that the ports defined in `.env` files do not conflict with other services running on your machine.

- **Issue**: Dependencies not installing properly with `pnpm`.
    - **Solution**: Try clearing the pnpm cache using `pnpm store prune` and then run `pnpm install` again.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Key Updates:
1. **Commit Message Conventions**: This section explains the common commit message prefixes (like `feat/`, `fix/`, etc.) and provides examples, which will help your contributors keep commit history clean and consistent.
2. **How to Contribute**: Instructions on forking the repo, creating a feature branch, making changes, and submitting a pull request, along with the process for writing meaningful commit messages.

---

After adding this section to your `README.md`, don't forget to add and commit the changes:

```bash
git add README.md
git commit -m "Add contribution guidelines and commit message conventions"
git push
