"use client";
/* eslint-disable */

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // <-- import this
import { useEffect, useState } from "react";
import { Report, ReportStatus, ReportType } from "@prisma/client";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<ReportStatus | "ALL">("ALL");
  const [typeFilter, setTypeFilter] = useState<ReportType | "ALL">("ALL");
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter(); // ✅ Then call useRouter inside your component

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin"); // 🔥 Redirect to login if not logged in
    }
  }, [status, router]);

  // Fetch reports only if the user is authenticated
  useEffect(() => {
    if (status === "authenticated") {
      fetchReports();
    }
  }, [status]);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/reports");
      const data = await response.json();
      console.log("Fetched reports:", data); // Debugging line
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateReportStatus = async (
    reportId: string,
    newStatus: ReportStatus
  ) => {
    try {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchReports();
      }
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  const filteredReports = reports.filter((report) => {
    const statusMatch = filter === "ALL" || report.status === filter;
    const typeMatch = typeFilter === "ALL" || report.type === typeFilter;
    return statusMatch && typeMatch;
  });

  const getStatusColor = (status: ReportStatus) => {
    const colors = {
      PENDING: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
      IN_PROGRESS: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
      RESOLVED: "bg-green-500/10 text-green-500 border border-green-500/20",
      DISMISSED:
        "bg-gray-500/10 text-gray-500 border border-gray-500/20",
    };
  
    // Type assertion to tell TypeScript that `status` will always be a valid key of `colors`
    return colors[status as keyof typeof colors] || "bg-gray-500/10 text-gray-500 border border-gray-500/20";
  };
  

  // Only render the dashboard when the status is authenticated
  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden ">
      <nav className="border-b border-neutral-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-sky-500">Admin Dashboard</h1>
            <div className="flex items-center gap-6">
              <span className="text-neutral-400">
                {session?.user?.name || "Admin"}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                className="px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-900 rounded-lg hover:bg-neutral-800 border border-neutral-800 transition-all hover:border-neutral-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as ReportStatus | "ALL")
              }
              className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
            >
              <option value="ALL">All Statuses</option>
              {Object.values(ReportStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as ReportType | "ALL")
              }
              className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
            >
              <option value="ALL">All Types</option>
              {Object.values(ReportType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="text-neutral-400">
            {filteredReports.length} Reports
          </div>
        </div>

        <div className="grid gap-4">
  {filteredReports.map((report) => (
    <div
      key={report.id}
      className="relative bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-all"
    >
      {/* Dropdown for large screens: top-right */}
      <div className="hidden md:block absolute top-6 right-6">
        <select
          value={report.status}
          onChange={(e) =>
            updateReportStatus(report.id, e.target.value as ReportStatus)
          }
          className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2"
        >
          {Object.values(ReportStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-lg font-medium text-neutral-200">{report.title}</h2>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                report.status
              )}`}
            >
              {report.status}
            </span>
          </div>

          <p className="text-neutral-400 text-sm">{report.description}</p>

          <div className="flex flex-wrap gap-6 text-sm text-neutral-500">
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
              </div>
              {report.type}
            </span>
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
              </div>
              {report.location || "N/A"}
            </span>
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
              </div>
              {new Date(report.createdAt).toLocaleDateString()}
            </span>
          </div>

          {report.image && (
            <img
              src={report.image}
              alt="Report"
              className="mt-4 rounded-lg border border-neutral-800 max-w-full"
            />
          )}
        </div>

        {/* Dropdown for small screens: stacked */}
        <div className="block md:hidden">
          <select
            value={report.status}
            onChange={(e) =>
              updateReportStatus(report.id, e.target.value as ReportStatus)
            }
            className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2 w-full"
          >
            {Object.values(ReportStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  ))}
</div>


      </main>
    </div>
  );
}
