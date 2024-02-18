# Horizon - A chat app

This project is a chat application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a platform for users to engage in real-time communication through text messages. Designed with simplicity and efficiency in mind, the app caters to individuals and groups seeking seamless interaction. Whether it's for personal use, team collaboration, or community engagement, this chat app offers a user-friendly interface and robust functionality to connect people effortlessly.

## Features

- Light/dark mode toggle
- Completely Responsive
- Fullscreen mode
- View your profile (name, profile picture,username)
- Create rooms to chat and interact with other people
- Join and leave rooms
- invite people

## Tech Stack

**Client:** React, NextJS, Shadcn-ui, TailwindCSS

**Server:** Node, Express, Socket.io, MongoDB

### Preqrequisites

#### Install Node JS

Refer to https://nodejs.org/en/ to install nodejs

#### Install TypeScript

Refer to https://www.typescriptlang.org/ to install typescript

```bash
npm install -g typescript
```

#### Install ts-node

Refer to https://www.typescriptlang.org/ to install typescript

```bash
npm install -g ts-node
```

#### Learn Tailwind CSS

This project uses Tailwind CSS if you don't have any hands-on experience with tailwind css then you can refer to their docs.

#### Learn React JS

If you are new to React JS then you can refer to their docs.

## Cloning and Running the Application in local

- Clone the project into local from [Fullstack app ](https://github.com/ritikjee/mern-chat-app).
- Go to `backend folder` and type the following command to install all npm packages

  ```bash
  npm install
  ```

- In `backend folder`, Change the `.env.example` file to `.env` and add the required credentials.
  `bash
PORT=
MONGO_URI=
JWT_SECRET=
`
  You can get the `MONGO_URI` from [MongoDB Cloud ](https://cloud.mongodb.com/) by creating an account.

- Run the application by typing following command in terminal

  ```bash
  npm run build
  npm run start
  ```

- The application will by default run on port `8080` if `PORT` variable is not provided in `.env`

- Go to `frontend folder` and type the following command to install all npm packages

  ```bash
  npm install
  ```

- In `frontend folder`, Change the `.env.example` file to `.env` and add the required credentials.

  ```bash
  UPLOADTHING_SECRET=
  UPLOADTHING_APP_ID=
  NEXT_PUBLIC_BACKEND_URL=
  NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

  ```

  You can get the `UPLOADTHING_APP_ID` and `UPLOADTHING_SECRET` from [Uploadthing Developer Dashboard](https://uploadthing.com/) by creating an app.

- Run the application by typing following command in terminal

  ```bash
  npm run dev
  ```

- The Frontend Runs on [http://localhost:3000/](http://localhost:3000/).
- The Backend Runs on [http://localhost:8080/](http://localhost:8080/).

`Contributions are welcome 🎉🎉`

## Contributing

If you would like to contribute to SpotiStat, please open an issue or pull request on GitHub

### Ways to contribute

1. Solve the issues which are listed.
2. Create your own issue and then send PR.

Please refer to the project's style and contribution guidelines for submitting patches and additions. In general, we follow the "fork-and-pull" Git workflow.

1.  **Fork** the repo on GitHub
2.  **Clone** the project to your own machine
3.  **Commit** changes to your own branch
4.  **Push** your work back up to your fork
5.  Submit a **Pull request** so that we can review your changes
