import React from 'react';
import StatBar from './StatBar';
import { Input } from './ui/input';
import { Slider } from "@/components/ui/slider"


interface StatBarEditProps {
  name: string;
  value: number;
  evs: number;
  ivs: number;
}

export default function StatBarEdit({ name, value, evs, ivs }: StatBarEditProps) {
  return (
    <div className="grid grid-cols-[2fr_2fr_1fr_1fr] items-center gap-4 py-2">
      <div>
        <StatBar small={false} name={name} value={value ?? 0} />
      </div>
        <div>
        <Slider defaultValue={[33]} max={100} step={1} />

        </div>
      <div>
        <Input type="number" defaultValue={evs} />
      </div>
      <div>
        <Input type="number" defaultValue={ivs} />
      </div>
    </div>
  );
}
