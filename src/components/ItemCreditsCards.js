import React from 'react';
import {Image, View, Text} from 'react-native';
import {creditCardsItemStyle} from '../styles/creditCardsItemStyle';
import {TouchableOpacity} from 'react-native';

const ItemCreditsCards = ({item, onPress}) => {
  const brand = () => {
    if(item.brand == "visa"){
      return require('../assets/images/visa.png');
    
    } else {
      return require('../assets/images/mastercard.png');
    }
  }
  return (
    <TouchableOpacity key={item.id} onPress={onPress}>
      <View style={creditCardsItemStyle.cardItem}>
        <Image
          source={require('../assets/images/cardbackgroud.png')}
          style={creditCardsItemStyle.backgroundImage}
        />
        <View style={creditCardsItemStyle.container}>
          <View style={creditCardsItemStyle.info}>
            <Text style={creditCardsItemStyle.banktext}>{item.bank_name}</Text>

            <Text style={creditCardsItemStyle.cardtext}>
              {item.card_number}
            </Text>

            <Text style={creditCardsItemStyle.cardtext}>
              {item.expiration_month} / {item.expiration_year}
            </Text>
            <Text style={creditCardsItemStyle.cardtext}>
              {item.holder_name}
            </Text>
          </View>

          <View style={creditCardsItemStyle.infobetween}>
            <Text style={creditCardsItemStyle.type}>{item.type}</Text>

            <Image source={brand()} style={creditCardsItemStyle.image} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCreditsCards;
