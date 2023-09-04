import React from "react"
import NotificationButton from "../NotificationButton"

type NavBarProps = {
    title: string
    notificationButton: boolean
    dark: boolean
}

const NavBar = ({
    title,
    notificationButton,
    dark,
}: NavBarProps) => {

    const themeText = dark ? 'text-white' : 'text-primary'
    const themeBackground = dark ? 'bg-primary' : 'bg-white'

    return (
        <div className={`flex p-8 items-center w-full gap-10 h-[30px] justify-between shadow px-10 pl-[22px] ${themeText} ${themeBackground}`}>
            <h1 className={`${themeText} text-lg`}>{title}</h1>
            {notificationButton && <NotificationButton  />}
        </div>
    )
}

export default NavBar
