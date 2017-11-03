import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Picker, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { RedRadiusButton, GrayRadiusButton } from './RadiusButton'

export default class PickerModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            data: props.data,
            value:'请选择',
            position:0
        };
    }

    componentWillMount=()=>{ 
        if(this.state.data==undefined){
            throw new Error('PickerModal的data属性为undefined');
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }


    iosPicker = () => {

        return (
            <View >
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { this.setModalVisible(false)}}//android按手机上的返回键时会调用这个函数
                >
                    <TouchableOpacity style={Styles.container} onPress={() => { this.setModalVisible(false) }}>
                        <View style={Styles.main}>
                            <Picker
                                selectedValue={this.state.value}
                                onValueChange={(value, position) => { this.setState({value:value,position:position});}}
                                >
                                {this.state.data}
                            </Picker>
                        </View>
                    </TouchableOpacity>
                </Modal>

                <TouchableOpacity onPress={() => {
                    this.setModalVisible(true)
                }} style={{ height: 40, justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 16, paddingLeft: 10 }}>{this.state.data[this.state.position].props.label}</Text>
                </TouchableOpacity>
            </View>
        )

    }

    androidPicker = () => {
        return (
            <Picker style={{
                color: 'white',
            }}
                selectedValue={this.state.language}
                onValueChange={(lang) => this.setState({ language: lang })}>
                {this.state.data}
            </Picker>
        )

    }

    render() {
        console.log(Platform.OS);
        if (Platform.OS == 'ios') {
            return this.iosPicker();
        } else {
            return this.androidPicker();
        }
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    main: {
        width: 375,
        flexDirection: 'column',
        backgroundColor: '#efefef',
    },
    item2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        flex: 0.7,
    },

});
