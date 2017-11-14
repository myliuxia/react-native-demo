import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    WebView,
    Dimensions
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { CommonStyles } from '../../CommonStyles';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
import {PageRoute} from "../../App";
import { GoBackButton } from "../../widget/TitleButton";
import { protocalPath } from '../../api/protocalPath';
import { server_ip_port,img_server_url } from '../../api/Server.js';
// 委托页面对外默认组件

const {width, height} = Dimensions.get('window');

export default class NewsPage extends React.Component {

    constructor(props){
        super(props);
        console.log(props.navigation.state.params.data);
        this.state={
          data:props.navigation.state.params.data,
        }
    }
    static navigationOptions  = ({ navigation }) => ({
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

    render(){
        let content = this.state.data.content;
        let imageurl = this.state.data.image==null ? (img_server_url + 'null'):(img_server_url + this.state.data.image.imageId);
        let title = this.state.data.title;
        let time =new Date(this.state.data.addTime);
        let parsetime = time.getFullYear() +'-'+((time.getMonth() + 1)<10? '0'+(time.getMonth() + 1):(time.getMonth() + 1)) + '-' + (time.getDate()<10? '0'+time.getDate() :time.getDate()) + ' ' + (time.getHours()<10 ? '0'+time.getHours() :time.getHours()) + ':' + (time.getMinutes()<10 ? '0'+time.getMinutes() :time.getMinutes());
        let html=`
        <html class="bg-white" xmlns="http://www.w3.org/1999/xhtml" style="font-size: 58.5938px;"><head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
        <title>金网安泰</title>
        <link rel="stylesheet" href="http://${server_ip_port}/frontmobile/resources/css/main.css">
        <link href="http://${server_ip_port}/frontmobile/resources/touch/css/iconfont.css" rel="stylesheet" type="text/css">
        		<link href="http://${server_ip_port}/frontmobile/resources/touch/css/common.css" rel="stylesheet" type="text/css">
        		<link href="http://${server_ip_port}/frontmobile/resources/touch/css/index.css" rel="stylesheet" type="text/css">
        		<script type="text/jscript" src="http://${server_ip_port}/frontmobile/resources/touch/js/jquery-1.11.0.js"></script>
        		<script type="text/jscript" src="http://${server_ip_port}/frontmobile/resources/touch/js/init.js"></script>
        </head>
        <body class="bg-white">
        <div class="content bg-white" style="padding-top: 0px;">
        <div class="pad-2-0">
        <p class="article-title sizeF-4-0">${title}</p>
       	<p class="gray marT-2-0 marB-2-0">
       		   ${parsetime}
       	</p>
       	<p>
            <img style="width:100%;" src="${imageurl}">
        </p>
       	<div class="text-box">${content}</div>
        </div>
        </div>
        </body></html>
        `;
        const { navigate } = this.props.navigation;
        return (
                <WebView
                  style={{width:width,height:height-20,backgroundColor:'gray'}}
                  source={{html: html,method: 'GET'}}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  scalesPageToFit={false}
                  />
        );
    }
}

const styles = StyleSheet.create({

});
