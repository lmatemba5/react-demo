import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./App.css"
import "bootstrap/dist/css/bootstrap.css"

/*appllo client setup
const httplink = new HttpLink({
  uri:'http://playground.test/graphql',
});

const wslink = new WebSocketLink({
  uri:'ws://playground.test/graphql',
  options:{
    reconnect: true
  }
});

const splitLink = new split(
  ({query}) =>{
    const definition = getMainDefinition(query)

    return(
      definition.kind === "OperationDefinition" && 
      definition.operation === "subscription"
    );
  },

  wslink,
  httplink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})*/

//mounting the app to the HTML DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

