import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from '../Shared/AdminSidebar';
 
/* ============================================================
   API ENDPOINTS
   ============================================================ */
const OVERVIEW_API = "https://graduationproject1.runasp.net/api/admin/reports/overview";
const REVENUE_TREND_API = "https://graduationproject1.runasp.net/api/admin/reports/revenue-trend";
const TOP_CITIES_API = "https://graduationproject1.runasp.net/api/Booking/top-cities";
const TRANSACTIONS_API = "https://graduationproject1.runasp.net/api/admin/reports/transactions";
const TRANSACTIONS_EXPORT_API = "https://graduationproject1.runasp.net/api/admin/reports/transactions/export";
 
/* ============================================================
   HELPERS
   ============================================================ */
const getAuthToken = () => localStorage.getItem("userToken");
 
const toISODate = (date) => date.toISOString().split("T")[0];
 
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};
 
const formatCurrency = (value) => {
  if (value === null || value === undefined || Number.isNaN(value)) return "$0";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
 
// First/last day of the month containing `anchor`
const getMonthRange = (anchor = new Date()) => {
  const start = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const end = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0);
  return { from: toISODate(start), to: toISODate(end) };
};
 
// Jan 1 / Dec 31 of the year containing `anchor`
const getYearRange = (anchor = new Date()) => {
  const start = new Date(anchor.getFullYear(), 0, 1);
  const end = new Date(anchor.getFullYear(), 11, 31);
  return { from: toISODate(start), to: toISODate(end) };
};
 
// The period of equal length immediately preceding [fromStr, toStr] — used for the % change badges
const getPreviousPeriod = (fromStr, toStr) => {
  const dayMs = 24 * 60 * 60 * 1000;
  const from = new Date(fromStr);
  const to = new Date(toStr);
  const lengthDays = Math.max(1, Math.round((to - from) / dayMs) + 1);
  const prevTo = new Date(from.getTime() - dayMs);
  const prevFrom = new Date(prevTo.getTime() - (lengthDays - 1) * dayMs);
  return { from: toISODate(prevFrom), to: toISODate(prevTo) };
};
 
const percentChange = (current, previous) => {
  if (previous === null || previous === undefined || previous === 0) return null;
  return ((current - previous) / Math.abs(previous)) * 100;
};
 
const formatRangeLabel = (from, to) => {
  const f = new Date(from);
  const t = new Date(to);
  if (Number.isNaN(f.getTime()) || Number.isNaN(t.getTime())) return "Select dates";
  const fromLabel = f.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const toLabel = t.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return `${fromLabel} - ${toLabel}`;
};
 
const dateInputStyle = {
  width: "100%",
  marginTop: "4px",
  padding: "8px 10px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "13px",
  outline: "none",
};
 
/* ============================================================
   TOAST
   ============================================================ */
const Toast = ({ msg, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
 
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 10000,
        background: type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: "10px",
        fontSize: "14px",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      }}
    >
      <i className={`bi ${type === "success" ? "bi-check-circle" : "bi-exclamation-triangle"}`}></i>
      <span>{msg}</span>
    </div>
  );
};
 
/* ============================================================
   TREND BADGE  (the little ↗ 8.2% / ↘ 2.1% indicator)
   ============================================================ */
const TrendBadge = ({ value }) => {
  if (value === null || value === undefined || Number.isNaN(value)) return null;
  const isUp = value >= 0;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "3px",
        fontSize: "12px",
        fontWeight: 700,
        color: isUp ? "#16a34a" : "#dc2626",
      }}
    >
      <i className={`bi ${isUp ? "bi-arrow-up-right" : "bi-arrow-down-right"}`}></i>
      {Math.abs(value).toFixed(1)}%
    </span>
  );
};
 
/* ============================================================
   STATS CARD
   ============================================================ */
const StatsCard = ({ title, value, icon, iconBg, change, loading }) => {
  if (loading) {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          padding: "24px",
          border: "1px solid #eef1f5",
          minHeight: "128px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="spinner-border text-primary" style={{ width: "1.8rem", height: "1.8rem" }}></div>
      </div>
    );
  }
 
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "22px",
        border: "1px solid #eef1f5",
        boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "19px",
            color: "#0f172a",
          }}
        >
          <i className={`bi ${icon}`}></i>
        </div>
        <TrendBadge value={change} />
      </div>
      <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 500, marginBottom: "6px" }}>{title}</div>
      <div style={{ fontSize: "26px", fontWeight: 700, color: "#0f172a" }}>{value}</div>
    </div>
  );
};
 
