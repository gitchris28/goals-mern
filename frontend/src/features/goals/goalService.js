import axios from 'axios'

const API_URL = '/api/goals/'

//Register goal
const createGoal = (async (goalData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, goalData, config)

    return response.data
})

//Update goal
const updateGoal = (async (goalData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + goalData._id, goalData, config)

    return response.data
})

//Get user goals
const getGoals = (async (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
})

//Delete goal
const deleteGoal = (async (goalId, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + goalId, config)

    return response.data
})

//Get current goal
const getCurrentGoal = (async (goalId, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + goalId, config)

    return response.data
})

//Close form
const closeForm = (async () => {
    return ""
})

const goalService = {
    createGoal,
    getGoals,
    deleteGoal,
    getCurrentGoal, 
    closeForm, 
    updateGoal
}

export default goalService