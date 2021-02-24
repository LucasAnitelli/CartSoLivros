import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import formatValue from '../../utils/formatValue';
import { useCart } from '../../hooks/cart';
import FloatingCart from '../../components/FloatingCart';
import {
  Container,
  ProductContainer,
  ProductImage,
  Product,
  ProductTitle,
  TextButton,
  ProductPrice,
  ProductButton,
} from './styles';

function Detail({ route}) {
  const { addToCart } = useCart();
  const { item } = route.params;

  function handleAddToCart(item): void {
    addToCart(item);
  }
  return (
    <Container>
      <ProductContainer>
        <Product>
          <ProductImage source={{ uri: item.image_url }} />
          <ProductTitle>{item.title}</ProductTitle>
          <>
            <ProductPrice>{formatValue(item.price)}</ProductPrice>
            <ProductButton
              onPress={() => handleAddToCart(item)}
            >
              <Icon size={20} name="plus" color="#fff" />
              <TextButton>Adicionar ao carrinho</TextButton>
            </ProductButton>
          </>
        </Product>
      </ProductContainer>
      <FloatingCart />
    </Container>
  );
};

export default Detail;
