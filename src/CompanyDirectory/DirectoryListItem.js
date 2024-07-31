import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window'). width;
const itemWidth = screenWidth * 0.85;

const getgradeColor = (grade) => {
  if (grade == 1) return '#F99607';
  if (grade == 2) return '#DC7345';
  if (grade == 3) return '#BE5082';
  if (grade == 4) return '#604AA7';
  if (grade == 5) return '#0144CB';
  return '#F99607';
};

const ListItem = ({ brandName, grade, gradeColor, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.itemContainer, { width: itemWidth }]}>
    <Text style={styles.brandNameText}>{brandName}</Text>
    <View style={[styles.gradeCircle, { backgroundColor: getgradeColor(gradeColor) }]}>
      <Text style={styles.gradeText}>{grade}</Text>
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
    color: '#333f4c',
  },
  gradeCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ListItem;
