import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ObserverScene } from "@/components/scenes/ObserverScene";
import { LessonView } from "@/components/LessonView";
import type { Pattern } from "@/lib/types";

describe("analogy↔code bridge", () => {
  it("glows only the anchored element", () => {
    const { container } = render(
      <ObserverScene activeState="reacted" highlightAnchor="admin" />
    );
    expect(container.querySelector("#admin")).toHaveClass("anchor-glow");
    expect(container.querySelector("#message")).not.toHaveClass("anchor-glow");
  });

  it("moves the highlight as code steps advance", async () => {
    const user = userEvent.setup();
    const { container } = render(<LessonView pattern={bridgePattern} />);

    await user.click(screen.getByText("2 · Código"));

    // First code step anchors to the admin.
    expect(container.querySelector("#admin")).toHaveClass("anchor-glow");
    expect(container.querySelector("#message")).not.toHaveClass("anchor-glow");

    await user.click(screen.getByLabelText("Paso siguiente"));

    // Second code step anchors to the message.
    expect(container.querySelector("#message")).toHaveClass("anchor-glow");
    expect(container.querySelector("#admin")).not.toHaveClass("anchor-glow");
  });
});

const bridgePattern: Pattern = {
  slug: "demo",
  name: "Demo",
  category: "behavioral",
  difficulty: 1,
  tagline: "Bridge test.",
  available: true,
  analogy: {
    sceneId: "whatsapp-group",
    steps: [{ id: "a1", narration: "Idle.", sceneState: "idle" }],
  },
  code: {
    language: "typescript",
    source: "class Subject {}\nnotify() {}",
    steps: [
      { id: "c1", narration: "El subject.", highlightLines: [1], analogyAnchor: "admin" },
      { id: "c2", narration: "Notifica.", highlightLines: [2], analogyAnchor: "message" },
    ],
  },
};
