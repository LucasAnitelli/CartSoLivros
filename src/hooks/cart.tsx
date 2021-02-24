import React, {
    createContext,
    useState,
    useCallback,
    useContext,
    useEffect,
  } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
  
  interface CartState {
    id: string;
    title: string;
    image_url: string;
    price: number;
    quantity: number;
  }
  
  interface CartContext {
    book: CartState[];
    addToCart(item: CartState): void;
    increment(id: string): void;
    decrement(id: string): void;
  }
  
  const CartContext = createContext<CartContext | null>(null);
  
  const CartProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<CartState[]>([]);
  
    useEffect(() => {
      async function loadProducts(): Promise<void> {
        const book = await AsyncStorage.getItem('@CartSoLivros');
  
        if (book) {
          setData([...JSON.parse(book)]);
        }
      }
  
      loadProducts();
    }, []);
  
    const addToCart = useCallback(
      async book => {
        const bookExists = data.find(b => b.id === book.id);
  
        const quantity = bookExists ? bookExists.quantity + 1 : 1;
  
        if (bookExists) {
          setData(
            data.map(b => (b.id === book.id ? { ...book, quantity } : b)),
          );
        } else {
          setData([...data, { ...book, quantity }]);
        }
  
        await AsyncStorage.setItem(
          '@CartSoLivros',
          JSON.stringify(data),
        );
      },
      [data],
    );
  
    const increment = useCallback(
      async id => {
        setData(
          data.map(book =>
            book.id === id
              ? { ...book, quantity: book.quantity + 1 }
              : book,
          ),
        );
  
        await AsyncStorage.setItem(
          '@CartSoLivros',
          JSON.stringify(data),
        );
      },
      [data],
    );
  
    const decrement = useCallback(
      async id => {
        setData(
          data.map(book =>
            book.id === id
              ? { ...book, quantity: book.quantity - 1 }
              : book,
          ),
        );
  
        await AsyncStorage.setItem(
          '@CartSoLivros',
          JSON.stringify(data),
        );
      },
      [data],
    );
  
    const book = data;
  
    const value = React.useMemo(
      () => ({ addToCart, increment, decrement, book }),
      [book, addToCart, increment, decrement],
    );
  
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
  };
  
  function useCart(): CartContext {
    const context = useContext(CartContext);
  
    if (!context) {
      throw new Error(`useCart must be used within a CartProvider`);
    }
  
    return context;
  }
  
  export { CartProvider, useCart };
  