import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    Dimensions,
    TouchableOpacity,
    Text,
    TextInput,
    WebView
} from 'react-native';
import {CommonColors } from '../CommonStyles';
import { request ,checkLoginStateOnline} from '../api/Server';
import { protocalPath } from '../api/protocalPath';
import {showAlert} from '../CommonFunctions';
const { width , height } = Dimensions.get("window");

/**
 * 商品购买弹框
 */
export class BuyModel extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            buyPrice:'',
            buyQuantity:'',
            queryCommodity:{},
            useFunds:'',
            buyNum:0,
            isubmit:false,
        }
        this.getQueryCommodity();
        this.getBalanceQuery();
    }

    getQueryCommodity = () =>{

        if(checkLoginStateOnline()) {
            let paramString = 'sessionId=' + global.loginUser.sessionID +
                '&userId=' + global.loginUser.traderID +
                '&commodityId=' + this.props.commodityId;
            //console.log('paramString:'+paramString);
            let result = request(protocalPath.queryCommodity, paramString);
            result.then((responseJson) => {
                //console.log(responseJson);
                if (responseJson.retcode >= 0) {
                    this.setState({
                        queryCommodity: responseJson.resultList[0],
                    })
                } else {
                    console.log(responseJson.message);
                    //showAlert(responseJson.message);
                }
            }).catch((error => {
                console.log(error.toString());
            })).done();
        }
    }

    getBalanceQuery = () => {

        if(checkLoginStateOnline()) {
            let paramString = 'sessionId=' + global.loginUser.sessionID +
                '&userId=' + global.loginUser.traderID;
            //console.log('paramString:'+paramString);
            let result = request(protocalPath.firmInfo, paramString);
            result.then((responseJson) => {
                //console.log('firmInfo:');
                //console.log(responseJson);
                if (responseJson.retcode == 0) {
                    this.setState({
                        useFunds: responseJson.useFunds,
                    })
                } else {
                    console.log(responseJson.message);
                    //showAlert(responseJson.message);
                }
            }).catch((error => {
                console.log(error.toString());
            })).done();
        }
    }

    buySubmit = () =>{
        if(checkLoginStateOnline()){
            let paramString ='buySell=1&sessionId=' + global.loginUser.sessionID +
                '&userId=' + global.loginUser.traderID+
                '&commodityId=' + this.props.commodityId+
                '&price=' + this.state.buyPrice+
                '&Quantity=' + this.state.buyQuantity;
            //console.log('paramString:'+paramString);
            let result = request(protocalPath.orderSubmit, paramString);
            result.then((responseJson) => {
                console.log('orderSubmit:');
                console.log(responseJson);
                if(responseJson.retcode == 0){
                    showAlert('委托成功！');
                }else{
                    console.log(responseJson.message);
                    showAlert(responseJson.message);
                }
            }).catch((error => {
                console.log(error.toString());
            })).done();
        }else{
            showAlert('您还未登录，请先登录！');
        }
        this.props.onRequestClose();

    }
    _onBlur = (event) =>{
        var text = event.nativeEvent.text;
        if(this.state.queryCommodity.minPriceModify && this.state.queryCommodity.spreadDownLmt && this.state.queryCommodity.spreadUpLmt){
            if(text >= this.state.queryCommodity.spreadDownLmt && text <= this.state.queryCommodity.spreadUpLmt){

            }else{
                showAlert('请输入合法数量！');
            }
        }else{
            showAlert('网路异常，数据请求失败！');
        }
    }


    render() {
        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={this.props.isShow}
                onShow={() => {}}
                onRequestClose={this.props.onRequestClose} >

                <View style={styles.container}>
                    <TouchableOpacity onPress={this.props.onRequestClose} style={{width:width,flex:1}}/>
                    <View style={styles.main}>
                        <View style={styles.row}>
                            <Text style={styles.label}>买入价格</Text>
                            <Text style={styles.hintText} numberOfLines={1}>
                                最小变动：<Text style={{color:CommonColors.green}}>{this.state.queryCommodity.minPriceModify?this.state.queryCommodity.minPriceModify:0}</Text>
                                范围：<Text style={{color:CommonColors.green}}>{this.state.queryCommodity.spreadDownLmt?this.state.queryCommodity.spreadDownLmt:'--'}</Text>
                                到<Text style={{color:CommonColors.red}}>{this.state.queryCommodity.spreadUpLmt?this.state.queryCommodity.spreadUpLmt:'--'}</Text>
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <TextInput placeholder='请输购买让价格' style={styles.inputTextStyle}
                                       onBlur={(event) => {console.log(event.nativeEvent.text)}}
                                       underlineColorAndroid="transparent"
                                       placeholderTextColor='#999999'
                                       keyboardType='numeric'
                                       onChangeText={(text) => this.setState({buyPrice: text})}/>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>买入数量</Text>
                            <Text style={styles.hintText} numberOfLines={1}>
                                可买量：<Text style={{color:CommonColors.red}}>{this.state.buyNum}</Text>
                                最小变动：<Text style={{color:CommonColors.green}}>{this.state.queryCommodity.minQuantityModify?this.state.queryCommodity.minQuantityModify:0}</Text>
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <TextInput placeholder='请输入购买数量' style={styles.inputTextStyle}
                                       underlineColorAndroid="transparent"
                                       placeholderTextColor='#999999'
                                       keyboardType='numeric'
                                       onChangeText={(text) => this.setState({buyQuantity: text})}/>
                        </View>

                        <View style={styles.positionBottom} >
                            <Text style={styles.bottomText}>
                                可用资金：
                                <Text style={{color:CommonColors.red1}}>￥{this.state.useFunds?this.state.useFunds:'--'}</Text>
                            </Text>
                            <TouchableOpacity style={styles.bottomBtn} onPress={()=>{this.buySubmit()}}>
                                <Text style={styles.bottomBtnText}>确认购买</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>
        );
    }
}

