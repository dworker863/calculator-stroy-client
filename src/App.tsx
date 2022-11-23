import { useEffect } from 'react';
import './App.css';
import FormAuth from './app/components/Blocks/FormAuth/FormAuth';
import FormRegistration from './app/components/Blocks/FormRegistration/FormRegistration';
import FormService from './app/components/Blocks/FormService/FormService';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getServices } from './app/redux/reducers/servicesReducer';

function App() {
  const { services, errorMessage } = useAppSelector(
    ({ servicesReducer }) => servicesReducer,
  );
  const authError = useAppSelector(
    ({ authReducer }) => authReducer.errorMessage,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  console.log(services);

  return (
    <div className="App">
      {services?.map((service) => (
        <div>{service.name}</div>
      ))}
      {/* <FormAuth /> */}
      {authError}
      {/* <FormRegistration /> */}
      <FormService />
      {errorMessage}
    </div>
  );
}

export default App;
