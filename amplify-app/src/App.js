import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello from AWS Amplify!</p>
        <AmplifySignOut />
      </header>
    </div>
  );
}

export default withAuthenticator(App);
