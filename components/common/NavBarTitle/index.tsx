"use client"
import React from 'react';
import useStore from '@/lib/state';

type NavBarTitleProps = {
    themeText: string
}


const NavBarTitle = ({ themeText }: NavBarTitleProps) => {
    const pageTitle = useStore(state => state.pageTitle)
    return <h1 className={`${themeText} text-lg`}>{pageTitle}</h1>
}

export default NavBarTitle;