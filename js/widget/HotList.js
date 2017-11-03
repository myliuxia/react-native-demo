import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import {CommonColors} from '../CommonStyles';
import { PageRoute } from '../App.js';
import {requestWebMoblie} from '../api/Server';
import { protocalPath } from '../api/protocalPath';


export class HotList extends Component {
    constructor(props){
        super(props);
        this.state={
            rankCommodities:[],
        }
        this._renderItem = this._renderItem.bind(this);

        this.getRank();
    }
    _keyExtractor = (item, index) => item.commodityId;

    /**
     * 判断排序名次，返回对应样式
     * @param index
     * @returns {*}
     * @private
     */
    _isRank = (index) => {
        if(index == 0){
            return styles.hot1
        }else if(index == 1){
            return styles.hot2
        }else if(index == 2){
            return styles.hot3
        }else{
            return styles.hot4
        }
    }
    _renderItem = ({item,index}) => (

        <TouchableOpacity style={styles.hotListItem}
        key ={index}
        onPress={() =>{this.props.navigation.navigate(PageRoute.OrderDetailPage,{commodityId: item.commodityId,commodityName:item.name})}}
        >
        <View style={styles.hotListItem}>
        <Image source = {require('../img/icon/hot.png')} style={[styles.imageIcon,this._isRank(index)]}/>
        <Text style={styles.hotText} numberOfLines={1} >{item.name}</Text>
        </View>
        </TouchableOpacity>

    );



    getRank = () => {
        let params = '';
        let result = requestWebMoblie(protocalPath.indexRank, params);
        result.then((responseJson) => {
            //console.log(responseJson);
            if(this.props.keyStyle === 'turnoverRateCommodities'){
                this.setState({
                    rankCommodities: responseJson.turnoverRateCommodities,
                })

            }else if(this.props.keyStyle === 'totalMoneyCommodities'){

                this.setState({
                    rankCommodities: responseJson.totalMoneyCommodities,
                })

            }
            //this.state.totalMoneyCommodities = responseJson.totalMoneyCommodities;

        }).catch((error => {
            this.showAlert(error.toString());
        })).done();
    }


    render(){
        return (
            <FlatList
                style={styles.hotList}
                data= {this.state.rankCommodities}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
}
const styles = StyleSheet.create({
    hotList:{
        flexDirection:'column',
        backgroundColor: "#FFFFFF11",
        height:480,
    },
    hotListItem:{
        flex:1,
        flexDirection:'row',
        height:40,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:5,
    },
    imageIcon:{
        width:20,
        height:20,
    },
    hot1:{
        tintColor: CommonColors.red,
    },
    hot2:{
        tintColor: CommonColors.orange,
    },
    hot3:{
        tintColor: CommonColors.yellow,
    },
    hot4:{
        tintColor: CommonColors.gray,
    },
    hotText:{
        flex:1,
        fontSize:14,
        color:'#FFFFFF',
    }
});