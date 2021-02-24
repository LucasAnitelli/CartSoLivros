import React, { useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';
import formatValue from '../../utils/formatValue';
import { useCart } from '../../hooks/cart';


const FloatingCart: React.FC = () => {
  const { book } = useCart();

  const navigation = useNavigation();

  const cartTotal = useMemo(() => {
    const total = book.reduce((accumulator, book) => {
      const bookSubTotal = book.price * book.quantity;

      return accumulator + bookSubTotal;
    }, 0);

    return formatValue(total);
  }, [book]);

  const totalItensInCart = useMemo(() => {
    const total = book.reduce((accumulator, book) => {
      const bookQuantity = book.quantity;

      return accumulator + bookQuantity;
    }, 0);

    return total;
  }, [book]);

  return (
    <Container>
      <CartButton
        onPress={() => navigation.navigate('Cart')}
      >
        <Icon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;