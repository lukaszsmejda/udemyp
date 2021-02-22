import React, { useContext, useState } from 'react';
import bemCssModules from 'bem-css-modules';

import { default as CoursePopupStyles } from './CoursePopup.module.scss';

import Modal from '../../Modal/Modal'
import { StoreContext } from '../../../store/StoreProvider';
import request from '../../../helpers/request';

const style = bemCssModules(CoursePopupStyles);


const CoursePopup = ({
    authors = [],
    hidePopup,
    isEditMode = true,
    isOpenPopup,
    id,
    img = '',
    price = 0,
    title = '',
}) => {
    const [formAuthors, setFormAuthors] = useState(authors);
    const [formAuthor, setAuthor] = useState('');
    const [formImg, setFormImg] = useState(img);
    const [formPrice, setFormPrice] = useState(price);
    const [formTitle, setFormTitle] = useState(title);

    const { setCourses } = useContext(StoreContext)

    const handleOnChangeAuthor = e => setAuthor(e.target.value);
    const handleOnChangeImg = e => setFormImg(e.target.value)
    const handleOnChangePrice = e => setFormPrice(e.target.value)
    const handleOnChangeTitle = e => setFormTitle(e.target.value)

    const handleOnSubmit = async event => {
        event.preventDefault();
        const courseObject = {
            authors: formAuthors,
            id,
            img: formImg,
            price: Number(formPrice),
            title: formTitle
        }

        if (isEditMode) {
            const { data, status } = await request.put('/courses', courseObject);

            if (status === 202) {
                setCourses(data.courses)
            }
        } else {
            const { data, status } = await request.post('/courses', courseObject)

            if (status === 201) {
                setCourses(data.courses)
            }
        }

        hidePopup()
    }


    const addAuthor = event => {
        event.preventDefault();
        setFormAuthors(prev => [...prev], formAuthor);
        setAuthor;
    }

    const deleteAuthor = event => {
        const authorToDelete = event.target.dataset.author;
        setFormAuthors(prev => prev.filter(author => author !== authorToDelete))
    }

    const authorsElements = formAuthors.map(author => (
        <li key={author}>
            <p>{author}</p>
            <button data-author={author} onClick={deleteAuthor}>Delete</button>

        </li>
    ))


    const correctLabel = isEditMode ? "Update course" : "Create Course"


    return (

        <Modal handleOnClose={hidePopup} isOpen={isOpenPopup}>
            <div className={style()}>
                <form method="submit" action="" className={style('form')} onSubmit={handleOnSubmit}>
                    <div className={style('form-row')}>
                        <label htmlFor="">
                            Author:
                            <input onChange={handleOnChangeAuthor} type="text" className={style('input')} value={formAuthor} />
                            <button onClick={addAuthor}>Add author</button>
                        </label>
                    </div>
                    <div className={style('form-row')}>
                        <label htmlFor="">
                            Image:
                            <input onChange={handleOnChangeImg} type="text" className={style('input')} value={formImg} />
                        </label>
                    </div>
                    <div className={style('form-row')}>
                        <label htmlFor="">
                            Price:
                            <input onChange={handleOnChangePrice} type="number" className={style('input')} value={formPrice} />

                        </label>
                    </div>
                    <div className={style('form-row')}>
                        <label htmlFor="">
                            Title:
                            <input onChange={handleOnChangeTitle} type="text" className={style('input')} value={formTitle} />

                        </label>
                    </div>
                    <button type="submit">{correctLabel}</button>
                    <button onClick={hidePopup}>Cancel</button>
                </form>
                <p>Author list:</p>
                <ul>
                    {authorsElements}
                </ul>
            </div>
        </Modal>
    )
}


export default CoursePopup;