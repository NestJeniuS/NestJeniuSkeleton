pipeline {
    agent any 	// 사용 가능한 에이전트에서 이 파이프라인 또는 해당 단계를 실행
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/J-A-Y2/Big-Money'
            }
            
            post {
                success { 
                    sh 'echo "Successfully Cloned Repository"'
                }
                failure {
                    sh 'echo "Fail Cloned Repository"'
                }
            }    
        }
        
        stage('Test') { 
            steps {
                echo  '테스트 단계와 관련된 몇 가지 단계를 수행합니다.'
            }
        }
        stage('Docker Clear') {
            steps {
        script {
            echo "Docker Rm Start, docker 컨테이너가 현재 돌아갈시 실행해야함"
            def containerId = sh(script: 'docker ps -q -f "name=docker-jenkins-pipeline-test"', returnStatus: true).trim()
            if (containerId) {
                sh "docker stop $containerId"
                sh "docker rm $containerId"
                sh "docker rmi -f wjdwogns120523/docker-jenkins-pipeline-test"
            } else {
                echo "No such container: docker-jenkins-pipeline-test"
            }
        }
    }

    post {
        success {
            echo "Docker Clear Success"
        }
        failure {
            echo "Docker Clear Fail"
        }
    }
}
            
            post {
                success { 
                    sh 'echo "Docker Clear Success"'
                }
                failure {
                    sh 'echo "Docker Clear Fail"'
                }
            }
        }
        
        stage('Dockerizing'){
            steps{
                sh 'echo " Image Bulid Start"'
                sh 'docker build . -t wjdwogns120523/docker-jenkins-pipeline-test'
            }
            post {
                success {
                    sh 'echo "Bulid Docker Image Success"'
                }

                failure {
                    sh 'echo "Bulid Docker Image Fail"'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'docker run --name docker-jenkins-pipeline-test -d -p 8083:8083 wjdwogns120523/docker-jenkins-pipeline-test'
            }

            post {
                success {
                    echo 'success'
                }

                failure {
                    echo 'failed'
                }
            }
        }
    }

