import { render } from "@testing-library/react";
import Footer from "../index";

describe("Footer component", () => {
  it("renders the audio player and displays the time indicator", () => {
    const audioURL = "https://example.com/audio.mp3";
    const { getAllByText } = render(<Footer audioURL={audioURL} />);
    const timeIndicators = getAllByText("0:00");
    const firstIndicator = timeIndicators[0];
    expect(firstIndicator).toBeTruthy();
  });
});