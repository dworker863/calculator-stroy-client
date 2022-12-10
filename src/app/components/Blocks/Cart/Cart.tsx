import React from 'react';
import { StyledButton } from '../../../commonStyles/StyledButton';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { removeCartService, setSum } from '../../../redux/reducers/cartReducer';
import FormUserService from '../FormUserService/FormUserService';

const Cart = () => {
  const cart = useAppSelector(({ cartReducer }) => cartReducer);

  const dispatch = useAppDispatch();

  const removeCartServiceHandler = (name: string) => {
    dispatch(removeCartService(name));
    dispatch(setSum());
  };

  return (
    <div>
      {cart.cartServices.map((service, index) => (
        <div key={service.name + index}>
          <FormUserService service={service} />
          <StyledButton
            type="button"
            onClick={() => removeCartServiceHandler(service.name)}
          >
            X
          </StyledButton>
        </div>
      ))}
      <div>
        <span>Сумма: </span>
        <span>{cart.sum}</span>
      </div>
    </div>
  );
};

export default Cart;
