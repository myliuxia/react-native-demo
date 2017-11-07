import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { CommonStyles } from '../../CommonStyles';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
import { GoBackButton } from "../../widget/TitleButton";
import { protocalPath } from '../../api/protocalPath';
import { requestWebMoblie,img_server_url } from '../../api/Server';
import {PageRoute} from "../../App";
const qs = require('querystring');
// 委托页面对外默认组件
export default class NewsPage extends React.Component {

    constructor(){
        super();
        this.state = {
          refreshState: RefreshState.Idle,
          listdata:[],
          currentPage:1,
          pageSize:10,
        };
    }
    componentWillMount(){
        this.getdata(this.state.currentPage,this.state.pageSize).then((responseJson)=>{
          this.setState({
            listdata:responseJson,
            currentPage:this.state.currentPage+1,
          })
          if(responseJson.length<this.state.pageSize){
            this.setState({
              refreshState:RefreshState.NoMoreData,
            })
          }
        }).catch((error)=>{
          console.error(error);
        })
    }
    getdata=(page,pageSize)=>{
      let param = qs.stringify({
        currentPage:page,
        pageSize :pageSize,
        mark:'investment'
      })
      let result = requestWebMoblie(protocalPath.articleChildlist,param).then((responseJson)=>{
        console.log(responseJson);
        for(let i=0;i<responseJson.length;i++){
          responseJson[i].key = responseJson[i].id;
          if(responseJson[i].image!=null){
            responseJson[i].url = {uri:img_server_url + responseJson[i].image.imageId};
          }else{
            responseJson[i].url = {uri:img_server_url + 'null'};
          }
        }
        return responseJson;
      }).catch((error)=>{
        console.error(error);
      })
      return result;
    }
    static navigationOptions =({ navigation }) => ({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: '投资服务',
        headerTitleStyle: CommonStyles.headerTitleStyle,
        headerLeft: (
            <GoBackButton onPress={() => navigation.goBack()} />
        ),
        headerRight: (
          <View></View>
        ),
    });

    onHeaderRefresh = ()=>{
      this.setState({refreshState: RefreshState.HeaderRefreshing});
      this.getdata(1,this.state.pageSize).then((responseJson)=>{
        this.setState({
          listdata:responseJson,
          currentPage:2,
        })
        if(responseJson.length<this.state.pageSize){
          this.setState({
            refreshState:RefreshState.NoMoreData,
          })
        }else {
          this.setState({
              refreshState: RefreshState.Idle,
          })
        }
      }).catch((error)=>{
        console.error(error);
      })
    }
    onFooterRefresh = ()=>{
      console.log(this.state.currentPage);
        this.setState({refreshState: RefreshState.FooterRefreshing})
        this.getdata(this.state.currentPage,this.state.pageSize).then((responseJson)=>{
          let newdata = [...this.state.listdata,...responseJson]
          this.setState({
            listdata:newdata,
            currentPage:this.state.currentPage+1,
          })
          if(responseJson.length<this.state.pageSize){
            this.setState({
              refreshState:RefreshState.NoMoreData,
            })
          }else {
            this.setState({
                refreshState: RefreshState.Idle,
            })
          }
        }).catch((error)=>{
          console.error(error);
        })
    }

    render(){
      return(
        <RefreshListView
              contentContainerStyle={{backgroundColor:"black"}}
              data = {this.state.listdata}
              renderItem={({item}) => <InvestmentView {...this.props} data={item} />}
              refreshState={this.state.refreshState}
              onHeaderRefresh={this.onHeaderRefresh}//顶部刷新
              onFooterRefresh={this.onFooterRefresh}//底部刷新
              ItemSeparatorComponent = {() => <View style={{height:4}}/>}
          />
      )
    }
}

class InvestmentView extends Component{
  constructor(props){
      super(props);
  }
  _toinvestment = ()=>{
    let itemData = this.props.data;
    const {navigate} = this.props.navigation;
    navigate(PageRoute.InvestmentDetailPage,{data:itemData});
  }
  render(){
      let itemData = this.props.data;
      return(
        <TouchableOpacity delayLongPress={20} delayPressIn ={20} onPress={this._toinvestment}>
        <View style={styles.investmentview}>
          <Image style={styles.investmentimage} source={itemData.url}>
            <View style={styles.investmenttextview}>
              <Text style={styles.investmenttext}>{itemData.title}</Text>
            </View>
          </Image>
        </View>
        </TouchableOpacity>
      )
  }
}

const styles = StyleSheet.create({
  investmentview:{
    height:170,
    paddingLeft:10,
    paddingTop:10,
    paddingRight:10,
    paddingBottom:10,
    borderBottomWidth:1,
    borderBottomColor:"#666666",
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
