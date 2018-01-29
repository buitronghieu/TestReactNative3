
import React from 'react';
class TeminalClient {
    constructor() {
        this.user = 'trackingadmin';
        this.pass = '123456';
        this.jsonData = (model, method, params) => function () {
            return this.execute(model, method, params);
        };
    }


    getSessionKey() {
        if (this.sessionKey === 'undefined') {
            this.sessionKey = this.login(this.user, this.pass)
        }
        return this.sessionKey;
    }

    execute(model, method, params) {
        let sessionKey = this.getSessionKey();
        if (sessionKey != 'Bad username/password'){
            let urlExecute = 'http://192.168.2.167:8080/vopen/rest/terminal/' + 'rpc/' + sessionKey;
            fetch(urlExecute,{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model:model,
                    method:method,
                    params:params
                })

            }).then((response) => {
                return response.json();
            });
        }
        return this.user;
    }

    login(user, pass) {
        let teminalUrl = 'http://192.168.2.167:8080/vopen/rest/terminal/' + 'login/' + user + '/' + pass;
        fetch(teminalUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json()).then((responseJson) => {
            return responseJson.sessionKey;
        }).catch((exception) => {
            console.log(exception)
        });
    }

    logout(sessionKey) {

    }
}
module.exports = TeminalClient;