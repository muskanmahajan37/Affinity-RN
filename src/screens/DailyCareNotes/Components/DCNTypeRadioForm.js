import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

var types = [
    {label: 'Hourly', value: 0},
    {label: 'Live-in', value: 1},
    {label: 'Overnight', value: 2},
];

class DCNTypeRadioForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 0,
        }
    }

    onPress = (index) => {
        this.setState({selectedOption: index});
        switch(index) {
            case 0: 
                global.HourlyFlag = true; // DB - HourlyFlag
                global.LiveInFlag = false; // DB - LiveInFlag
                global.OvernightFlag = false; // DB - OvernightFlag
                break;
            case 1: 
                global.HourlyFlag = false; 
                global.LiveInFlag = true; 
                global.OvernightFlag = false; 
                break;
            case 2: 
                global.HourlyFlag = false; 
                global.LiveInFlag = false; 
                global.OvernightFlag = true; 
                break;
            default: 
                global.HourlyFlag = false; 
                global.LiveInFlag = false; 
                global.OvernightFlag = false; 
                break;
        }
    }

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.radioContainer}>
                    <View>
                        <TouchableOpacity onPress={ () => this.onPress(0) }>
                            {types[0].value == this.state.selectedOption ? <Image style={styles.radio} source={require('../../../assets/img/radio-1.png')} /> : <Image style={styles.radio} source={require('../../../assets/img/radio-0.png')} /> }
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={[styles.label, {fontWeight: types[0].value == this.state.selectedOption ? '600' : '400'}]}>{types[0].label}</Text>
                    </View>
                </View>
                <View style={styles.radioContainer}>
                    <View>
                        <TouchableOpacity onPress={ () => this.onPress(1) }>
                            {types[1].value == this.state.selectedOption ? <Image style={styles.radio} source={require('../../../assets/img/radio-1.png')} /> : <Image style={styles.radio} source={require('../../../assets/img/radio-0.png')} /> }
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={[styles.label, {fontWeight: types[1].value == this.state.selectedOption ? '600' : '400'}]}>{types[1].label}</Text>
                    </View>
                </View>
                <View style={styles.radioContainer}>
                    <View>
                        <TouchableOpacity onPress={ () => this.onPress(2) }>
                            {types[2].value == this.state.selectedOption ? <Image style={styles.radio} source={require('../../../assets/img/radio-1.png')} /> : <Image style={styles.radio} source={require('../../../assets/img/radio-0.png')} /> }
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={[styles.label, {fontWeight: types[2].value == this.state.selectedOption ? '600' : '400'}]}>{types[2].label}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex: 1, flexDirection: 'row'},
    radioContainer: {flex: 1, flexDirection: 'row'},
    radio: {width: 20, height: 20},
    label: {color: '#000', fontSize: 16, marginTop: 'auto', marginBottom: 'auto', marginLeft: 3, marginRight: 10}
})

export default DCNTypeRadioForm;