// useBattleAnimation.ts

import { AnimName, AnimSpec, animSpecs } from "./AnimSpec";

export function useBattleAnimation() {
  const play = (
    field: HTMLElement,
    attacker: HTMLElement,
    target: HTMLElement,
    name: AnimName
  ) => {
    const a: AnimSpec = animSpecs[name];

    const atkAnim = attacker.animate(
      [
        { transform: "translate(0,0)" },
        { offset: 0.5, transform: `translate(${a.dx ?? 0}px,${a.dy ?? 0}px)` },
        { transform: "translate(0,0)" }
      ],
      { duration: a.duration, easing: "ease-out" }
    );

    if (a.tint) {
      target.animate(
        [
          { filter: "none" },
          { filter: `brightness(1.5) drop-shadow(0 0 4px ${a.tint})` },
          { filter: "none" }
        ],
        { duration: a.duration }
      );
    }

    if (a.bg) {
      field.animate(
        [{ background: "#444" }, { background: a.bg }, { background: "#444" }],
        { duration: a.duration }
      );
    }

    if (a.particles) spawnParticles(attacker, target, a);

    return atkAnim.finished.then(() => undefined);
  };

  const spawnParticles = (
    attacker: HTMLElement,
    target: HTMLElement,
    a: AnimSpec
  ) => {
    const ar = attacker.getBoundingClientRect();
    const tr = target.getBoundingClientRect();
    const vx = tr.left + tr.width / 2 - (ar.left + ar.width / 2);
    const vy = tr.top + tr.height / 2 - (ar.top + ar.height / 2);

    for (let i = 0; i < a.particles!.count; i++) {
      const s = document.createElement("span");
      s.className = "particle";
      s.style.backgroundColor = a.particles!.color;
      document.body.appendChild(s);

      const x = ar.left + ar.width / 2;
      const y = ar.top + ar.height / 2;
      s.style.left = `${x}px`;
      s.style.top = `${y}px`;

      s.animate(
        [
          { transform: "translate(0,0)", opacity: 1 },
          { transform: `translate(${vx}px,${vy}px)`, opacity: 0 }
        ],
        { duration: a.duration, easing: "linear", delay: i * 20 }
      ).onfinish = () => s.remove();
    }
  };

  return { play };
}
