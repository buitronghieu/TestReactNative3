/**
 * Created by HungDang on 8/17/2017.
 */
'use strict';
import React, {Component} from 'react';
import {Platform} from 'react-native';
class ConfigUtil {
    static _getVityPortalURL() {
        // return 'http://192.168.2.210:8086/vopen';
        let retURL = ''
        if (Platform.OS === 'ios') {
            retURL = 'https://vity.com.vn/vopen';
        } else {
            retURL = 'http://vity.com.vn/vopen';
        }

        return retURL;
    }

    static _getTrackingServerURL() {
        let retURL = ''
        if (Platform.OS === 'ios') {
            retURL = 'https://gps.vity.com.vn/vopen';
        } else {
            retURL = 'http://gps.vity.com.vn/vopen';
        }

        return retURL;
    }

    static _getModuleName() {
        return 'GPS';
    }
}
module.exports = ConfigUtil;