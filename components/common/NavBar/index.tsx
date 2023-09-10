import React from "react"
import Menu from "../Menu"
import NavBarTitle from "../NavBarTitle"

type NavBarProps = {
    notificationButton: boolean
    dark: boolean
}

const NavBar = ({
    notificationButton,
    dark,
}: NavBarProps) => {

    const themeText = dark ? 'text-white' : 'text-primary'
    const themeBackground = dark ? 'bg-primary' : 'bg-white'

    return (
        <div className={`flex p-8 items-center w-full gap-10 h-[30px] justify-between shadow px-10 pl-[22px] ${themeText} ${themeBackground}`}>
            {notificationButton && <Menu />}
            <NavBarTitle themeText={themeText} />
        </div>
    )
}

export default NavBar
