"use client";

import { useState } from "react";
import { TaggedButton } from "@/components/ui/button-tagged";
import { MapPin } from "lucide-react";

interface CaptureButtonProps {
  label: string;
  onCapture: () => void;
}

export default function CaptureButton({ label, onCapture }: CaptureButtonProps) {
  const [capturing, setCapturing] = useState(false);

  const handleClick = () => {
    if (!capturing) {
      setCapturing(true);
      onCapture();
    } else {
      setCapturing(false);
    }
  };

  return (
    <TaggedButton
      tag={capturing ? "ON" : "OFF"} // 🔴 badge text changes dynamically
      className={`w-full flex items-center justify-center gap-2 transition-all duration-200 ${
        capturing ? "bg-red-500 hover:bg-red-600" : "bg-purple-500 hover:bg-purple-600"
      }`}
      onClick={handleClick}
    >
      <MapPin size={18} />
      {capturing ? `🛑 Stop ${label}` : `📍 Capture ${label}`}
    </TaggedButton>
  );
}
