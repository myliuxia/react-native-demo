import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    WebView,
    Text,
    ScrollView,
} from 'react-native';
import {CommonStyles,CommonColors } from '../../CommonStyles';
import {GoBackButton} from "../../widget/TitleButton";
import {requestWebMoblie} from '../../api/Server';
import { protocalPath } from '../../api/protocalPath';
import {getDate} from "../../CommonFunctions"

export default class NoticeDetailPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            noticeDetail:{},
        };
        this.getNoticeDetail();
    }
    getNoticeDetail = () => {
        let params = 'id=' + this.props.navigation.state.params.id ;
        let result = requestWebMoblie(protocalPath.noticeDetail, params);
        result.then((responseJson) => {
            //console.log(responseJson);
            this.setState({
                noticeDetail: responseJson,
            })
        }).catch((error => {
            this.showAlert(error.toString());
        })).done();
    }

    static navigationOptions = ({navigation, screenProps}) =>({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: "公告详情",
        headerTitleStyle: CommonStyles.headerTitleStyle,
        headerLeft: (
            <GoBackButton onPress={() => navigation.goBack()}/>
        ),
        headerRight: (<View/>)

    })

    render(){
        console.log(this.state.noticeDetail.content);
        let html = '<!DOCTYPE html><html><body><h3 >'+
                    this.state.noticeDetail.title +
                    '</h3><p style="color:#999999">'+
                    getDate(this.state.noticeDetail.addTime)+
                    '</p>'+
                    this.state.noticeDetail.content +'</body></html>';


        return(
            <WebView  style={styles.container} source={{html: this.state.noticeDetail === {} ? " " : html}}/>
            /*<ScrollView style={styles.container}>
                <Text style={styles.title}>{this.state.noticeDetail.title}</Text>
                <Text style={styles.time}>{getDate(this.state.noticeDetail.addTime)}</Text>

                <WebView source={{html:html}}
                         style={{height: this.state.webHeight}}
                         javaScriptEnabled
                         bounces={false}
                         scrollEnabled={false}
                         automaticallyAdjustContentInsets={true}
                         contentInset={{top:0,left:0}}
                         onNavigationStateChange={(title)=>{
                             console.log(title.title);
                             if(title.title != undefined) {

                                 this.setState({
                                     webHeight:(parseInt(title.title)+20)
                                 })
                             }
                         }}
                >

                </WebView>
            </ScrollView>*/
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: CommonColors.white,
        paddingHorizontal:10,
    },
    title:{
        marginTop:10,
        fontSize:20,
        color:'#333333',
    },
    time:{
        marginTop:10,
        fontSize:12,
        color:'#999999',
    },
    content:{
        flex:1,
        flexDirection: 'column',
    }
})