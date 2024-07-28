import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {
  CUISINE_FILTERS,
  DIET_FILTERS,
  DISH_FILTERS,
  HEALTH_FILTERS,
} from '../Data';

const APP_ID = 'c7ad7562';
const APP_KEY = '21ed7defb97c9b23539d2800a8d4edc8';

const Search = () => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [selectedDish, setSelectedDish] = useState('');
  const [selectedCusines, setSelectedCusines] = useState('');
  const [selectedHealth, setSelectedHealth] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');

  const searchRecipe = () => {
    setLoading(true); // Show loader
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    let url = '';
    if (
      selectedDish == '' &&
      selectedCusines == '' &&
      selectedHealth == '' &&
      selectedDiet == ''
    ) {
      url = `https://api.edamam.com/api/recipes/v2?app_id=${APP_ID}&app_key=${APP_KEY}&q=${search}&type=public`;
    } else if (selectedCusines !== '') {
      url = `https://api.edamam.com/api/recipes/v2?app_id=${APP_ID}&app_key=${APP_KEY}&q=${search}&type=public&cuisineType=${selectedCusines}`;
    } else if (selectedDiet !== '') {
      url = `https://api.edamam.com/api/recipes/v2?app_id=${APP_ID}&app_key=${APP_KEY}&q=${search}&type=public&diet=${selectedDiet}`;
    } else if (selectedHealth !== '') {
      url = `https://api.edamam.com/api/recipes/v2?app_id=${APP_ID}&app_key=${APP_KEY}&q=${search}&type=public&health=${selectedHealth}`;
    } else if (
      selectedCusines !== '' &&
      selectedDiet !== '' &&
      selectedHealth !== ''
    ) {
      url = `https://api.edamam.com/api/recipes/v2?app_id=${APP_ID}&app_key=${APP_KEY}&q=${search}&type=public&health=${selectedHealth}&diet=${selectedDiet}&cuisineType=${selectedCusines}`;
    }

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.hits);
        setRecipes(result.hits);
        setLoading(false); // Hide loader
      })
      .catch(error => {
        console.error(error);
        setLoading(false); // Hide loader
      });
  };

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
      <View style={styles.searchBox}>
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
      </View>
      {search !== '' && (
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => {
            setRecipes([]);
            searchRecipe();
            Keyboard.dismiss();
          }}>
          <Text style={styles.searchTitle}>Search</Text>
        </TouchableOpacity>
      )}
      {loading ? ( // Display loader if loading state is true
        <ActivityIndicator style={{marginTop: 20}} />
      ) : (
        <FlatList
          data={recipes}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.recipeItem}
                onPress={() => navigation.navigate('Details', {data: item})}>
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
      )}

      {recipes && recipes.length > 0 ? (
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => {
            setShowModal(true);
          }}>
          <Image
            source={require('../images/filter.png')}
            style={styles.close}
          />
        </TouchableOpacity>
      ) : null}
      <Modal
        onBackdropPress={() => {
          setShowModal(false);
        }}
        onBackButtonPress={() => {
          setShowModal(false);
        }}
        isVisible={showModal}
        backgroundColor="rgba(0,0,0,.5)"
        style={{margin: 0}}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}>
              <Image
                source={require('../images/close.png')}
                style={styles.close}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.heading}>Dish Type</Text>
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginTop: 10}}
              data={DISH_FILTERS}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.filterItem,
                      {
                        backgroundColor:
                          selectedDish === item ? '#05b681' : 'transparent',
                      },
                    ]}
                    onPress={() => {
                      setSelectedDish(item);
                    }}>
                    <Text
                      style={{color: selectedDish === item ? '#fff' : 'black'}}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <Text style={styles.heading}>Cusines</Text>
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginTop: 10}}
              data={CUISINE_FILTERS}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.filterItem,
                      {
                        backgroundColor:
                          selectedCusines === item ? '#05b681' : 'transparent',
                      },
                    ]}
                    onPress={() => {
                      setSelectedCusines(item);
                    }}>
                    <Text
                      style={{
                        color: selectedCusines === item ? '#fff' : 'black',
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <Text style={styles.heading}>Health</Text>
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginTop: 10}}
              data={HEALTH_FILTERS}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.filterItem,
                      {
                        backgroundColor:
                          selectedHealth === item ? '#05b681' : 'transparent',
                      },
                    ]}
                    onPress={() => {
                      setSelectedHealth(item);
                    }}>
                    <Text
                      style={{
                        color: selectedHealth === item ? '#fff' : 'black',
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          {/* =- */}
          <Text style={styles.heading}>Diet</Text>
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginTop: 10}}
              data={DIET_FILTERS}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.filterItem,
                      {
                        backgroundColor:
                          selectedDiet === item ? '#05b681' : 'transparent',
                      },
                    ]}
                    onPress={() => {
                      setSelectedDiet(item);
                    }}>
                    <Text
                      style={{color: selectedDiet === item ? '#fff' : 'black'}}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.submitFilter}
            onPress={() => {
              setShowModal(false);
              searchRecipe();
            }}>
            <Text style={styles.btnText}>{'Apply Filters'}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Search;
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
  searchBox: {
    width: '90%',
    height: 45,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 32,
    borderRadius: 8,
    borderColor: '#9e9e9e',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  searchIcon: {
    width: 28,
    height: 28,
    tintColor: '#9e9e9e',
  },
  input: {
    width: '78%',
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  close: {
    width: 20,
    height: 20,
  },
  searchBtn: {
    width: '40%',
    height: 40,
    backgroundColor: '#05b681',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchTitle: {
    fontSize: 16,
    color: 'white',
  },
  recipeItem: {
    width: '90%',
    height: 110,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 12,
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
  filterBtn: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,.3)',
    shadowOpacity: 5,
    position: 'absolute',
    bottom: 32,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    // borderColor:"#9e9e9e"
    borderColor: '#05b681',
  },
  modalView: {
    width: '100%',
    // height: '50%',
    paddingBottom: 32,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    height: 60,
  },
  modalTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
  heading: {
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 20,
    marginTop: 15,
  },
  filterItem: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 15,
    borderWidth: 0.5,
  },
  submitFilter: {
    width: '90%',
    height: 50,
    backgroundColor: '#05b681',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
