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
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"

const Header = () => {
  return (
    <header className="w-screen fixed top-0">
      <Card className="p-2">
        <Sheet>
          <SheetTrigger>
            <Button variant={"ghost"}>
              <Menu size={28} />
            </Button>
          </SheetTrigger>
          <SheetContent position={"left"} size={"content"}>
            <SheetHeader>
              <SheetClose className="mb-4 text-lg" />
              <SheetTitle>Aliento para el viaje</SheetTitle>
            </SheetHeader>
            <Separator className="mt-2 mb-4"/>
            <Button variant={"link"} size={"default"} className="text-lg"> <Info size={18} className="mr-2" /> Acerca de</Button>
          </SheetContent>
        </Sheet>
      </Card>
    </header>
  );
};

export default Header;
