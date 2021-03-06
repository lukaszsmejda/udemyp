import React, { useContext, useState } from 'react';
import request from '../../../helpers/request';
import { StoreContext } from '../../../store/StoreProvider';
import Course from '../../Course/Course';
import CoursePopup from './CoursePopup';

const CourseDetails = (props) => {
    const { setCourses } = useContext(StoreContext)
    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const { id, title } = props;

    const showPopup = () => setIsOpenPopup(true)
    const hidePopup = event => {
        if (event) {
            event.preventDefault();

        }
        setIsOpenPopup(false);
    }

    const handleDeleteCourse = async () => {
        try {
            const { status } = await request.delete(`./courses/${id}`);
            if (status === 200) {
                setCourses(prev => prev.filter(course => course.id !== id))
            }
        } catch (error) {
            console.warn(error)
        }
    }


    return (
        <details>
            <summary>
                {title}
            </summary>
            <button onClick={showPopup}>Edytuj</button>
            <button onClick={handleDeleteCourse}>Usun</button>
            <CoursePopup isOpenPopup={isOpenPopup} hidePopup={hidePopup} {...props} />
        </details>
    )
}

export default CourseDetails;