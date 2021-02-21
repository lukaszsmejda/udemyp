import React from 'react';

import bemCssModules from 'bem-css-modules';

import { default as CourseStyles } from './Course.module.scss'

const style = bemCssModules(CourseStyles)


const Course = ({ authors, img, price, title }) => {

    const allAuthors = authors.join(', ')

    return (
        <li>
            <article className={style()}>
                <h3 className={style('title')}></h3>
                <img src={img} alt="title" className={style('image')} />
                <p className={style('price')}>{`Koszt kursu: ${price} zlotych `}</p>
                <p className={style('authours')}>{`Autorzy: ${allAuthors}`}</p>
            </article>
        </li>

    )
}


export default Course