/**
 * Created by HungDang on 9/5/2017.
 */
import RestClient from 'react-native-rest-client';

export default class CommonTest extends RestClient {
    constructor() {
        // Initialize with your base URL
        super('https://vity.com.vn/vopen/rest/terminal/login/ctylamson/123456', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

        });

    }

    login() {
        return this.POST('/rest/terminal/login/ctylamson/123456', {});
    }
};
module.exports = CommonTest;