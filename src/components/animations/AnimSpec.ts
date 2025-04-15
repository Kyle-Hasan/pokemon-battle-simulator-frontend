export interface AnimSpec {
  dx?: number;
  dy?: number;
  duration: number;
  tint?: string;
  bg?: string;
  particles?: { color: string; count: number };
}

export const animSpecs: Record<string, AnimSpec> = {
  flamethrower: {
    dx: 20,
    duration: 600,
    tint: "#ff6600",
    particles: { color: "#ff6600", count: 30 }
  },
  tackle: {
    dx: 60,
    dy: -20,
    duration: 400
  },
  hydropump: {
    duration: 700,
    tint: "#66aaff",
    bg: "#003366",
    particles: { color: "#66aaff", count: 40 }
  },
  flareblitz: {
    dx: 50,
    duration: 800,
    tint: "#ff3300",
    particles: { color: "#ff3300", count: 60 }
  }
};

export type AnimName = string;
