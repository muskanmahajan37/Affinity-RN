import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TouchableHighlight } from 'react-native';
// import Picker from 'react-native-wheel-picker';

// var PickerItem = Picker.Item;

class AFWheelPickerModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false, 
            selectedItem : 11,
            itemList: ['01am', '02am', '03am', '04am', '05am', '06am', '07am', '08am', '09am', '10am', '11am', '- -', '12pm', '01pm', '02pm', '03pm', '04pm', '05pm', '06pm', '07pm', '08pm', '09pm', '10pm', '11pm', '00am']
        }
    }

    onPickerSelect (index) {
        this.setState({
            selectedItem: index,
        })
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    
    render() {
        const state = this.state;
        return (
            <View style={{}}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{height: '100%'}}>
                        <View style={{height: '100%'}}>
                            <View style={styles.container}>
                                <Text style={styles.welcome}>
                                    Please, Pick the Time.
                                </Text>
                                {/* <Picker style={{width: 150, height: 180}}
                                    selectedValue={this.state.selectedItem}
                                    itemStyle={{color:"#fff", fontSize:26}}
                                    onValueChange={(index) => this.onPickerSelect(index)}>
                                        {this.state.itemList.map((value, i) => (
                                            <PickerItem label={value} value={i} key={"time"+value}/>
                                        ))}
                                </Picker> */}
                                <Text style={{margin: 20, color: '#fff', fontSize: 18}}>
                                    TimeIn：{this.state.itemList[this.state.selectedItem]}
                                </Text>
                            </View>

                            <TouchableHighlight
                                style={{position: 'absolute', bottom: 20, left: 20}}
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text style={{color: '#fff', fontSize: 20}}>Cancel</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={{position: 'absolute', bottom: 20, right: 20}}
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text style={{color: '#fff', fontSize: 20}}>Done</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity
                    style={{width: '100%', height: '100%'}}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text style={{color: '#000', fontSize: 20, textAlign: 'center', marginTop: 'auto', marginBottom: 'auto'}}>{this.state.itemList[this.state.selectedItem]}</Text>
                </TouchableOpacity>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000b3' },
    welcome: { fontSize: 20, textAlign: 'center', margin: 10, color: '#fff' },
    instructions: { textAlign: 'center', color: '#fff', marginBottom: 5 },
})

export default AFWheelPickerModal;