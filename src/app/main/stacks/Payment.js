import { StyleSheet, Text, View, StatusBar, ToastAndroid, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Payment = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      {/* navbar */}
      <View style={styles.bar_navigation}>
        <TouchableOpacity
        onPress={navigation.goBack}
        >
          <Image source={require('../../../../assets/images/ic_back.png')} />
        </TouchableOpacity>
        <Text style={styles.text_nav}>Payment</Text>
      </View>
      {/* credit */}
      <View style={styles.credit}>
        <Text style={styles.textCredit}>Credit Card</Text>
        <View style={styles.credit_container}>
          <View style={styles.credit_nav}>
            <Image style={{ marginTop: 15, marginStart: 10, }} source={require('../../../../assets/images/credit.png')} />
            <Image style={{ marginTop: 15, marginStart: 219, }} source={require('../../../../assets/images/visa.png')} />
          </View>
          {/* seri */}
          <Image style={{ marginTop: 34, marginStart: 10, }} source={require('../../../../assets/images/seri.png')} />
          <View style={styles.textSmallContainer}>
            <Text style={styles.textSmall1}>Card Holder Name</Text>
            <Text style={styles.textSmall2}>Expiry Date</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>Card Holder Name</Text>
            <Text style={styles.text2}>02/30</Text>
          </View>
        </View>
      </View>
      {/* pay 1*/}
      <TouchableOpacity 
      style={styles.pay}>
        <Image style={{ marginStart: 17, marginEnd: 14 }} source={require('../../../../assets/images/ic_wallet.png')} />
        <Text style={styles.text3}>Wallet</Text>
        <Text style={styles.text4}>$ 100.50</Text>
      </TouchableOpacity>
      {/* pay 2 */}
      <TouchableOpacity
       style={styles.pay}>
        <Image style={{ marginStart: 17, marginEnd: 8.98 }} source={require('../../../../assets/images/ic_googlepay.png')} />
        <Text style={styles.text3}>Google Pay</Text>
      </TouchableOpacity>
      {/*  pay3 */}
      <TouchableOpacity style={styles.pay}>
        <Image style={{ marginStart: 17, marginEnd: 17.17 }} source={require('../../../../assets/images/ic_apple.png')} />
        <Text style={styles.text3}>Apple Pay</Text>
      </TouchableOpacity>
      {/* pay 4 */}
      
      <TouchableOpacity style={styles.pay}>
      <Image style={{marginStart: 17,marginEnd: 11.15 }} source={require('../../../../assets/images/ic_amazon.png')} />
      <Text style={styles.text3}>Amazon Pay</Text>
      </TouchableOpacity>
        {/* footer */}
        <View style={styles.footer}>
        <View style={styles.price2}>
          <Text style={styles.textPri}>Price</Text>
          <Text style={{ color: '#D17842', fontSize: 20, fontWeight: '600' }}>$
            <Text style={styles.textPrice}> 4.20</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.payContainer}
        >
          <Text style={styles.textPay}>Pay from Credit Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Payment

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
    marginTop: 125,
  },
  text4: {
    marginStart: 173,
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  text3: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  pay: {
    marginTop: 13,
    borderRadius: 25,
    width: 350,
    height: 50,
    backgroundColor: '#252A32',
    alignItems: 'center',
    flexDirection: 'row'
  },
  text2: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    marginStart: 120,
    lineHeight: 20,
  },
  text1: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    marginStart: 10,
    lineHeight: 20,
  },
  textContainer: {
    width: 320,
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSmall2: {
    color: '#AEAEAE',
    fontSize: 10,
    fontWeight: '400',
    marginStart: 161,
    lineHeight: 20,
  },
  textSmall1: {
    color: '#AEAEAE',
    fontSize: 10,
    fontWeight: '400',
    marginStart: 10,
    lineHeight: 20,
  },
  textSmallContainer: {
    marginTop: 48,
    width: 320,
    height: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  credit_nav: {
    width: '100%',
    height: 39,
    flexDirection: 'row',
  },
  credit_container: {
    marginTop: 10,
    height: 186,
    width: 320,
    backgroundColor: '#252A32',
    marginStart: 11,
    borderRadius: 15,
  },
  textCredit: {
    marginTop: 10,
    marginStart: 12,
    width: 83,
    height: 20,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  credit: {
    marginTop: 23,
    width: 350,
    height: 241,
    borderRadius: 25,
    borderColor: '#d17842',
    borderWidth: 3,
    flexDirection: 'column',
  },
  text_nav: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginStart: 99,
  },
  bar_navigation: {
    flexDirection: 'row',
    marginTop: 31
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0C0F14',
    paddingStart: 20,
    paddingTop: 21,
    paddingEnd: 20
  }
})