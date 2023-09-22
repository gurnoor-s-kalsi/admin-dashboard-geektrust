import './App.css';
import { useEffect, useReducer } from 'react';
import config from './config';
import AdminTable from './components/adminTable';
import performAPICall from './services/data';
import { userListReducer } from './services/reducer';

function App() {

  const [userList, dispatch] = useReducer(userListReducer, []);
  
  function handleInitialization(users){
    dispatch({
        type: 'initial',
        users: users
    })
  }

  const getUsers = async () => {
    const data = await performAPICall(config.BACKEND_URL);
    console.log(data);
    handleInitialization(data);
  }

  useEffect(()=>{
    getUsers()},[]);

  return (
    
    <div>
        <AdminTable users={userList} dispatch={dispatch} userListReducer={userListReducer}/>
    </div>
  );
}

export default App;
