import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions
} from 'react-native';
import { CommonStyles } from '../CommonStyles';
import {PageRoute} from "../App";
import { GoBackButton } from "../widget/TitleButton";
import { protocalPath } from '../api/protocalPath';
import { requestWebMoblie } from '../api/Server';
const qs = require('querystring');
const {width, height} = Dimensions.get('window');
// 委托页面对外默认组件
export default class NewsPage extends React.Component {

    constructor(){
        super();
        this.state={
            listdata:[],
            chooseSort:{},
        }
    }

    static navigationOptions  = ({ navigation }) => ({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: '买卖',
        headerTitleStyle: CommonStyles.headerTitleStyle,
        headerLeft: (
            <GoBackButton onPress={() => navigation.goBack()} />
        )
    });
    _chooseSort = (newchoose)=>{
      console.log(newchoose);
      this.setState({
          chooseSort:newchoose,
      });
    }

    componentWillMount(){
      let param = qs.stringify({
      })
      let result = requestWebMoblie(protocalPath.getBreed,param).then((responseJson)=>{
          for(let i=0;i<responseJson.length;i++){
            responseJson[i].key = responseJson[i].breedId;
          }
          this.setState({
            listdata:responseJson,
            chooseSort:responseJson[0]
          })
          return responseJson;
      }).catch((error)=>{
        console.error(error);
      });
    }

    render(){
        const { navigate } = this.props.navigation;
        return (
                <View style={styles.contentview}>
                    <ScrollView style={styles.firstlevelscroll}>
                        <FlatList
                            data = {this.state.listdata}
                            chooseSort={this.state.chooseSort}
                            renderItem={({item}) => <FirstLevelSort data={item} chooseSort={this.state.chooseSort} onPress={this._chooseSort} />}
                        />
                    </ScrollView>
                    <ScrollView style={styles.sublevelscroll}>
                        <FlatList
                            data = {this.state.chooseSort.commodities}
                            renderItem={({item}) => <SubLevelSort {...this.props} data={item} />}
                        />
                    </ScrollView>
                </View>
        );
    }
}

class FirstLevelSort extends Component{
    constructor(props){
        super(props);
        if(props.chooseSort.breedName==props.data.breedName){
          this.state={
            data:this.props.data,
            status:"choose",
            _chooseSort:props.onPress,
          }
        }else{
          this.state={
            data:this.props.data,
            status:"notchoose",
            _chooseSort:props.onPress,
          }
        }
    }
    componentWillReceiveProps(nextProps){
      if(this.state.data.breedName==nextProps.chooseSort.breedName){
          this.setState({
            status:"choose",
          })
      }else{
        this.setState({
          status:"notchoose",
        })
      }
    }
    _chooseSort = ()=>{
      this.state._chooseSort(this.state.data);
    };
    render() {
        let data = this.props.data;
        if(this.state.status!="choose")
        {
          return(
            <TouchableOpacity delayLongPress={20} onPress={this._chooseSort}>
            <View style={styles.firstleveluncheckview}>
                <Text numberOfLines={1} style={styles.firstlevelunchecktext}>{data.breedName}</Text>
            </View>
            </TouchableOpacity>
          )
        }else{
          return(
            <View style={styles.firstlevelcheckedview}>
                <Text numberOfLines={1} style={styles.firstlevelcheckedtext}>{data.breedName}</Text>
            </View>
          )
        }
    }
}

class SubLevelSort extends Component{
    constructor(props){
        super(props);
    }
    _tocommoditydetail = ()=>{
      let data = this.props.data;
      const {navigate} = this.props.navigation;
      navigate(PageRoute.OrderDetailPage,{commodityId:data.commodityId,commodityName:data.name});
    }
    render() {
        let data = this.props.data;
        return(
          <TouchableOpacity delayLongPress={20} onPress={this._tocommoditydetail}>
          <View style={styles.sublevelview}>
              <Text numberOfLines={1} style={styles.subleveltext}>{data.name}</Text>
          </View>
          </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    contentview:{
      flexDirection:"row",
      backgroundColor:"#1d1c27"
    },
    firstlevelscroll:{
      height:height-75,
      width:width/3,
      borderRightWidth:1,
      borderRightColor:"#1d1c27"
    },
    sublevelscroll:{
      height:height-75,
      width:width*2/3,
      backgroundColor:"rgba(255,255,255,0.3)"
    },
    firstleveluncheckview:{
      height:50,
      justifyContent:"center",
      paddingRight:10
    },
    firstlevelunchecktext:{
      color:"#999999",
      fontSize:20,
      marginLeft:10
    },
    firstlevelcheckedview:{
      height:50,
      justifyContent:"center",
      backgroundColor:"rgba(255,255,255,0.3)",
      paddingRight:10
    },
    firstlevelcheckedtext:{
      color:"#0091FF",
      fontSize:20,
      marginLeft:10
    },
    sublevelview:{
      height:50,
      justifyContent:"center"
    },
    subleveltext:{
      color:"white",
      fontSize:20,
      marginLeft:10
    }
});
