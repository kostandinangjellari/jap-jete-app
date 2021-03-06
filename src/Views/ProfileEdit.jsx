/**
 * Edit User Profile
 */

'use strict';
import React, {
    Component,
    StyleSheet,
    View,
    Text,
    Switch,
    Dimensions,
    TextInput,
    ScrollView
} from 'react-native';

import MK, {
    MKButton,
    MKColor,
    MKTextField
} from 'react-native-material-kit';

import {Router, Route, Schema, Animations, TabBar, Actions} from 'react-native-router-flux';
import Button from 'react-native-button';
import Labels from '../Configs/Labels';
import Rest from '../Util/Rest';
import IO from '../Util/IO';
import Form from 'react-native-form'
import {AppStyle} from '../Styles/CommonStyles.js';

import { Endpoints } from '../Configs/Url';
import Constants from '../Configs/Constants.js';

var styles = StyleSheet.create({
    title: {
        fontSize: 30
    },
    titleCard: {
        flex: 0.4
    },
    profileForm: {
        flex: 0.6
    },
    textField: {
        marginTop: 10,
        marginBottom: 10
    },
    container: {
        flex: 1,
        margin: 20,
        width: Dimensions.get('window').width - 40
    }
});

var TextMaterialInput, SubmitBtn;

function initializeInputs() {
    TextMaterialInput = MKTextField.textfield()
        .withFloatingLabelEnabled(true)
        .withStyle(styles.textField)
        .withTextInputStyle({color: MKColor.Grey})
        .withHighlightColor(AppStyle.Colors.FG)
        .build();
    SubmitBtn = MKButton.coloredButton()
        .withText(Labels.Ui.MODIFY)
        .withBackgroundColor(AppStyle.Colors.FG)
        .build();
}

function mapUserParams(user, token) {
    return {
        session_token: token,
        user_id: user.facebookId,
        gcm_id: "", //TODO - Check
        username: user.username,
        email: user.email,
        phone_number: user.phoneNumber,
        address: user.location,
        blood_type: user.group
    };
}

function saveUser(navigator, user) {
    IO.getSessionToken().then((token) => {
        if (token) {
            var requestParams = JSON.stringify(mapUserParams(user, token));
            console.log("User Params" + requestParams);
            Rest.update(Endpoints.USER, requestParams, (data) => {
                console.log("User update Succes");
                console.dir(data);
            }, (err) => {
                console.error("User update Error");
                console.dir(err);
            });
            navigator.push({
                id: 'TabView',
                user: user
            });
        }
    });
}

export default class ProfileEdit extends Component {

    constructor(props) {
        super(props);
        initializeInputs();
        this.state = {};
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.titleCard}>
                    <Text style={styles.title}>
                        {Labels.Ui.YOUR_ACCOUNT}
                    </Text>
                </View>
                <Form ref="form" style={styles.profileForm}>
                    {/* TODO - Change GPS value from GPS and Blood Group from select */}
                    <View>
                        <TextMaterialInput placeholder={Labels.Domain.User.USERNAME}
                                           defaultValue={this.props.user.username}
                                           onChangeText={(txt) => {this.props.user.username = txt}}/>
                        <TextMaterialInput placeholder={Labels.Domain.User.PHONE_NUMBER}
                                           defaultValue={this.props.user.phoneNumber}
                                           onChangeText={(txt) => {this.props.user.phoneNumber = txt}}/>
                        <TextMaterialInput placeholder={Labels.Domain.User.EMAIL}
                                           defaultValue={this.props.user.email}
                                           onChangeText={(txt) => {this.props.user.email = txt}}/>
                        <TextMaterialInput placeholder={Labels.Domain.User.LOCATION}
                                           defaultValue={this.props.user.location}
                                           onChangeText={(txt) => {this.props.user.location = txt}}/>
                        <TextMaterialInput placeholder={Labels.Domain.User.GROUP}
                                           defaultValue={this.props.user.group}
                                           onChangeText={(txt) => {this.props.user.group = txt}}/>
                        {/* Submit */}
                        <SubmitBtn onPress={() => {saveUser(this.props.navigator, this.props.user)}}/>
                    </View>
                </Form>
            </ScrollView>
        )
    }
}