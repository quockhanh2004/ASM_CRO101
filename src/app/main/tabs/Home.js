import { StyleSheet, Text, Image, View, ScrollView, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useContext, useEffect, createContext } from 'react'
import AxiosInstance from '../../helpers/AxiosInstance';
const Home = (props) => {
    const { navigation } = props;
    //biến chứa chỉ mục thay đổi
    const [selectedIndex, setSelectedIndex] = useState(null);
    // danh sách danh mục 
    const [categories, setCategories] = useState([]);
    //danh sách sản phẩm thuộc danh mục
    const [products, setProducts] = useState([]);






    // lấy danh sách danh mục từ Api
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await AxiosInstance()
                    .get('/categories');
                setCategories(response.categories);
                setSelectedIndex(response.categories[0]._id)
            } catch (error) {
                console.log(error);
            }
        }
        getCategories();
    }, []);
    // hiển thị danh sách danh mục
    const renderItemCategory = ({ item }) => {
        const { _id, name } = item;
        return (
            <View>
                <Text
                    style={{
                        color: _id === selectedIndex ? '#D17842' : 'white',
                        fontSize: 14,
                        marginLeft: 10,
                    }}
                    onPress={() => {
                        setSelectedIndex(_id);
                    }}
                >
                    {name}
                </Text>
                {_id === selectedIndex ? (
                    <View
                        style={{
                            width: 8,
                            height: 8,
                            backgroundColor: '#D17842',
                            borderRadius: 4,
                            marginLeft: 10,
                        }}
                    ></View>
                ) : null}
            </View>
        );
    };
    // lấy danh sách sản phẩm theo danh mục
    useEffect(() => {
        const getProducts = async () => {
            try {
                if (!selectedIndex) {
                    return;
                }
                const response = await AxiosInstance()
                    .get(`/products?category=${selectedIndex}`);
                setProducts(response.products);
            } catch (error) {
                console.log(error);
            }
        }
        getProducts();
    }, [selectedIndex]);
    // hiển thị danh sách sản phẩm
    const renderItemProduct = ({ item }) => {
        return (
            <TouchableOpacity
            onPress={()=> navigation.navigate('Detail',{
                _id: item._id
            })}
            >
                <View style={styles.sp}>
                    <Image source={{ uri: item.image }} style={styles.image}></Image>
                    <View style={styles.rating}>
                        <Image style={{ width: 10, height: 10 }} source={require('../../../../assets/images/ic_start.png')} />
                        <Text style={{ marginLeft: 3, color: 'white', fontSize: 10, fontWeight: 'bold' }}>{item.rating}</Text>
                    </View>
                    <Text style={styles.nameSp}>{item.name}</Text>
                    <Text style={styles.titleSp}>{item.description}</Text>
                    <View style={styles.priceSp}>
                        <Text style={{ color: '#D17842', fontWeight: 'bold', fontSize: 14, marginStart: 13 }}>$</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, marginStart: 5 }}>{item.price}</Text>
                        <TouchableOpacity
                        onPress={()=> navigation.navigate('Detail',{
                            _id: item._id
                        })}
                        >
                            <Image style={{ marginStart: 68 }} source={require('../../../../assets/images/ic_sum.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {/* navbar */}
                <View style={styles.bar_navigation}>
                    <TouchableOpacity
                        style={styles.menu_navigation}
                        onPress={() => navigation.navigate('Setting')}
                    >
                        <Image source={require('../../../../assets/images/ic_menu.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menu_navigation}
                        onPress={() => navigation.navigate('Personal')}>
                        <Image source={require('../../../../assets/images/ic_person.png')} />
                    </TouchableOpacity>
                </View>
                {/* Text chao */}
                <View style={styles.textBar}>
                    <Text style={styles.text}>Find the best coffee for you</Text>
                </View>
                {/* search */}
                <View style={styles.searchContainer}>
                    <Image style={{ width: 20, height: 20, }} source={require('../../../../assets/images/ic_search.png')} />
                    <TextInput style={styles.search}
                        placeholder='Find Your coffee...'
                        placeholderTextColor='#828282'
                    />
                </View>
                {/* Menu */}
                <View
                    style={{ width: '100%', height: 30, marginTop: 28, backgroundColor: '#0C0F14' }}
                >
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        data={categories}
                        renderItem={renderItemCategory}
                        keyExtractor={item => item._id}
                    />
                </View>
                {/*Products*/}
                <View style={styles.scrollContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={products}
                        renderItem={renderItemProduct}
                    />
                </View>

                {/* Coffee bean */}
                <View style={styles.beanContainer}>
                    <Text style={styles.beanText}>Coffee Beans</Text>
                </View>
                <View style={styles.scrollContainer2}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >

                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    rating: {
        width: 47,
        height: 22,
        marginTop: 12,
        marginStart: 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.60)',
        borderTopRightRadius: 14,
        borderBottomLeftRadius: 26
    },
    priceSp: {
        width: '100%',
        height: 28,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,

    },
    titleSp: {
        width: 83,
        height: 23,
        color: 'white',
        fontSize: 9,
        right: 19,
        marginTop: 5
    },
    nameSp: {
        color: 'white',
        width: 95,
        height: 22,
        flexDirection: 'column',
        right: 15,
        top: 5,
        fontFamily: "Poppins",
        fontSize: 13,
        fontWeight: '400',
        fontStyle: 'normal',
        lineHeight: 20,
        marginTop: 120
    },
    image: {
        width: 136,
        height: 136,
        borderRadius: 15,
        marginHorizontal: 12,
        marginVertical: 12,
        position: "absolute",
    },
    sp: {
        width: 149,
        height: 245,
        backgroundColor: '#141921',
        alignItems: 'center',
        borderRadius: 15,
        marginRight: 22
    },
    scrollContainer2: {
        width: '100%',
        height: 245,
        backgroundColor: '#fff',
        marginTop: 19
    },
    beanText: {
        color: 'white',
        fontSize: 16,
        lineHeight: 20,
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontStyle: 'normal'
    },
    beanContainer: {
        marginTop: 24,
        width: 108,
        height: 20
    },
    scrollContainer: {
        width: '100%',
        height: 245,
        marginTop: 22,
    },
    search: {
        paddingLeft: 19,
        fontFamily: 'Poppins',
        lineHeight: 20,
        color: 'white',
        fontSize: 10
    },
    searchContainer: {
        marginTop: 28,
        width: 330,
        height: 45,
        backgroundColor: '#141921',
        roundedCorners: true,
        flexDirection: 'row',
        borderRadius: 15,
        alignItems: 'center', // Đặt hình ảnh và văn bản vào giữa theo chiều dọc
        paddingLeft: 18,
        fontWeight: '500'
    },
    text: {
        fontSize: 28,
        lineHeight: 36,
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: '#fff'
    },
    textBar: {
        width: 195,
        height: 72,
        marginTop: 31
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
    },
})