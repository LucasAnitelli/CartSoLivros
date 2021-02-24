import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View} from 'react-native';
import {
  Container,
  ProductContainer,
  ProductList,
  Product,
  ProductImage,
  ProductTitleContainer,
  ProductTitle,
  ProductPriceContainer,
  ProductSinglePrice,
  TotalContainer,
  ProductPrice,
  ProductQuantity,
  ActionContainer,
  ActionButton,
  TotalProductsContainer,
  TotalProductsText,
  SubtotalValue,
} from './styles';
import { useCart } from '../../hooks/cart';
import formatValue from '../../utils/formatValue';

const Cart: React.FC = () => {
  const { increment, decrement, book } = useCart();

  function handleIncrement(id: string): void {
    increment(id);
  }

  function handleDecrement(id: string): void {
    decrement(id);
  }

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
      <ProductContainer>
        <ProductList
          data={book}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item }: { item: any }) => (
            <>
              {item.quantity !== 0 ? (
                <Product>
                  <ProductImage source={{ uri: item.image_url }} />
                  <ProductTitleContainer>
                    <ProductTitle>{item.title}</ProductTitle>
                    <ProductPriceContainer>
                      <ProductSinglePrice>
                        {formatValue(item.price)}
                      </ProductSinglePrice>

                      <TotalContainer>
                        <ProductQuantity>{`${item.quantity}x`}</ProductQuantity>

                        <ProductPrice>
                          {formatValue(item.price * item.quantity)}
                        </ProductPrice>
                      </TotalContainer>
                    </ProductPriceContainer>
                  </ProductTitleContainer>
                  <ActionContainer>
                    <ActionButton
                      onPress={() => handleIncrement(item.id)}
                    >
                      <Icon name="plus" color="#3253ad" size={16} />
                    </ActionButton>
                    <ActionButton
                      onPress={() => handleDecrement(item.id)}
                    >
                      <Icon name="minus" color="#3253ad" size={16} />
                    </ActionButton>
                  </ActionContainer>
                </Product>
              ) : (
                <></>
              )}
            </>
          )}
        />
      </ProductContainer>
      <TotalProductsContainer>
        <Icon name="shopping-cart" color="#fff" size={24} />
        <TotalProductsText>{`${totalItensInCart} itens`}</TotalProductsText>
        <SubtotalValue>{cartTotal}</SubtotalValue>
      </TotalProductsContainer>
    </Container>
  );
};

export default Cart;
