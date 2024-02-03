import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { AppContext } from '../AppContext';
import AxiosInstance from '../../helper/AxiosInstance';
const Detail = (props) => {
  const { navigation } = props;
  const { route } = props;
  const { productId } = route.params;

  const [product, setProduct] = useState({});

  const getProduct = useCallback(async () => {
    try {
      const response = await AxiosInstance().get('/products/' + productId);
      setProduct(response.product);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, [productId]);

  useEffect(() => {
    console.log(productId);
    getProduct();
  }, []);

  const { cart, setCart } = useContext(AppContext);
  const { favorite, setFavorite } = useContext(AppContext);
  const existingFavoriteItemIndex = favorite.findIndex(id => id === product._id);
  console.log(existingFavoriteItemIndex);
  const addToCart = (newItem) => {
    // Kiểm tra xem có sản phẩm có cùng _id trong giỏ hàng chưa
    const existingItem = cart.find(item => item._id === newItem._id);

    if (existingItem) {
      // Nếu đã có, tăng giá trị của biến number lên 1
      const updatedCart = cart.map(item => {
        if (item._id === newItem._id) {
          return { ...item, number: item.number + 1 };
        }
        return item;
      });

      setCart(updatedCart);
    } else {
      // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng với number là 1
      setCart(prevCart => [...prevCart, { _id: newItem._id, number: 1 }]);
    }

    Alert.alert('Thêm vào giỏ hàng thành công');
  };
  const addToFavorite = (newItem) => {

    if (existingFavoriteItemIndex !== -1) {
      // Nếu đã có, xóa sản phẩm khỏi danh sách yêu thích
      const updatedFavorite = [...favorite];
      updatedFavorite.splice(existingFavoriteItemIndex, 1);
      setFavorite(updatedFavorite);
      console.log(favorite);
      Alert.alert('Xóa khỏi danh sách yêu thích thành công');
    } else {
      // Nếu chưa có, thêm _id mới vào danh sách yêu thích
      setFavorite(prevFavorite => [...prevFavorite, newItem._id]);
      Alert.alert('Thêm vào danh sách yêu thích thành công');
    }
  };



  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />
      {product?.image && <Image source={{ uri: product?.image }} style={styles.image} />}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btnMenu}
          onPress={() => navigation.goBack()}
        >
          <Image style={styles.imgHeader} source={require('../../../../assets/images/ic_back.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnMenu}
          onPress={() => addToFavorite(product)}>

          {existingFavoriteItemIndex == -1 &&
            <Image style={styles.imgHeader} source={require('../../../../assets/images/ic_favorite_white.png')} />
            || <Image style={styles.imgHeader} source={require('../../../../assets/images/ic_favorite_red.png')} />
          }

        </TouchableOpacity>
      </View>

      <View style={styles.containerProduct}>
        <View style={styles.left}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{product?.name}</Text>
            <Text style={styles.location}>{product?.location}From Africa</Text>

            <View style={styles.ratingC}>
              <Image style={styles.imgRating} source={require('../../../../assets/images/ic_star.png')} />
              <Text style={styles.txtRating}>{product?.rating} <Text style={styles.numberRating}>({product?.voting})</Text></Text>
            </View>
          </View>
        </View>

        <View style={styles.right}>
          <View style={styles.buttonContainer}>
            <View style={styles.btn}>
              <Image style={styles.imgBtn} source={require('../../../../assets/images/ic_coffee.png')} />
              <Text style={styles.txtBtn}>Bean</Text>
            </View>

            <View style={[styles.btn, { marginStart: 20 }]}>
              <Image style={styles.imgBtn} source={require('../../../../assets/images/ic_location.png')} />
              <Text style={styles.txtBtn}>Africa</Text>
            </View>
          </View>

          <View style={styles.btnBottom}>
            <Text style={styles.txtBtnRight}>
              Medium Roasted
            </Text>
          </View>

        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.Description}>Description</Text>
        <Text style={styles.textBody}>{product?.description}</Text>
        {product?.size && <Text style={styles.textSize}>Size</Text>

        }
      </View>
      <View style={styles.payMent}>
        <View style={styles.Paymentleft}>
          <Text style={styles.textPrice}>Price</Text>
          <Text style={styles.txtPrice}><Text style={styles.dola}>$ </Text>{product?.price}</Text>
        </View>
        <View style={styles.Paymentright}>
          <TouchableOpacity style={styles.btnCart} onPress={() => addToCart(product)}>
            <Text style={styles.txtCart}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  btnCart: {
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D17842',
    borderRadius: 20,
  },
  Paymentright: {
    display: 'flex',
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  txtPrice: {
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    color: '#fff',
    textAlign: 'center',
  },
  dola: {
    color: '#D17842',
  },
  textPrice: {
    width: '100%',
    height: 'auto',
    color: '#aeaeae',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  Paymentleft: {
    width: '30%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  payMent: {
    width: '100%',
    height: 60,
    paddingHorizontal: 20,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    bottom: 0,
    position: 'absolute',
  },
  textSize: {
    color: '#AEAEAE',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    marginTop: 8,
  },
  textBody: {
    color: '#fff',
    fontSize: 12,
    marginTop: 15,
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  Description: {
    color: '#AEAEAE',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    lineHeight: 20,
  },
  body: {
    top: 437,
    height: 'auto',
    paddingHorizontal: 18.5,
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 19.8,
  },
  numberRating: {
    color: '#AEAEAE',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    lineHeight: 20,
  },
  btnBottom: {
    backgroundColor: '#141921',
    width: 131,
    height: 44.6,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  txtRating: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    marginStart: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgRating: {
    width: 22.29,
    height: 22.29,
  },
  ratingC: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25.43,
  },
  rating_buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  txtBtn: {
    color: '#aeaeae',
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 20,
    textAlign: 'center',
  },
  imgBtn: {
    width: 24,
    height: 24,
  },
  btn: {
    backgroundColor: '#141921',
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    width: '100%',
    height: 'auto',
    marginTop: 10,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  right: {
    width: '40%',
    top: 0,
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // marginTop: 0,
  },
  location: {
    color: '#AEAEAE',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
  },
  name: {
    color: '#fff',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 20,
  },
  nameContainer: {
    width: '100%',
    paddingTop: 31,
    display: 'flex',
    flexDirection: 'column',
  },
  left: {
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
  },

  containerProduct: {
    width: '100%',
    height: 148,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    position: 'absolute',
    top: 373,
    paddingStart: 22.5,
    display: 'flex',
    flexDirection: 'row',
  },
  txtHeader: {
    fontSize: 28,
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
    padding: 22,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  container: {
    // flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#0C0F14',

  },
  image: {
    height: 521,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
