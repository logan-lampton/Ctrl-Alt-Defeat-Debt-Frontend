import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [personalGoals, setPersonalGoals] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/check_session');
        setUser(response.data);
        setPersonalGoals(response.data.personal_goals)
      } catch (error) {
        console.error('Error fetching user session:', error.message);
      }
    };

    fetchData();
  }, []);


  return (
    <UserContext.Provider value={{ user, setUser, personalGoals, setPersonalGoals}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };