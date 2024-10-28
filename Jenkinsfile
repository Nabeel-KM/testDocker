def gv
pipeline {
    agent any
    //{
      //  label 'EC2'
    //}
    environment{
        NEW_VERSION = '2.3.5'
    }
    parameters{
        choice(name: 'Version', choices: ['2.1.0', '2.2.0', '2.3.0'], description: 'Version Number to use')
        booleanParam(name: 'Cleaning Server', defaultValue: true , description: 'For cleaning the server')
    }
    stages {
        stage('Checkout') {
            steps {
                //git branch: 'main', credentialsId: 'Github', url: 'git@github.com:Nabeel-KM/testDocker.git'
                git branch: 'main', url: 'https://github.com/Nabeel-KM/testDocker.git'
            }
        }
        stage('Build') {
            // when{
            //     expression{
            //         BRANCH_NAME == 'dev'
            //     }
            // }
            steps {
                script{
                    gv = load "script.groovy"
                }
                echo "Building the version ${params.Version}"
                sh 'docker build -t test .'
                sh 'docker stop python || true'
            }
        }
        stage('Run') {
            steps {
                sh 'docker run --rm --name python -p 5000:5000 -d test'
            }
        }
        stage('Clean') {
            // when{
            //     expression{
            //         params.Status == true
            //     }
            // }
            steps{
                sh 'echo y | docker system prune'
            }
        }
    }
    post{
        success{
            echo 'Built and Deployed Successfully'
            sh 'docker ps'
        }
    }
     
} 

