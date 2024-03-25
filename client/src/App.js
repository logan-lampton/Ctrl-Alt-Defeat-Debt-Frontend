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
import GoalSelection from './components/GoalSelection'
import { UserProvider } from "./context/UserContext";
import PlaidButtonsContainer from "./components/PlaidLinkButton";
import GoalsProgressView from "./components/GoalsProgressView"
import PersonalGoalsInsights from "./components/PersonalGoalsInsights";
import Insights from "./components/Insights"
import GroupGoalsInsights from "./components/GroupGoalsInsights";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import GoalForm from './components/GoalForm'

function App() {
    const location = useLocation();
    const showBottomNav = ["/home","/goals","/insights","/group"].includes(location.pathname);
    return (
      <UserProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container>
            <AppHeader />
            <Routes>
                <Route path='/user-confirm' element={<UserConfirm />} />
                <Route path='/sign-up' element={<SignUpForm />} />
                <Route path='/log-in' element={<LogInForm />} />
                <Route path='/onboarding' element={<Onboarding />} />
                <Route path='/home' element={<Home />} />
                <Route path="/goal-selection" element={<GoalSelection />} />
                <Route path="/plaid" element={<PlaidButtonsContainer />} />
                <Route path="/goals-progress/personal/:id" element={<PersonalGoalsInsights />}/>
                <Route path="/goals-progress/group/:id" element={<GroupGoalsInsights />}/>
                <Route path="/goals-progress" element={<GoalsProgressView />} />
                <Route path='/' element={<WelcomePage />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/goal-form" element={<GoalForm />} />
            </Routes>
            {showBottomNav && <BottomNav />}
        </Container>
        </LocalizationProvider>
      </UserProvider>

    );
}

export default App;
