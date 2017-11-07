//出入金
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Picker,
    TextInput,
    ScrollView
} from 'react-native';
import { CommonStyles } from '../../../CommonStyles';
import { GoBackButton } from '../../../widget/TitleButton';
import { RedRadiusButton, GrayRadiusButton } from '../../../widget/RadiusButton'
import PickerModal from '../../../widget/PickerModal'


export default class DepositAndWithdrawPage extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: '出入金',
        headerTitleStyle: CommonStyles.headerTitleStyle,
        headerBackTitleStyle: {
            color: 'white',
            fontSize: 14
        },
        headerLeft: (
            <GoBackButton onPress={() => navigation.goBack()} />
        ),
        headerRight: (() => { }),
    });

    onPressReset=()=>{
        console.log(this.refs.moneyPicker.state.value);
    }

    onPressConfirm=()=>{
        console.log(this.refs.bankPicker.state.value);
    }

    render() {

        let data = new Array();
        data.push(
            <Picker.Item key='1' label="请选择1" value="" />
        );
        data.push(
            <Picker.Item key='2' label="入金1" value="deposit" />
        );
        data.push(
            <Picker.Item key='3' label="出金1" value="withdraw" />
        );
        return (
            <ScrollView style={[Styles.container]}>
                <View style={[Styles.items]}>

                    <View style={[Styles.item]}>
                        <Text style={[Styles.itemLeft]}>出入金</Text>
                        <View style={[Styles.itemRight, { height: 50,justifyContent:'center' }]}>
                            <PickerModal  ref={'moneyPicker'}  style={[Styles.itemRight]} data={data}></PickerModal>
                        </View>
                    </View>

                    <View style={[Styles.item]}>
                        <Text style={[Styles.itemLeft]}>选择银行</Text>
                        <View style={[Styles.itemRight, { height: 50, justifyContent: 'center' }]}>
                            <PickerModal ref={'bankPicker'} style={[Styles.itemRight]} data={data}></PickerModal>
                        </View>
                    </View>
                    <View style={[Styles.item]}>
                        <Text style={[Styles.itemLeft]}>申请金额</Text>
                        <TextInput placeholder='请输入出入金金额'
                            style={[Styles.itemRight2]}
                            maxLength={11}
                            keyboardType='numeric'
                            placeholderTextColor='white'
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ money: text })}
                            value={this.state.money} />
                    </View>
                    <View style={[Styles.item]}>
                        <Text style={[Styles.itemLeft]}>资金密码</Text>
                        <TextInput placeholder='请输入资金密码'
                            style={[Styles.itemRight2]}
                            maxLength={6}
                            keyboardType='numeric'
                            placeholderTextColor='white'
                            underlineColorAndroid='transparent'
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({ moneyPassword: text })}
                            value={this.state.moneyPassword} />
                    </View>
                    <View style={[Styles.item]}>
                        <Text style={[Styles.itemLeft]}>银行密码</Text>
                        <TextInput placeholder='请输入银行密码'
                            style={[Styles.itemRight2]}
                            maxLength={6}
                            keyboardType='numeric'
                            placeholderTextColor='white'
                            underlineColorAndroid='transparent'
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({ bankPassword: text })}
                            value={this.state.bankPassword} />
                    </View>
                    <View style={[Styles.item2]}>
                        <GrayRadiusButton title='重置' style={[{ marginRight: 5, padding: 20, height: 60 }]} onPress={this.onPressReset}></GrayRadiusButton>
                        <RedRadiusButton title='确认' style={[{ marginLeft: 5, padding: 20, height: 60 }]} onPress={this.onPressConfirm}></RedRadiusButton>
                    </View>
                </View>
            </ScrollView>
        );
    }

}


const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    },
    items: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30,
        flex: 0.8
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0.9,
        height:50,
        marginTop:20
    },
    item2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        flex: 0.7,
    },
    itemLeft: {
        color: 'white',
        fontSize: 16,
        flex: 1,
        fontWeight: '600',
    },
    itemRight: {
        flex: 2.5,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderStyle: 'solid',
        borderRadius: 8,
        backgroundColor: '#3B3B3B',
    },
    itemRight2: {
        flex: 2.5,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderStyle: 'solid',
        borderRadius: 8,
        backgroundColor: '#3B3B3B',
        paddingLeft: 10,
        marginLeft: 5,
        height:40,
    },
    resetButton: {
        marginRight: 5,
        marginLeft: 40,
    },
    confirmButton: {
        marginLeft: 5,
        marginRight: 40,
    }
})