import './App.css';
import AppHeader from './components/AppHeader';
import { Container } from '@mui/system';
import Onboarding from './components/Onboarding';
import BottomNav from './components/BottomNav';
import SignIn from './components/SignIn'
import PhoneForm from './components/PhoneForm'
import PhoneConfirm from './components/PhoneConfirm'

function App() {
  return (
    <Container>
   <AppHeader/>
   <Onboarding/>
   <BottomNav/>
   <PhoneConfirm />
   {/* <PhoneForm /> */}
   {/* <SignIn /> */}
    </Container>
  );
}

export default App;
