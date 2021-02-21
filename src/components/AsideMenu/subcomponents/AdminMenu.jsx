import React from 'react'
import { Link } from 'react-router-dom'

import bemCssModules from 'bem-css-modules'

import { default as AsideMenuStyles } from '../AsideMenu.module.scss';


const style = bemCssModules(AsideMenuStyles)

const AdminMenu = () => (
    <>
        <p className={style('title')}>Panel admina</p>
        <nav>
            <ul>
                <li className={style('link')}>
                    <Link to="/manage-courses">Zarzadzanie kursami</Link>
                </li>

            </ul>
        </nav>
    </>
);


export default AdminMenu