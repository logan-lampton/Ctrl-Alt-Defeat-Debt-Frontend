import './App.css';
import AppHeader from './components/AppHeader';
import { Container } from '@mui/system';
import Onboarding from './components/Onboarding';
import SignIn from './components/SignIn'
import PhoneForm from './components/PhoneForm'
import PhoneConfirm from './components/PhoneConfirm'
import BottomNav from './components/BottomNav';

function App() {
  return (
   
          <Container>
              <AppHeader/>
              {/* <PhoneConfirm />
              <PhoneForm />
              <SignIn />  */}
              <Onboarding/> 
              <BottomNav/>
          </Container>
       
  );
}

export default App;
