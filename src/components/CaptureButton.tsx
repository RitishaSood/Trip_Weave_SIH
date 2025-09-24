"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface CaptureButtonProps {
  label: string;
  onCapture: () => void;
}

export default function CaptureButton({ label, onCapture }: CaptureButtonProps) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);   // toggle active state
    onCapture();          // trigger your location capture
  };

  return (
    <Button
      className={`w-full flex items-center justify-center gap-2 transition-all duration-200
        ${active ? "bg-red-500 hover:bg-red-600" : "bg-purple-500 hover:bg-purple-600"}`}
      onClick={handleClick}
    >
      <MapPin size={18} />
      {label}
    </Button>
  );
}