/* ============================================================
   REVENUE CHART
   - Clean line + gradient fill, matching the reference image exactly
   - No Y-axis labels / no summary footer (the image doesn't have them)
   - Only one quiet permanent marker (the peak day) — everything else
     appears on hover, with a small tooltip + dashed guide line
   ============================================================ */
const RevenueChart = ({ data, loading }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
 
  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "220px" }}>
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }
 
  if (!data || data.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px 20px", color: "#94a3b8" }}>
        <i className="bi bi-bar-chart" style={{ fontSize: "40px", display: "block", marginBottom: "10px" }}></i>
        No revenue data for this period
      </div>
    );
  }
 
  const values = data.map((d) => d.value);
  const maxV = Math.max(...values);
  const minV = Math.min(...values);
  const range = maxV - minV || Math.max(maxV, 1) * 0.2;
  const topBound = maxV + range * 0.15;
  const bottomBound = Math.max(minV - range * 0.15, 0);
  const span = topBound - bottomBound || 1;
 
  // SVG dimensions — small left padding since there are no Y-axis labels
  const svgW = 560;
  const svgH = 190;
  const padX = 6;
  const padT = 10;
  const padB = 22;
  const plotW = svgW - padX * 2;
  const plotH = svgH - padT - padB;
 
  const xOf = (i) => padX + (data.length === 1 ? plotW / 2 : (i / (data.length - 1)) * plotW);
  const yOf = (v) => padT + plotH - ((v - bottomBound) / span) * plotH;
 
  const points = data.map((d, i) => ({ x: xOf(i), y: yOf(d.value), value: d.value, label: d.label }));
  const peakIndex = values.indexOf(maxV);
 
  const linePath = points.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(" ");
  const areaPath = linePath + ` L${points[points.length - 1].x},${padT + plotH} L${points[0].x},${padT + plotH} Z`;
 
  // At most 5 evenly-spaced x-axis labels, regardless of how many points there are
  const maxXTicks = Math.min(5, points.length);
  const xTickIndices = new Set(
    Array.from({ length: maxXTicks }, (_, i) => Math.round((i * (points.length - 1)) / Math.max(maxXTicks - 1, 1)))
  );
 
  return (
    <div style={{ paddingTop: "16px", position: "relative" }}>
      {hoveredIndex !== null && (
        <div
          style={{
            position: "absolute",
            left: `${(points[hoveredIndex].x / svgW) * 100}%`,
            top: `${(points[hoveredIndex].y / svgH) * 100 - 14}%`,
            transform: "translateX(-50%)",
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "6px 10px",
            fontSize: "11px",
            pointerEvents: "none",
            boxShadow: "0 4px 12px rgba(15,23,42,0.12)",
            whiteSpace: "nowrap",
            zIndex: 5,
          }}
        >
          <div style={{ color: "#64748b" }}>{points[hoveredIndex].label}</div>
          <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "13px" }}>{formatCurrency(points[hoveredIndex].value)}</div>
        </div>
      )}
 
      <svg viewBox={`0 0 ${svgW} ${svgH}`} width="100%" style={{ display: "block", height: "190px", overflow: "visible" }}>
        {[0, 0.25, 0.5, 0.75, 1].map((g) => (
          <line key={g} x1="0" y1={padT + plotH * g} x2={svgW} y2={padT + plotH * g} stroke="#eef1f5" strokeWidth="1" strokeDasharray="3,3" />
        ))}
 
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>
 
        <path d={areaPath} fill="url(#revenueGradient)" />
        <path d={linePath} fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
 
        {points.map((p, i) => {
          const isHovered = hoveredIndex === i;
          const isPeak = i === peakIndex;
          const showHalo = isHovered || (isPeak && hoveredIndex === null);
          const showDot = isHovered || isPeak;
          return (
            <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} style={{ cursor: "pointer" }}>
              {/* generous invisible hit-area so hovering anywhere near the line works */}
              <circle cx={p.x} cy={p.y} r="10" fill="transparent" />
              {isHovered && (
                <line x1={p.x} y1={padT} x2={p.x} y2={padT + plotH} stroke="#2563eb" strokeWidth="1" strokeDasharray="3,3" opacity="0.35" />
              )}
              {showHalo && <circle cx={p.x} cy={p.y} r="6" fill="#2563eb" opacity="0.16" />}
              {showDot && (
                <circle cx={p.x} cy={p.y} r={isHovered ? "4.5" : "3"} fill={isHovered ? "#1d4ed8" : "#2563eb"} stroke="#fff" strokeWidth="1.5" />
              )}
            </g>
          );
        })}
 
        {points.map((p, i) =>
          xTickIndices.has(i) ? (
            <text key={i} x={p.x} y={svgH - 4} textAnchor="middle" fontSize="10" fill="#94a3b8">
              {p.label}
            </text>
          ) : null
        )}
      </svg>
    </div>
  );
};
 
