import './App.css';
import AppHeader from './components/AppHeader';
import { Container } from '@mui/system';
import Onboarding from './components/Onboarding';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <Container>
   <AppHeader/>
   <Onboarding/>
   <BottomNav/>
    </Container>
  );
}

export default App;
