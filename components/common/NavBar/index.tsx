import { Button } from "@/components/ui/button"
import { ShadButtonType } from "@/types/button"
import { MdDensityMedium } from "react-icons/md"


type NavBarProps = {
    title: string
    buttonVariant: ShadButtonType
    buttonIcon?: string
    buttonIconSize: number
    dark: boolean
}

const NavBar = ({
    title,
    buttonVariant,
    buttonIcon,
    buttonIconSize,
    dark,
}: NavBarProps) => {

    const themeText = dark ? 'text-white' : 'text-primary'
    const themeBackground = dark ? 'bg-primary' : 'bg-white'

    return (
        <div className={`flex p-8 items-center w-full gap-10 h-[30px] justify-between shadow px-10 pl-[22px] ${themeText} ${themeBackground}`}>
            {buttonIcon && <Button variant={buttonVariant} size={"icon"}>
                {iconFromStr(buttonIcon, buttonIconSize)}
            </Button>}
            <h1 className={`${themeText} text-lg`}>{title}</h1>
        </div>
    )
}

const iconFromStr = (str: string | undefined, size: number | undefined) => {
    switch (str) {
        case 'menu':
            return <MdDensityMedium size={size} />
        default:
            return <MdDensityMedium size={size} />
    }
}

export default NavBar
