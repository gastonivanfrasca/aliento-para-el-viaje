import { useContextReducerDispatch, ACTIONS } from "@/hooks/useContextReducer";
import AudioPlayer from "../AudioPlayer";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";

const Footer = ({
  url,
}) => {
  const dispatch = useContextReducerDispatch()
  useEffect(() => {
      dispatch({ type: ACTIONS.SET_AUDIO_URL, payload: url })
  }, [url])
  return (
    <footer className="w-screen fixed bottom-0">
      <Card className="p-4 md:pb-4 md:pt-1">
        <AudioPlayer/>
      </Card>
    </footer>
  );
};

export default Footer;
