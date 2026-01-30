import { Toaster } from "react-hot-toast";
import { useDashboard } from "./hooks/useDashboard";
import { WIDGET_TYPES } from "./utils/widgetRegistry";
import Grid from "./components/Dashboard/Grid";
import Button from "./components/Common/Button";

function DashboardApp() {
  const { addWidget, saveDashboard, loading } = useDashboard();

  if (loading)
    return (
      <div className="min-h-screen bg-zinc-950 text-green-500 flex items-center justify-center">
        Loading System...
      </div>
    );

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-zinc-950 text-green-400 font-mono selection:bg-green-900 selection:text-white">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#333",
            color: "#4ade80",
            border: "1px solid #22c55e",
            padding: "16px",
            marginTop: "20px",
          },
          iconTheme: {
            primary: "#22c55e",
            secondary: "#000",
          },
        }}
      />

      {/* Dark Navbar */}
      <nav className="border-b border-green-900/50 bg-black/50 backdrop-blur-md p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold tracking-tighter text-green-500 flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          CUSTOMISED DASHBOARD
        </h1>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => addWidget(WIDGET_TYPES.TEXT)}
          >
            + Note
          </Button>

          <Button
            variant="outline"
            onClick={() => addWidget(WIDGET_TYPES.CHART, { chartType: "bar" })}
          >
            + Bar
          </Button>
          <Button
            variant="outline"
            onClick={() => addWidget(WIDGET_TYPES.CHART, { chartType: "area" })}
          >
            + Area
          </Button>
          <Button
            variant="outline"
            onClick={() => addWidget(WIDGET_TYPES.CHART, { chartType: "pie" })}
          >
            + Pie
          </Button>

          <Button variant="primary" onClick={saveDashboard}>
            Save State
          </Button>
        </div>
      </nav>

      <main className="container mx-auto mt-8 p-4">
        <Grid />
      </main>
    </div>
  );
}

export default DashboardApp;
