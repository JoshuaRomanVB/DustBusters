import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa la librería de iconos que estás usando

export default function StarRating({ rating }) {
  const filledStars = Math.floor(rating); // Cantidad de estrellas llenas
  const hasHalfStar = rating - filledStars >= 0.5; // Determina si hay una estrella a medias

  const stars = [];

  // Agrega estrellas llenas
  for (let i = 0; i < filledStars; i++) {
    stars.push(<Icon key={`star-${i}`} name="star" size={30} color="gold" />);
  }

  // Agrega estrella a medias si es necesario
  if (hasHalfStar) {
    stars.push(<Icon key={`half-star`} name="star-half" size={30} color="gold" />);
  }

  // Agrega estrellas vacías restantes
  for (let i = stars.length; i < 5; i++) {
    stars.push(<Icon key={`empty-star-${i}`} name="star-o" size={30} color="gold" />);
  }

  return <View style={{ flexDirection: 'row' }}>{stars}</View>;
}
