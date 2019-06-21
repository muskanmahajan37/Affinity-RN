import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, TouchableHighlight, AppRegistry } from 'react-native';
import SignatureCapture from 'react-native-signature-capture';

class SignCaptureModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            signer: this.props.signer,
            signResultImg: '',
        };
    }
    

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }

    render() {

        return (
            <View style={{}}>
                <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                    <View style={{backgroundColor: '#000000bd', width: '100%', height: '100%', padding: 40}}>
                        <View style={{borderColor: '#000', borderWidth: 1, backgroundColor: '#fff', height: '100%', width: '100%'}}>
                            <View style={{ flex: 1, flexDirection: "column", margin: 20, borderWidth: 1, borderColor: '#000', borderRadius: 10, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <SignatureCapture
                                    style={styles.signature}
                                    ref="sign"
                                    onSaveEvent={this._onSaveEvent}
                                    onDragEvent={this._onDragEvent}
                                    saveImageFileInExtStorage={false}
                                    showNativeButtons={false}
                                    showTitleLabel={false}
                                    viewMode={"portrait"}/>
                                <TouchableHighlight style={[styles.buttonStyle, {backgroundColor: '#ff7575', top: 50, left: -30}]}
                                    onPress={() => { this.resetSign(); } } >
                                    <Text style={{fontSize: 20, fontWeight: '600'}}>CLEAR</Text>
                                </TouchableHighlight>

                                <TouchableHighlight style={[styles.buttonStyle, {backgroundColor: '#7ad2ff', bottom: 50, left: -30}]}
                                    onPress={() => { this.saveSign() } } >
                                    <Text style={{fontSize: 20, fontWeight: '600'}}>DONE</Text>
                                </TouchableHighlight>
                            </View>
                            
                        </View>
                        <TouchableOpacity
                            style={{position: 'absolute', right: 25, top: 25}}
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Image style={{width: 40, height: 40}} source={require('../../../assets/img/icon-cancel-o.png')} />
                        </TouchableOpacity>
                    </View>
                
                </Modal>

                <TouchableHighlight
                    style={{borderWidth: 1, borderColor: '#000', borderRadius: 10, width: 150, height: 70, padding: 5}}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Image style={{ position: 'absolute', top: -40, left: 40, width: 70, height: 150, transform: [{ rotate: '-90deg'}] }} source={{uri: this.props.signResult ? this.props.signResult : null}} />
                </TouchableHighlight>
            </View>
        );
    }

    closeSignModal = () => {
        this.setModalVisible(!this.state.modalVisible);
    }

    resetSign = () => {
        this.refs["sign"].resetImage();
    }

    saveSign = () => {
        this.refs["sign"].saveImage();
    }

    _onSaveEvent = (result) => {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        // this.setState({signResultImg: })
        var signObj = {
            'signer': this.props.signer,
            'result': result
        }
        this.props.onSaveSign(signObj);
        this.setModalVisible(!this.state.modalVisible);
    }

    _onDragEvent = () => {
        // This callback will be called when the user enters signature
        console.log("dragged");
    }

}

const styles = StyleSheet.create({
    signature: {
        flex: 1, backgroundColor: 'transparent', borderRadius: 50, height: '100%', position: 'absolute', width: '100%'
    },
    buttonStyle: {
        flexDirection: 'row', justifyContent: "center", alignItems: "center", 
        height: 40, width: 120, borderRadius: 5, position: 'absolute', bottom: 10, 
        transform: [{ rotate: '90deg'}]
    }
});

AppRegistry.registerComponent('SignCaptureModal', () => SignCaptureModal);

export default SignCaptureModal;