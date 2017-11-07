//个人信息
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { protocalPath } from '../../../api/protocalPath';
import { PageRoute } from "../../../App";
import { CommonStyles } from '../../../CommonStyles';
import { showAlert, showConfirm } from '../../../CommonFunctions';
import { GoBackButton } from "../../../widget/TitleButton";
import { request } from '../../../api/Server';

export default class UserInfoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firmId: '',
            firmName: '',
            useFunds: 0,
            right: 0
        }
        this.onPressLogout = this.onPressLogout.bind(this);
    }
    static navigationOptions = ({ navigation }) => ({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: '个人信息',
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
        console.log(paramString + '个人信息');
        let result = request(protocalPath.firmInfo, paramString);
        result.then((responseJson) => {
            console.log(responseJson);
            if (responseJson.retcode == 0) {
                this.setState({
                    firmId: responseJson.firmId,
                    firmName: responseJson.firmName,
                    useFunds: responseJson.useFunds,
                    right: responseJson.right,
                })
            }
        }).catch((error => {
            showAlert(error.toString());
        }))
    }

    componentWillMount = () => {
        this.fetchData();
    }

    render() {
        return (
            <View style={{ backgroundColor: 'black', flex: 1, justifyContent: 'space-between' }}>
                <View style={[Styles.items]}>
                    <View style={[Styles.item]}>
                        <Text style={[Styles.hanzi]}>账户：</Text>
                        <Text style={[Styles.num]}>{this.state.firmId}</Text>
                    </View>
                    <View style={[Styles.item]}>
                        <Text style={[Styles.hanzi]}>姓名：</Text>
                        <Text style={[Styles.num]}>{this.state.firmName}</Text>
                    </View>
                    <View style={[Styles.item]}>
                        <Text style={[Styles.hanzi]}>可用资金：</Text>
                        <Text style={[Styles.num, { color: 'red' }]}>{this.state.useFunds}</Text>
                    </View>
                    <View style={[Styles.item]}>
                        <Text style={[Styles.hanzi]}>账户综合权益：</Text>
                        <Text style={[Styles.num]}>{this.state.right}</Text>
                    </View>
                    <View style={[Styles.item, { borderBottomLeftRadius: 8, borderBottomRightRadius: 8, }]}>
                        <Text style={[Styles.hanzi]}>上次登录时间：</Text>
                        <Text style={[Styles.num]}>{global.loginUser.lastTime}</Text>
                    </View>
                </View>
                <TouchableOpacity style={[Styles.logoutButton]} onPress={this.onPressLogout}>
                    <Text style={{ color: 'white', fontSize: 16 }}>退出当前用户</Text>
                </TouchableOpacity>
            </View>
        )
    }

    onPressLogout() {
        showConfirm('是否确认退出',null,null, () => {
            let paramString = 'sessionId=' + global.loginUser.sessionID + '&userId=' + global.loginUser.traderID;
            let result = request(protocalPath.userLogoff, paramString);
            result.then((responseJson) => {
                global.loginUser = {
                    traderID: '', // 交易员ID
                    sessionID: '', // sessionID
                    isLogin: () => loginUser.sessionID.length > 0 && loginUser.traderID.length > 0
                }
                const { navigate } = this.props.navigation;
                navigate(PageRoute.UserPage);
            });
        } )

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
        padding: 10,
        flexDirection: 'row',
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
    logoutButton: {
        backgroundColor: 'red',
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    }

});