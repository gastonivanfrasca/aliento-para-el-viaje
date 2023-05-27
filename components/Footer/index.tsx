import AudioPlayer from "../AudioPlayer";
import { Card } from "@/components/ui/card";

type FooterTypes = {
  audioURL: string;
};

const Footer = ({ audioURL }: FooterTypes) => {
  return (
    <footer className="w-screen fixed bottom-0">
      <Card className="p-4 md:pb-4 md:pt-1">
        <AudioPlayer audioURL={audioURL} />
      </Card>
    </footer>
  );
};

export default Footer;