/* ============================================================
   TOP LOCATIONS
   ============================================================ */
const TopLocations = ({ data, loading }) => {
  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "200px" }}>
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }
 
  if (!data || data.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px 10px", color: "#94a3b8" }}>
        <i className="bi bi-pin-map" style={{ fontSize: "40px", display: "block", marginBottom: "10px" }}></i>
        No location data yet
      </div>
    );
  }
 
  const max = Math.max(...data.map((d) => d.value), 1);
 
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {data.map((loc, i) => {
        const pct = Math.min((loc.value / max) * 100, 100);
        return (
          <div key={loc.rank ?? i}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "6px", gap: "10px" }}>
              <span dir="auto" style={{ color: "#0f172a", fontWeight: 500 }}>
                {loc.label}
              </span>
              <span style={{ fontWeight: 700, color: "#0f172a", flexShrink: 0 }}>{loc.value.toLocaleString()}</span>
            </div>
            <div style={{ height: "7px", borderRadius: "20px", background: "#f1f5f9", overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", borderRadius: "20px", background: "#1d4ed8" }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
 
/* ============================================================
   PROPERTY AVATAR + STATUS PILL  (for the transactions table)
   ============================================================ */
const AVATAR_PALETTE = [
  { bg: "#dbeafe", fg: "#1d4ed8" },
  { bg: "#dcfce7", fg: "#15803d" },
  { bg: "#fef3c7", fg: "#a16207" },
  { bg: "#fce7f3", fg: "#be185d" },
  { bg: "#e0e7ff", fg: "#4338ca" },
  { bg: "#cffafe", fg: "#0e7490" },
];
 
const PropertyAvatar = ({ name, index }) => {
  const palette = AVATAR_PALETTE[index % AVATAR_PALETTE.length];
  const initial = (name || "?").trim().charAt(0).toUpperCase() || "?";
  return (
    <div
      style={{
        width: "34px",
        height: "34px",
        borderRadius: "10px",
        background: palette.bg,
        color: palette.fg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "13px",
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {initial}
    </div>
  );
};
 
const STATUS_STYLES = {
  success: { bg: "#dcfce7", fg: "#166534", label: "SUCCESS" },
  completed: { bg: "#dcfce7", fg: "#166534", label: "SUCCESS" },
  pending: { bg: "#dbeafe", fg: "#1e40af", label: "PENDING" },
  processing: { bg: "#dbeafe", fg: "#1e40af", label: "PENDING" },
  failed: { bg: "#fee2e2", fg: "#b91c1c", label: "FAILED" },
  cancelled: { bg: "#fee2e2", fg: "#b91c1c", label: "CANCELLED" },
  refunded: { bg: "#f1f5f9", fg: "#475569", label: "REFUNDED" },
};
 
const StatusPill = ({ status }) => {
  const key = (status || "pending").toString().toLowerCase();
  const style = STATUS_STYLES[key] || { bg: "#f1f5f9", fg: "#475569", label: (status || "PENDING").toUpperCase() };
  return (
    <span
      style={{
        background: style.bg,
        color: style.fg,
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.3px",
      }}
    >
      {style.label}
    </span>
  );
};
 
/* ============================================================
   DATE RANGE DROPDOWN
   ============================================================ */
const DateRangeMenu = ({ from, to, onApply }) => {
  const [open, setOpen] = useState(false);
  const [pendingFrom, setPendingFrom] = useState(from);
  const [pendingTo, setPendingTo] = useState(to);
  const ref = useRef(null);
 
  useEffect(() => {
    setPendingFrom(from);
    setPendingTo(to);
  }, [from, to]);
 
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 16px",
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "10px",
          fontSize: "13px",
          fontWeight: 600,
          color: "#0f172a",
          cursor: "pointer",
        }}
      >
        <i className="bi bi-calendar3"></i>
        {formatRangeLabel(from, to)}
        <i className="bi bi-chevron-down" style={{ fontSize: "10px" }}></i>
      </button>
 
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 8px)",
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0 12px 24px rgba(15,23,42,0.14)",
            zIndex: 30,
            width: "260px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#64748b" }}>
              From
              <input type="date" value={pendingFrom} onChange={(e) => setPendingFrom(e.target.value)} style={dateInputStyle} />
            </label>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#64748b" }}>
              To
              <input type="date" value={pendingTo} onChange={(e) => setPendingTo(e.target.value)} style={dateInputStyle} />
            </label>
            <button
              onClick={() => {
                onApply(pendingFrom, pendingTo);
                setOpen(false);
              }}
              style={{
                marginTop: "4px",
                padding: "9px",
                background: "#1d4ed8",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
 
/* ============================================================
   MAIN REPORTS PAGE
   ============================================================ */
const ReportsPage = () => {
  const navigate = useNavigate();
 
  const [period, setPeriod] = useState("monthly"); // "monthly" -> daily points | "yearly" -> monthly points
  const [dateRange, setDateRange] = useState(getMonthRange());
  const groupBy = period === "monthly" ? "day" : "month";
 
  const [overviewData, setOverviewData] = useState({
    totalRevenue: 0,
    monthlyBookings: 0,
    activeUsers: 0,
    growthRate: 0,
  });
  const [overviewTrend, setOverviewTrend] = useState({ revenue: null, bookings: null, users: null, growth: null });
  const [revenueTrend, setRevenueTrend] = useState([]);
  const [topCities, setTopCities] = useState([]);
  const [topCitiesMeta, setTopCitiesMeta] = useState({ title: "Top Locations", subtitle: "Bookings by area code" });
  const [transactions, setTransactions] = useState([]);
  const [transactionPagination, setTransactionPagination] = useState({ page: 1, pageSize: 10, totalCount: 0, totalPages: 1 });
 
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
 
  const [loading, setLoading] = useState({ overview: true, trend: true, cities: true, transactions: true, export: false });
  const [toast, setToast] = useState(null);
  const [activeNav, setActiveNav] = useState("reports");
 
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);
 
  const getAuthConfig = useCallback(() => {
    const token = getAuthToken();
    return token ? { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "*/*" } } : null;
  }, []);
 
  const handleApiError = useCallback(
    (error, fallbackMessage) => {
      console.error(fallbackMessage, error);
      if (error?.response?.status === 401) {
        showToast("Session expired. Please log in again.", "error");
        localStorage.removeItem("userToken");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        showToast(fallbackMessage, "error");
      }
    },
    [showToast]
  );
 
  /* ----- Overview (+ previous-period comparison for the trend badges) ----- */
  const fetchOverview = useCallback(async () => {
    const config = getAuthConfig();
    if (!config) return;
    setLoading((prev) => ({ ...prev, overview: true }));
    try {
      const prevRange = getPreviousPeriod(dateRange.from, dateRange.to);
      const [currentRes, previousRes] = await Promise.all([
        axios.get(`${OVERVIEW_API}?from=${dateRange.from}&to=${dateRange.to}`, config),
        axios.get(`${OVERVIEW_API}?from=${prevRange.from}&to=${prevRange.to}`, config).catch(() => null),
      ]);
 
      const data = currentRes.data?.data || currentRes.data || {};
      const prevData = previousRes?.data?.data || previousRes?.data || null;
 
      const current = {
        totalRevenue: data.totalRevenue ?? data.revenue ?? 0,
        monthlyBookings: data.monthlyBookings ?? data.bookings ?? 0,
        activeUsers: data.activeUsers ?? 0,
        growthRate: data.growthRate ?? 0,
      };
      setOverviewData(current);
 
      setOverviewTrend({
        revenue: prevData ? percentChange(current.totalRevenue, prevData.totalRevenue ?? prevData.revenue ?? 0) : null,
        bookings: prevData ? percentChange(current.monthlyBookings, prevData.monthlyBookings ?? prevData.bookings ?? 0) : null,
        users: prevData ? percentChange(current.activeUsers, prevData.activeUsers ?? 0) : null,
        // growthRate is already a delta metric, so its own value drives the arrow
        growth: current.growthRate,
      });
    } catch (error) {
      handleApiError(error, "Couldn't load the platform overview.");
    } finally {
      setLoading((prev) => ({ ...prev, overview: false }));
    }
  }, [dateRange, getAuthConfig, handleApiError]);
 
  /* ----- Revenue trend (chart) ----- */
  const fetchRevenueTrend = useCallback(async () => {
    const config = getAuthConfig();
    if (!config) return;
    setLoading((prev) => ({ ...prev, trend: true }));
    try {
      const url = `${REVENUE_TREND_API}?from=${dateRange.from}&to=${dateRange.to}&groupBy=${groupBy}`;
      const response = await axios.get(url, config);
      const raw = response.data?.data || response.data || [];
      const normalized = (Array.isArray(raw) ? raw : []).map((item) => ({
        value: item.revenue ?? item.value ?? item.totalRevenue ?? 0,
        label: item.label || (item.date ? formatDate(item.date) : ""),
      }));
      setRevenueTrend(normalized);
    } catch (error) {
      handleApiError(error, "Couldn't load the revenue trend.");
      setRevenueTrend([]);
    } finally {
      setLoading((prev) => ({ ...prev, trend: false }));
    }
  }, [dateRange, groupBy, getAuthConfig, handleApiError]);
 
  /* ----- Top locations -----
     Real response shape:
     {
       isSuccess: true,
       message: "...",
       data: {
         title: "Top Locations",
         subtitle: "Bookings by city",
         items: [{ rank, city, count }, ...]
       }
     }
     We show every item the API returns — no slicing/limiting. */
  const fetchTopCities = useCallback(async () => {
    const config = getAuthConfig();
    if (!config) return;
    setLoading((prev) => ({ ...prev, cities: true }));
    try {
      const response = await axios.get(TOP_CITIES_API, config);
      const payload = response.data?.data || response.data || {};
      const items = Array.isArray(payload) ? payload : payload.items || [];
 
      const normalized = items.map((item) => ({
        rank: item.rank,
        label: item.city || item.name || item.area || "Unknown",
        value: item.count ?? item.bookings ?? item.value ?? 0,
      }));
 
      setTopCities(normalized);
      setTopCitiesMeta({
        title: payload.title || "Top Locations",
        subtitle: payload.subtitle || "Bookings by area code",
      });
    } catch (error) {
      handleApiError(error, "Couldn't load top locations.");
      setTopCities([]);
    } finally {
      setLoading((prev) => ({ ...prev, cities: false }));
    }
  }, [getAuthConfig, handleApiError]);
 
  /* ----- Transactions (search + pagination) ----- */
  const fetchTransactions = useCallback(
    async (page = 1, pageSize = 10, searchTerm = "") => {
      const config = getAuthConfig();
      if (!config) return;
      setLoading((prev) => ({ ...prev, transactions: true }));
      try {
        const params = new URLSearchParams({ from: dateRange.from, to: dateRange.to, page: String(page), pageSize: String(pageSize) });
        if (searchTerm) params.set("search", searchTerm);
        const response = await axios.get(`${TRANSACTIONS_API}?${params.toString()}`, config);
        const data = response.data?.data || response.data || {};
        const items = data.items || (Array.isArray(data) ? data : []);
        const paginationData = data.pagination || {};
        setTransactions(items);
        setTransactionPagination({
          page: paginationData.page || page,
          pageSize: paginationData.pageSize || pageSize,
          totalCount: paginationData.totalCount ?? items.length,
          totalPages:
            paginationData.totalPages ||
            Math.max(1, Math.ceil((paginationData.totalCount ?? items.length) / (paginationData.pageSize || pageSize))),
        });
      } catch (error) {
        handleApiError(error, "Couldn't load transactions.");
        setTransactions([]);
        setTransactionPagination({ page: 1, pageSize, totalCount: 0, totalPages: 1 });
      } finally {
        setLoading((prev) => ({ ...prev, transactions: false }));
      }
    },
    [dateRange, getAuthConfig, handleApiError]
  );
 
  /* ----- Export CSV ----- */
  const exportTransactions = useCallback(async () => {
    const config = getAuthConfig();
    if (!config) return;
    setLoading((prev) => ({ ...prev, export: true }));
    try {
      const url = `${TRANSACTIONS_EXPORT_API}?from=${dateRange.from}&to=${dateRange.to}`;
      const response = await axios.get(url, { ...config, responseType: "blob" });
      const blob = new Blob([response.data], { type: "text/csv" });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `transactions_${dateRange.from}_to_${dateRange.to}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      showToast("CSV downloaded successfully.", "success");
    } catch (error) {
      handleApiError(error, "Couldn't export transactions.");
    } finally {
      setLoading((prev) => ({ ...prev, export: false }));
    }
  }, [dateRange, getAuthConfig, handleApiError, showToast]);
 
  /* ----- Auth guard ----- */
  useEffect(() => {
    if (!getAuthToken()) {
      window.location.href = "/login";
    }
  }, []);
 
  /* ----- Refetch whenever the date range / grouping changes ----- */
  useEffect(() => {
    fetchOverview();
    fetchRevenueTrend();
    fetchTransactions(1, transactionPagination.pageSize, debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, groupBy]);
 
  /* ----- Top locations load once (endpoint isn't date-scoped) ----- */
  useEffect(() => {
    fetchTopCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  /* ----- Debounce the analytics search box, then refetch transactions ----- */
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(handler);
  }, [search]);
 
  useEffect(() => {
    fetchTransactions(1, transactionPagination.pageSize, debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);
 
  const handlePeriodChange = (nextPeriod) => {
    setPeriod(nextPeriod);
    setDateRange(nextPeriod === "monthly" ? getMonthRange() : getYearRange());
  };
 
  const handleDateRangeApply = (from, to) => {
    setDateRange({ from, to });
  };
 
  const handleTransactionPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= transactionPagination.totalPages) {
      fetchTransactions(newPage, transactionPagination.pageSize, debouncedSearch);
    }
  };
 
  const handleSignOut = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/login";
  };
 
  const navItems = [
    { id: "dashboard", icon: "bi-grid", label: "Dashboard" },
    { id: "users", icon: "bi-people", label: "User Management" },
    { id: "reports", icon: "bi-bar-chart-line", label: "Reports" },
  ];
 
  const handleNavClick = (item) => {
    setActiveNav(item.id);
    if (item.id === "dashboard") navigate("/admin");
    else if (item.id === "users") navigate("/admin/users");
    else if (item.id === "reports") {
      fetchOverview();
      fetchRevenueTrend();
      fetchTopCities();
      fetchTransactions(1, transactionPagination.pageSize, debouncedSearch);
    }
  };
 
  return (
    <div style={{ background: "#f3f5f8", minHeight: "100vh" }}>
      {toast && <Toast msg={toast.message} type={toast.type} onClose={() => setToast(null)} />}
 
      {/* ===== TOP BAR ===== */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px", padding: "20px 32px 0" }}>
        <div style={{ width: "206px", flexShrink: 0 }}>
          <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: 500 }}>Reports</span>
        </div>
        <div style={{ flex: 1, position: "relative", maxWidth: "640px" }}>
          <i
            className="bi bi-search"
            style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "14px" }}
          ></i>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search analytics..."
            style={{
              width: "100%",
              padding: "12px 16px 12px 42px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              background: "#fff",
              fontSize: "14px",
              outline: "none",
              color: "#0f172a",
            }}
          />
        </div>
      </div>
 
      <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", padding: "16px 32px 32px" }}>
        <AdminSidebar />
        <main style={{ flex: 1, minWidth: 0 }}>
 
        {/* ===== MAIN CONTENT ===== */}
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>Platform Overview</h1>
              <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>Tracking performance across all rental categories.</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ display: "flex", background: "#eef1f5", borderRadius: "10px", padding: "4px" }}>
                {["monthly", "yearly"].map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePeriodChange(p)}
                    style={{
                      padding: "7px 16px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: 600,
                      background: period === p ? "#0f1f45" : "transparent",
                      color: period === p ? "#fff" : "#64748b",
                    }}
                  >
                    {p === "monthly" ? "Monthly" : "Yearly"}
                  </button>
                ))}
              </div>
              <DateRangeMenu from={dateRange.from} to={dateRange.to} onApply={handleDateRangeApply} />
            </div>
          </div>
 
          {/* Stats cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px", marginBottom: "24px" }}>
            <StatsCard
              title="Total Revenue"
              value={formatCurrency(overviewData.totalRevenue)}
              icon="bi-credit-card"
              iconBg="#dbeafe"
              change={overviewTrend.revenue}
              loading={loading.overview}
            />
            <StatsCard
              title="Monthly Bookings"
              value={overviewData.monthlyBookings.toLocaleString()}
              icon="bi-calendar-check"
              iconBg="#dcfce7"
              change={overviewTrend.bookings}
              loading={loading.overview}
            />
            <StatsCard
              title="Active Users"
              value={overviewData.activeUsers.toLocaleString()}
              icon="bi-people-fill"
              iconBg="#fef3c7"
              change={overviewTrend.users}
              loading={loading.overview}
            />
            <StatsCard
              title="Growth Rate"
              value={`${overviewData.growthRate >= 0 ? "+" : ""}${overviewData.growthRate}%`}
              icon="bi-graph-up-arrow"
              iconBg="#fce7f3"
              change={overviewTrend.growth}
              loading={loading.overview}
            />
          </div>
 
          {/* Chart + Top locations */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px", marginBottom: "24px" }}>
            <div style={{ background: "#fff", borderRadius: "18px", border: "1px solid #eef1f5", padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>Revenue Trends</h3>
                  <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                    {period === "monthly" ? "Daily" : "Monthly"} financial growth for {formatRangeLabel(dateRange.from, dateRange.to)}
                  </p>
                </div>
                <button
                  onClick={fetchRevenueTrend}
                  title="Refresh chart"
                  style={{ border: "none", background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: "16px" }}
                >
                  <i className="bi bi-arrow-clockwise"></i>
                </button>
              </div>
              <RevenueChart data={revenueTrend} loading={loading.trend} />
            </div>
 
            <div style={{ background: "#fff", borderRadius: "18px", border: "1px solid #eef1f5", padding: "24px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>{topCitiesMeta.title}</h3>
              <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 18px" }}>{topCitiesMeta.subtitle}</p>
              <TopLocations data={topCities} loading={loading.cities} />
            </div>
          </div>
 
          {/* Transactions */}
          <div style={{ background: "#fff", borderRadius: "18px", border: "1px solid #eef1f5", overflow: "hidden" }}>
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid #f1f5f9",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                Transaction History
                <span style={{ fontWeight: 400, color: "#94a3b8", fontSize: "12px", marginLeft: "8px" }}>
                  ({transactionPagination.totalCount} total)
                </span>
              </h3>
              <button
                onClick={exportTransactions}
                disabled={loading.export}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#2563eb",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: loading.export ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {loading.export ? (
                  <>
                    <span className="spinner-border spinner-border-sm"></span>
                    Exporting...
                  </>
                ) : (
                  <>
                    <i className="bi bi-download"></i>
                    Download CSV
                  </>
                )}
              </button>
            </div>
 
            {loading.transactions ? (
              <div style={{ textAlign: "center", padding: "60px" }}>
                <div className="spinner-border text-primary"></div>
              </div>
            ) : transactions.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
                <i className="bi bi-inbox" style={{ fontSize: "40px", display: "block", marginBottom: "10px" }}></i>
                No transactions found for this range
              </div>
            ) : (
              <>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ background: "#f8fafc", borderBottom: "1px solid #eef1f5" }}>
                      <tr>
                        {["Transaction ID", "Property", "User", "Date", "Amount", "Status"].map((h, i) => (
                          <th
                            key={h}
                            style={{
                              padding: "14px 20px",
                              textAlign: i === 4 ? "right" : i === 5 ? "center" : "left",
                              fontSize: "11px",
                              fontWeight: 600,
                              color: "#94a3b8",
                              textTransform: "uppercase",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx, index) => {
                        const propertyName = tx.property || tx.propertyName || "N/A";
                        return (
                          <tr key={tx.id || tx.transactionId || index} style={{ borderBottom: "1px solid #f8fafc" }}>
                            <td style={{ padding: "14px 20px", fontWeight: 600, color: "#0f172a", fontSize: "14px" }}>
                              {tx.transactionId || tx.id || `#TX-${String(index + 1).padStart(5, "0")}`}
                            </td>
                            <td style={{ padding: "14px 20px", fontSize: "14px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <PropertyAvatar name={propertyName} index={index} />
                                <span style={{ color: "#334155" }}>{propertyName}</span>
                              </div>
                            </td>
                            <td style={{ padding: "14px 20px", color: "#334155", fontSize: "14px" }}>
                              {tx.user || tx.userName || tx.guestName || "N/A"}
                            </td>
                            <td style={{ padding: "14px 20px", color: "#64748b", fontSize: "14px" }}>
                              {formatDate(tx.date || tx.createdAt)}
                            </td>
                            <td style={{ padding: "14px 20px", textAlign: "right", fontWeight: 600, color: "#0f172a", fontSize: "14px" }}>
                              {formatCurrency(tx.amount || 0)}
                            </td>
                            <td style={{ padding: "14px 20px", textAlign: "center" }}>
                              <StatusPill status={tx.status} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
 
                {transactionPagination.totalPages > 1 && (
                  <div
                    style={{
                      padding: "16px 24px",
                      borderTop: "1px solid #eef1f5",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "16px",
                      background: "#fafbfc",
                    }}
                  >
                    <div style={{ fontSize: "13px", color: "#64748b" }}>
                      Showing {(transactionPagination.page - 1) * transactionPagination.pageSize + 1} -{" "}
                      {Math.min(transactionPagination.page * transactionPagination.pageSize, transactionPagination.totalCount)} of{" "}
                      {transactionPagination.totalCount} transactions
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      <button
                        onClick={() => handleTransactionPageChange(transactionPagination.page - 1)}
                        disabled={transactionPagination.page === 1}
                        style={{
                          padding: "8px 14px",
                          border: "1px solid #e2e8f0",
                          background: "#ffffff",
                          borderRadius: "8px",
                          cursor: transactionPagination.page === 1 ? "not-allowed" : "pointer",
                          opacity: transactionPagination.page === 1 ? 0.5 : 1,
                          fontSize: "13px",
                          color: "#334155",
                        }}
                      >
                        Previous
                      </button>
                      {Array.from({ length: Math.min(5, transactionPagination.totalPages) }, (_, i) => {
                        let pageNum;
                        if (transactionPagination.totalPages <= 5) pageNum = i + 1;
                        else if (transactionPagination.page <= 3) pageNum = i + 1;
                        else if (transactionPagination.page >= transactionPagination.totalPages - 2) pageNum = transactionPagination.totalPages - 4 + i;
                        else pageNum = transactionPagination.page - 2 + i;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handleTransactionPageChange(pageNum)}
                            style={{
                              padding: "8px 14px",
                              border: "1px solid #e2e8f0",
                              background: transactionPagination.page === pageNum ? "#1d4ed8" : "#ffffff",
                              color: transactionPagination.page === pageNum ? "#ffffff" : "#334155",
                              borderRadius: "8px",
                              cursor: "pointer",
                              fontWeight: transactionPagination.page === pageNum ? 600 : 400,
                              fontSize: "13px",
                            }}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => handleTransactionPageChange(transactionPagination.page + 1)}
                        disabled={transactionPagination.page === transactionPagination.totalPages}
                        style={{
                          padding: "8px 14px",
                          border: "1px solid #e2e8f0",
                          background: "#ffffff",
                          borderRadius: "8px",
                          cursor: transactionPagination.page === transactionPagination.totalPages ? "not-allowed" : "pointer",
                          opacity: transactionPagination.page === transactionPagination.totalPages ? 0.5 : 1,
                          fontSize: "13px",
                          color: "#334155",
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
 
export default ReportsPage;