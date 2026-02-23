// app/worker/layout.tsx
import { ReactNode } from "react";

type WorkerLayoutProps = {
  children: ReactNode;
};

export default function WorkerLayout({ children }: WorkerLayoutProps) {
  return <main className="pt-20">{children}</main>;
}
