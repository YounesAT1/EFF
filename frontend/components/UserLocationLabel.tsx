import { LocateFixed } from "lucide-react";
import React from "react";

export default function UserLocationLabel() {
  return (
    <div className="flex items-center gap-x-1 ">
      <LocateFixed size={24} className="text-blue-600" />
      <p className="font-semibold text-blue-600">My current location</p>
    </div>
  );
}
