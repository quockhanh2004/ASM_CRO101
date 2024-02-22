import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppContext } from '../main/AppContext'
import LinearGradient from 'react-native-linear-gradient'

const ItemFavorite = (props) => {
    const { product } = props;
    const {index } = props;
    // const { favorite, setFavorite } = useContext(AppContext);
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Image
                    style={styles.imageBackground}
                    source={{ uri: product.image }} />
                <TouchableOpacity style={styles.btnFavorite}>
                    <Image
                        style={styles.imgFavorite}
                        source={require('../../../assets/images/ic_favorite_red.png')} />
                </TouchableOpacity>
                <View style={styles.containerProduct}>
                    <View style={styles.left}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name} numberOfLines={1}>{product?.name}</Text>
                            <Text style={styles.location}>{product?.location}From Africa</Text>

                            <View style={styles.ratingC}>
                                <Image style={styles.imgRating} source={require('../../../assets/images/ic_star.png')} />
                                <Text style={styles.txtRating}>{product?.rating} <Text style={styles.numberRating}>({product?.voting})</Text></Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.right}>
                        <View style={styles.buttonContainer}>
                            <View style={styles.btn}>
                                <Image style={styles.imgBtn} source={require('../../../assets/images/ic_coffee.png')} />
                                <Text style={styles.txtBtn}>Bean</Text>
                            </View>

                            <View style={[styles.btn, { marginStart: 20 }]}>
                                <Image style={styles.imgBtn} source={require('../../../assets/images/ic_location.png')} />
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
            </View>

            <LinearGradient
                colors={['#262b33', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.bottom}>
                <Text style={styles.description}>Description</Text>
                <Text style={styles.body}>{product.description}</Text>
            </LinearGradient>
        </View>
    )
}

export default ItemFavorite

const styles = StyleSheet.create({
    txtBtnRight: {
        color: '#AEAEAE',
        fontFamily: 'Poppins',
        fontSize: 10,
        fontWeight: '500',
        lineHeight: 20,
        textAlign: 'center',
    },
    body: {
        fontSize: 12,
        color: 'white',
        fontFamily: 'Poppins',
        marginTop: 5,
    },
    description: {
        fontFamily: 'Poppins',
        fontSize: 14,
    },
    bottom: {
        width: '100%',
        height: 'auto',
        padding: 18,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        // backgroundColor: 'green',
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
        width: 118,
        height: 40,
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
        fontSize: 8,
        fontWeight: '500',
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
        width: '50%',
        top: 0,
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',

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
        width: '50%',
        flexDirection: 'row',
    },

    containerProduct: {
        width: '100%',
        height: 133,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderTopStartRadius: 25,
        borderTopEndRadius: 25,
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 22.5,
        flexDirection: 'row',
    },
    btnFavorite: {
        position: 'absolute',
        top: 26,
        end: 26,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    top: {
        width: '100%',
        height: 457,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,

    },
    container: {
        width: '100%',
        height: '100%',
        borderRadius: 25,
        marginBottom: 20,
        flex: 1,
    }
})