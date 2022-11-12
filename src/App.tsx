import { useEffect } from 'react';
import './App.css';
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

  return <div className="App">{services.map((service) => service.name)}</div>;
}

export default App;
