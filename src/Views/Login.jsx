'use strict';

import React, { Component, StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import {Router, Route, Schema, Animations, TabBar, Actions} from 'react-native-router-flux';
import {AppStyle} from '../Styles/CommonStyles';
import Button from 'react-native-button';
import HomeView from './Home';
import FBLogin from 'react-native-facebook-login';
import Labels from '../Configs/Labels';

export default class LoginView extends Component {
    render() {
        return (
            <View style={styles.loginWrapper}>
                <Text>{Labels.LOGIN}</Text>
                <FBLogin
                    onLogin={function(e) {console.log(e)}}
                    onLogout={function(e){console.log(e)}}
                    onCancel={function(e){console.log(e)}}
                    onPermissionsMissing={function(e){console.log(e)}}
                    />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    loginWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    }
});