/**
* 商品转让弹框
*/
export class SellModel extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            sellPrice:'',//转让价格
            sellQuantity:'',//转让数量
            queryCommodity:{},//商品信息
            holdingQuantity:'',
        }


    }
    componentDidMount() {
        //加载数据
        this.getQueryCommodity();
        this.getHoldingDetailsQuery();
    }

    getQueryCommodity = () =>{

        if(checkLoginStateOnline()) {
            let paramString = 'sessionId=' + global.loginUser.sessionID +
                '&userId=' + global.loginUser.traderID +
                '&commodityId=' + this.props.commodityId;
            //console.log('paramString:'+paramString);
            let result = request(protocalPath.queryCommodity, paramString);
            result.then((responseJson) => {
                //console.log(responseJson);
                if (responseJson.retcode >= 0) {
                    this.setState({
                        queryCommodity: responseJson.resultList[0],
                    })
                } else {
                    console.log(responseJson.message);
                    //showAlert(responseJson.message);
                }
            }).catch((error => {
                console.log(error.toString());
            })).done();
        }
    }

    getHoldingDetailsQuery = () => {

        if(checkLoginStateOnline()) {
            let paramString = 'sessionId=' + global.loginUser.sessionID +
                '&userId=' + global.loginUser.traderID +
                '&commodityId=' + this.props.commodityId;
            console.log('paramString:' + paramString);
            let result = request(protocalPath.holdingQuery, paramString);
            result.then((responseJson) => {
                //console.log('holding:');
                //console.log(responseJson);
                if (responseJson.retcode == 0) {
                    this.setState({
                        holdingQuantity: responseJson.resultList[0].useTotal,
                    })
                } else {
                    console.log(responseJson.message);
                    //showAlert(responseJson.message);
                }
            }).catch((error => {
                console.log(error.toString());
            })).done();
        }
    }

    sellSubmit = () =>{
        if(checkLoginStateOnline()){
            let paramString ='buySell=2&sessionId=' + global.loginUser.sessionID +
                '&userId=' + global.loginUser.traderID+
                '&commodityId=' + this.props.commodityId+
                '&price=' + this.state.sellPrice+
                '&Quantity=' + this.state.sellQuantity;
            //console.log('paramString:'+paramString);
            let result = request(protocalPath.orderSubmit, paramString);
            result.then((responseJson) => {
                console.log('orderSubmit:');
                console.log(responseJson);
                if(responseJson.retcode == 0){
                    showAlert('委托成功！');
                }else{
                    showAlert(responseJson.message);
                    console.log(responseJson.message);
                }
            }).catch((error => {
                console.log(error.toString());
            })).done();
        }else{
            showAlert('您还未登录，请先登录！');
        }

        this.props.onRequestClose();
    }

    render() {
        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={this.props.isShow}
                onShow={() => {}}
                onRequestClose={this.props.onRequestClose} >

                <View style={styles.container}>
                    <TouchableOpacity onPress={this.props.onRequestClose} style={{width:width,flex:1}}/>
                    <View style={styles.main}>
                        <View style={styles.row}>
                            <Text style={styles.label}>转让价格</Text>
                            <Text style={styles.hintText} numberOfLines={1}>
                                最小变动：<Text style={{color:CommonColors.green}}>{this.state.queryCommodity.minPriceModify?this.state.queryCommodity.minPriceModify:0}</Text>
                                范围：<Text style={{color:CommonColors.green}}>{this.state.queryCommodity.spreadDownLmt?this.state.queryCommodity.spreadDownLmt:'--'}</Text>
                                到<Text style={{color:CommonColors.red}}>{this.state.queryCommodity.spreadUpLmt?this.state.queryCommodity.spreadUpLmt:'--'}</Text>
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <TextInput placeholder='请输入转让价格' style={styles.inputTextStyle}
                                       underlineColorAndroid="transparent"
                                       placeholderTextColor='#999999'
                                       keyboardType='numeric'
                                       onChangeText={(text) => this.setState({sellPrice: text})}/>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>转让数量</Text>
                            <Text style={styles.hintText} numberOfLines={1}>
                                最大可转让：<Text style={{color:CommonColors.red}}>{this.state.holdingQuantity?this.state.holdingQuantity:'--'}</Text>
                                最小变动：<Text style={{color:CommonColors.green}}>{this.state.queryCommodity.minQuantityModify?this.state.queryCommodity.minQuantityModify:0}</Text>
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <TextInput placeholder='请输入转让数量' style={styles.inputTextStyle}
                                       underlineColorAndroid="transparent"
                                       placeholderTextColor='#999999'
                                       keyboardType='numeric'
                                       onChangeText={(text) => this.setState({sellQuantity: text})}/>
                        </View>

                        <View style={styles.positionBottom} >
                            <TouchableOpacity style={styles.bottomBtn} onPress={()=>{this.sellSubmit()}}>
                                <Text style={styles.bottomBtnText}>确认转让</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>
        );
    }
}

