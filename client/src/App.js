import "./App.css";
import AppHeader from "./components/AppHeader";
import { Container } from "@mui/system";
import Onboarding from "./components/Onboarding";
import WelcomePage from "./components/WelcomePage";
import SignUpForm from "./components/SignUpForm";
import UserConfirm from "./components/UserConfirm";
import BottomNav from "./components/BottomNav";
import LogInForm from "./components/LogInForm";
import Home from "./components/Home";
import {Routes, Route, useLocation} from 'react-router-dom'
import Goals from './components/Goals'
import { UserProvider } from "./context/UserContext";
import PlaidButtonsContainer from "./components/PlaidLinkButton";
import GoalsProgressView from "./components/GoalsProgressView"


function App() {
    const location = useLocation();
    const showBottomNav = ["/onboarding","/home","/goals", "/insights","/group"].includes(location.pathname);
    return (
      <UserProvider>
        <Container>
            <AppHeader />
            <Routes>
                <Route path='/user-confirm' element={<UserConfirm />} />
                <Route path='/sign-up' element={<SignUpForm />} />
                <Route path='/log-in' element={<LogInForm />} />
                <Route path='/' element={<WelcomePage />} />
                <Route path='/onboarding' element={<Onboarding />} />
                <Route path='/home' element={<Home />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/plaid" element={<PlaidButtonsContainer />} />
                <Route path="/goals-progress" element={<GoalsProgressView />} />
            </Routes>
            {showBottomNav && <BottomNav />}

        </Container>
      </UserProvider>

    );
}

export default App;
