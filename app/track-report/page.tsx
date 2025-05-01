"use client";
import { ReportTracker } from "@/component/report/ReportTracker";

export default function TrackReportPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center overflow-x-auto w-full">
        <div className="w-full max-w-5xl break-words">
          <ReportTracker />
        </div>
      </div>
    </div>
  );
}
