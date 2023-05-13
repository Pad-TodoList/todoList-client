![CI/CD workflow](https://github.com/Pad-TodoList/todoList-client/actions/workflows/dev.workflow.yml/badge.svg)
![Deploy workflow](https://github.com/Pad-TodoList/todoList-client/actions/workflows/prod.workflow.yml/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/9e171d3b-b801-43e8-ae89-f1e4e8a1c446/deploy-status)](https://app.netlify.com/sites/pad-todolist/deploys)

# todoList-client

Web client for [todolist server](https://github.com/Pad-TodoList/todoList-server) using [Vite](https://vitejs.dev/) + [React](https://fr.legacy.reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)

You can see the final result [here](https://pad-todolist.netlify.app/)

## run the project

If you want to run the client on your machine, you can use yarn :

```bash
yarn # install dependencies
yarn dev # run on localhost:3000
```

You can use Docker to run the application too :

```bash
make # if you're on an unix system
docker-compose -f ./config/docker/docker-compose.yml up --build -d
```
