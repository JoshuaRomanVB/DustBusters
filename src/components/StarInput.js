import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const StarInput = ({ onChangeRating }) => {
  const [rating, setRating] = useState(0);

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
    onChangeRating(selectedRating);
  };

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => handleStarPress(star)}
          style={styles.starContainer}
        >
          <AntDesign
            name={star <= rating ? 'star' : 'staro'}
            size={30}
            color={star <= rating ? '#F5AE03' : '#ccc'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer: {
    marginHorizontal: 5,
  },
});

export default StarInput;
