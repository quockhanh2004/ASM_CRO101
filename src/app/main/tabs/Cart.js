import { StyleSheet, Text, View, Image, StatusBar, ImageBackground, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../AppContext'
import AxiosInstance from '../../helper/AxiosInstance'
const Cart = (props) => {
  const { navigation } = props;
  const { cart, setCart } = useContext(AppContext);
  // console.log(cart);

  const [products, setProducts] = useState([]);
  // console.log(products);
  useEffect(() => {
    const fetchData = async () => {
      // console.log(cart);
      try {
        // Tạo một mảng các promise từ các yêu cầu API
        const promises = cart.map(async (item) => {
          const response = await AxiosInstance().get(`/products/${item._id}`);
          // console.log(response.product);
          return { item: response.product, number: item.number};
        });

        // Chờ tất cả các promise hoàn thành
        const productsData = await Promise.all(promises);

        // Cập nhật state với dữ liệu từ API
        setProducts(productsData);
        // console.log(productsData);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [cart]);

  // render
  const renderItem = ({ item }) => {
    //xử lí tăng giảm quantity
    const onChangeQuantity = (type) => {
      //type: 1 tăng, -1 giảm
      const quantity = item.number + type;
      // tìm index của item trong giỏ hàng
      const index = cart.findIndex(cartItem => cartItem._id === item.item._id);
      // console.log(index);
      
      if (quantity <= 0) {
        Alert.alert(
          "Thông báo !",
          "Bạn có muốn xoá sản phẩm này khỏi giỏ hàng không ?",
          [
            {
              text: 'Huỷ',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
            {
              text: 'Đồng ý',
              onPress: () => {
                //xoá khỏi giỏ hàng
                cart.splice(index, 1);
                //cập nhật lại giỏi hàng
                setCart([...cart]);
              }
            }
          ] ,
          { cancelable: false }     
        );
      }else{
          //cập nhật giỏ hàng mới
          // console.log(cart[0]);
      cart[index].number = quantity;
      // set lại giỏ hàng
      setCart([...cart]);
      }   
    }
    return (
      <View style={styles.cartItem}>
        <Image
          style={styles.image}
          source={{ uri: item.item.image }}
        />
        <View style={styles.infor}>
          <Text numberOfLines={1} style={styles.textname}>{item.item.name}</Text>
          <Text style={styles.textcover} numberOfLines={1}>{item.item.description}</Text>
          {/* hàng cùng box + price */}
          <View style={styles.priceContainer}>
            {/* box */}
            <View style={styles.box}>
              <Text style={styles.textbox}>M</Text>
            </View>
            {/* price */}
            <View style={styles.price}>
              <Text style={{ fontSize: 20, fontWeight: '600', color: '#d17842', }}>$
                <Text style={styles.textprice}> {item.item.price}</Text>
              </Text>
            </View>
          </View>
          {/* quantity */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => onChangeQuantity(-1)}
            >
              <Image source={require('../../../../assets/images/ic_remove.png')} />
            </TouchableOpacity>


            <View style={styles.textquantityContainer}>
              <Text numberOfLines={1}
                style={styles.textquantity}
              >{item.number}</Text>
            </View>


            <TouchableOpacity
              onPress={() => onChangeQuantity(1)}
            >
              <Image source={require('../../../../assets/images/ic_add.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

    )
  }
  //tính tổng tiền
  const total = products.reduce((total, item) => {
    // console.log(total + item.item.price * item.number);
    return total + item.item.price * item.number
  }, 0);


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0C0F14" barStyle="light-content" />
      {/* navbar */}
      <View style={styles.bar_navigation}>
        <TouchableOpacity>
          <Image source={require('../../../../assets/images/ic_menu.png')} />
        </TouchableOpacity>
        <Text style={styles.text_nav}>Cart</Text>
        <TouchableOpacity>
          <Image source={require('../../../../assets/images/ic_user.png')} />
        </TouchableOpacity>
      </View>
      {/* card */}

      <FlatList
      style={styles.FlatList}
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
      {/* footer */}
      <View style={styles.footer}>
        <View style={styles.price2}>
          <Text style={styles.textPri}>Total Price</Text>
          <Text style={{ color: '#D17842', fontSize: 20, fontWeight: '600' }}>$
            <Text style={styles.textPrice}> {total}</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.payContainer}
          onPress={() => navigation.navigate('Payment')}
        >
          <Text style={styles.textPay}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  FlatList: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: 30,
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
  price2: {
    width: '30%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 0,
    // backgroundColor: 'red',
  },
  textPay: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  payContainer: {
    backgroundColor: '#D17842',
    height: 60,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  footer: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    bottom: 0,
    end: 0,
    start: 0,
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    // position: 'absolute',
    // backgroundColor: 'green',
  },
  textquantity: {
    color: 'white'
  },
  textquantityContainer: {
    height: 30,
    width: 50,
    backgroundColor: '#0c0f14',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#d17842',
    borderWidth: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  textprice: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  price: {
    height: 25,
    width: 61,
    marginStart: 27,
    alignItems: 'flex-end',
    marginStart: 25
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  textbox: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 35,
    backgroundColor: '#0c0f14',
    borderRadius: 10,
  },
  textcover: {
    color: '#aeaeae',
    fontSize: 10,
    fontWeight: '400',
    fontStyle: 'italic',
    marginBottom: 5,
    width: '100%',
  },
  textname: {
    color: 'white',
    fontSize: 15,
    fontWeight: '400',
    width: '100%',
  },
  infor: {
    width: '62%',
    marginTop: 0,
    marginStart: 15,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 15,
    marginStart: 0,
  },
  cartItem: {
    height: 'auto',
    width: '100%',
    
    marginTop: 16,
    backgroundColor: '#252A32',
    borderRadius: 23,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 12,
    
  },
  text_nav: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600'
  },
  bar_navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0C0F14',
    // paddingStart: 30,
    paddingTop: 21,
    // paddingEnd: 30
  }
})