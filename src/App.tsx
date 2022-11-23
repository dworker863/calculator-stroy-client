import './App.css';
import FormAuth from './app/components/Blocks/FormAuth/FormAuth';
import FormRegistration from './app/components/Blocks/FormRegistration/FormRegistration';
import Services from './app/components/Pages/Services/Services';
import { useAppSelector } from './app/hooks';

function App() {
  const authError = useAppSelector(
    ({ authReducer }) => authReducer.errorMessage,
  );

  return (
    <div className="App">
      <FormAuth />
      {authError}
      <Services />
      {/* <FormRegistration /> */}
    </div>
  );
}

export default App;
