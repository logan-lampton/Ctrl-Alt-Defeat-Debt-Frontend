import "./App.css";
import AppHeader from "./components/AppHeader";
import { Container } from "@mui/system";
import Onboarding from "./components/Onboarding";
import SignIn from "./components/SignIn";
import UserForm from "./components/UserForm";
import UserConfirm from "./components/UserConfirm";
import BottomNav from "./components/BottomNav";
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
  
    <Container>
      <AppHeader />
          <Routes>
                <Route path="/user-confirm" element={<UserConfirm />} />
                <Route path="/user-form" element={<UserForm />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/onboarding" element={<Onboarding />} />
            </Routes>
    </Container>

       
  );
}

export default App;
