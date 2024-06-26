import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [personalGoals, setPersonalGoals] = useState([]);
    const [selectedGoal, setSelectedGoal] = useState({
        id:"",
        emoji: "",
        name: "",
        savingTarget: 0,
        targetDate: "",
    });
    const [selectedGoalForEdit, setSelectedGoalForEdit] = useState({
        id:"",
        emoji: "",
        name: "",
        savingTarget: 0,
        targetDate: "",
    });
    const [groupGoals, setGroupGoals] = useState([]);
    const [formData, setFormData] = useState();
    const [accessToken, setAccessToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [remainingMoney, setRemainingMoney] = useState(0);
    const [totalEarned, setTotalEarned] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/check_session");
                setUser(response.data);
                setPersonalGoals(response.data.personal_goals);
                setAccessToken(response.data._access_token);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Error fetching user session:", error.message);
            }
            try {
                const response = await axios.get("/goals");
                setGroupGoals(response.data.groupGoals);
            } catch (error) {
                console.error("Error fetching user session:", error.message);
            }
        };
        fetchData();
        console.log(selectedGoal)
    }, [selectedGoal]);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                selectedGoal,
                setSelectedGoal,
                personalGoals,
                setPersonalGoals,
                accessToken,
                formData,
                setFormData,
                groupGoals,
                setGroupGoals,
                isAuthenticated,
                remainingMoney,
                setRemainingMoney,
                totalEarned,
                setTotalEarned,
                totalSpent,
                setTotalSpent,
                selectedGoalForEdit, 
                setSelectedGoalForEdit
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
