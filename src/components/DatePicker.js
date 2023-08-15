import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';

function DatePicker({ onSelectDate }) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Agrega un cero inicial si el mes es de un solo dígito
      const day = String(selectedDate.getDate()).padStart(2, '0'); // Agrega un cero inicial si el día es de un solo dígito
      const formattedDate = `${year}-${month}-${day}`;
      onSelectDate(formattedDate); // Llama a la función pasando la fecha seleccionada
    }
  };

  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  return (
    <View>
      <TouchableOpacity style={[styles.inputText]} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.text}>{formattedDate}</Text>
      </TouchableOpacity>
   
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
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

export default DatePicker;
