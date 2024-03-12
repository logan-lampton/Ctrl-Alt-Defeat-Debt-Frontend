import './App.css';
import AppHeader from './components/AppHeader';
import { Container } from '@mui/system';
import Onboarding from './components/Onboarding';

function App() {
  return (
    <Container>
   <AppHeader/>
   <Onboarding/>
    </Container>
  );
}

export default App;
