import "./App.css";
import AppHeader from "./components/AppHeader";
import { Container } from "@mui/system";
import Onboarding from "./components/Onboarding";
import SignIn from "./components/SignIn";
import PhoneForm from "./components/PhoneForm";
import PhoneConfirm from "./components/PhoneConfirm";
import BottomNav from "./components/BottomNav";
import PlaidButtonsContainer from "./components/PlaidButtonsContainer";
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
   
    <Container>
    <AppHeader />
  
    {/* <PlaidButtonsContainer /> */}

    <Routes>
          <Route path="/phone-confirm" element={<PhoneConfirm />} />
          <Route path="/phone-form" element={<PhoneForm />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/onboarding" element={<Onboarding />} />
          

    </Routes>
    <BottomNav />
 </Container>
       
  );
}

export default App;
