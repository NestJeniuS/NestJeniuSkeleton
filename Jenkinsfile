pipeline {
    agent {
        docker {
            image 'node:18.16.0'
        }
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/J-A-Y2/Big-Money'
            }
            
            post {
                success { 
                    echo 'Successfully Cloned Repository'
                }
                failure {
                    echo 'Fail Cloned Repository'
                }
            }    
        }
        
        stage('Test') { 
            steps {
                echo '테스트 단계와 관련된 몇 가지 단계를 수행합니다.'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Docker Clear') {
            steps {
                script {
                    echo 'Docker Rm Start, docker 컨테이너가 현재 돌아갈시 실행해야함'
                    def containerId = sh(script: 'docker ps -q -f "name=docker-jenkins-pipeline-test"', returnStdout: true).trim()
                    if (containerId) {
                        sh "docker stop $containerId"
                        sh "docker rm $containerId"
                        sh "docker rmi -f wjdwogns120523/docker-jenkins-pipeline-test"
                    } else {
                        echo 'No such container: docker-jenkins-pipeline-test'
                    }
                }
            }

            post {
                success {
                    echo 'Docker Clear Success'
                }
                failure {
                    echo 'Docker Clear Fail'
                }
            }
        }
        
        stage('Dockerizing') {
            steps {
                sh 'echo "Image Build Start"'
                sh 'docker build . -t wjdwogns120523/docker-jenkins-pipeline-test'
            }
            
            post {
                success {
                    echo 'Build Docker Image Success'
                }

                failure {
                    echo 'Build Docker Image Fail'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'docker run --name docker-jenkins-pipeline-test -d -p 8083:5002 wjdwogns120523/docker-jenkins-pipeline-test'
            }

            post {
                success {
                    echo 'Deploy success'
                }

                failure {
                    echo 'Deploy failed'
                }
            }
        }
    }
}
