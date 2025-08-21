import { Loader2 } from "lucide-react";

export default function Spinner() {
  return (
    <div role="status" className="flex justify-center items-center my-10">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
