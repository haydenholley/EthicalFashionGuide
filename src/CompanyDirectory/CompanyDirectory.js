import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Searchbar } from 'react-native-paper';
import * as SQLite from 'expo-sqlite/legacy';
import ListItem from './DirectoryListItem';
import CompanyInfo from './../CompanyInfo/CompanyInfo';

const CompanyDirectory = ({ db }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [brandData, setSelectedBrand] = useState(null);
  const searchBarRef = useRef(null);

  useEffect(() => {
    if (db) {
      console.log('db object:', db);
      fetchAllBrands();
    } else {
      console.log('db is not defined');
    }
  }, [db]);

  const fetchAllBrands = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM CompanyData', [], (tx, results) => {
        const rows = results.rows;
        let brands = [];

        for (let i = 0; i < rows.length; i++) {
          brands.push(rows.item(i));
        }
        console.log(brands);

        setFilteredBrands(brands);
      })
    })
  }

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    filterData(query);
  };

  const filterData = (query) => {
    const sqlQuery = query
      ? 'SELECT * FROM CompanyData WHERE name LIKE ?'
      : 'SELECT * FROM CompanyData';

      const params = query ? ['%${query}%'] : [];

      db.transaction(tx => {
        tx.executeSql(sqlQuery, params, (tx, results) => {
          const rows = results.rows;
          let brands = [];

          for (let i = 0; i < rows.length; i++) {
            brands.push(rows.item(i));
          }

          setFilteredBrands(brands);
        });
      });
  };

  const handleItemPress = (data) => {
    setSelectedBrand(data);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setSelectedBrand(null);
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
          data={filteredBrands}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <ListItem
                brandName={item.name}
                grade={item.overall_grade}
                gradeColor={item.color_grade}
                onPress={() => handleItemPress(item)}
              />
            </View>
          )}
          contentContainerStyle={styles.list}
        />
        <CompanyInfo
          visible={dialogVisible}
          onClose={closeDialog}
          data={brandData}
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
