import React, { createContext, useState, useContext, ReactNode } from "react";
import { Cart } from "src/types/Products";
import api from "src/api/ClientApi";

interface CartContextType {
  cart: Cart | null;
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
  getCartUser: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);

  const getCartUser = async () => {
    try {
       const user = localStorage.getItem('user');
       if(user){
        const userId = JSON.parse(user)._id;
        const response = await api.get(`/carts/user/${userId}`);
        setCart(response.data);
      }
    }catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };


  return (
    <CartContext.Provider value={{ cart, setCart, getCartUser }}>
      {children}
    </CartContext.Provider>
  );
};
