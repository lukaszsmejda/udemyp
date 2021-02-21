import React, { useContext } from 'react';

import bemCssModules from 'bem-css-modules';

import { default as CourseStyles } from './Course.module.scss'
import request from '../../helpers/request';
import { StoreContext } from '../../store/StoreProvider';
import { useHistory } from 'react-router-dom';

const style = bemCssModules(CourseStyles)


const Course = ({ authors, id, img, isUserContext, price, title }) => {
    const { user, setUser } = useContext(StoreContext)
    const history = useHistory();

    const allAuthors = authors.join(', ')

    const isUserLogged = Boolean(user)

    const handleOnClick = async () => {
        try {
            const { data, status } = await request.patch(
                '/users',
                {
                    login: user.login,
                    courseId: id,
                }
            );
            if (status === 202) {
                setUser(data.user)
                history.push('/my-courses');
            }
        } catch (error) {
            console.warn(error)
        }
    }

    const shouldBuyButtonBeVisible = isUserLogged && !isUserContext

    return (
        <li>
            <article className={style()}>
                <h3 className={style('title')}>{title}</h3>
                <img src={img} alt="title" className={style('image')} />
                <p className={style('price')}>{`Koszt kursu: ${price} zlotych `}</p>
                <p className={style('authours')}>{`Autorzy: ${allAuthors}`}</p>

                {shouldBuyButtonBeVisible && <button onClick={handleOnClick}>Buy</button>}
            </article>
        </li>

    )
}


export default Course