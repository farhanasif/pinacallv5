import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Route from './Route';
import { COLORS } from './src/assets/utils/colors';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.pinacall_middle_pink,
    accent: '#f1c40f',
  },
};


function App() {
  return (
    <PaperProvider theme={theme}>
      <Route />
    </PaperProvider>

  );
}

export default App;