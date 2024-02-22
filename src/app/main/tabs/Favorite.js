import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState, useEffect, useMemo } from 'react'
import { AppContext } from '../AppContext'
import AxiosInstance from '../../helper/AxiosInstance'
import LinearGradient from 'react-native-linear-gradient'
import ItemFavorite from '../../item/ItemFavorite'

const Favorite = (props) => {
  const { navigation } = props;
  const { favorite } = useContext(AppContext);
  const [products, setProducts] = useState([]);

  useMemo(() => {
    const fetchData = async () => {
      try {
        // Tạo một mảng các promise từ các yêu cầu API
        const promises = favorite.map(async (item) => {
          const response = await AxiosInstance().get(`/products/${item}`);
          return response.product;
        });

        // Chờ tất cả các promise hoàn thành
        const productsData = await Promise.all(promises);

        // Cập nhật state với dữ liệu từ API
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [favorite]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btnMenu}
          onPress={() => navigation.navigate('Settings')}
        >
          <Image style={styles.imgHeader} source={require('../../../../assets/images/ic_menu.png')} />
        </TouchableOpacity>
        <Text style={styles.txtHeader}>Favorite</Text>
        <TouchableOpacity
          style={styles.btnMenu}
          onPress={() => navigation.navigate('Personal')}
        >
          <Image style={styles.imgHeader} source={require('../../../../assets/images/ic_user.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <FlatList
          style={styles.list}
          data={products}
          horizontal={false}
          renderItem={({item, index}) => (
            <ItemFavorite product={item} index = {index}/>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    marginTop: 10,
    width: '100%',
    height: 'auto',
  },
  txtHeader: {
    fontSize: 20,
    fontFamily: 'Semibold',
    color: '#fff'
  },
  textHeader: {
    marginTop: 31,
  },
  imgHeader: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  header: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  container: {
    backgroundColor: '#0C0F14',
    width: '100%',
    height: '100%',
    paddingHorizontal: 30,
    paddingVertical: 20,
  }
});

export default Favorite;
