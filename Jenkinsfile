def build_command = 'npm run build'

pipeline {
    agent {
        docker {
            image 'node:12.16.1'
        }
    }
    parameters {
        gitParameter branchFilter: 'origin/(.*)', defaultValue: 'develop', name: 'BRANCH', type: 'PT_BRANCH', quickFilterEnabled: true, sortMode: 'ASCENDING_SMART', listSize: '15'
    }
    environment {
        CI = 'false'
        HOME = '.'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh build_command
            }
        }
        stage('Deliver') {
            steps {
                script {
                    def path = SERVER_DEPLOY_PATH
                    def rm_command = "rm -rf ${path}/*"
                    def serverPort = env.SERVER_PORT ?: '22'
                    def remote = [:]
                    remote.name = APP_ENV
                    remote.host = SERVER_HOST
                    remote.allowAnyHosts = true
                    remote.port = Integer.parseInt(serverPort)

                    withCredentials([usernamePassword(credentialsId: "${CREDENTIALS_ID}", passwordVariable: 'password', usernameVariable: 'userName')]) {
                        remote.user = userName
                        remote.password = password
                        echo 'Deploy to remote server'

                        sshCommand remote: remote, command: rm_command, sudo: false
                        sshPut remote: remote, from: 'build', into: "${path}/"
                        sshCommand remote: remote, command: "cd ${path}/build; mv * ..; cd ..; rm -rf build", sudo: false
                    }
                }
            }
        }
    }
    post {
        failure {
            slackSend channel: '#tcg_devs', color: '#e74c3c', message: "Task <${BUILD_URL}|${JOB_NAME} #${BUILD_ID}> is failed after ${currentBuild.durationString.replace(' and counting', '')} - host: ${SERVER_HOST}, env: ${APP_ENV}, branch: ${params.BRANCH}"
        }
        success {
            slackSend channel: '#tcg_devs', color: 'good', message: "Task <${BUILD_URL}|${JOB_NAME} #${BUILD_ID}> successfully built after ${currentBuild.durationString.replace(' and counting', '')} - host: ${SERVER_HOST}, env: ${APP_ENV}, branch: ${params.BRANCH}"
        }
    }
}
