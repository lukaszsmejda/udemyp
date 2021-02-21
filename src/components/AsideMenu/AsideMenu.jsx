import React, { useContext } from 'react'
import UserMenu from '../AsideMenu/subcomponents/UserMenu'
import AdminMenu from './subcomponents/AdminMenu'

import bemCssModules from 'bem-css-modules'


import { StoreContext } from '../../store/StoreProvider';

import { default as AsideMenuStyles } from './AsideMenu.module.scss';

const style = bemCssModules(AsideMenuStyles)


const AsideMenu = () => {
    const { user } = useContext(StoreContext);

    const ADMIN_TYPE = 1


    const adminMenuComponent = user?.accessLevel === ADMIN_TYPE ? <AdminMenu /> : null

    return (
        <section className={style()}>
            <UserMenu isUserLogged={Boolean(user)} />
            {adminMenuComponent}
        </section>
    )
}


export default AsideMenu