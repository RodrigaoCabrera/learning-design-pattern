import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CodeTour } from "@/components/player/CodeTour";
import type { CodeFragment } from "@/lib/types";

const source = ["alpha", "bravo", "charlie", "delta"].join("\n");

const tour: CodeFragment[] = [
  { id: "c1", title: "Uno", highlightLines: [1], explanation: "Primera explicación." },
  { id: "c2", title: "Dos", highlightLines: [2, 3], explanation: "Segunda explicación." },
  { id: "c3", title: "Tres", highlightLines: [4], explanation: "Tercera explicación." },
];

// A line is highlighted iff CodeBlock set data-active on its row (see CodeBlock).
const activeLines = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("[data-line][data-active]")).map((el) =>
    Number(el.getAttribute("data-line"))
  );

describe("CodeTour", () => {
  it("renders the first fragment and highlights its lines", () => {
    const { container } = render(<CodeTour source={source} tour={tour} />);

    expect(screen.getByText("Uno")).toBeTruthy();
    expect(screen.getByText("Primera explicación.")).toBeTruthy();
    expect(activeLines(container)).toEqual([1]);
    expect(screen.getByRole("progressbar").getAttribute("aria-label")).toBe("Paso 1 de 3");
  });

  it("advances to the next fragment with Siguiente, moving the highlight", () => {
    const { container } = render(<CodeTour source={source} tour={tour} />);

    fireEvent.click(screen.getByLabelText("Paso siguiente"));

    expect(screen.getByText("Segunda explicación.")).toBeTruthy();
    expect(activeLines(container)).toEqual([2, 3]);
    expect(screen.getByRole("progressbar").getAttribute("aria-label")).toBe("Paso 2 de 3");
  });

  it("jumps straight to a fragment via the progress dots", () => {
    const { container } = render(<CodeTour source={source} tour={tour} />);

    fireEvent.click(screen.getByLabelText("Ir al paso 3"));

    expect(screen.getByText("Tercera explicación.")).toBeTruthy();
    expect(activeLines(container)).toEqual([4]);
  });

  it("disables Anterior at the start and Siguiente at the end", () => {
    render(<CodeTour source={source} tour={tour} />);

    expect((screen.getByLabelText("Paso anterior") as HTMLButtonElement).disabled).toBe(true);

    fireEvent.click(screen.getByLabelText("Ir al paso 3"));
    expect((screen.getByLabelText("Paso siguiente") as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByLabelText("Paso anterior") as HTMLButtonElement).disabled).toBe(false);
  });
});
