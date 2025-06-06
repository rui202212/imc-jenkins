pipeline {
    agent any
    
    tools {
        nodejs 'nodejs23' // Utilisation de Node.js configuré dans Jenkins
    }

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub')
    }
    
    stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

    stages {
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${env.DOCKER_HUB_USERNAME}/imc-calculator")
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        docker.image("${env.DOCKER_HUB_USERNAME}/imc-calculator").push()
                    }
                }
            }
        }
    }
}