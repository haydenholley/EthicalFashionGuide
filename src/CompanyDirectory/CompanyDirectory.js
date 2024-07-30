import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { data } from '../../data/Processed_Data';
import ListItem from './DirectoryListItem';
import CompanyInfo from './../CompanyInfo/CompanyInfo';

const CompanyDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const searchBarRef = useRef(null);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    filterData(query);
  };

  const filterData = (query) => {
    if (query) {
      const newData = data.filter((item) => {
        const itemData = item.company ? item.company.toUpperCase() : ''.toUpperCase();
        const textData = query.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  const handleItemPress = (company) => {
    setSelectedCompany(company);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setSelectedCompany(null);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <Searchbar
            ref={searchBarRef}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            onPressIn={() => searchBarRef.current.focus()}
            style={styles.searchBar}
          />
        </View>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <ListItem
                company={item.company}
                value={item.data_overall_grade}
                onPress={() => handleItemPress(item.company)}
              />
            </View>
          )}
          contentContainerStyle={styles.list}
        />
        <CompanyInfo
          visible={dialogVisible}
          onClose={closeDialog}
          company={selectedCompany}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(248, 248, 248)',
  },
  searchBarContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 10,
  },
  searchBar: {
    backgroundColor: 'white',
  },
  item: {
    padding: 2,
  },
  list: {
    width: '100%',
    paddingBottom: 20,
  },
  text: {
    fontSize: 20,
    color: '#333f4c',
  },
});

export default CompanyDirectory;
