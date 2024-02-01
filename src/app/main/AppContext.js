import { View, Text } from 'react-native'
import React,{createContext, useState} from 'react'
//tạo context
export const AppContext = createContext()
// dữ liệu chung cho app
export const AppProvider = (props) => {
    const {children} = props;
    //làm giỏ hàng
    const [cart, setCart] = useState([]);
    // check login
    const [isLogin, setIsLogin] = useState(false);
    //sản phẩm yêu thích
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    //lưu lại personal
    const [user, setUser] = useState({});
    // lỡ như bấm đồng ý
  
    console.log('>>>>favorite', favoriteProducts);
    console.log('>>>>>>>cart: ',cart)
    return (
        <AppContext.Provider value={{cart, setCart, 
        isLogin, setIsLogin, 
        favoriteProducts, setFavoriteProducts,
         user, setUser ,}}>
            {children}
        </AppContext.Provider>
    )
}