import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import NotificationButton from "@/components/common/NotificationButton"
import { MdMenu } from 'react-icons/md'


const Menu = () => {
    return (
        <Sheet>
            <SheetTrigger><MdMenu className="w-6 h-6" /></SheetTrigger>
            <SheetContent className="bg-white" side={"left"}>
                <SheetHeader>
                    <SheetDescription className="mt-8">
                        <NotificationButton />
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default Menu