import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './app/commonStyles/theme';
import FormAuth from './app/components/Blocks/FormAuth/FormAuth';
import FormRegistration from './app/components/Blocks/FormRegistration/FormRegistration';
import Services from './app/components/Pages/Services/Services';
import { useAppSelector } from './app/hooks';

function App() {
  const authError = useAppSelector(
    ({ authReducer }) => authReducer.errorMessage,
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <FormAuth />
      {authError}
      <Services />
      {/* <FormRegistration /> */}
    </ThemeProvider>
  );
}

export default App;
