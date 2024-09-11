#NOTE
there was a lot of changes
currently I tested `localhost:3001/items/` GET for listing the items & POST to post an item (I used {"name":"name test","description":"test","conditionId":"1","categoryId":"1","userId":"1"})


# FREE GIVEAWAY APP

This is a Node.js application that interacts with a PostgreSQL database using the Drizzle ORM.

## Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL (version 12 or higher)

## Installation

1. Clone the repository:


2. Navigate to the project directory:

cd your-repo



3. Install the dependencies:

npm install


## Environment Setup

1. Create a `.env` file in the root of the project:

touch .env


2. Open the `.env` file and add the following environment variables:
DATABASE_URL=postgresql://your_database_user:your_database_password@your_database_host:your_database_port/your_database_name

`DATABASE_URL=the url`
`PORT=port number`
Alternatively, you can use the following variables , but you will eed to adjust db.js for that to work
`DB_HOST=your_database_host`
`DB_PORT=your_database_port`
`DB_USER=your_database_user`
`DB_PASSWORD=your_database_password`
`DB_NAME=your_database_name`



3. (Optional) Configure the debugger in the `.vscode/launch.json` file:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/server/app.js",
            "preLaunchTask": "Copy TS to JS", // Reference to the task
            "env": {
                "PORT": "3001",
                "NODE_ENV": "development",
                "DATABASE_URL": "postgresql://retool:pass@ep-jolly-meadow-a6o2160p.us-west-2.retooldb.com/retool?sslmode=require"
            }
        }
    ]
}

```


Running the Application
Start the development server:


npm start
This will start the application and connect to the PostgreSQL database using the environment variables you set in the previous step.

(Optional) Run the application in debug mode:

Open the .vscode/launch.json file and configure the debugger (if you haven't done so already).
Start the debugger in VS Code by pressing F5 or by clicking the "Debug" icon in the left-hand sidebar and selecting the "Launch Program" configuration.
Available Scripts
npm start: Starts the development server.
npm run build: Compiles the application for production.
npm test: Runs the test suite.
npm run lint: Lints the codebase using ESLint.
Project Structure
The project structure is as follows: (there was already some changes)

```
your-repo/
├── models/
│   ├── conditions.js
│   ├── items.js
│   ├── requests.js
│   └── messages.js
├── db.js
├── app.js
├── package.json
├── package-lock.json
├── .env
└── .vscode/
    └── launch.json
```


The models/ directory contains the Drizzle ORM models for the various database entities.
The db.js file sets up the database connection using the Drizzle ORM.
The app.js file is the entry point of the application.
The package.json and package-lock.json files manage the project dependencies.
The .env file stores the environment variables for the database connection.
The .vscode/launch.json file configures the debugger for the application.
Contributing
If you find any issues or have suggestions for improvements, feel free to open a new issue or submit a pull request.

License
This project is licensed under the MIT License.
