import { StyleSheet, Text, View, Image, StatusBar, ImageBackground, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../AppContext'

const Cart = (props) => {
  const { navigation } = props;
  const { cart, setCart } = useContext(AppContext);
  // render
  const renderItem = ({ item }) => {
    //xử lí tăng giảm quantity
    const onChangeQuantity = (type) => {
      //type: 1 tăng, -1 giảm
      const quantity = item.product_quantity + type;
      // tìm index của item trong giỏ hàng
      const index = cart.findIndex(cartItem => cartItem.product_id.toString() == item.product_id.toString())
      // nếu số lượng  = 0 thì cút
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
      cart[index].product_quantity = quantity;
      // set lại giỏ hàng
      setCart([...cart]);
      }   
    }
    return (
      <View style={styles.cartItem}>
        <Image
          style={styles.image}
          source={{ uri: item.product_image }}
        />
        <View style={styles.infor}>
          <Text numberOfLines={1} style={styles.textname}>{item.product_name}</Text>
          <Text style={styles.textcover}>Cover by Chính</Text>
          {/* hàng cùng box + price */}
          <View style={styles.priceContainer}>
            {/* box */}
            <View style={styles.box}>
              <Text style={styles.textbox}>M</Text>
            </View>
            {/* price */}
            <View style={styles.price}>
              <Text style={{ fontSize: 20, fontWeight: '600', color: '#d17842', }}>$
                <Text style={styles.textprice}> {item.product_price}</Text>
              </Text>
            </View>
          </View>
          {/* quantity */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => onChangeQuantity(-1)}
            >
              <Image source={require('../../../../assets/images/ic_tru.png')} />
            </TouchableOpacity>


            <View style={styles.textquantityContainer}>
              <Text numberOfLines={1}
                style={styles.textquantity}
              >{item.product_quantity}</Text>
            </View>


            <TouchableOpacity
              onPress={() => onChangeQuantity(1)}
            >
              <Image source={require('../../../../assets/images/ic_sum.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

    )
  }
  //tính tổng tiền
  const total = cart.reduce((total, item) => {
    return total + item.product_price * item.product_quantity
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
          <Image source={require('../../../../assets/images/ic_person.png')} />
        </TouchableOpacity>
      </View>
      {/* card */}

      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={item => item.product_id}
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
    width: 70,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 5,
  },
  textPay: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  payContainer: {
    backgroundColor: '#D17842',
    height: 60,
    width: 240,
    marginStart: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  footer: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    bottom: 60
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
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
  },
  textname: {
    color: 'white',
    fontSize: 15,
    fontWeight: '400',
    width: 140,
  },
  infor: {
    marginTop: -4,
    marginStart: 15,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 15,
    marginStart: 20,
  },
  cartItem: {
    height: 154,
    width: 330,
    marginTop: 16,
    backgroundColor: '#252A32',
    borderRadius: 23,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_nav: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600'
  },
  bar_navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0C0F14',
    paddingStart: 30,
    paddingTop: 21,
    paddingEnd: 30
  }
})