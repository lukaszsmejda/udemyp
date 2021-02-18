import React, { createContext, useEffect, useState } from 'react'

import request from '../helpers/request';

export const StoreContext = createContext(null);



const [courses, setCourses] = useState([]);
const [user, setUser] = useState(null);



const fetchData = async () => {
    const { data } = await request.get('/courses');
    setCourses(data.courses)



}
useEffect(() => {
    fetchData()
}, [])

const StoreProvider = ({ children }) => {


    return (
        <StoreContext.Provider value={courses, setCourses, user, setUser}>
            {children}
        </StoreContext.Provider>
    )
}


export default StoreProvider