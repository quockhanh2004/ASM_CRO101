import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Image, TextInput, ToastAndroid, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import { AppContext } from '../AppContext';
import AxiosInstance from '../../helpers/AxiosInstance';
const Personal = (props) => {
    const { navigation } = props;
    const [secureTextEntry, secure] = useState(true);
    const [ResecureTextEntry, setResecureTextEntry] = useState(true);
    const { user, setUser } = useContext(AppContext);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [retypepassword, setRetypePassword] = useState('');
    const showPassword = () => {
        secure(!secureTextEntry);
    }
    const showPasswordConfirm = () => {
        setResecureTextEntry(!ResecureTextEntry);
    }
    const save = async () => {
        try {
            // Kiểm tra xem mật khẩu và mật khẩu nhập lại có khớp nhau không
            if (password !== retypepassword) {
                ToastAndroid.showWithGravityAndOffset(
                    'Mật khẩu nhập lại không giống nhau',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
                return;
            }
    
            // Gửi yêu cầu cập nhật thông tin người dùng
            const body = {
                email: email,
                password: password,
                name: name,
            };
            const response = await AxiosInstance()
            .post('/users/update-profile', body);
    
            // Kiểm tra xem cập nhật có thành công hay không và hiển thị thông báo tương ứng
            if (response.status === true) {
                ToastAndroid.showWithGravityAndOffset(
                    'Cập nhật thành công',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
                // Nếu cập nhật thành công thì thay đổi giá trị của thông tin người dùng
                setUser({ ...user, name: name }); // Cập nhật trường name
            } else {
                Alert.alert('Thất bại!');
            }
        } catch (error) {
            Alert.alert('Đã xảy ra lỗi khi cập nhật!');
        }
    };
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.bar_navigation}>
                    <TouchableOpacity
                        style={styles.back_navigation}
                        onPress={navigation.goBack}>
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
                            keyboardType="email-address"
                            editable={false}
                            value={email}
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
                            onChangeText={setRetypePassword}
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
                        onPress={save}
                        style={[styles.buttonContainer, { marginTop: 41 }]}
                    >
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
        color: 'white'
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