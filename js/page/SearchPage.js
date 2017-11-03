import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList
} from 'react-native';

import {CommonStyles} from "../CommonStyles";
import {GoBackButton} from "../widget/TitleButton";

export default class SearchPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
        };
    }

    static navigationOptions = ({navigation}) => ({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: '商品搜索',
        headerTitleStyle: CommonStyles.headerTitleStyle,
        headerBackTitleStyle: {
            color: 'white',
            fontSize: 14
        },
        headerLeft:(
            <GoBackButton onPress={() => navigation.goBack()}/>
        ),
        headerRight: (() => {}),
    });

    componentDidMount() {
        console.log('componentDidMount');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item}) => (
        <MyListItem
            id={item.id}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item.id)}
            title={item.title}
        />
    );

    render() {
        return (
            <View style={Styles.container}>
                <View style={Styles.inputLayout}>
                    <TextInput underlineColorAndroid='transparent'
                               placeholder='请输入关键词'
                               style={[Styles.input,{height:40}]}
                               maxLength={16}
                               onChangeText={(text) => this.setState({searchKey: text})}/>
                    <View style={Styles.divider}/>
                    <TouchableOpacity activeOpacity={0.8}  style={Styles.searchBtn}>
                        <Image source={require('../img/icon/ic_search_enable.png')} style={Styles.icon}/>
                    </TouchableOpacity>

                </View>
                <FlatList
                    data={this.props.data}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />

            </View>
        );
    }

}

class MyListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        return (
            <SomeOtherWidget
                {...this.props}
                onPress={this._onPress}
            />
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
    },
    inputLayout: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        backgroundColor: '#FFFFFF',
        borderBottomWidth:1,
        borderColor: '#efefef',
    },
    icon: {
        width: 20,
        height: 20,
        backgroundColor: '#efefef',
    },
    input: {
        flex: 1,
        marginLeft: 10,
        height:30,
        backgroundColor: '#efefef',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius:3,
        borderTopLeftRadius:3
    },
    divider: {
        width: 1,
        backgroundColor: 'white',
        height: 40,
    },
    searchBtn:{
        marginRight: 10,
        height:30,
        width:40,
        backgroundColor: '#efefef',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius:3,
        borderTopRightRadius:3
    }

});