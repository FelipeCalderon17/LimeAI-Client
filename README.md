<h2  align="center">AI Scribe Notes Client</h2>

<div  align="center">

React/TypeScript frontend client for the AI Scribe technical interview project. Built with Vite, Tailwind CSS, and shadcn/ui, following Clean Architecture principles. Consumes the Node.js backend API to manage AI-generated clinical notes via text or audio upload.

</div>

</div>

## 📋 <a  name="table">Content Table</a>

- l.⁠ ⁠[Technologies](#tech-stack)
- ll.⁠ ⁠[Start the app in local environment](#quick-start)
- lll. [Start the app with Docker](#font-extern)

## <a  name="tech-stack">⚙ Technologies</a>

[![My Skills](https://skillicons.dev/icons?i=react,typescript,vite,tailwind,docker)](https://skillicons.dev)<br/>

## <a  name="quick-start">🤸 Start the app in local environment</a>

Follow these steps to set up and run the frontend application on your local machine for development.

1. **Prerequisites.**

Ensure you have the following software installed:

- Git: For cloning the repository. (https://github.com/FelipeCalderon17/LimeAI-Client.git)

- Node.js: I recommend version 18 or later. This includes npm.

2. **Clone the Repository.**

```bash
	git clone  https://github.com/FelipeCalderon17/LimeAI-Client.git
```

3. **Install Dependencies.**

```bash
	npm install
```

4. **Configure Environment Variables.**

This is a very important step to connect the application to the backend.

- Create `.env` file in the root directory, duplicate the example file

- Edit `.env` open the newly created `.env` file with a text editor and fill in all the required values.

5. **Run the Application.**

Finally, start the frontend server in development mode:

```bash
	npm run dev
```

Once the server is running, you can open your browser and navigate to the local URL provided in your terminal to see the app in action.

## <a  name="font-extern">🐳 Start the app with Docker</a>

This is the recommended way to run the application in a consistent environment.

This approach does not require you to install Node.js, or npm on your local machine.

1. Prerequisites

Ensure you have the following software installed and running:

- Git: To clone the repository.

- Docker Desktop: This is essential. Make sure it is installed and running before you proceed.

2. **Clone the Repository.**

```bash
	git clone  https://github.com/FelipeCalderon17/LimeAI-Client.git
```

3. **Build the Docker image.**

Open your terminal in the root directory of the `ai-scribe-client` project. Run the following command to build the image. This will read the Dockerfile, install dependencies, build your app, and package it with an Nginx server.

```bash
	docker build -t ai-scribe-client .
```

4. **Run the Container.**

Once the image is built, run this command to start a container from it:

```bash
	docker run -d -p 8080:80 --name my-client-app ai-scribe-client
```

5. **Access the Application.**

That's it! Open your web browser and navigate to: http://localhost:8080

6. **How to Stop the Container.**

```bash
	docker rm -f my-client-app
```

If you want to start the container again you just have to repeat this command:

```bash
	docker run -d -p 8080:80 --name my-client-app ai-scribe-client
```

##

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="react" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="vite" />
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="tailwind css" />
<img src="https://img.shields.io/badge/-Docker-black?style=for-the-badge&logoColor=white&logo=docker&color=2496ED" alt="docker" />
