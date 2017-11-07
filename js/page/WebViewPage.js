import React, { Component } from 'react';
import {
    WebView,
    View
} from 'react-native';
import {CommonStyles} from '../CommonStyles';
import {GoBackButton} from '../widget/TitleButton'
export default class WebViewPage extends Component{

    static navigationOptions = ({navigation, screenProps}) =>({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: "首页",
        headerTitleStyle: CommonStyles.headerTitleStyle,
        headerLeft: (
            <GoBackButton onPress={() => navigation.goBack()}/>
        ),
        headerRight: (<View />),

    })

    render(){
        return(
            <WebView style={{flex:1,flexDirection:'column'}} source={{uri:this.props.navigation.state.params.uri}}/>
        )
    }
}