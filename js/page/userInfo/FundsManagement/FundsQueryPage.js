//资金查询
import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { CommonStyles } from '../../../CommonStyles';
import { showAlert } from '../../../CommonFunctions';
import { GoBackButton } from "../../../widget/TitleButton";
import { request } from '../../../api/Server';
import { protocalPath } from '../../../api/protocalPath';

export default class FundsQueryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastBalance: '',
            useFunds: '',
            dsirableFunds: 0,
            holdMoney: 0,
            right:0
        }
    }
    static navigationOptions = ({ navigation }) => ({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: '资金查询',
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

    fetchData = () => {
        let paramString = 'sessionId=' + global.loginUser.sessionID + '&userId=' + global.loginUser.traderID;
        console.log(paramString + '资金查询');
        let result = request(protocalPath.firmInfo, paramString);
        result.then((responseJson) => {
            console.log(responseJson);
            if (responseJson.retcode == 0) {
                this.setState({
                    lastBalance: responseJson.lastBalance,
                    useFunds: responseJson.useFunds,
                    dsirableFunds: responseJson.dsirableFunds,
                    holdMoney: responseJson.holdMoney,
                    right: responseJson.right,
                })
            }
        }).catch((error => {
            this.showAlert(error.toString());
        }))
    }
    componentWillMount = () => {
        this.fetchData();
    }
    render() {
        return (
            <View style={{ backgroundColor: 'black', flex: 1 }}>
                <View style={[Styles.items]}>
                    <View style={[Styles.item]}>
                        <Text style={[Styles.hanzi]}>期初余额：</Text>
                        <Text style={[Styles.num]}>{this.state.lastBalance}</Text>
                    </View>
                    <View style={[Styles.item]}>
                        <Text style={[Styles.hanzi]}>当前可用资金：</Text>
                        <Text style={[Styles.num]}>{this.state.useFunds}</Text>
                    </View>
                    <View style={[Styles.item]}>
                        <Text style={[Styles.hanzi]}>当前可取资金：</Text>
                        <Text style={[Styles.num]}>{this.state.dsirableFunds}</Text>
                    </View>
                    <View style={[Styles.item]}>
                        <Text style={[Styles.hanzi]}>持有市值：</Text>
                        <Text style={[Styles.num]}>{this.state.holdMoney}</Text>
                    </View>
                    <View style={[Styles.item, { borderBottomLeftRadius: 8, borderBottomRightRadius: 8, }]}>
                        <Text style={[Styles.hanzi]}>当前权益：</Text>
                        <Text style={[Styles.num]}>{this.state.right}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    items: {
        borderColor: 'gray',
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderRadius: 8,
        backgroundColor: '#3B3B3B',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        flex: 0.625
    },
    item: {
        borderBottomColor: 'gray',
        borderStyle: 'solid',
        borderBottomWidth: 0.5,
        justifyContent: 'space-between',
        padding: 10, flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    hanzi: {
        color: 'gray',
        fontSize: 16
    },
    num: {
        color: 'white',
        fontSize: 16
    },
    icon: {
        height: 25,
        width: 25,
    },

});