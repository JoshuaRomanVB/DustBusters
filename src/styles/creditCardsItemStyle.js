import {StyleSheet} from 'react-native';
import {colors} from './colors';
export const creditCardsItemStyle = StyleSheet.create({
  cardItem: {
    marginVertical:5
  },
  container: {
    flex: 1,
    height: 210,
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // ajusta la imagen al tamaño del componente
    position: 'absolute',
    width: '100%',
    height: '100%',
   
  },
  image:{
    resizeMode: 'cover', 
    width: 70,
    height: 26,
    margin:10
  },

  info: {
    marginHorizontal: 20,
    flexDirection: 'column',
  },
  infobetween: {
    marginHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    
  
  },
  inputText: {
    marginHorizontal: 20,
  },
  type: {
    fontSize: 18,
    fontWeight: 'bold',
    marginEnd:10,
    color: colors.white,
  },
  cardtext: {
    fontSize: 18,
    marginRight: 10,
    color: colors.white,
  },
  banktext:{
    fontSize: 18,
    marginBottom:80,
    marginRight: 10,
    color: colors.white,
  }

});
