import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window'). width;
const itemWidth = screenWidth * 0.85;

const getRatingColor = (value) => {
  if (value < 20) return '#F99607';
  if (value >= 20 && value < 40) return '#DC7345';
  if (value >= 40 && value < 60) return '#BE5082';
  if (value >= 60 && value < 80) return '#604AA7';
  if (value <= 100) return '#0144CB';
  return '#F99607';
};

const ListItem = ({ brandName, value, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.itemContainer, { width: itemWidth }]}>
    <Text style={styles.brandNameText}>{brandName}</Text>
    <View style={[styles.valueCircle, { backgroundColor: getRatingColor(value) }]}>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    marginVertical: 5,
    backgroundColor: 'rgb(248, 248, 248)',
  },
  brandNameText: {
    fontSize: 18,
    //fontWeight: 'bold',
    color: '#333f4c',
  },
  valueCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ListItem;
