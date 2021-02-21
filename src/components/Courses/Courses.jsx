import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';
import Course from '../Course/Course'
import { default as ContentStyles } from './Courses.module.scss'
import { StoreContext } from '../../store/StoreProvider';

const style = bemCssModules(ContentStyles);


const Courses = () => {

    const { courses } = useContext(StoreContext);

    const coursesElements = courses.map(course => <Course key={course.id} {...course} />)

    return (
        <section className={style()}>
            <h2 className={style('title')}></h2>
            <ul className={style('list')}>
                {coursesElements}
            </ul>
        </section>
    )
}


export default Courses