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
          </Routes>
    </Container>

       
  );
}

export default App;
