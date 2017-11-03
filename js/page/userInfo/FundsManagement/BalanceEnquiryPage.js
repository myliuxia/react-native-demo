//余额查询
import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Picker,
    TextInput,
} from 'react-native';
import { CommonStyles } from '../../../CommonStyles';
import { GoBackButton } from '../../../widget/TitleButton';
import { RedRadiusButton } from '../../../widget/RadiusButton'
import { GrayRadiusButton } from '../../../widget/RadiusButton'
import { request } from '../../../api/Server';
import { protocalPath } from '../../../api/protocalPath';

export default class BalanceEnquiryPage extends Component {
    constructor() {
        super();
        this.state = {
            data:[]
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: '余额查询',
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

    componentWillMount=()=>{
        console.log("hi");
    }

    render() {
        return (
            <View style={[Styles.container]}>
                <View style={[Styles.items]}>
                    <View style={[Styles.item]}>
                        <Text style={[Styles.itemLeft]}>选择银行</Text>
                        <View style={[Styles.itemRight]}>
                            <Picker style={{
                                color: 'white',
                            }}
                                selectedValue={this.state.language}
                                onValueChange={(lang) => this.setState({ language: lang })}>
                                <Picker.Item label="请选择" value="" />
                                <Picker.Item label="入金" value="deposit" />
                                <Picker.Item label="出金" value="withdraw" />
                            </Picker>
                        </View>
                    </View>
                    <View style={[Styles.item]}>
                        <Text style={[Styles.itemLeft]}>资金密码</Text>
                        <TextInput placeholder='请输入资金密码' style={[Styles.itemRight2]} maxLength={6} placeholderTextColor='white'
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ moneyPassword: text })}
                            value={this.state.moneyPassword} />
                    </View>
                    <View style={[Styles.item]}>
                        <Text style={[Styles.itemLeft]}>银行密码</Text>
                        <TextInput placeholder='请输入银行密码' style={[Styles.itemRight2]} maxLength={6} placeholderTextColor='white'
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ bankPassword: text })}
                            value={this.state.bankPassword} />
                    </View>
                    <View style={[Styles.item]}>
                        <Text style={[Styles.itemLeft]}>银行帐号</Text>
                    
                    </View>
                    <View style={[Styles.item]}>
                        <Text style={[Styles.itemLeft]}>帐号余额</Text>
                    </View>
                    <View style={[Styles.item2]}>
                        <GrayRadiusButton title='重置' style={[{ marginRight: 5, }]}></GrayRadiusButton>
                        <RedRadiusButton title='确认' style={[{ marginLeft: 5, }]}></RedRadiusButton>
                    </View>
                </View>
            </View >
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
    },
    item2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
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