import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';

function TimePicker({ onSelectTime }) {
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
      const formattedTime = `${selectedTime.getHours()}:${selectedTime.getMinutes()}:${selectedTime.getSeconds()}`;
      onSelectTime(formattedTime); // Llama a la función pasando la hora formateada
    }
  };

  const formattedTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;

  return (
    <View>
      <TouchableOpacity style={[styles.inputText]} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.text}>{formattedTime}</Text>
      </TouchableOpacity>
   
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputText: {
    height: 50,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 5,
    paddingStart: 20,
    borderColor: '#000',
    borderWidth: 2,
    width: '100%',
  },
  text: {
    lineHeight: 50, // Igual al alto del TouchableOpacity
  },
});

export default TimePicker;
