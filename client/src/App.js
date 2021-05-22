import './App.css';
import React from 'react';
import Sawo from 'sawo';

var config = {
  // should be same as the id of the container created on 3rd step
  containerID: 'sawo-container',
  // can be one of 'email' or 'phone_number_sms'
  identifierType: 'email',
  // Add the API key copied from 2nd step
  apiKey: process.env.REACT_APP_API_KEY,
  // Add a callback here to handle the payload sent by sdk
  onSuccess: (payload) => {
    alert(payload);
  },
};
let sawo = new Sawo(config);

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    sawo.showForm();

    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data.message + 'ffff'));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div
          id="sawo-container"
          style={{ width: '300px', height: '300px' }}
        ></div>
        <p>{!data ? 'Loading...' : data}</p>
      </header>
    </div>
  );
}

export default App;
