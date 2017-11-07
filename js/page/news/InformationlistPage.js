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
            listdata : [],
            currentPage:1,
            pageSize:10,
        };
    }

    static navigationOptions=({ navigation }) => ({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: '信息披露',
        headerTitleStyle: CommonStyles.headerTitleStyle,
        headerLeft: (
            <GoBackButton onPress={() => navigation.goBack()} />
        ),
        headerRight: (
          <View></View>
        ),
    });

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
        mark:'discloseInfo'
      })
      let result = requestWebMoblie(protocalPath.articleChildlist,param).then((responseJson)=>{
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
        return responseJson;
      }).catch((error)=>{
        console.error(error);
      })
      return result;
    }
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
        }else{
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
          console.log(responseJson);
          let newdata = [...this.state.listdata,...responseJson]
          this.setState({
            listdata:newdata,
            currentPage:this.state.currentPage+1,
          })
          if(responseJson.length<this.state.pageSize){
            this.setState({
              refreshState:RefreshState.NoMoreData,
            })
          }else{
            this.setState({
              refreshState: RefreshState.Idle,
            })
          }
        }).catch((error)=>{
          console.error(error);
        })
    }
    render(){
        return (
          <RefreshListView
                contentContainerStyle={{backgroundColor:"black"}}
                data = {this.state.listdata}
                renderItem={({item}) => <InformationView {...this.props} data={item} />}
                refreshState={this.state.refreshState}
                onHeaderRefresh={this.onHeaderRefresh}//顶部刷新
                onFooterRefresh={this.onFooterRefresh}//底部刷新
                ItemSeparatorComponent = {() => <View style={{height:4}}/>}
            />
        );
    }
}
class InformationView extends Component{
  constructor(props){
      super(props);
  }
  _toimformation = ()=>{
    let itemData = this.props.data;
    const {navigate} = this.props.navigation;
    navigate(PageRoute.InformationDetailPage,{data:itemData});
  }
  render(){
      let itemData = this.props.data;
      return(
        <TouchableOpacity delayLongPress={20} delayPressIn ={20} onPress={this._toimformation}>
        <View style={styles.informationview}>
            <Image style={styles.informationimage} source={itemData.url}>
            </Image>
            <View style={styles.informationdetailview}>
                <Text style={styles.informationtitle} numberOfLines={2}>{itemData.title}</Text>
                <Text style={styles.informationdetail} numberOfLines={2}>{itemData.content}</Text>
                <View style={styles.informationtimeview}>
                    <Text style={styles.informationtime}>{itemData.time}</Text>
                </View>
            </View>
        </View>

      </TouchableOpacity>
      )
  }
}

const styles = StyleSheet.create({
  informationview:{
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:"#666666",
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
    color:"#999999",
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
});
