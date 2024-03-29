import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Image, TextInput, ToastAndroid } from 'react-native'
import React, { useState, useContext } from 'react'

import { AppContext } from '../AppContext';
import AxiosInstance from '../../helper/AxiosInstance';

const Personal = (props) => {
  const { user, setUser } = useContext(AppContext);
  console.log(user.name);
  const { navigation } = props;
  const [secureTextEntry, secure] = useState(true);
  const [ResecureTextEntry, setResecureTextEntry] = useState(true);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const showPassword = () => {
    secure(!secureTextEntry);
  }

  const showPasswordConfirm = () => {
    setResecureTextEntry(!ResecureTextEntry);
  }

  const changeInfo = async () => {
    if (password === confirmPassword) {
      try {
        const response = await AxiosInstance().post(`/users/update-profile`,
          {
            "email": email,
            "password": password,
            "name": name
          }
        );

        if (response.status == true) {
          ToastAndroid.showWithGravityAndOffset(
            'Update info success',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          setUser({
            name: name,
            email: email
          });
          console.log(user);
          navigation.navigate('Home');
        } else {
          ToastAndroid.showWithGravityAndOffset(
            'Update info fail',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Password not match',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.bar_navigation}>
          <TouchableOpacity style={styles.back_navigation} onPress={navigation.goBack}>
            <Image source={require('../../../../assets/images/ic_back.png')} />
          </TouchableOpacity>
          <Text style={styles.text_navigation}>Setting</Text>
        </View>
        <View style={styles.imgPersonal}>
          <Image source={require('../../../../assets/images/img_personal.png')} />
        </View>
        <View style={styles.infoContainer}>
          <View style={[styles.inputContainer, { marginTop: 31, }]}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#828282"
              autoCapitalize="characters"
              autoCorrect={true}
              keyboardType="default"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#828282"
              autoCapitalize="none"
              autoCorrect={false}
              editable={false}
              keyboardType="email-address"
              value={user?.email}
            />
          </View>

          <View style={[styles.inputContainer, { marginTop: 16 }]}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#828282"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={secureTextEntry}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeImg}
              onPress={showPassword}>
              <Image
                source={require('../../../../assets/images/ic_eye.png')}
              />
            </TouchableOpacity>

          </View>
          <View style={[styles.inputContainer, { marginTop: 16 }]}>
            <TextInput
              style={styles.input}
              placeholder="Re-type password"
              placeholderTextColor="#828282"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={ResecureTextEntry}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeImg}
              onPress={showPasswordConfirm}>
              <Image
                source={require('../../../../assets/images/ic_eye.png')}
              />
            </TouchableOpacity>

          </View>

          <TouchableOpacity
            style={[styles.buttonContainer, { marginTop: 41 }]}
            onPress={changeInfo} >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default Personal

const styles = StyleSheet.create({
  eyeImg: {
    width: 30,
    height: 18,
    position: 'absolute',
    right: 17,
    top: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '700',
    lineHeight: 26,
    letterSpacing: 0.50,
    // wordWrap: 'break-word',
  },
  buttonContainer: {
    width: '100%',
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 41,
    borderRadius: 20,
    backgroundColor: '#D17842',
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#252a32',
    fontFamily: 'Poppins',
    fontWeight: '700',
    paddingHorizontal: 17,
    paddingVertical: 11,
    backgroundColor: '#0C0F14',
    color: '#828282'

  },
  inputContainer: {
    width: '100%',
    marginTop: 16,
  },
  infoContainer: {
    marginTop: 73
  },
  imgPersonal: {
    width: '100%',
    height: 153,
    // position: 'absolute',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    top: 41,
  },
  text_navigation: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    fontFamily: 'Poppins',
    alignItems: 'center',
  },
  back_navigation: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bar_navigation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0C0F14',
    paddingStart: 20,
    paddingTop: 21,
    paddingEnd: 20,
  }
})