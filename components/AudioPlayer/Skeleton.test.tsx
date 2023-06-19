import { render } from "@testing-library/react";
import AudioPlayerSkeleton from "./Skeleton";

describe("AudioPlayerSkeleton", () => {
  it("renders the component without errors", () => {
    render(<AudioPlayerSkeleton />);
  });

  it("renders the progress bar", () => {
    const { getByTestId } = render(<AudioPlayerSkeleton />);
    expect(getByTestId("progress-bar-skeleton")).toBeTruthy();
  });
});