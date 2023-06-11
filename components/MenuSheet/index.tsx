import { Info, Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"

const MenuSheet = () => {
  return (
    <Sheet >
      <SheetTrigger className="row-start-1 col-start-1 col-end-1 w-16 h-16 rounded-full">
        <Button variant={"ghost"}>
          <Menu size={28} />
        </Button>
      </SheetTrigger>
      <SheetContent position={"left"} size={"content"}>
        <SheetHeader>
          <SheetClose className="mb-4 text-lg" />
          <SheetTitle>Aliento para el viaje</SheetTitle>
        </SheetHeader>
        <Separator className="mt-2 mb-4" />
        <Button variant={"link"} size={"default"} className="text-lg"> <Info size={18} className="mr-2" /> Acerca de</Button>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
