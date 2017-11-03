import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { PageRoute } from '../App.js';
import { CommonStyles , CommonColors} from '../CommonStyles';
import {IconButton} from "../widget/TitleButton";
import {SwiperView} from "../widget/Swiper";
import { NoticeView } from '../page/Index';
import { protocalPath } from '../api/protocalPath';
import { requestWebMoblie,img_server_url } from '../api/Server';
const qs = require('querystring');
// 委托页面对外默认组件
export default class NewsPage extends React.Component {

    constructor(){
        super();
        this.state = {
            isLogin: loginUser.isLogin(),
            informationlist:[],
            investmentlist:[]
        };
    }

    componentWillMount(){
        let param = qs.stringify({
          currentPage:1,
          pageSize :3,
          mark:'discloseInfo'
        })
        requestWebMoblie(protocalPath.articleChildlist,param).then((responseJson)=>{
          for(let i=0;i<responseJson.length;i++){
            responseJson[i].key = responseJson[i].id;
            if(responseJson[i].image!=null){
              responseJson[i].url = {uri:img_server_url + responseJson[i].image.imageId};
            }else{
              responseJson[i].url = {uri:img_server_url + 'null'};
            }
            let time =new Date(responseJson[i].addTime);
            responseJson[i].time = ((time.getMonth() + 1)<10? '0'+(time.getMonth() + 1):(time.getMonth() + 1)) + '-' + (time.getDate()<10? '0'+time.getDate() :time.getDate()) + ' ' + (time.getHours()<10 ? '0'+time.getHours() :time.getHours()) + ':' + (time.getMinutes()<10 ? '0'+time.getMinutes() :time.getMinutes());
          }
          this.setState({
            informationlist:responseJson,
          })
        }).catch((error)=>{
          console.error(error);
        })
        let paraminvestment = qs.stringify({
          currentPage:1,
          pageSize :3,
          mark:'investment'
        })
        requestWebMoblie(protocalPath.articleChildlist,paraminvestment).then((responseJson)=>{
          for(let i=0;i<responseJson.length;i++){
            responseJson[i].key = responseJson[i].id;
            if(responseJson[i].image!=null){
              responseJson[i].url = {uri:img_server_url + responseJson[i].image.imageId};
            }else{
              responseJson[i].url = {uri:img_server_url + 'null'};
            }
          }
          this.setState({
            investmentlist:responseJson,
          })
        }).catch((error)=>{
          console.error(error);
        })
    }
    static navigationOptions = ({navigation, screenProps}) =>({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: '资讯',
        headerTitleStyle: CommonStyles.headerTitleStyle,
        headerLeft: (
            <IconButton
                iconStyle={{height:25,width:25,tintColor:"#FFFFFF"}}
                source={require('../img/icon/header_search.png')}
                onPress={() => navigation.navigate(PageRoute.SearchPage)}/>
        ),
        headerRight: (
            loginUser.isLogin() ?
                <IconButton
                    iconStyle={{height:25,width:25,tintColor:"#FFFFFF"}}
                    source={require('../img/icon/screen.png')}
                    onPress={() => navigation.navigate(PageRoute.SearchPage)}/>
                :
                <IconButton
                    iconStyle={{height:25,width:25,tintColor:"#FFFFFF"}}
                    source={require('../img/icon/login.png')}
                    onPress={() => navigation.navigate(PageRoute.LoginPage)}/>
        ),
    });
    _toimformationlist=()=>{
      const {navigate} = this.props.navigation;
      navigate(PageRoute.InformationlistPage);
    }
    _toinvestmentlist=()=>{
      const {navigate} = this.props.navigation;
      navigate(PageRoute.InvestmentlistPage);
    }
    render(){
        return (
            <ScrollView style={{backgroundColor:CommonColors.ThemeBgColor}}>

                <SwiperView/>

                <NoticeView navigation={this.props.navigation}/>

                <View style={styles.title}>
                  <View style={styles.titletextview}>
                    <Text style={styles.titletext}>信息披露</Text>
                  </View>
                  <TouchableOpacity delayLongPress={20} delayPressIn ={20} onPress={this._toimformationlist}>
                    <View style={styles.titleiconview}>
                      <Image style={styles.titlemore} source={require('../img/icon/more.png')}/>
                    </View>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={this.state.informationlist}
                  renderItem={({item}) => <Information {...this.props} data={item} />}
                />
                <View style={styles.title}>
                  <View style={styles.titletextview}>
                    <Text style={styles.titletext}>投资服务</Text>
                  </View>
                  <TouchableOpacity delayLongPress={20} delayPressIn ={20} onPress={this._toinvestmentlist}>
                      <View style={styles.titleiconview}>
                        <Image style={styles.titlemore} source={require('../img/icon/more.png')}></Image>
                      </View>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={this.state.investmentlist}
                  renderItem={({item}) => <Investment {...this.props} data={item} />}
                />
            </ScrollView>
        );
    }
}
class Information extends Component{
    constructor(props){
        super(props);
    }
    _toimformation = ()=>{
      let item = this.props.data;
      const {navigate} = this.props.navigation;
      navigate(PageRoute.InformationDetailPage,{data:item});
    }
    render() {
        let item = this.props.data;
        return(
          <TouchableOpacity delayLongPress={20} delayPressIn ={20} onPress={this._toimformation}>
          <View style={styles.informationview}>
              <Image style={styles.informationimage} source={item.url}>
              </Image>
              <View style={styles.informationdetailview}>
                  <Text style={styles.informationtitle} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.informationdetail} numberOfLines={2}>{item.content}</Text>
                  <View style={styles.informationtimeview}>
                      <Text style={styles.informationtime}>{item.time}</Text>
                  </View>
              </View>
          </View>
          </TouchableOpacity>
        )
    }
}
class Investment extends Component{
    constructor(props){
        super(props);
    }
    _toinvestment = ()=>{
      let item = this.props.data;
      const {navigate} = this.props.navigation;
      navigate(PageRoute.InvestmentDetailPage,{data:item});
    }
    render() {
        let item = this.props.data;
        return(
          <TouchableOpacity delayLongPress={20} delayPressIn ={20} onPress={this._toinvestment}>
          <View style={styles.investmentview}>
            <Image style={styles.investmentimage} source={item.url}>
              <View style={styles.investmenttextview}>
                <Text style={styles.investmenttext}>{item.title}</Text>
              </View>
            </Image>
          </View>
          </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    title:{
        flexDirection:'row',
        backgroundColor:"#FFFFFF22",
        height:50,
        alignItems:"center",
        borderTopColor:CommonColors.BorderColor,
        borderTopWidth:1,
        borderBottomColor:CommonColors.BorderColor,
        borderBottomWidth:1,
        marginTop:10,
    },
    titletextview:{
      flex:9,
      alignItems:"center"
    },
    titletext:{
      fontSize:20,
      color:"white"
    },
    titleiconview:{
      flex:1,
      paddingBottom:10,
      paddingTop:10
    },
    titlemore:{
      flex:1,
      height:25,
      width:30
    },
    informationview:{
      flexDirection:'row',
      borderBottomWidth:1,
      borderBottomColor:CommonColors.BorderColor,
      paddingTop:6,
      paddingLeft:6,
      paddingRight:6,
      paddingBottom:6
    },
    informationimage:{
      flex:1,
      height:115,
      width:115
    },
    informationdetailview:{
      flex:2,
      paddingLeft:4
    },
    informationtitle:{
      color:"white",
      fontSize:18,height:46
    },
    informationdetail:{
      color:"white",
      fontSize:14,
      paddingTop:5,
      height:46
    },
    informationtimeview:{
      alignItems:"flex-end",
      justifyContent:"flex-end",
      paddingTop:5,height:23
    },
    informationtime:{
      color:"white",
      fontSize:15
    },
    investmentview:{
      height:170,
      paddingLeft:10,
      paddingTop:10,
      paddingRight:10,
      paddingBottom:10,
      borderBottomWidth:1,
      borderBottomColor:CommonColors.BorderColor,
    },
    investmentimage:{
      height:150
    },
    investmenttextview:{
      height:25,
      alignItems:"flex-start",
      paddingLeft:10,
      justifyContent:"center",
      backgroundColor:"rgba(0,0,0,0.3)",
      marginTop:125
    },
    investmenttext:{
      color:"white"
    }
});
