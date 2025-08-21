"use client";

// Compatibility shim: legacy imports may reference '@/components/Card'.
// Re-export the Card component from the migrated ui primitive so older
// import paths keep working during migration.
export { Card as default } from "@/components/ui/card";
