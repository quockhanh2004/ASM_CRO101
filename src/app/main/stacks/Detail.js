import { StyleSheet, Text, View, Image, StatusBar, ImageBackground, TouchableOpacity, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AxiosInstance from '../../helpers/AxiosInstance'
import { AppContext } from '../AppContext'
const Detail = (props) => {
  const { navigation } = props;
  //lấy thông tin cart từ contect
  const { cart, setCart, favoriteProducts, setFavoriteProducts } = useContext(AppContext);

  // lấy id sản phẩm từ tham số truyền vào từ Home
  const _id = props?.route?.params?._id;

  const check = -1;
  // lấy thông tin chi tiết của Api
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await AxiosInstance()
          .get(`/products/${_id}`);
        setProduct(response.product);
      } catch (error) {
        console.log(error);
      }
    }
    getProduct();
  }, [_id]);
  // thêm sản phẩm vào giỏ hàng
  const addToCard = () => {
    const oneCartItem = {
      "product_id": product._id,
      "product_name": product.name,
      "product_image": product.image,
      "product_quantity": 1,
      "product_price": product.price,
    }
    // kiểm tra sản phẩm đã có trong giỏ hàng chưa
    const index = cart.findIndex(item => item.product_id.toString() === product._id.toString());
    if (index == -1) {
      // nếu chưa có thì thêm vào
      // spread operator
      setCart([...cart, oneCartItem]);
    } else {
      //nếu có rồi thì tăng lên 1
      const newCart = [...cart];
      newCart[index].product_quantity++;
      setCart(newCart);
    }

  }
  const checkFavorite = () => {
    // kiểm tra sản phẩm đã có trong danh sách yêu thích chưa
    const index = favoriteProducts.findIndex(item => item._id.toString() == product._id.toString());
    return index;
  }
  const addToFavorite = () => {
    // kiểm tra sản phẩm đẫ có trong danh sách yêu thích chưa
    const index = checkFavorite();
    if (index == check) {
      // nếu chưa có thì thêm vào
      // spread operator
      setFavoriteProducts([...favoriteProducts, product]);
    } else {
      //nếu có rồi thì xoá ra khỏi danh sách yêu thích
      const newFavorite = [...favoriteProducts];
      newFavorite.splice(index, 1);
      setFavoriteProducts(newFavorite);
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      {product?.image && <ImageBackground
        source={{ uri: product.image }}
        style={styles.imageBackground}
        resizeMode='cover'
      >
        <TouchableOpacity style={styles.favorite}
          onPress={addToFavorite}
        >
          <Image
            source={ 
              checkFavorite() != check?
              require('../../../../assets/images/timdo.png') :
              require('../../../../assets/images/tim.png')} />
        </TouchableOpacity>

        {/* back + favorite */}
        <View style={styles.overlay}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Image source={require('../../../../assets/images/ic_back.png')} />
          </TouchableOpacity>
          <View
          >
            <Image source={require('../../../../assets/images/backgroundtim.png')} />
          </View>
        </View>

        {/* text */}
        <View style={styles.header}>
          {/* bean + location */}
          <TouchableOpacity style={styles.beansContainer}>
            <Image source={require('../../../../assets/images/beans.png')} />
            <Text style={styles.textbean}>Bean</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.location}>
            <Image source={require('../../../../assets/images/location.png')} />
            <Text style={styles.textlocation} numberOfLines={1} >Africa</Text>

          </TouchableOpacity>
          <Text style={styles.textHeader} numberOfLines={1}>{product.name}</Text>
          <Text style={styles.textCover}>App Cover</Text>
          <View style={styles.rating}>
            <Image style={{ width: 22, height: 22, }} source={require('../../../../assets/images/ic_start.png')} />
            <Text style={styles.textRating}>{product.rating}</Text>
            <Text style={styles.textVoting}>({product.voting})</Text>
            <TouchableOpacity
              style={styles.mediumContainer}
            >
              <Text style={{ color: '#aeaeae' }}>More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>}
      {/* chi tiet */}
      <View style={styles.content}>
        <Text style={styles.textContent}>Description</Text>
        <Text style={styles.textDes} numberOfLines={4}>{product.description}</Text>
      </View>
      <View style={styles.size}>
        <Text style={styles.textContent}>Size</Text>
        <View style={styles.gramContainer}>
          <TouchableOpacity style={styles.gram}>
            <Text style={styles.textGram}>250gm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gram}>
            <Text style={styles.textGram}>500gm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gram}>
            <Text style={styles.textGram}>1000gm</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* footer */}
      <View style={styles.footer}>
        <View style={styles.price}>
          <Text style={styles.textPri}>Price</Text>
          <Text style={{ color: '#D17842', fontSize: 20, fontWeight: '600' }}>$
            <Text style={styles.textPrice}> {product.price}</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addToCardContainer}
          onPress={addToCard}>
          <Text style={styles.textAdd}>Add To Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Detail

const styles = StyleSheet.create({
  textlocation: {
    color: '#aeaeae',
    fontSize: 10,
    fontWeight: '500',
    marginTop: 8
  },
  location: {
    width: 60,
    height: 60,
    backgroundColor: '#141921',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: 14,
    right: 16,
    position: 'absolute',
  },
  textbean: {
    color: '#aeaeae',
    fontSize: 10,
    fontWeight: '500',
  },
  beansContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#141921',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 14,
    right: 105,
  },
  favorite: {
    marginTop: 40,
    marginStart: 346,
    position: 'absolute',
    zIndex: 1
  },
  overlay: {
    flexDirection: 'row',
    width: '90%',
    height: 35,
    marginTop: 31,
    justifyContent: 'space-between',
    marginStart: 20,
  },
  textAdd: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  addToCardContainer: {
    backgroundColor: '#D17842',
    height: 60,
    width: 240,
    marginStart: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  textPri: {
    fontSize: 12,
    fontWeight: '500',
    color: '#aeaeae'
  },
  price: {
    width: 70,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 5,
  },
  footer: {
    width: '100%',
    height: 70,
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textGram: {
    color: '#D17842',
    fontSize: 12,
    fontWeight: '600',
  },
  gram: {
    height: 40,
    width: 100,
    backgroundColor: '#141921',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#D17842',
  },
  gramContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    marginTop: 10,
  },
  size: {
    height: 70,
    width: '100%',
  },
  textDes: {
    marginRight: 20,
    color: '#aeaeae',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 15,
  },
  textContent: {
    color: '#aeaeae',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 20,
    left: 0
  },
  content: {
    width: '100%',
    height: 100,
    marginTop: 20,
  },
  mediumContainer: {
    height: 45,
    width: 150,
    backgroundColor: '#141921',
    borderRadius: 10,
    left: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: -3
  },
  textVoting: {
    left: 5,
    fontSize: 10,
    color: '#aeaeae',
    fontWeight: '400'
  },
  textRating: {
    marginLeft: 5,
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
  rating: {
    flexDirection: 'row',
    left: 20,
    top: 20,
    alignItems: 'center'
  },
  textCover: {
    left: 20,
    fontStyle: 'italic',
    color: '#aeaeae'
  },
  textHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginTop: 25,
    left: 20,
    width: 139,
  },
  header: {
    height: 148,
    width: '100%',
    backgroundColor: '#00000080',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
    bottom: 0,
  },
  imageBackground: {
    width: '100%',
    height: 521,
    position: 'relative',
    resizeMode: 'cover',
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0C0F14',
    alignItems: 'center',
    flexDirection: 'raw',
  }
})