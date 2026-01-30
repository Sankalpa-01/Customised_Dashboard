import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { widgetRegistry } from "../utils/widgetRegistry";
import toast from "react-hot-toast";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [widgets, setWidgets] = useState([]);
  const [layout, setLayout] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/dashboard`);
      if (res.data.widgets) {
        setWidgets(res.data.widgets);
        setLayout(res.data.layout);
      }
    } catch (err) {
      console.error("Error fetching dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const addWidget = (type, customConfig = {}) => {
    const id = crypto.randomUUID();
    const newWidget = {
      id,
      type,
      title: widgetRegistry[type].label,
      config: { ...widgetRegistry[type].defaultConfig, ...customConfig },
    };

    setWidgets([...widgets, newWidget]);
    setLayout([...layout, id]);
    toast.success("Widget Added", { icon: "✅" });
  };

  const removeWidget = (id) => {
    setWidgets(widgets.filter((w) => w.id !== id));
    setLayout(layout.filter((l) => l !== id));
    toast("Widget Removed", { icon: "🗑️" });
  };

  const updateWidget = (id, newUpdates) => {
    setWidgets(widgets.map((w) => (w.id === id ? { ...w, ...newUpdates } : w)));
  };

  const saveDashboard = async () => {
    try {
      await axios.post(`${API_URL}/api/dashboard`, {
        layout,
        widgets,
      });
      toast.success("Dashboard Saved Successfully!");
    } catch (err) {
      console.error("Error saving:", err);
      toast.error("Failed to save dashboard.");
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        widgets,
        layout,
        setLayout,
        addWidget,
        removeWidget,
        updateWidget,
        saveDashboard,
        loading,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
