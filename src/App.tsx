import { useEffect } from 'react';
import './App.css';
import FormService from './app/components/Blocks/FormService/FormService';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getServices } from './app/redux/reducers/servicesReducer';

function App() {
  const services = useAppSelector(
    ({ servicesReducer }) => servicesReducer.services,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  console.log(services);

  return (
    <div className="App">
      <FormService />
    </div>
  );
}

export default App;
