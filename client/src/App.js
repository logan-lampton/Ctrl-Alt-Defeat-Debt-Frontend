import "./App.css";
import AppHeader from "./components/AppHeader";
import { Container } from "@mui/system";
import Onboarding from "./components/Onboarding";
import SignIn from "./components/SignIn";
import PhoneForm from "./components/PhoneForm";
import PhoneConfirm from "./components/PhoneConfirm";
import BottomNav from "./components/BottomNav";
import PlaidButtonsContainer from "./components/PlaidButtonsContainer";

function App() {

  return (
    <Container>
      <AppHeader />
      <PlaidButtonsContainer />
      {/* <PhoneConfirm />
              <PhoneForm />
              <SignIn />  */}
      <Onboarding />
      <BottomNav />
      <PhoneConfirm />
      {/* <PhoneForm /> */}
      {/* <SignIn />  */}
      {/* <Onboarding/>  */}
    </Container>
  );
}

export default App;
