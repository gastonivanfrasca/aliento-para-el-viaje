import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
    SheetTitle
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import NotificationButton from "@/components/common/NotificationButton"
import { MdMenu, MdInfo, MdHome } from 'react-icons/md'
import Link from "next/link"


const Menu = () => {
    return (
        <Sheet>
            <SheetTrigger><MdMenu className="w-6 h-6" /></SheetTrigger>
            <SheetContent className="bg-white" side={"left"}>
                <SheetHeader>
                <SheetTitle className="text-2xl font-bold  bg-gradient-to-r from-primary to-primaryLight bg-clip-text text-primaryLight mb-5 pb-2">APV</SheetTitle>
                    <SheetDescription className="mt-8">
                        <div className="mb-8">
                        <Link href={"/"} className="underline font-bold text-primary flex flex-row gap-2 items-center mb-8">
                                <MdHome /> Audio del día
                            </Link>
                            <Link href={"/about-author"} className="underline font-bold text-primary flex flex-row gap-2 items-center">
                                <MdInfo /> ¿Qué es Aliento para el viaje?
                            </Link>
                        </div>
                        <Separator className="my-8 text-primary bg-primary" />
                        <NotificationButton />
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default Menu