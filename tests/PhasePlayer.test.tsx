import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PhasePlayer } from "@/components/player/PhasePlayer";

type MockStep = { id: string; narration: string };

const steps: MockStep[] = [
  { id: "s1", narration: "Primer paso." },
  { id: "s2", narration: "Segundo paso." },
  { id: "s3", narration: "Tercer paso." },
];

function setup() {
  return render(
    <PhasePlayer
      steps={steps}
      getNarration={(s) => s.narration}
      renderStage={({ index }) => <div data-testid="stage">stage-{index}</div>}
    />
  );
}

describe("PhasePlayer", () => {
  it("renders the active step narration and progress", () => {
    setup();
    expect(screen.getByText("Primer paso.")).toBeInTheDocument();
    expect(screen.getByText("Paso 1 de 3")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "1");
  });

  it("changes narration when clicking next", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByLabelText("Paso siguiente"));
    expect(screen.getByText("Segundo paso.")).toBeInTheDocument();
    expect(screen.getByTestId("stage")).toHaveTextContent("stage-1");
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "2");
  });

  it("disables previous on the first step", () => {
    setup();
    expect(screen.getByLabelText("Paso anterior")).toBeDisabled();
  });

  it("seeks to a step via the progress bar", async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByLabelText("Ir al paso 3"));
    expect(screen.getByText("Tercer paso.")).toBeInTheDocument();
    expect(screen.getByLabelText("Paso siguiente")).toBeDisabled();
  });
});
