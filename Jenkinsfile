pipeline {
    agent any

    tools {
        nodejs 'nodejs23' // Utilisation de Node.js configuré dans Jenkins
    }
    
    environment {
        IMAGE_NAME = 'matougong/imc-calculator'
        IMAGE_TAG = 'latest'
        DOCKER_HUB_CREDENTIALS = 'dockerhub' // ID des credentials dans Jenkins    
        }
    

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build --no-cache -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }
        
        stage('Login to Docker Hub') {
            steps {
                // Meilleure pratique : utilisation de withCredentials pour masquer les infos sensibles
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub', 
                        usernameVariable: 'DOCKER_HUB_USR', 
                        passwordVariable: 'DOCKER_HUB_PSW'
                    )
                ]) {
                    sh 'echo $DOCKER_HUB_PSW | docker login -u $DOCKER_HUB_USR --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }
    }
    
    // Nettoyage après execution
    post {
        always {
            script {
                sh 'docker logout' // Sécurité : déconnexion systématique
            }
        }
    }
}