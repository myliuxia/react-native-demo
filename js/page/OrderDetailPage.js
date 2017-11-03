import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    TextInput,
    WebView
} from 'react-native';
import { PageRoute } from '../App.js';
import {CommonStyles,CommonColors } from '../CommonStyles';
import { GoBackButton } from "../widget/TitleButton";
import { BuyModel,SellModel,DetailWebModel } from "../widget/BuyAndSellModal";
import {request,requestWebMoblie,checkLoginStateOnline} from '../api/Server';
import { protocalPath } from '../api/protocalPath';
import {showAlert} from '../CommonFunctions';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
const { width , height } = Dimensions.get("window");


// 委托页面对外默认组件
export default class OrderDetailPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showBuyModel: false,
            showSellModel: false,
            buyPrice: '',
            sellPrice: '',
            tabStyle: {
                tabItem0: {color: CommonColors.ActiveColor},
                tabItem1: {color: CommonColors.white},
                tabItem2: {color: CommonColors.white},
                tapUnderline: {left: 0},
                detailsItem0: {width: width},
                detailsItem1: {width: 0},
                detailsItem2: {width: 0},
            },
            tabStyleK: {
                tabItem0:{color:CommonColors.gray},
                tabItem1:{color:CommonColors.gray},
                tabItem2:{color:CommonColors.ActiveColor},
                tapUnderline:{left:2*width/3},
                detailsItem0:{width:0},
                detailsItem1:{width:0},
                detailsItem2:{width:width},
            },
            commodityContent: '',//商品详情
            hqDetails: {
                closePrice: 0,//昨收盘价
                openPrice: 0,//今开市价
                highPrice: 0,//最高价
                lowPrice: 0,//最低价
                curPrice: 0,//最新价
                totalMoney: 0,//总成交额
                totalAmount: 0,//总成交量
                buyPrice1: 0,//买1
                buyPrice2: 0,//买2
                buyPrice3: 0,//买3
                sellPrice1: 0,//卖1
                sellPrice2: 0,//卖2
                sellPrice3: 0,//卖3
                buyAmount1: 0,//买量1
                buyAmount2: 0,//买量2
                buyAmount3: 0,//买量3
                sellAmount1: 0,//卖量1
                sellAmount2: 0,//卖量2
                sellAmount3: 0,//卖量3
            },
            queryTrade: [],
            refreshState: RefreshState.Idle,//成交查询
            webHeight:0,//详情高度
        };
        this._onPressTab = this._onPressTab.bind(this);
        this._onPressTabK = this._onPressTabK.bind(this);
        this._onShowModal = this._onShowModal.bind(this);
        this.getCommodityDetail();

        this.getCommodityHQDetail();


    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);

    }
    componentDidMount() {
        this._startTimer();

    }

    static navigationOptions = ({navigation, screenProps}) =>({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: navigation.state.params?navigation.state.params.commodityName:'商品详情',
        headerTitleStyle: CommonStyles.headerTitleStyle,
        headerLeft: (
			<GoBackButton onPress={() => navigation.goBack()}/>
        ),
        headerRight: (<View/>)
    })

    /**
     * 获取商品详情方法
     */
    getCommodityDetail = () =>{
        let params = 'id=' + this.props.navigation.state.params.commodityId;
        let result = requestWebMoblie(protocalPath.commodityDetail, params);
        result.then((responseJson) => {
            //console.log(responseJson);
            this.setState({
                //commodityDetail: responseJson,
                commodityContent: responseJson.commodityMobile[0] ? responseJson.commodityMobile[0].contents : '<p style="color:#999999;text-align: center">暂无数据！</p>',
            })
        }).catch((error => {
            console.error(error.toString());
        })).done();
    }

    _startTimer(){
        this.timer = setInterval(() => {
            let params = 'commodityId=' + this.props.navigation.state.params.commodityId;
            let result = requestWebMoblie(protocalPath.commodityHQDetail, params);
            result.then((responseJson) => {
                //console.log('HQ:');
                //console.log(responseJson);
                this.setState({
                    hqDetails:{
                        closePrice:responseJson.closePrice,//昨收盘价
                        openPrice:responseJson.openPrice,//今开市价
                        highPrice:responseJson.highPrice,//最高价
                        lowPrice:responseJson.lowPrice,//最低价
                        curPrice:responseJson.curPrice === '' ||responseJson.curPrice === 0?responseJson.closePrice:responseJson.curPrice,//最新价
                        totalMoney:responseJson.totalMoney,//总成交额
                        totalAmount:responseJson.totalAmount,//总成交量
                        buyPrice1:responseJson.buyPrice[0],//买1
                        buyPrice2:responseJson.buyPrice[1],//买2
                        buyPrice3:responseJson.buyPrice[2],//买3
                        sellPrice1:responseJson.sellPrice[0],//卖1
                        sellPrice2:responseJson.sellPrice[1],//卖2
                        sellPrice3:responseJson.sellPrice[2],//卖3
                        buyAmount1:responseJson.buyAmount[0],//买量1
                        buyAmount2:responseJson.buyAmount[1],//买量2
                        buyAmount3:responseJson.buyAmount[2],//买量3
                        sellAmount1:responseJson.sellAmount[0],//卖量1
                        sellAmount2:responseJson.sellAmount[1],//卖量2
                        sellAmount3:responseJson.sellAmount[2],//卖量3
                    }
                })
            }).catch((error => {
                console.error(error.toString());
            })).done();
        },10000)
    }

    /**
     * 获取上商品行情信息
     */
    getCommodityHQDetail = () =>{
        let params = 'commodityId=' + this.props.navigation.state.params.commodityId;
        let result = requestWebMoblie(protocalPath.commodityHQDetail, params);
        result.then((responseJson) => {
            //console.log('HQ:');
            //console.log(responseJson);
            this.setState({
                hqDetails:{
                closePrice:responseJson.closePrice,//昨收盘价
                openPrice:responseJson.openPrice,//今开市价
                highPrice:responseJson.highPrice,//最高价
                lowPrice:responseJson.lowPrice,//最低价
                curPrice:responseJson.curPrice === '' ||responseJson.curPrice === 0?responseJson.closePrice:responseJson.curPrice,//最新价
                totalMoney:responseJson.totalMoney,//总成交额
                totalAmount:responseJson.totalAmount,//总成交量
                buyPrice1:responseJson.buyPrice[0],//买1
                buyPrice2:responseJson.buyPrice[1],//买2
                buyPrice3:responseJson.buyPrice[2],//买3
                sellPrice1:responseJson.sellPrice[0],//卖1
                sellPrice2:responseJson.sellPrice[1],//卖2
                sellPrice3:responseJson.sellPrice[2],//卖3
                buyAmount1:responseJson.buyAmount[0],//买量1
                buyAmount2:responseJson.buyAmount[1],//买量2
                buyAmount3:responseJson.buyAmount[2],//买量3
                sellAmount1:responseJson.sellAmount[0],//卖量1
                sellAmount2:responseJson.sellAmount[1],//卖量2
                sellAmount3:responseJson.sellAmount[2],//卖量3
                }
            })
        }).catch((error => {
            console.error(error.toString());
        })).done();

    }

    /**
     * 获得成交信息
     */
    getQueryTrade = (commodityId) =>{
        if(global.loginUser.isLogin()) {
            this.setState({
                refreshState: RefreshState.FooterRefreshing,
            })
            let params = 'sessionId=' + global.loginUser.sessionID + '&userId=' + global.loginUser.traderID;
            let result = request(protocalPath.queryTrade, params);
            result.then((responseJson) => {
                //console.log('成交:');
                //console.log(responseJson);
                if(responseJson.resultList!=null && responseJson.resultList.length>0){
                    let arr = new Array();
                    responseJson.resultList.forEach(function(value,index,array){
                        if(commodityId == value.commodityID){
                            arr.push(value);
                        }
                    })
                    if(arr.length>0){
                        this.setState({
                            queryTrade:arr,
                        })
                    }
                }

                this.setState({
                    refreshState: RefreshState.Idle,
                })
            }).catch((error => {
                console.error(error.toString());
            })).done();
        }else{
            showAlert('请先登录！');
        }
    }

    /**
     * K线图区域选项卡切换
     * @param index 目标索引
     */
    _onPressTabK(index){
        switch(index) {
            case 0:
                this.setState({
                    tabStyleK:{
                        tabItem0:{color:CommonColors.ActiveColor},
                        tabItem1:{color:CommonColors.gray},
                        tabItem2:{color:CommonColors.gray},
                        tapUnderline:{left:0},
                        detailsItem0:{width:width},
                        detailsItem1:{width:0},
                        detailsItem2:{width:0},
                    }
                });
                break;
            case 1:
                this.setState({
                    tabStyleK:{
                        tabItem0:{color:CommonColors.gray},
                        tabItem1:{color:CommonColors.ActiveColor},
                        tabItem2:{color:CommonColors.gray},
                        tapUnderline:{left:width/3},
                        detailsItem0:{width:0},
                        detailsItem1:{width:width},
                        detailsItem2:{width:0},
                    }
                });
                break;
            case 2:
                this.setState({
                    tabStyleK:{
                        tabItem0:{color:CommonColors.gray},
                        tabItem1:{color:CommonColors.gray},
                        tabItem2:{color:CommonColors.ActiveColor},
                        tapUnderline:{left:2*width/3},
                        detailsItem0:{width:0},
                        detailsItem1:{width:0},
                        detailsItem2:{width:width},
                    }
                });
                break;
            default:
                this.setState({
                    tabStyleK:{
                        tabItem0:{color:CommonColors.gray},
                        tabItem1:{color:CommonColors.gray},
                        tabItem2:{color:CommonColors.ActiveColor},
                        tapUnderline:{left:2*width/3},
                        detailsItem0:{width:0},
                        detailsItem1:{width:0},
                        detailsItem2:{width:width},
                    }
                });
                break;
        }
    }

    /**
     * 商品详情选项卡切换
     * @param index 目标索引
     */
    _onPressTab(index){
        switch(index) {
            case 0:
                this.setState({
                    tabStyle:{
                        tabItem0:{color:CommonColors.ActiveColor},
                        tabItem1:{color:CommonColors.white},
                        tabItem2:{color:CommonColors.white},
                        tapUnderline:{left:0},
                        detailsItem0:{width:width},
                        detailsItem1:{width:0},
                        detailsItem2:{width:0},
                    }
                });
                break;
            case 1:
                this.setState({
                    tabStyle:{
                        tabItem0:{color:CommonColors.white},
                        tabItem1:{color:CommonColors.ActiveColor},
                        tabItem2:{color:CommonColors.white},
                        tapUnderline:{left:width/3},
                        detailsItem0:{width:0},
                        detailsItem1:{width:width},
                        detailsItem2:{width:0},
                    }
                });
                break;
            case 2:
                this.setState({
                    tabStyle:{
                        tabItem0:{color:CommonColors.white},
                        tabItem1:{color:CommonColors.white},
                        tabItem2:{color:CommonColors.ActiveColor},
                        tapUnderline:{left:2*width/3},
                        detailsItem0:{width:0},
                        detailsItem1:{width:0},
                        detailsItem2:{width:width},
                    }
                });
                break;
            default:
                this.setState({
                    tabStyle:{
                        tabItem0:{color:CommonColors.ActiveColor},
                        tabItem1:{color:CommonColors.white},
                        tabItem2:{color:CommonColors.white},
                        tapUnderline:{left:0},
                        detailsItem0:{width:width},
                        detailsItem1:{width:0},
                        detailsItem2:{width:0},
                    }
                });
                break;
        }
    }

    _keyExtractor = (item, index) => item.tradeNo;

    _onShowModal(buySell){
        if(checkLoginStateOnline() && global.loginUser.isLogin()){
            if(buySell==='buy'){
                this.setState({showBuyModel:true})
            }else if(buySell==='sell'){
                this.setState({showSellModel:true})
            }
        }
        else{
            showAlert("请先登录！");
        }
    }

    render(){
        return (
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.infoBox}>
						<View style={styles.infoExponent}>
							<View style={styles.infoCon}>
								<Text style={styles.infoText0} numberOfLines={1} >最新：{this.state.hqDetails.curPrice}</Text>
							</View>
							<View style={styles.infoCon}>
								<Text style={styles.infoText1} numberOfLines={1} >最高：
									<Text style={{color:CommonColors.red}} >{this.state.hqDetails.highPrice}</Text>
								</Text>
								<Text style={styles.infoText1} numberOfLines={1} >最低：
									<Text style={{color:CommonColors.green}} >{this.state.hqDetails.lowPrice}</Text>
								</Text>
							</View>
							<View style={styles.infoCon}>
								<Text style={styles.infoText1} numberOfLines={1} >今开：
									<Text style={{color:CommonColors.green}} >{this.state.hqDetails.openPrice}</Text>
								</Text>
								<Text style={styles.infoText1} numberOfLines={1} >昨结：
									<Text style={{color:CommonColors.white}} >{this.state.hqDetails.closePrice}</Text>
								</Text>
							</View>
						</View>
						<View style={styles.infoTurnover}>
							<View style={styles.infoCon}>
								<Text style={styles.infoText1} numberOfLines={1} >成交量：
									<Text style={{color:CommonColors.golden}} >{this.state.hqDetails.totalAmount}</Text>
								</Text>
							</View>
							<View style={styles.infoCon}>
								<Text style={styles.infoText1} numberOfLines={1} >成交额：
                                    <Text style={{color:CommonColors.white}} >{this.state.hqDetails.totalMoney}</Text>
								</Text>
							</View>
						</View>
					</View>

                    <View style={styles.kLine}>
                        <View style={styles.scrollTabK}>
                            <TouchableOpacity style={styles.scrollTabBtnK} onPress={()=>{this._onPressTabK(0)}} >
                                <Text style={[styles.tabTextK,this.state.tabStyleK.tabItem0]}>分时图</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.scrollTabBtn} onPress={()=>{this._onPressTabK(1)}} >
                                <Text style={[styles.tabTextK,this.state.tabStyleK.tabItem1]}>K线图</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.scrollTabBtn} onPress={()=>{this._onPressTabK(2)}} >
                                <Text style={[styles.tabTextK,this.state.tabStyleK.tabItem2]}>比价助手</Text>
                            </TouchableOpacity>
                            <View style={[styles.UnderlineStyleK,this.state.tabStyleK.tapUnderline]}/>
                        </View>

                        <View style={styles.orderMessageDetailsK}>
                            <View style={[this.state.tabStyleK.detailsItem0,styles.detailsItemK]}>
                                <Text style={{color:"#FFFFFF"}}>这是分时图位置</Text>
                            </View>
                            <View style={[this.state.tabStyleK.detailsItem1,styles.detailsItemK]}>
                                <Text style={{color:"#FFFFFF"}}>这是K线图位置</Text>
                            </View>
                            <View style={[this.state.tabStyleK.detailsItem2,styles.detailsItemK]}>
                                <View style={styles.bjView}>
                                    <TouchableOpacity style={styles.bjItem}
                                        onPress={()=>{this._onShowModal('buy')}} >
                                        <Text style={[styles.bjItemCol,{color:'white',fontSize:12}]}>第三转让最低价</Text>
                                        <Text style={[styles.bjItemCol,{color:CommonColors.red,fontSize:16}]}>{this.state.hqDetails.sellPrice3}</Text>
                                        <Text style={[styles.bjItemCol,{color:'#999999',fontSize:12}]}>{this.state.hqDetails.sellAmount3}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.bjItem}
                                                      onPress={()=>{this._onShowModal('buy')}} >
                                        <Text style={[styles.bjItemCol,{color:'white',fontSize:12}]}>第二转让最低价</Text>
                                        <Text style={[styles.bjItemCol,{color:CommonColors.red,fontSize:16}]}>{this.state.hqDetails.sellPrice2}</Text>
                                        <Text style={[styles.bjItemCol,{color:'#999999',fontSize:12}]}>{this.state.hqDetails.sellAmount2}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.bjItem}
                                                      onPress={()=>{this._onShowModal('buy')}} >
                                        <Text style={[styles.bjItemCol,{color:'white',fontSize:12}]}>第一转让最低价</Text>
                                        <Text style={[styles.bjItemCol,{color:CommonColors.red,fontSize:16}]}>{this.state.hqDetails.sellPrice1}</Text>
                                        <Text style={[styles.bjItemCol,{color:'#999999',fontSize:12}]}>{this.state.hqDetails.sellAmount1}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.bjItem}
                                        onPress={()=>{this._onShowModal('sell')}} >
                                        <Text style={[styles.bjItemCol,{color:'white',fontSize:12}]}>第一购买最低价</Text>
                                        <Text style={[styles.bjItemCol,{color:CommonColors.green,fontSize:16}]}>{this.state.hqDetails.buyPrice1}</Text>
                                        <Text style={[styles.bjItemCol,{color:'#999999',fontSize:12}]}>{this.state.hqDetails.buyAmount1}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.bjItem}
                                        onPress={()=>{this._onShowModal('sell')}} >
                                        <Text style={[styles.bjItemCol,{color:'white',fontSize:12}]}>第二购买最低价</Text>
                                        <Text style={[styles.bjItemCol,{color:CommonColors.green,fontSize:16}]}>{this.state.hqDetails.buyPrice2}</Text>
                                        <Text style={[styles.bjItemCol,{color:'#999999',fontSize:12}]}>{this.state.hqDetails.buyAmount2}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.bjItem}
                                        onPress={()=>{this._onShowModal('sell')}} >
                                        <Text style={[styles.bjItemCol,{color:'white',fontSize:12}]}>第三购买最低价</Text>
                                        <Text style={[styles.bjItemCol,{color:CommonColors.green,fontSize:16}]}>{this.state.hqDetails.buyPrice3}</Text>
                                        <Text style={[styles.bjItemCol,{color:'#999999',fontSize:12}]}>{this.state.hqDetails.buyAmount3}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
					</View>

                    <View style={[styles.orderMessage,{height:this.state.webHeight+40,}]}>
                        <View style={styles.scrollTab}>
                            <TouchableOpacity style={styles.scrollTabBtn} onPress={()=>{this._onPressTab(0)}} >
                                <Text style={[styles.tabText,this.state.tabStyle.tabItem0]}>商品详情</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.scrollTabBtn} onPress={()=>{this._onPressTab(1);this.getQueryTrade(this.props.navigation.state.params.commodityId)}} >
                                <Text style={[styles.tabText,this.state.tabStyle.tabItem1]}>交易详情</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.scrollTabBtn}
                               onPress={()=>{global.loginUser.isLogin()?this.props.navigation.navigate(PageRoute.DelegationPage):showAlert("请先登录")}} >
                                <Text style={[styles.tabText,this.state.tabStyle.tabItem2]}>当日委托</Text>
                            </TouchableOpacity>
                            <View style={[styles.UnderlineStyle,this.state.tabStyle.tapUnderline]}/>
                        </View>

                        <View style={styles.orderMessageDetails}>
                            <View style={[this.state.tabStyle.detailsItem0,styles.detailsItem,]}>
                                {/*<DetailWebModel html={this.state.commodityContent} />*/}

                                <View style={{height:this.state.webHeight}}>
                                    <WebView
                                        source={{html:`<!DOCTYPE html><html><body>`+this.state.commodityContent+
                                        `<script>window.onload=function(){window.location.hash = 1;document.title = document.body.scrollHeight;document.body.style.color='#999999';document.body.style.backgroundColor='#070D14';}</script></body></html>`}
                                        }
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
                            </View>
                            <View style={[this.state.tabStyle.detailsItem1,styles.detailsItem]}>
                                <RefreshListView
                                    data={this.state.queryTrade}
                                    keyExtractor={this._keyExtractor}
                                    renderItem={({item}) => <TradeItem data={item} />}
                                    refreshState={this.state.refreshState}
                                    ItemSeparatorComponent = {() => <View style={{height:10}}/>}
                                />

                            </View>
                            <View style={[this.state.tabStyle.detailsItem2,styles.detailsItem]}>
                                <Text>{this.state.commodityContent}</Text>
                                {/*<WebView source={{uri: 'https://www.baidu.com/'}}/>*/}
                            </View>
                        </View>
                    </View>

				</ScrollView>

				<View style={styles.positionBottom} >
					<TouchableOpacity style={styles.bottomBtn}
                        onPress={() =>{this._onShowModal('buy')}}>
						<Text style={styles.bottomBtnText}>我要购买</Text>
					</TouchableOpacity>
					<View style={styles.colLine}/>
					<TouchableOpacity style={styles.bottomBtn}
                        onPress={() =>{this._onShowModal('sell')}}>
						<Text style={styles.bottomBtnText}>我要转让</Text>
					</TouchableOpacity>
				</View>

                <BuyModel isShow={this.state.showBuyModel}
                          commodityId={this.props.navigation.state.params.commodityId}
                          buyPrice={this.state.buyPrice}
                          callback={() =>{}}
                          onRequestClose={()=>{this.setState({showBuyModel:false});}}/>

                <SellModel isShow={this.state.showSellModel}
                           commodityId={this.props.navigation.state.params.commodityId}
                           sellPrice={this.state.sellPrice}
                           onRequestClose={()=>{this.setState({showSellModel:false});}}/>

			</View>
        );
    }

}
class TradeItem extends React.Component {
    render(){
        let data = this.props.data;
        return (
            <View style={itemStyles.container}>
                <View style={itemStyles.row}>
                    <Text style={itemStyles.textStyle}>成交单号:{data.tradeNo}</Text>
                    <Text style={itemStyles.textStyle}>委托单号:{data.orderNo}</Text>
                </View>
                <View style={itemStyles.row}>
                    <Text style={itemStyles.textStyle}>成交价格:{data.price}</Text>
                    <Text style={itemStyles.textStyle}>成交数量:{data.quantity}</Text>
                </View>
                <View style={itemStyles.row}>
                    <Text style={itemStyles.textStyle}>成交时间:{data.tradeTime.substring(5)}</Text>
                    <Text style={itemStyles.textStyle}>买卖方向:{data.bsflag==1?'买':'卖'}</Text>
                </View>
            </View>
        );
    }
}
const itemStyles = StyleSheet.create({
    container:{
        flexDirection:'column',
        marginHorizontal:10,
        backgroundColor:'#FFFFFF11',
        borderColor:CommonColors.BorderColor,
        borderWidth:1,
        padding:10,
        marginTop:10,
        borderRadius:5,
    },
    row:{
        flexDirection:'row',
        height:20,
        alignItems:'center',
    },
    textStyle:{
        flex:1,
        alignItems:'center',
        color:'#999999',
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: CommonColors.ThemeBgColor,
        paddingBottom:50,
    },
    infoBox:{
        height: 100,
        flexDirection: 'column',
        backgroundColor: "#FFFFFF22",
    },
    infoExponent:{
        height: 66,
        flexDirection: 'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor: CommonColors.BorderColor,
    },
    infoTurnover:{
        height: 33,
        flexDirection: 'row',
        alignItems:'center',
    },
    infoCon:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    infoText0:{
        fontSize:16,
        color:'#FFFFFF',
    },
    infoText1:{
        fontSize:12,
        color:CommonColors.gray,
    },
    kLine:{
        flexDirection:'column',
        height: width*4/5,
        width: width,
        backgroundColor:'#FFFFFF11',
    },
    scrollTabK:{
        flexDirection:'row',
        width:width,
        height:35,
    },
    scrollTabBtnK:{
        flex:1,
        height:35,
        justifyContent:'center',
        alignItems:'center'
    },
    tabTextK:{
        fontSize:14,
    },
    UnderlineStyleK:{
        position:'absolute',
        bottom:0,
        backgroundColor: CommonColors.ActiveColor,
        width:width/3,
        height: 2,
    },
    detailsItemK:{
        backgroundColor:CommonColors.ThemeBgColor,
    },
    orderMessageDetailsK:{
        flex:1,
        flexDirection:'row',
    },

    bjView:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        paddingVertical:10,
    },
    bjItem:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center',
        height:(width*4/5 - 55)/6,
    },
    bjItemCol:{
        flex:1,
        textAlign:'center',

    },

    positionBottom:{
        position:'absolute',
        bottom:0,
        height:50,
        width: width,
        backgroundColor:'#FFFFFF11',
        borderTopWidth:1,
        borderTopColor:CommonColors.BorderColor,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
    },
    bottomBtn:{
        width:width/2,
        height:50,
        justifyContent:'center',
        alignItems:'center',
    },
    colLine:{
        height:50,
        width:1,
        backgroundColor:CommonColors.BorderColor,
    },
    bottomBtnText:{
        fontSize:18,
        color:CommonColors.ActiveColor,
    },
    orderMessage:{
    },
    orderMessageDetails:{
        //flex:1,
        flexDirection:'row',
    },
    scrollTab:{
        flexDirection:'row',
        width:width,
        height:40,
        backgroundColor:'#FFFFFF44',
        borderBottomColor: CommonColors.BorderColor,
        borderBottomWidth: 1,
    },
    scrollTabBtn:{
        flex:1,
        height:40,
        justifyContent:'center',
        alignItems:'center'
    },
    tabText:{
        fontSize:16,
    },
    UnderlineStyle:{
        position:'absolute',
        bottom:-1,
        backgroundColor: CommonColors.ActiveColor,
        width:width/3,
        height: 2,
    },
    detailsItem:{
        backgroundColor:CommonColors.ThemeBgColor,
    },


})