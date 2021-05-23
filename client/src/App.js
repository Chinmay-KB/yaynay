import './App.css';
import React from 'react';
import SawoLogin from 'sawo-react';

function App() {
  let payloadData;
  const [yaynay, setData] = React.useState(null);
  const [isLoggedIn, setLogin] = React.useState(null);
  var config = {
    // should be same as the id of the container created on 3rd step
    containerID: 'sawo-container',
    // can be one of 'email' or 'phone_number_sms'
    identifierType: 'email',
    // Add the API key copied from 2nd step
    apiKey: process.env.REACT_APP_API_KEY,
    // Add a callback here to handle the payload sent by sdk
    onSuccess: loginCallback,
  };

  function loginCallback(payload) {
    payloadData = payload;
    fetch('/vote', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data['success']) {
          fetch('/getData')
            .then((res) => res.json())
            .then((data) => setData(data));
        }
        alert(data['message']);
      });
  }
  React.useEffect(() => {
    fetch('/getData')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <SawoLogin config={config} />
        <h4>
          {!yaynay
            ? 'Loading...'
            : 'Yay ' + yaynay.yay + ' | Nay ' + yaynay.nay}
        </h4>
      </header>
    </div>
  );
}

export default App;
