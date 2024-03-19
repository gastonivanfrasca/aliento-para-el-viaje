import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
    SheetTitle
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import NotificationButton from "@/components/common/NotificationButton"
import InstallButton from "../InstallButton"
import { MdMenu, MdInfo, MdHome } from 'react-icons/md'
import Link from "next/link"

type MenuLinkProps = {
    href: string;
    children: React.ReactNode;
}

const MenuLink = ({ href, children }: MenuLinkProps) => {
    return (
        <Link href={href} passHref>
            <div className="font-bold text-primary flex flex-row gap-2 items-center outline p-4 outline-warmGray-700 rounded-lg">
                {children}
            </div>
        </Link>
    )
}

const Menu = () => {
    return (
        <Sheet>
            <SheetTrigger><MdMenu className="w-6 h-6 text-primaryLight hover:cursor-pointer hover:w-7 hover:h-7" /></SheetTrigger>
            <SheetContent className="bg-white border-none shadow-md" side={"left"}>
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold  bg-gradient-to-r from-primary to-primaryLight bg-clip-text text-primaryLight mb-5 pb-2">APV</SheetTitle>
                    <div className="mt-8" >
                        <div className="mb-8 flex flex-col gap-4">
                            <MenuLink href={"/"}>
                                <MdHome /> Audio del día
                            </MenuLink>
                            <MenuLink href={"/about-author"}>
                                <MdInfo /> Sobre los audios
                            </MenuLink>
                            <InstallButton />
                        </div>
                        <Separator className="my-8 text-primary bg-primary" />
                        <NotificationButton />
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default Menu