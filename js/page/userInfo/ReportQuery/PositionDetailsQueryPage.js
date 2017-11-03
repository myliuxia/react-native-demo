//持仓明细
import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import { CommonStyles } from '../../../CommonStyles';
import { showAlert } from '../../../CommonFunctions';
import { GoBackButton } from "../../../widget/TitleButton";
import { request } from '../../../api/Server';
import { protocalPath } from '../../../api/protocalPath';

export default class PositionDetailsQueryPage extends Component {
    constructor() {
        super();
        this.state = {
            itemName1: '山水画',
            itemName2: '持有量',
            itemName3: '成本价',
            itemName4: '货款',
            data: [],
        }
        
    }
    static navigationOptions = ({ navigation }) => ({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: '持仓明细',
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
        console.log('componentWillMount--持仓');
        this.fetchData();
    }

    fetchData=()=>{
        let paramString = 'sessionId=' + global.loginUser.sessionID + '&userId=' + global.loginUser.traderID;
        let result = request(protocalPath.holdingDetailsQuery, paramString);
        let data=[];
        result.then((responseJson) => {
            // console.log(responseJson);
            // console.log(responseJson.resultList[0].commodityid);
            for (let i = 0; i < responseJson.resultList.length;i++) {
                let paramString2 = paramString + '&commodityId=' + responseJson.resultList[i].commodityid;
                console.log('paramString2--->' +paramString2);
                let result2 = request(protocalPath.queryCommodity, paramString2);
                data.push({
                    key: i,
                    key1: '', key2: responseJson.resultList[i].commodityid,
                    key3: this.state.itemName2, key4: responseJson.resultList[i].holdQuantity,
                    key5: this.state.itemName3, key6: responseJson.resultList[i].costPrice,
                    key7: this.state.itemName4, key8: responseJson.resultList[i].holdMargin,
                });
                result2.then((responseJson)=>{
                    if (responseJson.retcode==0){
                        console.log(responseJson);
                        data[i].key1 = responseJson.resultList[0].name;
                    }
                    return data;
                }).then((data) => {
                    this.setState({
                        data: data,
                    });
                }).catch((error)=>{
                    console.log(error);
                })
            }
        }).catch((error => {
            showAlert(error.toString());
        }));
    }

    render() {
        return (
            <View style={Styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) =>
                        <View style={[Styles.card]}>
                            <View style={Styles.itemHead}>
                                <Text style={[Styles.hanzi, { color: 'white' }]}>{(item.key1)}</Text>
                                <Text style={[Styles.num, { color: 'blue' }]}>{(item.key2)}</Text>
                            </View>
                            <View style={Styles.items}>
                                <View style={Styles.item}>
                                    <Text style={Styles.hanzi}>{(item.key3)}</Text>
                                    <Text style={Styles.num}>{(item.key4)}</Text>
                                </View>
                                <View style={Styles.item}>
                                    <Text style={Styles.hanzi}>{(item.key5)}</Text>
                                    <Text style={Styles.num}>{(item.key6)}</Text>
                                </View>
                                <View style={[Styles.item]}>
                                    <Text style={Styles.hanzi}>{(item.key7)}</Text>
                                    <Text style={Styles.num}>{(item.key8)}</Text>
                                </View>
                            </View>
                        </View>}
                />
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    card: {
        borderColor: 'gray',
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderRadius: 8,
        backgroundColor: '#3B3B3B',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        flex: 0.4,
    },
    itemHead: {
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
    },
    items: {
        flex: 3,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        padding: 10,
    },
    hanzi: {
        color: 'gray',
        fontSize: 16
    },
    num: {
        color: 'white',
        fontSize: 16
    },
});