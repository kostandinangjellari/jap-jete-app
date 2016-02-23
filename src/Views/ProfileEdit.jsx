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
import Form from 'react-native-form'
import {AppStyle} from '../Styles/CommonStyles.js';

import { API_ENDPOINT } from '../Configs/Url';


var styles = StyleSheet.create({
    title: {
        fontSize: 30
    },
    titleCard: {
        flex: 0.4
    },
    profileForm: {
        flex: 0.6,
    },
    textField: {
        marginTop: 10,
        marginBottom: 10,
    },
    container: {
        flex: 1,
        margin: 20,
        width: Dimensions.get('window').width - 40,
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
        .withOnPress(() => {
            persistUserObject();
        })
        .build();
}

function persistUserObject(user) {
    //TODO - Make request and persist in local db
    console.log(user);
    Actions.profile();
}

export default class ProfileEdit extends Component {

    constructor(props) {
        super(props);
        initializeInputs();
        this.state = {
            user: {}
        }
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
                    <View>
                        <TextMaterialInput placeholder={Labels.Domain.User.USERNAME} value={this.props.user.username}/>
                        <TextMaterialInput placeholder={Labels.Domain.User.PHONE_NUMBER} value={this.props.user.phoneNumber}/>
                        <TextMaterialInput placeholder={Labels.Domain.User.EMAIL} value={this.props.user.email}/>
                        <TextMaterialInput placeholder={Labels.Domain.User.LOCATION} value={this.props.user.location}/>
                        <TextMaterialInput placeholder={Labels.Domain.User.GROUP} value={this.props.user.group}/>
                        <SubmitBtn onPress={() => {persistUserObject(this.props.user)}}/>
                    </View>
                </Form>
            </ScrollView>
        )
    }
}