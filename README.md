# imc-jenkins

## Repository

[GitHub](https://github.com/rui202212/imc-jenkins.git)

## Pour la 1e fois

```sh
npm init
npm install express jest supertest nodemon
```

## Pour lancer localement

```sh
npm install
node src/server.js
```

## Requête URL

Quand le serveur est démarré, utiliser un url comme suit:
`http://localhost:3000/imc?weight=60&height=1.70`

## Pour lancer les tests

```sh
jest
```

## Pour installer de Jenkins en mode docker
```sh
docker run --privileged -u root --name jenkins3 -p 8080:8080 -p 50000:50000 \
-v voljen2:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock \
jenkins/jenkins:latest
```

