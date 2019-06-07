import React from 'react';
import { ScrollView, View, Image, Text, TextInput, 
    TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';

class Test extends React.Component {
  constructor(props){
    super(props)
    this.state = {date:"11:11"}
  }

  render(){
    return (
      <DatePicker
        style={{width: 70}}
        date={this.state.date}
        mode="time"
        placeholder="select date"
        format="HH:mm"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        androidMode="spinner"
        is24Hour={true}
        showIcon={false}
        customStyles={{
          dateInput: {
            marginLeft: 0,
            width: 70
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date}); alert(date);}}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Test;