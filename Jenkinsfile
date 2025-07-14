pipeline {
    agent { label 'tajir-media-agent' }

    environment {
        CONTAINER_NAME = 'test-Learning-BE'
        IMAGE_NAME = 'test-learning-be'
        HOST_PORT = '5000'
        CONTAINER_PORT = '5000'
        IMAGE_NAME_TAG = "test-learning-be:${GIT_COMMIT}"
    }

    options {
        skipStagesAfterUnstable()
    }

    // triggers {
    //     // Remove this if you use GitHub webhook
    //     pollSCM('H/2 * * * *')
    // }

    stages {
        stage('Checkout') {
            steps {
                cleanWs()
                checkout scm
            }
        }

        // stage('SonarQube Scan') {
        //     environment {
        //         SONAR_TOKEN = credentials('sonar-token') // Set this in Jenkins > Credentials
        //     }
        //     steps {
        //         sh 'sonar-scanner'
        //     }
        // }

        stage('Setup Docker Buildx') {
            steps {
                sh 'docker buildx create --use || true'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                  docker buildx build \
                    --tag ${IMAGE_NAME_TAG} \
                    --tag ${IMAGE_NAME}:latest \
                    --load \
                    --cache-from=type=local,src=/tmp/docker-cache \
                    --cache-to=type=local,dest=/tmp/docker-cache,mode=max \
                    --output type=docker \
                    .
                '''
            }
        }

        stage('Stop Previous Container') {
            steps {
                sh '''
                  docker stop ${CONTAINER_NAME} || true
                  docker rm ${CONTAINER_NAME} || true
                '''
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                  docker run -d \
                    -p ${HOST_PORT}:${CONTAINER_PORT} \
                    --restart unless-stopped \
                    --name ${CONTAINER_NAME} \
                    ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Health Check') {
            steps {
                script {
                    def healthy = false
                    for (int i = 1; i <= 5; i++) {
                        def status = sh(script: "curl -sSf http://localhost:${HOST_PORT}/ > /dev/null", returnStatus: true)
                        if (status == 0) {
                            echo "✅ Application is healthy."
                            sh "docker tag ${IMAGE_NAME}:latest ${IMAGE_NAME}:stable"
                            healthy = true
                            break
                        }
                        echo "⏳ Attempt ${i}/5 failed. Retrying in 10 seconds..."
                        sleep 10
                    }
                    if (!healthy) {
                        error "❌ Health check failed after 5 attempts"
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                sh '''
                  docker image prune -a --force --filter "until=24h"
                  docker system prune --force --filter "until=24h"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment completed successfully!'
            sh 'docker ps'
        }

        failure {
            echo '⚠️ Build failed. Rolling back to stable...'
            sh '''
              docker stop ${CONTAINER_NAME} || true
              docker rm ${CONTAINER_NAME} || true
              docker run -d \
                -p ${HOST_PORT}:${CONTAINER_PORT} \
                --restart unless-stopped \
                --name ${CONTAINER_NAME} \
                ${IMAGE_NAME}:stable
              sleep 15
              curl --retry 10 --retry-delay 5 --retry-connrefused -sSf http://localhost:${HOST_PORT}/
            '''
        }
    }
}


// def gv
// pipeline {
//     agent 
//     {
//        label 'tajir-media-agent'
//     }
//     environment{
//         NEW_VERSION = '2.3.5'
//     }
//     parameters{
//         choice(name: 'Version', choices: ['2.1.0', '2.2.0', '2.3.0'], description: 'Version Number to use')
//         booleanParam(name: 'Cleaning Server', defaultValue: true , description: 'For cleaning the server')
//     }
//     stages {
//         stage('Checkout') {
//             steps {
//                 //git branch: 'main', credentialsId: 'Github', url: 'git@github.com:Nabeel-KM/testDocker.git'
//                 git branch: 'main', url: 'https://github.com/Nabeel-KM/testDocker.git'
//             }
//         }
//         stage('Build') {
//             // when{
//             //     expression{
//             //         BRANCH_NAME == 'dev'
//             //     }
//             // }
//             steps {
//                 script{
//                     gv = load "script.groovy"
//                 }
//                 echo "Building the version ${params.Version}"
//                 sh 'docker build -t test .'
//                 sh 'docker stop python || true'
//             }
//         }
//         stage('Run') {
//             steps {
//                 sh 'docker run --rm --name python -p 5000:5000 -d test'
//             }
//         }
//         stage('Clean') {
//             // when{
//             //     expression{
//             //         params.Status == true
//             //     }
//             // }
//             steps{
//                 sh 'echo y | docker system prune'
//             }
//         }
//     }
//     post{
//         success{
//             echo 'Built and Deployed Successfully'
//             sh 'docker ps'
//         }
//     }
     
// } 

