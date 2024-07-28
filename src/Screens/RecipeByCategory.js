import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {FlatList} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
// import {Image} from 'react-native-animatable';

const APP_ID = 'c7ad7562';
const APP_KEY = '21ed7defb97c9b23539d2800a8d4edc8';

const RecipeByCategory = () => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  const searchRecipe = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `https://api.edamam.com/api/recipes/v2?app_id=${APP_ID}&app_key=${APP_KEY}&q=food&type=public&mealType=${route.params.data}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result.hits);
        setRecipes(result.hits);
      })
      .catch(error => console.error(error));
  };
  useEffect(() => {
    searchRecipe();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={require('../images/left.png')} style={styles.backIcon} />
      </TouchableOpacity>
      {/* <View style={styles.searchBox}>
        <Image
          source={require('../images/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          value={search}
          onChangeText={setSearch}
          style={styles.input}
          placeholder="Search here ..."
        />
        {search !== '' && (
          <TouchableOpacity
            onPress={() => {
              setSearch('');
              setRecipes([]);
            }}>
            <Image
              style={styles.close}
              source={require('../images/close.png')}
            />
          </TouchableOpacity>
        )}
      </View> */}
      {/* {search !== '' && (
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => {
            setRecipes([]);
            searchRecipe();
          }}>
          <Text style={styles.searchTitle}>Search</Text>
        </TouchableOpacity>
      )} */}
      <FlatList
        data={recipes}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.recipeItem}
              // onPress={navigation.navigate('Details', {data: item})}
              onPress={() => navigation.navigate('Details', {data: item})} // Corrected line
            >
              <Image
                source={{uri: item.recipe.image}}
                style={styles.itemImage}
              />
              <View>
                <Text style={styles.title}>
                  {item.recipe.label.length > 40
                    ? item.recipe.label.substring(0, 40) + '...'
                    : item.recipe.label}
                </Text>
                <Text style={styles.source}>{item.recipe.source}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default RecipeByCategory;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 25,
    marginTop: 20,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  recipeItem: {
    width: '90%',
    height: 100,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 90,
    height: 90,
    marginLeft: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    width: '60%',
    fontWeight: '500',
    marginLeft: 10,
  },
  source: {
    fontSize: 16,
    width: '60%',
    fontWeight: '500',
    marginLeft: 10,
    marginTop: 10,
    color: 'green',
  },
});