/**
 * WebView框
 */
export class DetailWebModel extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            webHeight:200,
        }
    }

    render() {
        let html = {html:`<!DOCTYPE html><html><body>`+this.props.html+
        `<script>window.onload=function(){window.location.hash = 1;document.title = document.body.scrollHeight;document.body.style.color='#999999';document.body.style.backgroundColor='#070D14';}</script></body></html>`}
        return (
            <View style={{height:this.state.webHeight}}>
                <WebView
                    source={html}
                    style={[styles.webView]}
                    bounces={false}
                    scrollEnabled={false}
                    automaticallyAdjustContentInsets={true}
                    contentInset={{top:0,left:0}}
                    onNavigationStateChange={(title)=>{
                        if(title.title != undefined) {
                            console.log("webHeight:"+title.title);
                            this.setState({
                                webHeight:(parseInt(title.title)+20)
                            })
                        }
                    }}>
                </WebView>
            </View>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    webView:{
        flex:1,
        flexDirection:'column',
        backgroundColor:CommonColors.ThemeBgColor,
    },
    main:{
        height:270,
        width:width,
        flexDirection: 'column',
        backgroundColor: '#00000022',
        borderTopWidth:1,
        borderTopColor:CommonColors.blue,
    },
    row:{
        height:50,
        flexDirection:'row',
        justifyContent:'center',
        paddingHorizontal:10,
        alignItems:'center',
    },
    label:{
        fontSize:18,
        color:CommonColors.ActiveColor,
    },
    hintText:{
        fontSize:14,
        color:CommonColors.white,
        flex:1,
        textAlign:'right',
    },
    inputTextStyle:{
        padding: 0,
        width: width - 20,
        height:40,
        backgroundColor:'white',
        borderRadius:6,
        fontSize:18,
        textAlign:'center',
    },
    positionBottom:{
        position:'absolute',
        bottom:0,
        height:50,
        width: width,
        backgroundColor:'#FFFFFF',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
    },
    bottomBtn:{
        flex:1,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:CommonColors.red1,
    },
    bottomBtnText:{
        color:'white',
        fontSize:18,
    },
    bottomText:{
        flex:1,
        textAlign:'center',
        color:'#333333',
        fontSize:12,
        justifyContent:'center',
        alignItems: 'center'
    }

});