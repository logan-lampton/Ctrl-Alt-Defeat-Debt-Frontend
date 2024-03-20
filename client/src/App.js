import "./App.css";
import AppHeader from "./components/AppHeader";
import { Container } from "@mui/system";
import Onboarding from "./components/Onboarding";
import WelcomePage from "./components/WelcomePage";
import SignUpForm from "./components/SignUpForm";
import UserConfirm from "./components/UserConfirm";
import BottomNav from "./components/BottomNav";
import {Routes, Route} from 'react-router-dom'
import LogInForm from './components/LogInForm'
import TwoFAPage from './components/TwoFAPage';
import Setup2FA from './components/Setup2FA';
import Verify2FA from './components/Verify2FA';
import PlaidButtonsContainer from "./components/PlaidButtonsContainer";

function App() {
  return (
  
    <Container>
      <AppHeader />
          <Routes>
                <Route path="/user-confirm" element={<UserConfirm />} />
                <Route path="/sign-up" element={<SignUpForm />} />
                <Route path="/log-in" element={<LogInForm/>}/>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/2fa" element={<TwoFAPage />} />
                <Route path="/setup-2fa" element={<Setup2FA />} />
                <Route path="/verify-2fa" element={<Verify2FA />} />
                <Route path="/plaid" element={<PlaidButtonsContainer />} />
          </Routes>
    </Container>

       
  );
}

export default App;
