import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View} from 'react-native';
import formatValue from '../../utils/formatValue';
import { useCart } from '../../hooks/cart';
import FloatingCart from '../../components/FloatingCart';
import {
  Container,
  ProductContainer,
  ProductImage,
  ProductList,
  Product,
  ProductTitle,
  PriceContainer,
  ProductPrice,
  ProductButton,
} from './styles';
import { books } from './data';

function Dashboard({ navigation }) {
  const { addToCart } = useCart();

  function handleAddToCart(item): void {
    addToCart(item);
  }
  return (
    <Container>
      <ProductContainer>
        <ProductList
          data={books}
          keyExtractor={item => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item }) => (
            <Product onPress={() => navigation.navigate('Detail', { item })}>
              <ProductImage source={{ uri: item.image_url }} />
              <ProductTitle>{item.title}</ProductTitle>
              <PriceContainer>
                <ProductPrice>{formatValue(item.price)}</ProductPrice>
                <ProductButton
                  onPress={() => handleAddToCart(item)}>
                  <Icon size={20} name="plus" color="#585858" />
                </ProductButton>
              </PriceContainer>
            </Product>
          )} />
      </ProductContainer>
      <FloatingCart />
    </Container>
  );
}

export default Dashboard;
