"use client";

import { useState, useMemo, useEffect } from "react";

type DoubleRangeSliderProps = {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
};

export default function DoubleRangeSlider({
  min,
  max,
  onChange,
}: DoubleRangeSliderProps) {
  const minLimit = 0;
  const maxLimit = 30000;
  const gap = 100;

  const [minValue, setMinValue] = useState(min ?? 0);
  const [maxValue, setMaxValue] = useState(max ?? 30000);

  useEffect(() => {
    setMinValue(min ?? 0);
    setMaxValue(max ?? 30000);
  }, [min, max]);

  const minPercent = useMemo(
    () => ((minValue - minLimit) / (maxLimit - minLimit)) * 100,
    [minValue]
  );

  const maxPercent = useMemo(
    () => ((maxValue - minLimit) / (maxLimit - minLimit)) * 100,
    [maxValue]
  );

  return (
    <div className="w-full space-y-3">
      {/* LABELS */}
      <div className="flex justify-between text-xs text-gray-600">
        <div>
          <span className="text-[10px] text-gray-400">Min</span>
          <div className="font-medium text-gray-800">₹{minValue}</div>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-gray-400">Max</span>
          <div className="font-medium text-gray-800">₹{maxValue}</div>
        </div>
      </div>

      {/* SLIDER */}
      <div className="relative h-6">
        {/* Track */}
        <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full"style={{ backgroundColor: "#0B8260" }} />

        {/* Range */}
        <div
          className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-emerald-600"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
            backgroundColor: "#0B8260",
          }}
        />

        {/* MIN */}
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={minValue}
          onChange={(e) => {
            const value = Math.min(+e.target.value, maxValue - gap);
            setMinValue(value);
            onChange(value, maxValue);
          }}
          className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none"
          style={{ zIndex: 3 }}
        />

        {/* MAX */}
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={maxValue}
          onChange={(e) => {
            const value = Math.max(+e.target.value, minValue + gap);
            setMaxValue(value);
            onChange(minValue, value);
          }}
          className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none"
          style={{ zIndex: 4 }}
        />

        {/* enable pointer on thumbs only */}
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            pointer-events: auto;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #50A58B;
            cursor: pointer;
            -webkit-appearance: none;
          }
          input[type="range"]::-moz-range-thumb {
            pointer-events: auto;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #50A58D;
            cursor: pointer;
          }
        `}</style>
      </div>
    </div>
  );
}
