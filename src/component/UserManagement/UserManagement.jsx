// import React, { useState, useEffect, useMemo } from "react";

// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZiIsImp0aSI6IjVjMDFhNjU4LTQ1ODEtNDA5MS04OGFjLTUzZmI2MWEwZjdlZiIsImVtYWlsIjoic3RyaW5nMkBleGFtcGxlLmNvbSIsInVpZCI6IjdmIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzQ4OTY3MDM2LCJleHAiOjE3NDk1NzE4MzYsImlhdCI6MTc0ODk2NzAzNiwiaXNzIjoiSldUQXV0aGVudGljYXRpb25TZXJ2ZXIiLCJhdWQiOiJKV1RTZXJ2aWNlQ2xpZW50In0.1T4TQVLW3E5oM_dEdRUz0Wt3EK3EiKQqIx0z8MXa6no";
// const DASHBOARD_API = "https://graduationproject1.runasp.net/api/admin/dashboard";
// const USERS_API = "https://graduationproject1.runasp.net/api/admin/Users";
// const ITEMS_PER_PAGE = 8;

// const authHeaders = {
//   Authorization: `Bearer ${TOKEN}`,
//   "Content-Type": "application/json",
// };

// function formatKey(key) {
//   return key
//     .replace(/([A-Z])/g, " $1")
//     .replace(/\b\w/g, (m) => m.toUpperCase())
//     .trim();
// }

// function Toast({ msg, type, onClose }) {
//   useEffect(() => {
//     const t = setTimeout(onClose, 3000);
//     return () => clearTimeout(t);
//   }, []);
//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 20,
//         right: 20,
//         zIndex: 9999,
//         background: type === "success" ? "#198754" : "#dc3545",
//         color: "#fff",
//         padding: "12px 20px",
//         borderRadius: 12,
//         fontSize: 13.5,
//         fontWeight: 500,
//         display: "flex",
//         alignItems: "center",
//         gap: 8,
//         boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
//       }}
//     >
//       <i className={`bi ${type === "success" ? "bi-check-circle" : "bi-exclamation-circle"}`}></i>
//       {msg}
//     </div>
//   );
// }

// function ConfirmModal({ user, onConfirm, onCancel, loading }) {
//   return (
//     <div
//       onClick={onCancel}
//       style={{
//         position: "fixed",
//         inset: 0,
//         background: "rgba(15,23,42,0.5)",
//         zIndex: 9000,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           background: "#fff",
//           borderRadius: 16,
//           padding: 28,
//           maxWidth: 400,
//           width: "90%",
//           boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
//         }}
//       >
//         <div className="d-flex align-items-center gap-3 mb-3">
//           <div
//             style={{
//               width: 44, height: 44, borderRadius: "50%",
//               background: "#fdecec", display: "flex", alignItems: "center",
//               justifyContent: "center", fontSize: 20, color: "#dc3545", flexShrink: 0,
//             }}
//           >
//             <i className="bi bi-exclamation-triangle"></i>
//           </div>
//           <div>
//             <div className="fw-bold" style={{ fontSize: 16, color: "#1f2937" }}>Delete User</div>
//             <div style={{ fontSize: 13, color: "#6c757d" }}>This action cannot be undone</div>
//           </div>
//         </div>
//         <p style={{ fontSize: 14, color: "#374151", marginBottom: 20 }}>
//           Are you sure you want to delete{" "}
//           <strong>{user?.name || user?.fullName || user?.email || `User #${user?.id}`}</strong>?
//           All their data will be permanently removed.
//         </p>
//         <div className="d-flex gap-2 justify-content-end">
//           <button
//             onClick={onCancel}
//             disabled={loading}
//             style={{
//               height: 38, borderRadius: 10, border: "1px solid #e9ecef",
//               background: "#fff", padding: "0 16px", fontWeight: 500,
//               fontSize: 13.5, cursor: "pointer",
//             }}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             disabled={loading}
//             style={{
//               height: 38, borderRadius: 10, border: "none",
//               background: "#dc3545", color: "#fff", padding: "0 18px",
//               fontWeight: 600, fontSize: 13.5, cursor: "pointer",
//               display: "flex", alignItems: "center", gap: 6,
//             }}
//           >
//             {loading ? (
//               <>
//                 <span className="spinner-border spinner-border-sm" role="status"></span>
//                 Deleting...
//               </>
//             ) : (
//               <>
//                 <i className="bi bi-trash"></i> Delete
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ user }) {
//   const s = (user.status || "").toLowerCase();
//   const verified = s === "verified" || user.isVerified === true;
//   const suspended = s === "suspended" || user.isSuspended === true;

//   if (verified)
//     return (
//       <span style={{ background: "#e9f9ef", color: "#198754", padding: "5px 11px", borderRadius: 20, fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 5 }}>
//         <i className="bi bi-patch-check"></i> Verified
//       </span>
//     );
//   if (suspended)
//     return (
//       <span style={{ background: "#fdecec", color: "#dc3545", padding: "5px 11px", borderRadius: 20, fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 5 }}>
//         <i className="bi bi-slash-circle"></i> Suspended
//       </span>
//     );
//   return (
//     <span style={{ background: "#fff4db", color: "#b7791f", padding: "5px 11px", borderRadius: 20, fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 5 }}>
//       <i className="bi bi-hourglass-split"></i> Pending Review
//     </span>
//   );
// }

// const iconMap = {
//   totalListings:        { icon: "bi-building",      bg: "#eef2ff", color: "#3454d1" },
//   pendingApproval:      { icon: "bi-hourglass-split",bg: "#fff4db", color: "#b7791f" },
//   activeUsers:          { icon: "bi-people-fill",   bg: "#e9f9ef", color: "#198754" },
//   totalRenters:         { icon: "bi-person-check",  bg: "#eef2ff", color: "#3454d1" },
//   totalHosts:           { icon: "bi-house-check",   bg: "#e9f9ef", color: "#198754" },
//   revenueMTD:           { icon: "bi-cash-stack",    bg: "#e9f9ef", color: "#198754" },
//   newBookings:          { icon: "bi-calendar-check",bg: "#eef2ff", color: "#3454d1" },
// };

// const cardStyle = {
//   border: "1px solid #edf0f5",
//   borderRadius: 14,
//   boxShadow: "0 2px 10px rgba(15,23,42,0.04)",
//   background: "#fff",
// };

// const AdminDashboardPage = () => {
//   const [rawDash, setRawDash]         = useState({});
//   const [users, setUsers]             = useState([]);
//   const [loadDash, setLoadDash]       = useState(true);
//   const [loadUsers, setLoadUsers]     = useState(true);
//   const [errDash, setErrDash]         = useState("");
//   const [errUsers, setErrUsers]       = useState("");
//   const [search, setSearch]           = useState("");
//   const [page, setPage]               = useState(1);
//   const [toast, setToast]             = useState(null);
//   const [confirmUser, setConfirmUser] = useState(null);
//   const [deletingId, setDeletingId]   = useState(null);
//   const [activeNav, setActiveNav]     = useState("users");

//   const showToast = (msg, type = "success") => setToast({ msg, type });

//   // ─── Fetch Dashboard ────────────────────────────────────────────────────────
//   const fetchDashboard = async () => {
//     setLoadDash(true);
//     setErrDash("");
//     try {
//       const res = await fetch(DASHBOARD_API, { headers: authHeaders });
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const json = await res.json();
//       setRawDash(json?.data || json || {});
//     } catch (e) {
//       setErrDash("Failed to load dashboard data. " + e.message);
//     } finally {
//       setLoadDash(false);
//     }
//   };

//   // ─── Fetch Users ─────────────────────────────────────────────────────────────
//   const fetchUsers = async () => {
//     setLoadUsers(true);
//     setErrUsers("");
//     try {
//       const res = await fetch(USERS_API, { headers: authHeaders });
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const json = await res.json();
//       const d = json?.data || json || [];
//       setUsers(Array.isArray(d) ? d : []);
//     } catch (e) {
//       setErrUsers("Failed to load users. " + e.message);
//     } finally {
//       setLoadUsers(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboard();
//     fetchUsers();
//   }, []);

//   // ─── Delete User ─────────────────────────────────────────────────────────────
//   const handleDeleteConfirm = async () => {
//     if (!confirmUser) return;
//     setDeletingId(confirmUser.id);
//     try {
//       const res = await fetch(`${USERS_API}/${confirmUser.id}`, {
//         method: "DELETE",
//         headers: authHeaders,
//       });
//       if (!res.ok) {
//         const j = await res.json().catch(() => ({}));
//         throw new Error(j?.message || `HTTP ${res.status}`);
//       }
//       setUsers((prev) => prev.filter((u) => u.id !== confirmUser.id));
//       showToast("User deleted successfully", "success");
//     } catch (e) {
//       showToast("Failed to delete: " + e.message, "error");
//     } finally {
//       setDeletingId(null);
//       setConfirmUser(null);
//     }
//   };

//   // ─── Derived data ────────────────────────────────────────────────────────────
//   const filtered = useMemo(() => {
//     const s = search.toLowerCase();
//     return users.filter((u) => {
//       const name  = (u.name || u.fullName || "").toLowerCase();
//       const email = (u.email || "").toLowerCase();
//       const id    = String(u.id || "");
//       return name.includes(s) || email.includes(s) || id.includes(s);
//     });
//   }, [users, search]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
//   const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

//   const totalUsers    = users.length;
//   const verifiedUsers = users.filter((u) => (u.status || "").toLowerCase() === "verified" || u.isVerified === true).length;
//   const suspendedUsers= users.filter((u) => (u.status || "").toLowerCase() === "suspended" || u.isSuspended === true).length;
//   const pendingUsers  = totalUsers - verifiedUsers - suspendedUsers;

//   const fmtCurrency = (v) =>
//     new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v || 0);

//   const fmtGrowth = (v) => {
//     const n   = parseFloat(v) || 0;
//     const col = n >= 0 ? "#198754" : "#dc3545";
//     const ico = n >= 0 ? "bi-arrow-up" : "bi-arrow-down";
//     return (
//       <span style={{ color: col, fontSize: 13, fontWeight: 600 }}>
//         <i className={`bi ${ico}`}></i> {Math.abs(n)}%
//       </span>
//     );
//   };

//   // Only scalar fields for the dashboard grid
//   const dashFields = Object.entries(rawDash).filter(
//     ([, v]) => typeof v !== "object" || v === null
//   );

//   const pageNumbers = () => {
//     const nums = [];
//     const start = Math.max(1, page - 2);
//     const end   = Math.min(totalPages, page + 2);
//     for (let i = start; i <= end; i++) nums.push(i);
//     return nums;
//   };

//   // ─── Sidebar nav items ───────────────────────────────────────────────────────
//   const navItems = [
//     { id: "dashboard",  icon: "bi-grid",           label: "Dashboard" },
//     { id: "users",      icon: "bi-people",          label: "User Management" },
//     { id: "properties", icon: "bi-building",        label: "Properties" },
//     { id: "bookings",   icon: "bi-calendar-check",  label: "Bookings" },
//     { id: "financials", icon: "bi-cash-stack",      label: "Financials" },
//   ];
//   const supportItems = [
//     { id: "analytics", icon: "bi-graph-up", label: "Analytics" },
//     { id: "settings",  icon: "bi-gear",     label: "General Settings" },
//   ];

//   // ─── Styles ──────────────────────────────────────────────────────────────────
//   const styles = {
//     page:    { backgroundColor: "#f6f8fb", minHeight: "100vh", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" },
//     sidebar: { width: 230, minHeight: "100vh", background: "#fff", borderRight: "1px solid #edf0f5", padding: "18px 12px", position: "sticky", top: 0, display: "flex", flexDirection: "column" },
//     brandBox:{ border: "1px solid #eef1f6", borderRadius: 14, padding: 12, marginBottom: 18 },
//     brandIcon:{ width: 36, height: 36, borderRadius: 10, background: "#1e3a8a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 },
//     navLabel:{ fontSize: 10, color: "#9aa1ac", fontWeight: 700, letterSpacing: "0.5px", margin: "12px 0 6px", textTransform: "uppercase" },
//     navLink: { display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, color: "#495057", textDecoration: "none", fontSize: 13.5, fontWeight: 500, marginBottom: 3, cursor: "pointer", border: "none", background: "none", width: "100%" },
//     navLinkActive: { background: "#eef2ff", color: "#253b80" },
//     main:    { flex: 1, padding: 28 },
//     metricIcon: (bg, color) => ({ width: 44, height: 44, borderRadius: 12, background: bg, color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, flexShrink: 0 }),
//     actionBtn: { width: 34, height: 34, borderRadius: 8, border: "1px solid #e9ecef", background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
//     avatar:  { width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "1.5px solid #e9ecef" },
//     pageBtn: (active) => ({ width: 32, height: 32, borderRadius: 7, border: `1px solid ${active ? "#3454d1" : "#e9ecef"}`, background: active ? "#3454d1" : "#fff", color: active ? "#fff" : "#495057", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, cursor: "pointer", fontWeight: 600 }),
//   };

//   // ─── Render ──────────────────────────────────────────────────────────────────
//   return (
//     <div style={styles.page}>
//       {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
//       {confirmUser && (
//         <ConfirmModal
//           user={confirmUser}
//           onConfirm={handleDeleteConfirm}
//           onCancel={() => setConfirmUser(null)}
//           loading={!!deletingId}
//         />
//       )}

//       <div className="d-flex">
//         {/* ── Sidebar ─────────────────────────────────────────────────────── */}
//         <aside style={styles.sidebar}>
//           <div style={styles.brandBox}>
//             <div className="d-flex align-items-center gap-2">
//               <div style={styles.brandIcon}><i className="bi bi-shield-lock"></i></div>
//               <div>
//                 <div className="fw-bold" style={{ fontSize: 13 }}>ADMIN PANEL</div>
//                 <div style={{ fontSize: 11, color: "#6c757d" }}>Platform Control</div>
//               </div>
//             </div>
//           </div>

//           <div style={styles.navLabel}>Menu</div>
//           {navItems.map((n) => (
//             <button
//               key={n.id}
//               style={{ ...styles.navLink, ...(activeNav === n.id ? styles.navLinkActive : {}) }}
//               onClick={() => setActiveNav(n.id)}
//             >
//               <i className={`bi ${n.icon}`}></i> {n.label}
//             </button>
//           ))}

//           <div style={{ ...styles.navLabel, marginTop: 16 }}>Support & Settings</div>
//           {supportItems.map((n) => (
//             <button
//               key={n.id}
//               style={{ ...styles.navLink, ...(activeNav === n.id ? styles.navLinkActive : {}) }}
//               onClick={() => setActiveNav(n.id)}
//             >
//               <i className={`bi ${n.icon}`}></i> {n.label}
//             </button>
//           ))}

//           <div style={{ marginTop: "auto", paddingTop: 24 }}>
//             <button
//               style={{ background: "#fff", border: "1px solid #e9ecef", borderRadius: 10, padding: "9px 16px", width: "100%", color: "#495057", fontSize: 13.5, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}
//             >
//               <i className="bi bi-box-arrow-right"></i> Sign Out
//             </button>
//           </div>
//         </aside>

//         {/* ── Main ────────────────────────────────────────────────────────── */}
//         <main style={styles.main}>
//           <div className="mb-4">
//             <h2 className="fw-bold mb-1" style={{ color: "#1f2937" }}>User Management</h2>
//             <p style={{ color: "#6c757d", fontSize: 14 }}>
//               Review, monitor and manage roles for all platform participants.
//             </p>
//           </div>

//           {errDash && (
//             <div className="alert alert-danger mb-3" style={{ borderRadius: 12 }}>
//               <i className="bi bi-exclamation-circle me-2"></i>{errDash}
//             </div>
//           )}

//           {/* Top 3 user metric cards */}
//           <div className="row g-3 mb-4">
//             {[
//               { label: "Total Users",        val: loadUsers ? null : totalUsers,                    bg: "#eef2ff", color: "#3454d1", icon: "bi-people-fill" },
//               { label: "VERIFIED HOSTS",     val: loadUsers ? null : verifiedUsers,                 bg: "#e9f9ef", color: "#198754", icon: "bi-shield-check" },
//               { label: "Suspended / Pending",val: loadUsers ? null : suspendedUsers + pendingUsers, bg: "#fdecec", color: "#dc3545", icon: "bi-slash-circle" },
//             ].map((m, i) => (
//               <div key={i} className="col-md-4">
//                 <div className="card p-3" style={cardStyle}>
//                   <div className="d-flex align-items-center gap-3">
//                     <div style={styles.metricIcon(m.bg, m.color)}>
//                       <i className={`bi ${m.icon}`}></i>
//                     </div>
//                     <div>
//                       <div className="text-muted small text-uppercase fw-semibold" style={{ fontSize: 11 }}>{m.label}</div>
//                       <h3 className="fw-bold m-0" style={{ color: "#1f2937" }}>
//                         {m.val === null
//                           ? <span className="spinner-border spinner-border-sm text-muted"></span>
//                           : m.val.toLocaleString()}
//                       </h3>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ── Dynamic Dashboard API Fields ──────────────────────────────── */}
//           <div className="card p-4 mb-4" style={cardStyle}>
//             <div className="d-flex align-items-center justify-content-between mb-3">
//               <div>
//                 <div style={{ fontSize: 10.5, color: "#9aa1ac", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px" }}>
//                   Live API Data
//                 </div>
//                 <h5 className="fw-bold mb-0" style={{ fontSize: 16 }}>Dashboard Overview</h5>
//               </div>
//               <button
//                 onClick={() => { fetchDashboard(); fetchUsers(); }}
//                 style={{ height: 38, borderRadius: 10, border: "1px solid #c5cde8", background: "#eef2ff", color: "#3454d1", padding: "0 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
//               >
//                 <i className="bi bi-arrow-clockwise"></i> Refresh
//               </button>
//             </div>

//             {loadDash ? (
//               <div className="text-center py-4">
//                 <div className="spinner-border text-primary mb-2"></div>
//                 <div className="text-muted small">Loading dashboard data...</div>
//               </div>
//             ) : dashFields.length > 0 ? (
//               <div className="row g-3">
//                 {dashFields.map(([key, val]) => {
//                   const meta      = iconMap[key];
//                   const isRevenue = key.toLowerCase().includes("revenue");
//                   const isGrowth  = key.toLowerCase().includes("growth") && key.toLowerCase().includes("percent");
//                   const isNote    = key.toLowerCase().includes("note");
//                   const display   = isRevenue
//                     ? fmtCurrency(val)
//                     : isGrowth
//                     ? fmtGrowth(val)
//                     : String(val ?? "—");

//                   return (
//                     <div key={key} className={`col-6 col-md-${isNote ? "12" : "3"}`}>
//                       <div style={{ background: "#fafbfd", border: "1px solid #edf0f5", borderRadius: 10, padding: "14px 16px" }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
//                           {meta && (
//                             <div style={{ width: 32, height: 32, borderRadius: 8, background: meta.bg, color: meta.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
//                               <i className={`bi ${meta.icon}`}></i>
//                             </div>
//                           )}
//                           <div style={{ fontSize: 10, color: "#9aa1ac", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px" }}>
//                             {formatKey(key)}
//                           </div>
//                         </div>
//                         <div className="fw-bold" style={{ fontSize: isNote ? 13 : 22, color: "#1f2937" }}>
//                           {display}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : (
//               <div className="text-center py-4 text-muted">
//                 <i className="bi bi-inbox" style={{ fontSize: 28 }}></i>
//                 <div className="mt-2">No dashboard data returned from API</div>
//               </div>
//             )}
//           </div>

//           {/* ── User Table ────────────────────────────────────────────────── */}
//           <div className="card" style={cardStyle}>
//             <div className="card-body p-4">
//               {/* Search bar */}
//               <div className="d-flex gap-2 align-items-center mb-3">
//                 <div className="input-group">
//                   <span className="input-group-text bg-white border-end-0">
//                     <i className="bi bi-search text-muted"></i>
//                   </span>
//                   <input
//                     type="text"
//                     className="form-control border-start-0 shadow-none"
//                     placeholder="Search by name, email or user ID..."
//                     value={search}
//                     onChange={(e) => { setSearch(e.target.value); setPage(1); }}
//                   />
//                 </div>
//                 <button
//                   className="btn btn-outline-secondary btn-sm"
//                   onClick={() => { setSearch(""); setPage(1); }}
//                 >
//                   Clear
//                 </button>
//               </div>

//               {errUsers && (
//                 <div className="alert alert-danger mb-3" style={{ borderRadius: 12 }}>
//                   <i className="bi bi-exclamation-circle me-2"></i>{errUsers}
//                 </div>
//               )}

//               {loadUsers ? (
//                 <div className="text-center py-5">
//                   <div className="spinner-border text-primary mb-2"></div>
//                   <div className="text-muted small">Loading users...</div>
//                 </div>
//               ) : (
//                 <div className="table-responsive">
//                   <table className="table align-middle table-hover mb-0">
//                     <thead className="table-light">
//                       <tr style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px", color: "#6c757d" }}>
//                         <th className="py-3 px-3">User Profile</th>
//                         <th className="py-3">Join Date</th>
//                         <th className="py-3">Identity Status</th>
//                         <th className="py-3 text-end px-3">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {paginated.length > 0 ? (
//                         paginated.map((user) => (
//                           <tr key={user.id}>
//                             <td className="px-3 py-3">
//                               <div className="d-flex align-items-center gap-3">
//                                 <img
//                                   src={user.avatar || user.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
//                                   alt=""
//                                   style={styles.avatar}
//                                   onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; }}
//                                 />
//                                 <div>
//                                   <div className="fw-semibold" style={{ color: "#1f2937", fontSize: 14 }}>
//                                     {user.name || user.fullName || "Unknown User"}
//                                   </div>
//                                   <div style={{ color: "#6c757d", fontSize: 12.5 }}>{user.email || "No email"}</div>
//                                   <div style={{ color: "#adb5bd", fontSize: 11 }}>ID: {user.id}</div>
//                                 </div>
//                               </div>
//                             </td>
//                             <td style={{ color: "#6c757d", fontSize: 13.5 }}>
//                               {user.joinDate
//                                 ? new Date(user.joinDate).toLocaleDateString()
//                                 : user.createdAt
//                                 ? new Date(user.createdAt).toLocaleDateString()
//                                 : "—"}
//                             </td>
//                             <td><StatusBadge user={user} /></td>
//                             <td className="text-end px-3">
//                               <button style={styles.actionBtn} title="View User">
//                                 <i className="bi bi-eye" style={{ color: "#6c757d" }}></i>
//                               </button>
//                               <button
//                                 style={{ ...styles.actionBtn, marginLeft: 6 }}
//                                 title="Delete User"
//                                 onClick={() => setConfirmUser(user)}
//                                 disabled={deletingId === user.id}
//                               >
//                                 {deletingId === user.id ? (
//                                   <span className="spinner-border spinner-border-sm text-danger"></span>
//                                 ) : (
//                                   <i className="bi bi-trash" style={{ color: "#dc3545" }}></i>
//                                 )}
//                               </button>
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="4" className="text-center py-5 text-muted">
//                             <i className="bi bi-search" style={{ fontSize: 28 }}></i>
//                             <div className="mt-2">No users found matching your criteria</div>
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               )}

//               {/* Pagination */}
//               <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
//                 <small className="text-muted">
//                   Showing {filtered.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1}–
//                   {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} users
//                 </small>
//                 <div className="d-flex align-items-center gap-1">
//                   <button style={styles.pageBtn(false)} disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
//                     <i className="bi bi-chevron-left"></i>
//                   </button>
//                   {pageNumbers().map((n) => (
//                     <button key={n} style={styles.pageBtn(page === n)} onClick={() => setPage(n)}>{n}</button>
//                   ))}
//                   {totalPages > 5 && page < totalPages - 1 && (
//                     <button style={styles.pageBtn(page === totalPages)} onClick={() => setPage(totalPages)}>
//                       {totalPages}
//                     </button>
//                   )}
//                   <button style={styles.pageBtn(false)} disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
//                     <i className="bi bi-chevron-right"></i>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardPage;































// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";

// // ============================================================
// // API ENDPOINTS
// // ============================================================
// const DASHBOARD_API = "https://graduationproject1.runasp.net/api/admin/dashboard";
// const USERS_API = "https://graduationproject1.runasp.net/api/admin/Users";
// const ITEMS_PER_PAGE = 8;

// // ============================================================
// // HELPER FUNCTIONS
// // ============================================================
// const getAuthToken = () => {
//   return localStorage.getItem("userToken");
// };

// const formatDate = (dateString) => {
//   if (!dateString) return "N/A";
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
// };

// const formatCurrency = (value) => {
//   if (!value && value !== 0) return "$0";
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0
//   }).format(value);
// };

// // Check if user is deleted (soft delete detection)
// const isUserDeleted = (user) => {
//   // Check email for _deleted_ marker
//   if (user.email && user.email.includes('_deleted_')) {
//     return true;
//   }
//   // Check if user has a deleted flag
//   if (user.isDeleted === true) {
//     return true;
//   }
//   // Check status
//   if (user.status === "deleted") {
//     return true;
//   }
//   return false;
// };

// // ============================================================
// // TOAST COMPONENT
// // ============================================================
// function Toast({ msg, type, onClose }) {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: "20px",
//         right: "20px",
//         zIndex: 10000,
//         background: type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6",
//         color: "#fff",
//         padding: "12px 20px",
//         borderRadius: "8px",
//         fontSize: "14px",
//         fontWeight: "500",
//         display: "flex",
//         alignItems: "center",
//         gap: "10px",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//       }}
//     >
//       <i className={`bi ${type === "success" ? "bi-check-circle" : "bi-exclamation-triangle"}`}></i>
//       <span>{msg}</span>
//     </div>
//   );
// }

// // ============================================================
// // CONFIRMATION MODAL FOR DELETE
// // ============================================================
// function ConfirmDeleteModal({ user, onConfirm, onCancel, loading }) {
//   return (
//     <div
//       onClick={onCancel}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         background: "rgba(0,0,0,0.5)",
//         zIndex: 9999,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           background: "#fff",
//           borderRadius: "16px",
//           padding: "24px",
//           maxWidth: "400px",
//           width: "90%",
//           boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
//           <div
//             style={{
//               width: "48px",
//               height: "48px",
//               borderRadius: "50%",
//               background: "#fee2e2",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: "24px",
//               color: "#dc2626",
//             }}
//           >
//             <i className="bi bi-exclamation-triangle-fill"></i>
//           </div>
//           <div>
//             <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>Delete User</h3>
//             <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#6b7280" }}>This action cannot be undone</p>
//           </div>
//         </div>
//         <p style={{ fontSize: "14px", color: "#374151", marginBottom: "24px" }}>
//           Are you sure you want to delete{" "}
//           <strong>{user?.fullName || user?.name || user?.email || `User #${user?.id}`}</strong>?
//           <br />
//           All their data will be permanently removed from the system.
//         </p>
//         <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
//           <button
//             onClick={onCancel}
//             disabled={loading}
//             style={{
//               padding: "8px 16px",
//               borderRadius: "8px",
//               border: "1px solid #e5e7eb",
//               background: "#fff",
//               cursor: "pointer",
//               fontSize: "14px",
//               fontWeight: 500,
//             }}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             disabled={loading}
//             style={{
//               padding: "8px 20px",
//               borderRadius: "8px",
//               border: "none",
//               background: "#dc2626",
//               color: "#fff",
//               cursor: "pointer",
//               fontSize: "14px",
//               fontWeight: 600,
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//             }}
//           >
//             {loading ? (
//               <>
//                 <span className="spinner-border spinner-border-sm"></span>
//                 Deleting...
//               </>
//             ) : (
//               <>
//                 <i className="bi bi-trash-fill"></i>
//                 Delete Permanently
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // STATUS BADGE COMPONENT
// // ============================================================
// function StatusBadge({ status, isDeleted }) {
//   if (isDeleted) {
//     return (
//       <span style={{
//         background: "#fee2e2",
//         color: "#991b1b",
//         padding: "4px 12px",
//         borderRadius: "20px",
//         fontSize: "12px",
//         fontWeight: 600,
//         display: "inline-flex",
//         alignItems: "center",
//         gap: "6px",
//       }}>
//         <i className="bi bi-trash-fill"></i> Deleted
//       </span>
//     );
//   }
//   if (status === "Verified" || status === "verified") {
//     return (
//       <span style={{
//         background: "#e6f7e6",
//         color: "#2e7d32",
//         padding: "4px 12px",
//         borderRadius: "20px",
//         fontSize: "12px",
//         fontWeight: 600,
//         display: "inline-flex",
//         alignItems: "center",
//         gap: "6px",
//       }}>
//         <i className="bi bi-patch-check-fill"></i> Verified
//       </span>
//     );
//   }
//   if (status === "Suspended" || status === "suspended") {
//     return (
//       <span style={{
//         background: "#ffebee",
//         color: "#c62828",
//         padding: "4px 12px",
//         borderRadius: "20px",
//         fontSize: "12px",
//         fontWeight: 600,
//         display: "inline-flex",
//         alignItems: "center",
//         gap: "6px",
//       }}>
//         <i className="bi bi-slash-circle"></i> Suspended
//       </span>
//     );
//   }
//   return (
//     <span style={{
//       background: "#fff3e0",
//       color: "#ed6c02",
//       padding: "4px 12px",
//       borderRadius: "20px",
//       fontSize: "12px",
//       fontWeight: 600,
//       display: "inline-flex",
//       alignItems: "center",
//       gap: "6px",
//     }}>
//       <i className="bi bi-hourglass-split"></i> Pending Review
//     </span>
//   );
// }

// // ============================================================
// // STATS CARD COMPONENT
// // ============================================================
// function StatsCard({ title, value, icon, color }) {
//   return (
//     <div style={{
//       background: "#fff",
//       borderRadius: "12px",
//       padding: "20px",
//       boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//       border: "1px solid #e5e7eb"
//     }}>
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
//         <div style={{
//           width: "48px",
//           height: "48px",
//           borderRadius: "12px",
//           background: color || "#eef2ff",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontSize: "24px",
//           color: "#1e3a8a"
//         }}>
//           <i className={`bi ${icon}`}></i>
//         </div>
//       </div>
//       <div style={{ fontSize: "28px", fontWeight: "bold", color: "#1f2937", marginBottom: "4px" }}>
//         {typeof value === "number" ? value.toLocaleString() : value}
//       </div>
//       <div style={{ fontSize: "14px", color: "#6b7280" }}>{title}</div>
//     </div>
//   );
// }

// // ============================================================
// // DASHBOARD CARD COMPONENT
// // ============================================================
// function DashboardMetricCard({ label, value, isGrowth = false, isRevenue = false }) {
//   let displayValue = value;
//   let growthColor = "#10b981";
//   let growthIcon = "bi-arrow-up";

//   if (isGrowth && typeof value === "number") {
//     growthColor = value >= 0 ? "#10b981" : "#ef4444";
//     growthIcon = value >= 0 ? "bi-arrow-up" : "bi-arrow-down";
//     displayValue = `${Math.abs(value)}%`;
//   } else if (isRevenue && typeof value === "number") {
//     displayValue = formatCurrency(value);
//   } else if (typeof value === "number") {
//     displayValue = value.toLocaleString();
//   }

//   return (
//     <div style={{
//       background: "#fff",
//       borderRadius: "10px",
//       padding: "16px",
//       border: "1px solid #e5e7eb"
//     }}>
//       <div style={{ fontSize: "12px", color: "#6b7280", textTransform: "uppercase", marginBottom: "8px" }}>
//         {label}
//       </div>
//       <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1f2937", display: "flex", alignItems: "center", gap: "8px" }}>
//         {displayValue}
//         {isGrowth && typeof value === "number" && (
//           <span style={{ fontSize: "14px", color: growthColor, display: "flex", alignItems: "center", gap: "2px" }}>
//             <i className={`bi ${growthIcon}`}></i>
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // MAIN ADMIN DASHBOARD
// // ============================================================
// const AdminDashboardPage = () => {
//   const [dashboardData, setDashboardData] = useState({});
//   const [allUsers, setAllUsers] = useState([]);
//   const [pagination, setPagination] = useState({ page: 1, pageSize: 8, totalCount: 0, totalPages: 1 });
//   const [stats, setStats] = useState({ totalUsers: 0, verifiedHosts: 0, suspendedUsers: 0 });
//   const [loading, setLoading] = useState({ dashboard: true, users: true, delete: false });
//   const [errors, setErrors] = useState({ dashboard: "", users: "" });
//   const [search, setSearch] = useState("");
//   const [toast, setToast] = useState(null);
//   const [activeNav, setActiveNav] = useState("users");
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);

//   const showToast = (message, type = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   // Filter out deleted users
//   const getActiveUsers = (usersList) => {
//     return usersList.filter(user => !isUserDeleted(user));
//   };

//   // Get auth headers
//   const getAuthConfig = useCallback(() => {
//     const token = getAuthToken();
//     if (!token) {
//       return null;
//     }
//     return {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//         'Accept': '*/*'
//       }
//     };
//   }, []);

//   // Fetch dashboard data
//   const fetchDashboard = useCallback(async () => {
//     setLoading(prev => ({ ...prev, dashboard: true }));
//     try {
//       const config = getAuthConfig();
//       if (!config) throw new Error("No token found");
      
//       const response = await axios.get(DASHBOARD_API, config);
//       console.log("Dashboard API Response:", response.data);
//       setDashboardData(response.data);
//     } catch (error) {
//       console.error("Dashboard fetch error:", error);
//       if (error.response?.status === 401) {
//         showToast("Session expired. Please login again.", "error");
//         localStorage.removeItem("userToken");
//         setTimeout(() => window.location.href = "/login", 2000);
//       } else {
//         setErrors(prev => ({ ...prev, dashboard: error.message }));
//       }
//     } finally {
//       setLoading(prev => ({ ...prev, dashboard: false }));
//     }
//   }, [getAuthConfig]);

//   // Fetch users data
//   const fetchUsers = useCallback(async (page = 1, searchTerm = "") => {
//     setLoading(prev => ({ ...prev, users: true }));
//     try {
//       const config = getAuthConfig();
//       if (!config) throw new Error("No token found");
      
//       let url = `${USERS_API}?page=${page}&pageSize=${ITEMS_PER_PAGE * 2}`; // Fetch more to filter deleted
//       if (searchTerm) {
//         url += `&search=${encodeURIComponent(searchTerm)}`;
//       }
      
//       const response = await axios.get(url, config);
//       console.log("Users API Response:", response.data);
      
//       if (response.data.success && response.data.data) {
//         const allFetchedUsers = response.data.data.users || [];
//         // Filter out deleted users
//         const activeUsers = getActiveUsers(allFetchedUsers);
        
//         setAllUsers(activeUsers);
        
//         // Update stats with only active users
//         const totalActiveUsers = activeUsers.length;
//         const verifiedHosts = activeUsers.filter(u => u.status === "verified" || u.status === "Verified").length;
//         const suspendedUsers = activeUsers.filter(u => u.status === "suspended" || u.status === "Suspended").length;
        
//         setStats({
//           totalUsers: totalActiveUsers,
//           verifiedHosts: verifiedHosts,
//           suspendedUsers: suspendedUsers
//         });
        
//         // Update pagination based on active users
//         const totalPages = Math.ceil(activeUsers.length / ITEMS_PER_PAGE);
//         setPagination({
//           page: 1,
//           pageSize: ITEMS_PER_PAGE,
//           totalCount: activeUsers.length,
//           totalPages: totalPages
//         });
//       }
//     } catch (error) {
//       console.error("Users fetch error:", error);
//       if (error.response?.status === 401) {
//         showToast("Session expired. Please login again.", "error");
//         localStorage.removeItem("userToken");
//         setTimeout(() => window.location.href = "/login", 2000);
//       } else {
//         setErrors(prev => ({ ...prev, users: error.message }));
//       }
//     } finally {
//       setLoading(prev => ({ ...prev, users: false }));
//     }
//   }, [getAuthConfig]);

//   // DELETE USER FUNCTION - Hard delete with API
//   const handleDeleteUser = useCallback(async () => {
//     if (!userToDelete) return;
    
//     setLoading(prev => ({ ...prev, delete: true }));
    
//     try {
//       const config = getAuthConfig();
//       if (!config) {
//         showToast("No authentication token found. Please login again.", "error");
//         window.location.href = "/login";
//         return;
//       }

//       const userId = userToDelete.id;
//       console.log("Attempting to delete user with ID:", userId);
      
//       const deleteUrl = `${USERS_API}/${userId}`;
//       console.log("DELETE URL:", deleteUrl);
      
//       const response = await axios.delete(deleteUrl, config);
//       console.log("Delete response:", response.status, response.data);
      
//       // After successful delete, remove from local state immediately
//       setAllUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      
//       // Update stats
//       setStats(prevStats => ({
//         ...prevStats,
//         totalUsers: prevStats.totalUsers - 1
//       }));
      
//       showToast(`User "${userToDelete.fullName || userToDelete.email}" deleted successfully`, "success");
      
//       // Close modal
//       setShowDeleteModal(false);
//       setUserToDelete(null);
      
//       // Refresh dashboard stats
//       await fetchDashboard();
      
//     } catch (error) {
//       console.error("Delete user error:", error);
      
//       if (error.response) {
//         if (error.response.status === 401) {
//           showToast("Authentication failed. Please login again.", "error");
//           localStorage.removeItem("userToken");
//           setTimeout(() => window.location.href = "/login", 2000);
//         } else if (error.response.status === 404) {
//           showToast("User not found. It may have been already deleted.", "error");
//           // Remove from local state anyway
//           setAllUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id));
//         } else {
//           showToast(error.response?.data?.message || "Failed to delete user", "error");
//         }
//       } else if (error.request) {
//         showToast("No response from server. Please check your connection.", "error");
//       } else {
//         showToast(error.message || "Failed to delete user", "error");
//       }
//     } finally {
//       setLoading(prev => ({ ...prev, delete: false }));
//     }
//   }, [userToDelete, getAuthConfig, fetchDashboard]);

//   // Initial data load
//   useEffect(() => {
//     const token = getAuthToken();
//     if (!token) {
//       window.location.href = "/login";
//       return;
//     }
//     fetchDashboard();
//     fetchUsers(1, "");
//   }, []);

//   // Get paginated users (client-side pagination after filtering)
//   const getPaginatedUsers = () => {
//     const start = (pagination.page - 1) * ITEMS_PER_PAGE;
//     const end = start + ITEMS_PER_PAGE;
//     return allUsers.slice(start, end);
//   };

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.totalPages) {
//       setPagination(prev => ({ ...prev, page: newPage }));
//     }
//   };

//   const paginatedUsers = getPaginatedUsers();

//   const navItems = [
//     { id: "dashboard", icon: "bi-grid", label: "Dashboard" },
//     { id: "users", icon: "bi-people", label: "User Management" },
//     { id: "properties", icon: "bi-building", label: "Properties" },
//     { id: "bookings", icon: "bi-calendar-check", label: "Bookings" },
//     { id: "financials", icon: "bi-cash-stack", label: "Financials" },
//     { id: "analytics", icon: "bi-graph-up", label: "Analytics" },
//     { id: "settings", icon: "bi-gear", label: "General Settings" },
//   ];

//   const dashboardMetrics = [
//     { key: "totalListings", label: "Total Listings", isRevenue: false, isGrowth: false },
//     { key: "pendingApproval", label: "Pending Approval", isRevenue: false, isGrowth: false },
//     { key: "listingsGrowthPercent", label: "Listings Growth", isRevenue: false, isGrowth: true },
//     { key: "activeUsers", label: "Active Users", isRevenue: false, isGrowth: false },
//     { key: "totalRenters", label: "Total Renters", isRevenue: false, isGrowth: false },
//     { key: "totalHosts", label: "Total Hosts", isRevenue: false, isGrowth: false },
//     { key: "revenueMTD", label: "Revenue MTD", isRevenue: true, isGrowth: false },
//     { key: "revenueGrowthPercent", label: "Revenue Growth", isRevenue: false, isGrowth: true },
//     { key: "newBookings", label: "New Bookings", isRevenue: false, isGrowth: false },
//     { key: "bookingsGrowthPercent", label: "Bookings Growth", isRevenue: false, isGrowth: true },
//     { key: "bookingsGrowthNote", label: "Growth Note", isRevenue: false, isGrowth: false },
//   ];

//   return (
//     <div style={{ background: "#f5f6fa", minHeight: "100vh" }}>
//       {toast && <Toast msg={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && userToDelete && (
//         <ConfirmDeleteModal
//           user={userToDelete}
//           onConfirm={handleDeleteUser}
//           onCancel={() => {
//             setShowDeleteModal(false);
//             setUserToDelete(null);
//           }}
//           loading={loading.delete}
//         />
//       )}

//       <div style={{ display: "flex" }}>
//         {/* Sidebar */}
//         <aside style={{
//           width: "260px",
//           background: "#fff",
//           borderRight: "1px solid #e5e7eb",
//           minHeight: "100vh",
//           position: "sticky",
//           top: 0
//         }}>
//           <div style={{ padding: "24px 20px", borderBottom: "1px solid #e5e7eb" }}>
//             <h2 style={{ fontSize: "20px", margin: 0, color: "#1e3a8a" }}>
//               <i className="bi bi-shield-lock me-2"></i>
//               Admin Panel
//             </h2>
//             <p style={{ fontSize: "12px", color: "#6b7280", margin: "4px 0 0" }}>Platform Control</p>
//           </div>

//           <nav style={{ padding: "16px 12px" }}>
//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => setActiveNav(item.id)}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "12px",
//                   width: "100%",
//                   padding: "10px 12px",
//                   marginBottom: "4px",
//                   border: "none",
//                   background: activeNav === item.id ? "#eef2ff" : "transparent",
//                   borderRadius: "8px",
//                   color: activeNav === item.id ? "#1e3a8a" : "#4b5563",
//                   fontWeight: activeNav === item.id ? 600 : 500,
//                   cursor: "pointer",
//                   fontSize: "14px",
//                   textAlign: "left"
//                 }}
//               >
//                 <i className={`bi ${item.icon}`} style={{ fontSize: "18px" }}></i>
//                 {item.label}
//               </button>
//             ))}
//           </nav>

//           <div style={{ position: "absolute", bottom: "24px", left: "20px", right: "20px" }}>
//             <button
//               onClick={() => {
//                 localStorage.removeItem("userToken");
//                 window.location.href = "/login";
//               }}
//               style={{
//                 width: "100%",
//                 padding: "10px",
//                 background: "#fff",
//                 border: "1px solid #e5e7eb",
//                 borderRadius: "8px",
//                 color: "#dc2626",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "8px"
//               }}
//             >
//               <i className="bi bi-box-arrow-right"></i>
//               Sign Out
//             </button>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main style={{ flex: 1, padding: "32px", overflow: "hidden" }}>
//           {/* Header */}
//           <div style={{ marginBottom: "32px" }}>
//             <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1f2937", marginBottom: "8px" }}>
//               User Management
//             </h1>
//             <p style={{ color: "#6b7280", fontSize: "14px" }}>
//               Review, monitor and manage roles for all platform participants.
//             </p>
//           </div>

//           {/* Stats Cards - Show only active users stats */}
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "32px" }}>
//             <StatsCard 
//               title="Total Active Users" 
//               value={stats.totalUsers} 
//               icon="bi-people-fill" 
//               color="#eef2ff"
//             />
//             <StatsCard 
//               title="Verified Hosts" 
//               value={stats.verifiedHosts} 
//               icon="bi-shield-check" 
//               color="#e6f7e6"
//             />
//             <StatsCard 
//               title="Suspended Hosts" 
//               value={stats.suspendedUsers} 
//               icon="bi-slash-circle" 
//               color="#ffebee"
//             />
//           </div>

//           {/* Dashboard Metrics */}
//           <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", marginBottom: "32px", border: "1px solid #e5e7eb" }}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
//               <h3 style={{ fontSize: "18px", fontWeight: 600, margin: 0 }}>Dashboard Overview</h3>
//               <button
//                 onClick={() => fetchDashboard()}
//                 style={{
//                   padding: "6px 12px",
//                   background: "#eef2ff",
//                   border: "none",
//                   borderRadius: "6px",
//                   cursor: "pointer",
//                   fontSize: "12px",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "6px"
//                 }}
//               >
//                 <i className="bi bi-arrow-repeat"></i> Refresh
//               </button>
//             </div>

//             {loading.dashboard ? (
//               <div style={{ textAlign: "center", padding: "40px" }}>
//                 <div className="spinner-border text-primary"></div>
//               </div>
//             ) : errors.dashboard ? (
//               <div style={{ color: "#ef4444", textAlign: "center", padding: "40px" }}>{errors.dashboard}</div>
//             ) : (
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
//                 {dashboardMetrics.map((metric) => {
//                   const value = dashboardData[metric.key];
//                   if (value === undefined || value === null) return null;
//                   return (
//                     <DashboardMetricCard
//                       key={metric.key}
//                       label={metric.label}
//                       value={value}
//                       isGrowth={metric.isGrowth}
//                       isRevenue={metric.isRevenue}
//                     />
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* Users Table Section - Only showing active users */}
//           <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
//             {/* Search Bar */}
//             <div style={{ padding: "20px", borderBottom: "1px solid #e5e7eb" }}>
//               <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
//                 <div style={{ flex: 1, position: "relative" }}>
//                   <i className="bi bi-search" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}></i>
//                   <input
//                     type="text"
//                     placeholder="Search by name, email or user ID..."
//                     value={search}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       setSearch(value);
//                       // Filter users based on search
//                       if (value) {
//                         const filtered = allUsers.filter(user => 
//                           user.fullName?.toLowerCase().includes(value.toLowerCase()) ||
//                           user.email?.toLowerCase().includes(value.toLowerCase())
//                         );
//                         setAllUsers(filtered);
//                         setPagination(prev => ({
//                           ...prev,
//                           totalCount: filtered.length,
//                           totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE),
//                           page: 1
//                         }));
//                       } else {
//                         fetchUsers(1, "");
//                       }
//                     }}
//                     style={{
//                       width: "100%",
//                       padding: "10px 12px 10px 36px",
//                       border: "1px solid #e5e7eb",
//                       borderRadius: "8px",
//                       fontSize: "14px",
//                       outline: "none"
//                     }}
//                   />
//                 </div>
//                 {search && (
//                   <button
//                     onClick={() => {
//                       setSearch("");
//                       fetchUsers(1, "");
//                     }}
//                     style={{
//                       padding: "8px 16px",
//                       background: "#f3f4f6",
//                       border: "1px solid #e5e7eb",
//                       borderRadius: "8px",
//                       cursor: "pointer"
//                     }}
//                   >
//                     Clear
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Users Table */}
//             {loading.users ? (
//               <div style={{ textAlign: "center", padding: "60px" }}>
//                 <div className="spinner-border text-primary"></div>
//               </div>
//             ) : errors.users ? (
//               <div style={{ textAlign: "center", padding: "60px", color: "#ef4444" }}>{errors.users}</div>
//             ) : (
//               <>
//                 <div style={{ overflowX: "auto" }}>
//                   <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                     <thead style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
//                       <tr>
//                         <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase" }}>
//                           USER PROFILE
//                         </th>
//                         <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase" }}>
//                           JOIN DATE
//                         </th>
//                         <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase" }}>
//                           IDENTITY STATUS
//                         </th>
//                         <th style={{ padding: "16px", textAlign: "right", fontSize: "12px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase" }}>
//                           ACTIONS
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {paginatedUsers.length === 0 ? (
//                         <tr>
//                           <td colSpan="4" style={{ textAlign: "center", padding: "60px", color: "#6b7280" }}>
//                             <i className="bi bi-inbox" style={{ fontSize: "48px", display: "block", marginBottom: "16px" }}></i>
//                             No active users found
//                            </td>
//                         </tr>
//                       ) : (
//                         paginatedUsers.map((user) => (
//                           <tr key={user.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
//                             <td style={{ padding: "16px" }}>
//                               <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//                                 <div style={{
//                                   width: "40px",
//                                   height: "40px",
//                                   borderRadius: "50%",
//                                   background: "#eef2ff",
//                                   display: "flex",
//                                   alignItems: "center",
//                                   justifyContent: "center",
//                                   fontWeight: "bold",
//                                   fontSize: "16px",
//                                   color: "#1e3a8a"
//                                 }}>
//                                   {user.fullName?.charAt(0) || user.email?.charAt(0) || "U"}
//                                 </div>
//                                 <div>
//                                   <div style={{ fontWeight: 600, color: "#1f2937", marginBottom: "4px" }}>
//                                     {user.fullName || user.name || "Unknown User"}
//                                   </div>
//                                   <div style={{ fontSize: "13px", color: "#6b7280" }}>
//                                     {user.email || "No email provided"}
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                             <td style={{ padding: "16px", color: "#6b7280", fontSize: "14px" }}>
//                               {formatDate(user.joinDate)}
//                             </td>
//                             <td style={{ padding: "16px" }}>
//                               <StatusBadge 
//                                 status={user.status || "pending"} 
//                                 isDeleted={isUserDeleted(user)}
//                               />
//                             </td>
//                             <td style={{ padding: "16px", textAlign: "right" }}>
//                               <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
//                                 {/* View Button */}
//                                 <button
//                                   onClick={() => {
//                                     showToast(`Viewing ${user.fullName || user.email}`, "info");
//                                   }}
//                                   style={{
//                                     padding: "6px 12px",
//                                     background: "#eef2ff",
//                                     border: "none",
//                                     borderRadius: "6px",
//                                     cursor: "pointer",
//                                     fontSize: "13px",
//                                     display: "inline-flex",
//                                     alignItems: "center",
//                                     gap: "6px",
//                                     color: "#1e3a8a"
//                                   }}
//                                 >
//                                   <i className="bi bi-eye"></i> View
//                                 </button>
                                
//                                 {/* Delete Button - Only show for active users */}
//                                 {!isUserDeleted(user) && (
//                                   <button
//                                     onClick={() => {
//                                       console.log("Delete button clicked for user:", user);
//                                       setUserToDelete(user);
//                                       setShowDeleteModal(true);
//                                     }}
//                                     style={{
//                                       padding: "6px 12px",
//                                       background: "#fee2e2",
//                                       border: "none",
//                                       borderRadius: "6px",
//                                       cursor: "pointer",
//                                       fontSize: "13px",
//                                       display: "inline-flex",
//                                       alignItems: "center",
//                                       gap: "6px",
//                                       color: "#dc2626"
//                                     }}
//                                   >
//                                     <i className="bi bi-trash"></i> Delete
//                                   </button>
//                                 )}
//                               </div>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Pagination */}
//                 {pagination.totalPages > 0 && (
//                   <div style={{ padding: "20px", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
//                     <div style={{ fontSize: "14px", color: "#6b7280" }}>
//                       Showing {((pagination.page - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(pagination.page * ITEMS_PER_PAGE, pagination.totalCount)} of {pagination.totalCount} active users
//                     </div>
//                     <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
//                       <button
//                         onClick={() => handlePageChange(pagination.page - 1)}
//                         disabled={pagination.page === 1}
//                         style={{
//                           padding: "6px 12px",
//                           border: "1px solid #e5e7eb",
//                           background: "#fff",
//                           borderRadius: "6px",
//                           cursor: pagination.page === 1 ? "not-allowed" : "pointer",
//                           opacity: pagination.page === 1 ? 0.5 : 1
//                         }}
//                       >
//                         Previous
//                       </button>
                      
//                       {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                         let pageNum;
//                         if (pagination.totalPages <= 5) {
//                           pageNum = i + 1;
//                         } else if (pagination.page <= 3) {
//                           pageNum = i + 1;
//                         } else if (pagination.page >= pagination.totalPages - 2) {
//                           pageNum = pagination.totalPages - 4 + i;
//                         } else {
//                           pageNum = pagination.page - 2 + i;
//                         }
                        
//                         return (
//                           <button
//                             key={pageNum}
//                             onClick={() => handlePageChange(pageNum)}
//                             style={{
//                               padding: "6px 12px",
//                               border: "1px solid #e5e7eb",
//                               background: pagination.page === pageNum ? "#1e3a8a" : "#fff",
//                               color: pagination.page === pageNum ? "#fff" : "#4b5563",
//                               borderRadius: "6px",
//                               cursor: "pointer",
//                               fontWeight: pagination.page === pageNum ? 600 : 400
//                             }}
//                           >
//                             {pageNum}
//                           </button>
//                         );
//                       })}
                      
//                       <button
//                         onClick={() => handlePageChange(pagination.page + 1)}
//                         disabled={pagination.page === pagination.totalPages}
//                         style={{
//                           padding: "6px 12px",
//                           border: "1px solid #e5e7eb",
//                           background: "#fff",
//                           borderRadius: "6px",
//                           cursor: pagination.page === pagination.totalPages ? "not-allowed" : "pointer",
//                           opacity: pagination.page === pagination.totalPages ? 0.5 : 1
//                         }}
//                       >
//                         Next
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardPage;




























































// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";

// // ============================================================
// // API ENDPOINTS
// // ============================================================
// const DASHBOARD_API = "https://graduationproject1.runasp.net/api/admin/dashboard";
// const USERS_API = "https://graduationproject1.runasp.net/api/admin/Users";
// const ITEMS_PER_PAGE = 8;

// // ============================================================
// // HELPER FUNCTIONS
// // ============================================================
// const getAuthToken = () => {
//   return localStorage.getItem("userToken");
// };

// const formatDate = (dateString) => {
//   if (!dateString || dateString === "0001-01-01T00:00:00") return "N/A";
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
// };

// const formatCurrency = (value) => {
//   if (!value && value !== 0) return "$0";
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0
//   }).format(value);
// };

// const isUserDeleted = (user) => {
//   if (user.email && user.email.includes('_deleted_')) return true;
//   if (user.isDeleted === true) return true;
//   return false;
// };

// // ============================================================
// // TOAST COMPONENT
// // ============================================================
// function Toast({ msg, type, onClose }) {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: "20px",
//         right: "20px",
//         zIndex: 10000,
//         background: type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6",
//         color: "#fff",
//         padding: "12px 20px",
//         borderRadius: "8px",
//         fontSize: "14px",
//         fontWeight: "500",
//         display: "flex",
//         alignItems: "center",
//         gap: "10px",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//       }}
//     >
//       <i className={`bi ${type === "success" ? "bi-check-circle" : "bi-exclamation-triangle"}`}></i>
//       <span>{msg}</span>
//     </div>
//   );
// }

// // ============================================================
// // REVIEWS SECTION
// // ============================================================
// function ReviewsSection({ reviews }) {
//   if (!reviews || reviews.length === 0) {
//     return (
//       <div style={{ padding: "16px", textAlign: "center", color: "#6b7280" }}>
//         <i className="bi bi-chat-dots" style={{ fontSize: "24px", display: "block", marginBottom: "8px" }}></i>
//         No reviews yet
//       </div>
//     );
//   }

//   return (
//     <div>
//       {reviews.map((review, index) => (
//         <div key={index} style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: index < reviews.length - 1 ? "1px solid #e5e7eb" : "none" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
//             <div style={{
//               width: "32px",
//               height: "32px",
//               borderRadius: "50%",
//               background: "#1e3a8a",
//               color: "#fff",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontWeight: "bold",
//               fontSize: "14px"
//             }}>
//               {review.reviewerName?.charAt(0) || "U"}
//             </div>
//             <div>
//               <div style={{ fontWeight: 600, fontSize: "14px" }}>{review.reviewerName || "Anonymous"}</div>
//               <div style={{ fontSize: "11px", color: "#6b7280" }}>{formatDate(review.createdAt) || "Recent"}</div>
//             </div>
//             <div style={{ marginLeft: "auto", color: "#fbbf24" }}>
//               {"⭐".repeat(Math.round(review.rating || 0))}
//             </div>
//           </div>
//           <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.5", margin: "0 0 0 44px" }}>
//             "{review.comment || "No comment provided"}"
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// // ============================================================
// // LISTINGS SECTION
// // ============================================================
// function ListingsSection({ listings, totalListings }) {
//   if (!listings || listings.length === 0) {
//     return (
//       <div style={{ padding: "16px", textAlign: "center", color: "#6b7280" }}>
//         <i className="bi bi-building" style={{ fontSize: "24px", display: "block", marginBottom: "8px" }}></i>
//         No active listings ({totalListings || 0} total)
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div style={{ marginBottom: "12px", fontSize: "13px", color: "#6b7280" }}>
//         Total Listings: <strong>{totalListings || listings.length}</strong>
//       </div>
//       {listings.map((listing) => (
//         <div key={listing.propertyId} style={{
//           marginBottom: "16px",
//           padding: "16px",
//           background: "#f9fafb",
//           borderRadius: "12px",
//           border: "1px solid #e5e7eb"
//         }}>
//           <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
//             <div style={{
//               width: "80px",
//               height: "80px",
//               borderRadius: "8px",
//               background: "#e5e7eb",
//               overflow: "hidden",
//               flexShrink: 0
//             }}>
//               {listing.image ? (
//                 <img src={listing.image} alt={listing.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//               ) : (
//                 <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", color: "#6b7280" }}>
//                   🏠
//                 </div>
//               )}
//             </div>
//             <div style={{ flex: 1 }}>
//               <div style={{ fontWeight: 600, fontSize: "15px", marginBottom: "4px" }}>{listing.title || "Untitled"}</div>
//               <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
//                 <i className="bi bi-geo-alt"></i> {listing.city || listing.government || "Location not specified"}
//               </div>
//               <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#6b7280", flexWrap: "wrap" }}>
//                 <span><i className="bi bi-house"></i> {listing.type || "N/A"}</span>
//                 <span><i className="bi bi-bed"></i> {listing.beds || 0} beds</span>
//                 <span><i className="bi bi-droplet"></i> {listing.baths || 0} baths</span>
//                 <span><i className="bi bi-rulers"></i> {listing.size || 0} m²</span>
//                 {listing.wifi && <span style={{ color: "#10b981" }}><i className="bi bi-wifi"></i> WiFi</span>}
//               </div>
//               {listing.rating > 0 && (
//                 <div style={{ fontSize: "12px", marginTop: "4px", color: "#fbbf24" }}>
//                   {"⭐".repeat(Math.round(listing.rating))} {listing.rating}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// // ============================================================
// // USER DETAILS PAGE - DISPLAYS ALL API DATA
// // ============================================================
// function UserDetailsPage({ user, onBack, onDelete, onSuspend }) {
//   const [activeTab, setActiveTab] = useState("personal");
  
//   if (!user) return null;

//   // Log all user data to console
//   console.log("📋 Full User Details from API:", user);
//   console.log("User ID:", user.id);
//   console.log("Full Name:", user.fullName);
//   console.log("First Name:", user.firstName);
//   console.log("Last Name:", user.lastName);
//   console.log("Email:", user.email);
//   console.log("Phone:", user.phoneNumber);
//   console.log("City:", user.city);
//   console.log("Governorate:", user.governorate);
//   console.log("Gender:", user.gender);
//   console.log("Birth Date:", user.birthDate);
//   console.log("Field of Study:", user.fieldOfStudy);
//   console.log("University:", user.university);
//   console.log("Job Title:", user.jobTitle);
//   console.log("Status:", user.userStatus);
//   console.log("Is Deleted:", user.isDeleted);
//   console.log("Created At:", user.createdAt);
//   console.log("Total Listings:", user.totalListings);
//   console.log("Listings:", user.listings);
//   console.log("Reviews:", user.reviews);
//   console.log("All User Fields:", Object.keys(user));

//   const getValue = (key) => {
//     const value = user[key];
//     if (value === undefined || value === null) return null;
//     if (typeof value === "boolean") return value ? "Yes" : "No";
//     if (key === "birthDate" || key === "createdAt" || key === "deletedAt" || key === "suspendedAt") {
//       return formatDate(value);
//     }
//     return value;
//   };

//   return (
//     <div style={{ background: "#f5f6fa", minHeight: "100vh" }}>
//       {/* Header */}
//       <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 100 }}>
//         <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//             <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", background: "#eef2ff", border: "none", borderRadius: "8px", cursor: "pointer", color: "#1e3a8a", fontWeight: 500, fontSize: "14px" }}>
//               <i className="bi bi-arrow-left"></i> Back to Users
//             </button>
//             <div>
//               <h1 style={{ fontSize: "20px", margin: 0, color: "#1f2937" }}>User Management Detail</h1>
//               <p style={{ fontSize: "13px", color: "#6b7280", margin: "4px 0 0" }}>
//                 Reviewing profile and verification for {user.fullName || user.email}
//               </p>
//             </div>
//           </div>
//           <div style={{ display: "flex", gap: "12px" }}>
//             <button onClick={() => onSuspend && onSuspend(user)} style={{ padding: "8px 20px", background: "#fef3c7", border: "none", borderRadius: "8px", cursor: "pointer", color: "#92400e", fontWeight: 500, display: "flex", alignItems: "center", gap: "8px" }}>
//               <i className="bi bi-slash-circle"></i> Suspend user
//             </button>
//             <button onClick={() => onDelete && onDelete(user)} style={{ padding: "8px 20px", background: "#fee2e2", border: "none", borderRadius: "8px", cursor: "pointer", color: "#dc2626", fontWeight: 500, display: "flex", alignItems: "center", gap: "8px" }}>
//               <i className="bi bi-trash"></i> Delete User
//             </button>
//           </div>
//         </div>
//       </div>

//       <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px" }}>
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "32px" }}>
          
//           {/* LEFT COLUMN */}
//           <div>
//             {/* Personal Information Card */}
//             <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", marginBottom: "24px", overflow: "hidden" }}>
//               <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
//                 <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#1f2937" }}>
//                   <i className="bi bi-person-circle me-2"></i>Personal Information
//                 </h3>
//               </div>
//               <div style={{ padding: "24px" }}>
//                 <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
//                   <div>
//                     <label style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>EMAIL ADDRESS</label>
//                     <p style={{ marginTop: "6px", fontSize: "14px", color: "#1f2937", fontWeight: 500 }}>{getValue("email") || "Not provided"}</p>
//                   </div>
//                   <div>
//                     <label style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>PHONE NUMBER</label>
//                     <p style={{ marginTop: "6px", fontSize: "14px", color: "#1f2937", fontWeight: 500 }}>{getValue("phoneNumber") || "Not provided"}</p>
//                   </div>
//                   <div>
//                     <label style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>LOCATION</label>
//                     <p style={{ marginTop: "6px", fontSize: "14px", color: "#1f2937", fontWeight: 500 }}>
//                       {[getValue("city"), getValue("governorate")].filter(Boolean).join(", ") || "Not provided"}
//                     </p>
//                   </div>
//                   <div>
//                     <label style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>GENDER</label>
//                     <p style={{ marginTop: "6px", fontSize: "14px", color: "#1f2937", fontWeight: 500 }}>{getValue("gender") || "Not provided"}</p>
//                   </div>
//                 </div>
//                 <div style={{ marginTop: "16px" }}>
//                   <label style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>BIRTHDAY</label>
//                   <p style={{ marginTop: "6px", fontSize: "14px", color: "#1f2937", fontWeight: 500 }}>{getValue("birthDate") || "Not provided"}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Education & Career Card */}
//             {(user.fieldOfStudy || user.university || user.jobTitle) && (
//               <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", marginBottom: "24px", overflow: "hidden" }}>
//                 <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
//                   <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#1f2937" }}>
//                     <i className="bi bi-mortarboard me-2"></i>Education & Career
//                   </h3>
//                 </div>
//                 <div style={{ padding: "24px" }}>
//                   <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
//                     {user.fieldOfStudy && (
//                       <div>
//                         <label style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>FIELD OF STUDY</label>
//                         <p style={{ marginTop: "6px", fontSize: "14px", color: "#1f2937", fontWeight: 500 }}>{user.fieldOfStudy}</p>
//                       </div>
//                     )}
//                     {user.university && (
//                       <div>
//                         <label style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>UNIVERSITY</label>
//                         <p style={{ marginTop: "6px", fontSize: "14px", color: "#1f2937", fontWeight: 500 }}>{user.university}</p>
//                       </div>
//                     )}
//                     {user.jobTitle && (
//                       <div>
//                         <label style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>CURRENT JOB</label>
//                         <p style={{ marginTop: "6px", fontSize: "14px", color: "#1f2937", fontWeight: 500 }}>{user.jobTitle}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Verification Documents Card */}
//             <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", marginBottom: "24px", overflow: "hidden" }}>
//               <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
//                 <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#1f2937" }}>
//                   <i className="bi bi-file-text me-2"></i>Verification Documents
//                 </h3>
//               </div>
//               <div style={{ padding: "24px" }}>
//                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//                     <i className="bi bi-card-id" style={{ fontSize: "20px", color: "#1e3a8a" }}></i>
//                     <span style={{ fontSize: "14px", color: "#1f2937" }}>National ID Card</span>
//                     {user.idImage ? (
//                       <span style={{ background: "#e6f7e6", color: "#2e7d32", padding: "2px 8px", borderRadius: "12px", fontSize: "11px" }}>Uploaded</span>
//                     ) : (
//                       <span style={{ background: "#fef3c7", color: "#92400e", padding: "2px 8px", borderRadius: "12px", fontSize: "11px" }}>Not Uploaded</span>
//                     )}
//                   </div>
//                   <button style={{ padding: "6px 12px", background: "#eef2ff", border: "none", borderRadius: "6px", cursor: "pointer", color: "#1e3a8a", fontSize: "12px" }}>
//                     View Details
//                   </button>
//                 </div>
//                 {user.profilePicture && (
//                   <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
//                     <i className="bi bi-image" style={{ fontSize: "20px", color: "#1e3a8a" }}></i>
//                     <span style={{ fontSize: "14px", color: "#1f2937" }}>Profile Picture</span>
//                     <span style={{ background: "#e6f7e6", color: "#2e7d32", padding: "2px 8px", borderRadius: "12px", fontSize: "11px" }}>Uploaded</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Active Listings Card - From API */}
//             <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", marginBottom: "24px", overflow: "hidden" }}>
//               <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb", background: "#f9fafb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#1f2937" }}>
//                   <i className="bi bi-building me-2"></i>Active Listings ({user.totalListings || 0})
//                 </h3>
//                 <button style={{ padding: "4px 12px", background: "#eef2ff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>View All</button>
//               </div>
//               <div style={{ padding: "24px" }}>
//                 <ListingsSection listings={user.listings} totalListings={user.totalListings} />
//               </div>
//             </div>

//             {/* Recent Reviews Card - From API */}
//             <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
//               <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
//                 <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#1f2937" }}>
//                   <i className="bi bi-star me-2"></i>Recent Reviews ({user.reviews?.length || 0})
//                 </h3>
//               </div>
//               <div style={{ padding: "24px" }}>
//                 <ReviewsSection reviews={user.reviews} />
//               </div>
//             </div>
//           </div>

//           {/* RIGHT COLUMN - Profile Card */}
//           <div>
//             <div style={{
//               background: "#fff",
//               borderRadius: "16px",
//               border: "1px solid #e5e7eb",
//               position: "sticky",
//               top: "100px",
//               overflow: "hidden"
//             }}>
//               {/* Profile Header */}
//               <div style={{
//                 background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
//                 padding: "32px 24px",
//                 textAlign: "center",
//                 color: "#fff"
//               }}>
//                 <div style={{
//                   width: "100px",
//                   height: "100px",
//                   borderRadius: "50%",
//                   background: "#fff",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   margin: "0 auto 16px",
//                   fontSize: "48px",
//                   fontWeight: "bold",
//                   color: "#1e3a8a",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
//                 }}>
//                   {user.fullName?.charAt(0) || user.firstName?.charAt(0) || user.email?.charAt(0) || "U"}
//                 </div>
//                 <h2 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: 700 }}>
//                   {user.fullName || user.firstName || "User"}
//                 </h2>
//                 <div style={{
//                   display: "inline-flex",
//                   alignItems: "center",
//                   gap: "6px",
//                   background: "rgba(255,255,255,0.2)",
//                   padding: "4px 12px",
//                   borderRadius: "20px",
//                   fontSize: "12px"
//                 }}>
//                   <i className="bi bi-patch-check-fill"></i>
//                   {user.userStatus === "Verified" ? "Verified" : (user.userStatus || "Pending Verification")}
//                 </div>
//               </div>

//               {/* Profile Content */}
//               <div style={{ padding: "24px" }}>
//                 {/* About Section */}
//                 <div style={{ marginBottom: "24px" }}>
//                   <label style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>ABOUT</label>
//                   <p style={{ marginTop: "8px", fontSize: "14px", color: "#4b5563", lineHeight: "1.5", fontStyle: "italic" }}>
//                     "{user.aboutMe || user.bio || `Host profile for ${user.fullName || user.firstName || "User"}`}"
//                   </p>
//                 </div>

//                 {/* Join Date */}
//                 <div style={{ marginBottom: "24px", paddingTop: "16px", borderTop: "1px solid #e5e7eb" }}>
//                   <label style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>JOIN DATE</label>
//                   <p style={{ marginTop: "8px", fontSize: "14px", color: "#1f2937", fontWeight: 500 }}>
//                     {formatDate(user.createdAt) || "N/A"}
//                   </p>
//                 </div>

//                 {/* User Status */}
//                 <div style={{ marginBottom: "24px", paddingTop: "8px" }}>
//                   <label style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>ACCOUNT STATUS</label>
//                   <p style={{ marginTop: "8px", fontSize: "14px", color: "#1f2937", fontWeight: 500 }}>
//                     {user.userStatus || "N/A"}
//                   </p>
//                 </div>

//                 {/* User ID */}
//                 <div style={{ marginBottom: "24px", paddingTop: "8px" }}>
//                   <label style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>USER ID</label>
//                   <p style={{ marginTop: "8px", fontSize: "12px", color: "#6b7280", fontFamily: "monospace", wordBreak: "break-all" }}>
//                     {user.id}
//                   </p>
//                 </div>

//                 {/* Total Listings */}
//                 <div style={{ marginBottom: "24px", paddingTop: "8px" }}>
//                   <label style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 }}>TOTAL LISTINGS</label>
//                   <p style={{ marginTop: "8px", fontSize: "14px", color: "#1f2937", fontWeight: 500 }}>
//                     {user.totalListings || 0}
//                   </p>
//                 </div>

//                 {/* Action Buttons */}
//                 <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #e5e7eb" }}>
//                   <button onClick={() => onDelete && onDelete(user)} style={{ padding: "12px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "14px" }}>
//                     <i className="bi bi-trash-fill"></i> Delete User
//                   </button>
//                   <button onClick={() => onSuspend && onSuspend(user)} style={{ padding: "12px", background: "#fef3c7", color: "#92400e", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "14px" }}>
//                     <i className="bi bi-slash-circle"></i> Suspend user
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // STATUS BADGE COMPONENT
// // ============================================================
// function StatusBadge({ user }) {
//   const isDeleted = isUserDeleted(user);
  
//   if (isDeleted) {
//     return <span style={{ background: "#fee2e2", color: "#991b1b", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "6px" }}><i className="bi bi-trash-fill"></i> Deleted</span>;
//   }
//   if (user?.userStatus === "Verified" || user?.isVerified === true) {
//     return <span style={{ background: "#e6f7e6", color: "#2e7d32", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "6px" }}><i className="bi bi-patch-check-fill"></i> Verified</span>;
//   }
//   if (user?.userStatus === "Suspended" || user?.isSuspended === true) {
//     return <span style={{ background: "#ffebee", color: "#c62828", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "6px" }}><i className="bi bi-slash-circle"></i> Suspended</span>;
//   }
//   return <span style={{ background: "#fff3e0", color: "#ed6c02", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "6px" }}><i className="bi bi-hourglass-split"></i> {user?.userStatus || "Pending Review"}</span>;
// }

// // ============================================================
// // STATS CARD COMPONENT
// // ============================================================
// function StatsCard({ title, value, icon, color }) {
//   return (
//     <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #e5e7eb" }}>
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
//         <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: color || "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", color: "#1e3a8a" }}>
//           <i className={`bi ${icon}`}></i>
//         </div>
//       </div>
//       <div style={{ fontSize: "28px", fontWeight: "bold", color: "#1f2937", marginBottom: "4px" }}>{typeof value === "number" ? value.toLocaleString() : value}</div>
//       <div style={{ fontSize: "14px", color: "#6b7280" }}>{title}</div>
//     </div>
//   );
// }

// // ============================================================
// // DASHBOARD METRIC CARD
// // ============================================================
// function DashboardMetricCard({ label, value }) {
//   let displayValue = value;
//   if (typeof value === "number") {
//     if (label.toLowerCase().includes("revenue") || label.toLowerCase().includes("mtd")) {
//       displayValue = formatCurrency(value);
//     } else {
//       displayValue = value.toLocaleString();
//     }
//   }
//   return (
//     <div style={{ background: "#fff", borderRadius: "10px", padding: "16px", border: "1px solid #e5e7eb" }}>
//       <div style={{ fontSize: "12px", color: "#6b7280", textTransform: "uppercase", marginBottom: "8px" }}>{label}</div>
//       <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1f2937" }}>{displayValue}</div>
//     </div>
//   );
// }

// // ============================================================
// // CONFIRMATION MODAL
// // ============================================================
// function ConfirmModal({ title, message, onConfirm, onCancel, loading }) {
//   return (
//     <div onClick={onCancel} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
//       <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: "16px", padding: "24px", maxWidth: "400px", width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
//           <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", color: "#dc2626" }}><i className="bi bi-exclamation-triangle-fill"></i></div>
//           <div><h3 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>{title}</h3><p style={{ margin: "4px 0 0", fontSize: "13px", color: "#6b7280" }}>This action cannot be undone</p></div>
//         </div>
//         <p style={{ fontSize: "14px", color: "#374151", marginBottom: "24px" }}>{message}</p>
//         <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
//           <button onClick={onCancel} disabled={loading} style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: 500 }}>Cancel</button>
//           <button onClick={onConfirm} disabled={loading} style={{ padding: "8px 20px", borderRadius: "8px", border: "none", background: "#dc2626", color: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
//             {loading ? <><span className="spinner-border spinner-border-sm"></span> Processing...</> : <><i className="bi bi-check-lg"></i> Confirm</>}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // MAIN ADMIN DASHBOARD
// // ============================================================
// const AdminDashboardPage = () => {
//   const [dashboardData, setDashboardData] = useState({});
//   const [allUsers, setAllUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showUserDetails, setShowUserDetails] = useState(false);
//   const [pagination, setPagination] = useState({ page: 1, pageSize: 8, totalCount: 0, totalPages: 1 });
//   const [stats, setStats] = useState({ totalUsers: 0, verifiedHosts: 0, suspendedUsers: 0 });
//   const [loading, setLoading] = useState({ dashboard: true, users: true, delete: false });
//   const [search, setSearch] = useState("");
//   const [toast, setToast] = useState(null);
//   const [activeNav, setActiveNav] = useState("dashboard");
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [confirmAction, setConfirmAction] = useState(null);
//   const [pendingUser, setPendingUser] = useState(null);

//   const showToast = (message, type = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const getActiveUsers = (usersList) => usersList.filter(user => !isUserDeleted(user));
//   const getAuthConfig = useCallback(() => {
//     const token = getAuthToken();
//     return token ? { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': '*/*' } } : null;
//   }, []);

//   const fetchDashboard = useCallback(async () => {
//     setLoading(prev => ({ ...prev, dashboard: true }));
//     try {
//       const config = getAuthConfig();
//       if (!config) throw new Error("No token found");
//       const response = await axios.get(DASHBOARD_API, config);
//       console.log("📊 Dashboard Data from API:", response.data);
//       setDashboardData(response.data);
//     } catch (error) {
//       console.error("Dashboard error:", error);
//       if (error.response?.status === 401) {
//         showToast("Session expired. Please login again.", "error");
//         localStorage.removeItem("userToken");
//         setTimeout(() => window.location.href = "/login", 2000);
//       }
//     } finally {
//       setLoading(prev => ({ ...prev, dashboard: false }));
//     }
//   }, [getAuthConfig]);

//   const fetchUsers = useCallback(async () => {
//     setLoading(prev => ({ ...prev, users: true }));
//     try {
//       const config = getAuthConfig();
//       if (!config) throw new Error("No token found");
//       const response = await axios.get(`${USERS_API}?page=1&pageSize=100`, config);
//       console.log("👥 Users Data from API:", response.data);
      
//       if (response.data.success && response.data.data) {
//         const allFetchedUsers = response.data.data.users || [];
//         console.log("📋 All Users List:", allFetchedUsers);
        
//         const activeUsers = getActiveUsers(allFetchedUsers);
//         setAllUsers(activeUsers);
//         setStats({
//           totalUsers: activeUsers.length,
//           verifiedHosts: activeUsers.filter(u => u.userStatus === "Verified" || u.isVerified === true).length,
//           suspendedUsers: activeUsers.filter(u => u.userStatus === "Suspended" || u.isSuspended === true).length
//         });
//         setPagination({ page: 1, pageSize: ITEMS_PER_PAGE, totalCount: activeUsers.length, totalPages: Math.ceil(activeUsers.length / ITEMS_PER_PAGE) });
//       }
//     } catch (error) {
//       console.error("Users fetch error:", error);
//       if (error.response?.status === 401) {
//         showToast("Session expired. Please login again.", "error");
//         localStorage.removeItem("userToken");
//         setTimeout(() => window.location.href = "/login", 2000);
//       }
//     } finally {
//       setLoading(prev => ({ ...prev, users: false }));
//     }
//   }, [getAuthConfig]);

//   const fetchUserDetails = useCallback(async (userId) => {
//     try {
//       const config = getAuthConfig();
//       if (!config) throw new Error("No token found");
//       const response = await axios.get(`${USERS_API}/${userId}`, config);
//       console.log("👤 User Details from API:", response.data);
      
//       if (response.data.success && response.data.data) {
//         return response.data.data;
//       }
//       return null;
//     } catch (error) {
//       console.error("User details fetch error:", error);
//       if (error.response?.status === 401) {
//         showToast("Session expired. Please login again.", "error");
//         localStorage.removeItem("userToken");
//         setTimeout(() => window.location.href = "/login", 2000);
//       }
//       return null;
//     }
//   }, [getAuthConfig]);

//   const handleDeleteUser = async (user) => { setPendingUser(user); setConfirmAction("delete"); setShowConfirmModal(true); };
//   const handleSuspendUser = async (user) => { setPendingUser(user); setConfirmAction("suspend"); setShowConfirmModal(true); };

//   const executeAction = async () => {
//     if (!pendingUser) return;
//     setLoading(prev => ({ ...prev, delete: true }));
//     try {
//       const config = getAuthConfig();
//       if (!config) throw new Error("No token found");
//       if (confirmAction === "delete") {
//         await axios.delete(`${USERS_API}/${pendingUser.id}`, config);
//         showToast(`User "${pendingUser.fullName || pendingUser.email}" deleted successfully`, "success");
//         setAllUsers(prevUsers => prevUsers.filter(u => u.id !== pendingUser.id));
//         setStats(prevStats => ({ ...prevStats, totalUsers: prevStats.totalUsers - 1 }));
//       } else if (confirmAction === "suspend") {
//         showToast(`User "${pendingUser.fullName || pendingUser.email}" suspended`, "success");
//       }
//       if (showUserDetails) { setShowUserDetails(false); setSelectedUser(null); }
//       await fetchDashboard();
//     } catch (error) {
//       console.error("Action error:", error);
//       showToast(error.response?.data?.message || `Failed to ${confirmAction} user`, "error");
//     } finally {
//       setLoading(prev => ({ ...prev, delete: false }));
//       setShowConfirmModal(false); setPendingUser(null); setConfirmAction(null);
//     }
//   };

//   useEffect(() => {
//     const token = getAuthToken();
//     if (!token) { window.location.href = "/login"; return; }
//     fetchDashboard(); fetchUsers();
//   }, []);

//   const getPaginatedUsers = () => {
//     const start = (pagination.page - 1) * ITEMS_PER_PAGE;
//     return allUsers.slice(start, start + ITEMS_PER_PAGE);
//   };
//   const handlePageChange = (newPage) => { if (newPage >= 1 && newPage <= pagination.totalPages) setPagination(prev => ({ ...prev, page: newPage })); };
//   const paginatedUsers = getPaginatedUsers();
//   const dashboardMetrics = Object.entries(dashboardData).map(([key, value]) => ({ key, label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim(), value }));

//   if (showUserDetails && selectedUser) {
//     return <UserDetailsPage user={selectedUser} onBack={() => setShowUserDetails(false)} onDelete={handleDeleteUser} onSuspend={handleSuspendUser} />;
//   }

//   const navItems = [
//     { id: "dashboard", icon: "bi-grid", label: "Dashboard" },
//     { id: "users", icon: "bi-people", label: "User Management" },
//     { id: "properties", icon: "bi-building", label: "Properties" },
//     { id: "bookings", icon: "bi-calendar-check", label: "Bookings" },
//     { id: "financials", icon: "bi-cash-stack", label: "Financials" },
//     { id: "analytics", icon: "bi-graph-up", label: "Analytics" },
//     { id: "settings", icon: "bi-gear", label: "General Settings" },
//   ];

//   return (
//     <div style={{ background: "#f5f6fa", minHeight: "100vh" }}>
//       {toast && <Toast msg={toast.message} type={toast.type} onClose={() => setToast(null)} />}
//       {showConfirmModal && <ConfirmModal title={confirmAction === "delete" ? "Delete User" : "Suspend User"} message={confirmAction === "delete" ? `Are you sure you want to delete "${pendingUser?.fullName || pendingUser?.email}"? All their data will be permanently removed.` : `Are you sure you want to suspend "${pendingUser?.fullName || pendingUser?.email}"? They will not be able to use the platform.`} onConfirm={executeAction} onCancel={() => { setShowConfirmModal(false); setPendingUser(null); setConfirmAction(null); }} loading={loading.delete} />}

//       <div style={{ display: "flex" }}>
//         <aside style={{ width: "260px", background: "#fff", borderRight: "1px solid #e5e7eb", minHeight: "100vh", position: "sticky", top: 0 }}>
//           <div style={{ padding: "24px 20px", borderBottom: "1px solid #e5e7eb" }}><h2 style={{ fontSize: "20px", margin: 0, color: "#1e3a8a" }}><i className="bi bi-shield-lock me-2"></i>Admin Panel</h2><p style={{ fontSize: "12px", color: "#6b7280", margin: "4px 0 0" }}>Platform Control</p></div>
//           <nav style={{ padding: "16px 12px" }}>{navItems.map((item) => (<button key={item.id} onClick={() => setActiveNav(item.id)} style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "10px 12px", marginBottom: "4px", border: "none", background: activeNav === item.id ? "#eef2ff" : "transparent", borderRadius: "8px", color: activeNav === item.id ? "#1e3a8a" : "#4b5563", fontWeight: activeNav === item.id ? 600 : 500, cursor: "pointer", fontSize: "14px", textAlign: "left" }}><i className={`bi ${item.icon}`} style={{ fontSize: "18px" }}></i>{item.label}</button>))}</nav>
//           <div style={{ position: "absolute", bottom: "24px", left: "20px", right: "20px" }}><button onClick={() => { localStorage.removeItem("userToken"); window.location.href = "/login"; }} style={{ width: "100%", padding: "10px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", color: "#dc2626", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}><i className="bi bi-box-arrow-right"></i>Sign Out</button></div>
//         </aside>

//         <main style={{ flex: 1, padding: "32px", overflow: "hidden" }}>
//           <div style={{ marginBottom: "32px" }}><h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1f2937", marginBottom: "8px" }}>User Management</h1><p style={{ color: "#6b7280", fontSize: "14px" }}>Review, monitor and manage roles for all platform participants.</p></div>

//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "32px" }}>
//             <StatsCard title="Total Active Users" value={stats.totalUsers} icon="bi-people-fill" color="#eef2ff"/>
//             <StatsCard title="Verified Hosts" value={stats.verifiedHosts} icon="bi-shield-check" color="#e6f7e6"/>
//             <StatsCard title="Suspended Hosts" value={stats.suspendedUsers} icon="bi-slash-circle" color="#ffebee"/>
//           </div>

//           <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", marginBottom: "32px", border: "1px solid #e5e7eb" }}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}><h3 style={{ fontSize: "18px", fontWeight: 600, margin: 0 }}>Dashboard Overview</h3><button onClick={() => fetchDashboard()} style={{ padding: "6px 12px", background: "#eef2ff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}><i className="bi bi-arrow-repeat"></i> Refresh</button></div>
//             {loading.dashboard ? <div style={{ textAlign: "center", padding: "40px" }}><div className="spinner-border text-primary"></div></div> : dashboardMetrics.length === 0 ? <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>No dashboard data available</div> : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>{dashboardMetrics.map((metric) => (<DashboardMetricCard key={metric.key} label={metric.label} value={metric.value} />))}</div>}
//           </div>

//           <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
//             <div style={{ padding: "20px", borderBottom: "1px solid #e5e7eb" }}>
//               <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
//                 <div style={{ flex: 1, position: "relative" }}><i className="bi bi-search" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}></i><input type="text" placeholder="Search by name, email or user ID..." value={search} onChange={(e) => { const value = e.target.value; setSearch(value); if (value) { const filtered = allUsers.filter(user => (user.fullName?.toLowerCase().includes(value.toLowerCase()) || user.firstName?.toLowerCase().includes(value.toLowerCase()) || user.email?.toLowerCase().includes(value.toLowerCase()))); setAllUsers(filtered); setPagination(prev => ({ ...prev, totalCount: filtered.length, totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE), page: 1 })); } else { fetchUsers(); } }} style={{ width: "100%", padding: "10px 12px 10px 36px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", outline: "none" }} /></div>
//                 {search && <button onClick={() => { setSearch(""); fetchUsers(); }} style={{ padding: "8px 16px", background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: "8px", cursor: "pointer" }}>Clear</button>}
//               </div>
//             </div>

//             {loading.users ? <div style={{ textAlign: "center", padding: "60px" }}><div className="spinner-border text-primary"></div></div> : (
//               <>
//                 <div style={{ overflowX: "auto" }}>
//                   <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                     <thead style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}><tr><th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase" }}>USER PROFILE</th><th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase" }}>JOIN DATE</th><th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase" }}>IDENTITY STATUS</th><th style={{ padding: "16px", textAlign: "right", fontSize: "12px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase" }}>ACTIONS</th></tr></thead>
//                     <tbody>{paginatedUsers.length === 0 ? <tr><td colSpan="4" style={{ textAlign: "center", padding: "60px", color: "#6b7280" }}>No active users found</td></tr> : paginatedUsers.map((user) => (<tr key={user.id} style={{ borderBottom: "1px solid #e5e7eb" }}><td style={{ padding: "16px" }}><div style={{ display: "flex", alignItems: "center", gap: "12px" }}><div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "16px", color: "#1e3a8a" }}>{user.fullName?.charAt(0) || user.firstName?.charAt(0) || user.email?.charAt(0) || "U"}</div><div><div style={{ fontWeight: 600, color: "#1f2937", marginBottom: "4px" }}>{user.fullName || user.firstName || "Unknown User"}</div><div style={{ fontSize: "13px", color: "#6b7280" }}>{user.email || "No email provided"}</div></div></div></td><td style={{ padding: "16px", color: "#6b7280", fontSize: "14px" }}>{formatDate(user.createdAt)}</td><td style={{ padding: "16px" }}><StatusBadge user={user} /></td><td style={{ padding: "16px", textAlign: "right" }}><div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}><button onClick={async () => { console.log("Viewing user:", user); const userDetails = await fetchUserDetails(user.id); if (userDetails) { setSelectedUser(userDetails); setShowUserDetails(true); } }} style={{ padding: "6px 12px", background: "#eef2ff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "6px", color: "#1e3a8a" }}><i className="bi bi-eye"></i> View</button>{!isUserDeleted(user) && (<button onClick={() => handleDeleteUser(user)} style={{ padding: "6px 12px", background: "#fee2e2", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "6px", color: "#dc2626" }}><i className="bi bi-trash"></i> Delete</button>)}</div></td></tr>))}</tbody>
//                   </table>
//                 </div>
//                 {pagination.totalPages > 0 && (<div style={{ padding: "20px", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}><div style={{ fontSize: "14px", color: "#6b7280" }}>Showing {((pagination.page - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(pagination.page * ITEMS_PER_PAGE, pagination.totalCount)} of {pagination.totalCount} active users</div><div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}><button onClick={() => handlePageChange(pagination.page - 1)} disabled={pagination.page === 1} style={{ padding: "6px 12px", border: "1px solid #e5e7eb", background: "#fff", borderRadius: "6px", cursor: pagination.page === 1 ? "not-allowed" : "pointer", opacity: pagination.page === 1 ? 0.5 : 1 }}>Previous</button>{Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => { let pageNum = pagination.totalPages <= 5 ? i + 1 : (pagination.page <= 3 ? i + 1 : (pagination.page >= pagination.totalPages - 2 ? pagination.totalPages - 4 + i : pagination.page - 2 + i)); return <button key={pageNum} onClick={() => handlePageChange(pageNum)} style={{ padding: "6px 12px", border: "1px solid #e5e7eb", background: pagination.page === pageNum ? "#1e3a8a" : "#fff", color: pagination.page === pageNum ? "#fff" : "#4b5563", borderRadius: "6px", cursor: "pointer", fontWeight: pagination.page === pageNum ? 600 : 400 }}>{pageNum}</button>; })}<button onClick={() => handlePageChange(pagination.page + 1)} disabled={pagination.page === pagination.totalPages} style={{ padding: "6px 12px", border: "1px solid #e5e7eb", background: "#fff", borderRadius: "6px", cursor: pagination.page === pagination.totalPages ? "not-allowed" : "pointer", opacity: pagination.page === pagination.totalPages ? 0.5 : 1 }}>Next</button></div></div>)}
//               </>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardPage;




















import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AdminSidebar from '../Shared/AdminSidebar';

// ============================================================
// API ENDPOINTS
// ============================================================
const USERS_API = "https://graduationproject1.runasp.net/api/admin/Users";
const ITEMS_PER_PAGE = 5;

// ============================================================
// HELPER FUNCTIONS
// ============================================================
const getAuthToken = () => {
  return localStorage.getItem("userToken");
};

const formatDate = (dateString) => {
  if (!dateString || dateString === "0001-01-01T00:00:00") return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
};

const formatDateLong = (dateString) => {
  if (!dateString || dateString === "0001-01-01T00:00:00") return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
};

const isUserDeleted = (user) => {
  if (user.email && user.email.includes('_deleted_')) return true;
  if (user.isDeleted === true) return true;
  return false;
};

// ============================================================
// TOAST COMPONENT
// ============================================================
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
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <i className={`bi ${type === "success" ? "bi-check-circle" : "bi-exclamation-triangle"}`}></i>
      <span>{msg}</span>
    </div>
  );
};

// ============================================================
// STATUS BADGE COMPONENT (table + profile snippet)
// ============================================================
const StatusBadge = ({ user, large }) => {
  const isDeleted = isUserDeleted(user);
  const baseStyle = {
    padding: large ? "6px 18px" : "4px 12px",
    borderRadius: "20px",
    fontSize: large ? "13px" : "12px",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  };

  if (isDeleted) {
    return <span style={{ ...baseStyle, background: "#fee2e2", color: "#991b1b" }}><i className="bi bi-trash-fill"></i> Deleted</span>;
  }
  if (user?.userStatus === "Suspended") {
    return <span style={{ ...baseStyle, background: "#dc2626", color: "#fff" }}><i className="bi bi-slash-circle"></i> Suspended</span>;
  }
  if (user?.userStatus === "Verified") {
    return <span style={{ ...baseStyle, background: "#e6f7e6", color: "#2e7d32" }}><i className="bi bi-patch-check-fill"></i> Verified</span>;
  }
  return <span style={{ ...baseStyle, background: "#fff3e0", color: "#ed6c02" }}><i className="bi bi-hourglass-split"></i> Pending</span>;
};

// ============================================================
// STATS CARD COMPONENT
// ============================================================
const StatsCard = ({ title, value }) => {
  return (
    <div style={{
      background: "#fff",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      border: "1px solid #e5e7eb"
    }}>
      <div style={{ fontSize: "28px", fontWeight: "bold", color: "#1f2937", marginBottom: "8px" }}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      <div style={{ fontSize: "14px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</div>
    </div>
  );
};

// ============================================================
// CONFIRM MODAL (generic, supports delete / suspend / verify / reactivate)
// ============================================================
const ACTION_CONFIG = {
  delete: { icon: "bi-trash-fill", iconBg: "#fee2e2", iconColor: "#dc2626", confirmBg: "#dc2626", confirmLabel: "Delete", confirmIcon: "bi-check-lg" },
  suspend: { icon: "bi-exclamation-triangle-fill", iconBg: "#fef3c7", iconColor: "#92400e", confirmBg: "#f59e0b", confirmLabel: "Suspend", confirmIcon: "bi-slash-circle" },
  verify: { icon: "bi-patch-check-fill", iconBg: "#dcfce7", iconColor: "#15803d", confirmBg: "#10b981", confirmLabel: "Verify", confirmIcon: "bi-check-lg" },
  reactivate: { icon: "bi-arrow-counterclockwise", iconBg: "#dbeafe", iconColor: "#1e3a8a", confirmBg: "#2563eb", confirmLabel: "Reactivate", confirmIcon: "bi-check-lg" },
};

const ConfirmModal = ({ action, title, message, onConfirm, onCancel, loading }) => {
  const config = ACTION_CONFIG[action] || ACTION_CONFIG.delete;
  return (
    <div
      onClick={onCancel}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "24px",
          maxWidth: "400px",
          width: "90%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: config.iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              color: config.iconColor,
            }}
          >
            <i className={`bi ${config.icon}`}></i>
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>{title}</h3>
            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#6b7280" }}>
              {action === "delete" ? "This action cannot be undone" : "You can change this later if needed"}
            </p>
          </div>
        </div>
        <p style={{ fontSize: "14px", color: "#374151", marginBottom: "24px" }}>{message}</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <button
            onClick={onCancel}
            disabled={loading}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              background: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{
              padding: "8px 20px",
              borderRadius: "8px",
              border: "none",
              background: config.confirmBg,
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm"></span>
                Processing...
              </>
            ) : (
              <>
                <i className={`bi ${config.confirmIcon}`}></i>
                {config.confirmLabel}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// USER DETAILS PAGE - matches the Pending / Suspended mockups
// ============================================================
const UserDetailsPage = ({ user, onBack, onAction }) => {
  if (!user) return null;

  console.log("📋 Full User Details from API:", user);

  const isDeleted = isUserDeleted(user);
  const isSuspended = user.userStatus === "Suspended";
  const isPending = user.userStatus === "Pending" || (!user.userStatus);
  const isVerified = user.userStatus === "Verified";

  const getLocation = () => {
    const parts = [];
    if (user.city) parts.push(user.city);
    if (user.governorate) parts.push(user.governorate);
    return parts.length > 0 ? parts.join(", ") : "Not provided";
  };

  // ⚠️ NOTE: مفيش حقل suspensionReason في الـ sample اللي بعتها، فهنا fallback نص عام.
  // لو الـ API بيرجع user.suspensionReason استخدمه زي ما هو.
  const suspensionReasonText = user.suspensionReason
    || "This account was suspended due to violations of the platform's community guidelines.";

  const renderStars = (rating) => (
    <div style={{ display: "flex", gap: "2px", color: "#fbbf24" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <i key={star} className={`bi ${star <= Math.round(rating) ? "bi-star-fill" : "bi-star"}`} style={{ fontSize: "12px" }}></i>
      ))}
    </div>
  );

  const sectionCardStyle = { background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", marginBottom: "24px", overflow: "hidden" };
  const sectionHeaderStyle = { padding: "20px 24px", borderBottom: "1px solid #e5e7eb", background: "#f9fafb", display: "flex", justifyContent: "space-between", alignItems: "center" };
  const labelStyle = { fontSize: "11px", color: "#6b7280", textTransform: "uppercase", fontWeight: 600 };
  const valueStyle = { marginTop: "6px", fontSize: "14px", color: "#1f2937", fontWeight: 500 };

  return (
    <div>
      {/* ===== TITLE + ACTION BUTTONS ===== */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
        <div>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0", marginBottom: "10px", background: "none", border: "none", cursor: "pointer", color: "#1e3a8a", fontWeight: 500, fontSize: "13px" }}>
            <i className="bi bi-arrow-left"></i> Back to Users
          </button>
          <h1 style={{ fontSize: "22px", margin: 0, color: "#1f2937", fontWeight: 700 }}>User Management Detail</h1>
          <p style={{ fontSize: "13px", color: "#6b7280", margin: "4px 0 0" }}>
            Reviewing profile and verification for {user.fullName || user.email}
          </p>
        </div>

        {!isDeleted && (
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {isPending && (
              <button onClick={() => onAction("verify")} style={{ padding: "10px 20px", background: "#1e3a8a", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="bi bi-check-circle-fill"></i> Verify User
              </button>
            )}
            {!isSuspended && (
              <button onClick={() => onAction("suspend")} style={{ padding: "10px 20px", background: "#f59e0b", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="bi bi-exclamation-triangle-fill"></i> Suspend user
              </button>
            )}
            {isSuspended && (
              <button onClick={() => onAction("reactivate")} style={{ padding: "10px 20px", background: "#1e3a8a", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
                <i className="bi bi-arrow-counterclockwise"></i> Reactivate User
              </button>
            )}
            <button onClick={() => onAction("delete")} style={{ padding: "10px 20px", background: "#fff", color: "#dc2626", border: "1px solid #dc2626", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
              <i className="bi bi-trash"></i> Delete User
            </button>
          </div>
        )}
      </div>

      {/* ===== SUSPENDED BANNER ===== */}
      {isSuspended && (
        <div style={{ background: "#fee2e2", border: "1px solid #fecaca", borderRadius: "12px", padding: "16px 20px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            <i className="bi bi-exclamation-triangle-fill" style={{ color: "#dc2626", fontSize: "18px", marginTop: "2px" }}></i>
            <div>
              <div style={{ fontWeight: 700, color: "#991b1b", fontSize: "14px", marginBottom: "4px" }}>
                Account Suspended
              </div>
              <p style={{ margin: 0, fontSize: "13px", color: "#7f1d1d", lineHeight: "1.5" }}>
                This user account was suspended on {formatDateLong(user.suspendedAt)}, {suspensionReasonText}
              </p>
            </div>
          </div>
          <a href="#" style={{ fontSize: "13px", color: "#991b1b", fontWeight: 600, textDecoration: "underline", whiteSpace: "nowrap" }}>
            View Reports
          </a>
        </div>
      )}

      {/* ===== MAIN CONTENT ===== */}
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "24px" }}>

        {/* LEFT - Profile snippet */}
        <div>
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "24px", position: "sticky", top: "20px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: "72px", height: "72px", borderRadius: "50%", margin: "0 auto 12px", overflow: "hidden",
                background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "28px", fontWeight: "bold", color: "#1e3a8a"
              }}>
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt={user.fullName} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.target.style.display = "none"; }} />
                ) : (
                  user.fullName?.charAt(0) || user.firstName?.charAt(0) || user.email?.charAt(0) || "U"
                )}
              </div>
              <h2 style={{ margin: "0 0 10px", fontSize: "17px", fontWeight: 700, color: "#1f2937" }}>
                {user.fullName || user.firstName || "User"}
              </h2>
              <StatusBadge user={user} large />
            </div>

            <div style={{ marginTop: "20px" }}>
              <label style={labelStyle}>ABOUT</label>
              <div style={{ marginTop: "8px", padding: "12px", background: "#f9fafb", borderRadius: "10px" }}>
                <p style={{ margin: 0, fontSize: "13px", color: "#4b5563", lineHeight: "1.5", fontStyle: "italic" }}>
                  "{user.aboutMe || user.bio || `Host profile for ${user.fullName || user.firstName || "User"}`}"
                </p>
              </div>
            </div>

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={labelStyle}>JOIN DATE</label>
              <span style={{ fontSize: "13px", color: "#1f2937", fontWeight: 600 }}>{formatDate(user.createdAt)}</span>
            </div>

            {isSuspended && (
              <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={{ ...labelStyle, color: "#dc2626" }}>SUSPEND AT</label>
                <span style={{ fontSize: "13px", color: "#dc2626", fontWeight: 600 }}>{formatDate(user.suspendedAt)}</span>
              </div>
            )}

            {isDeleted && (
              <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={{ ...labelStyle, color: "#dc2626" }}>DELETED AT</label>
                <span style={{ fontSize: "13px", color: "#dc2626", fontWeight: 600 }}>{formatDate(user.deletedAt)}</span>
              </div>
            )}

            <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #e5e7eb" }}>
              <label style={labelStyle}>USER ID</label>
              <p style={{ marginTop: "6px", fontSize: "11px", color: "#9ca3af", fontFamily: "monospace", wordBreak: "break-all", margin: 0 }}>
                {user.id}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT - Detail cards */}
        <div>
          {/* Personal Information */}
          <div style={sectionCardStyle}>
            <div style={sectionHeaderStyle}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#1f2937" }}>
                <i className="bi bi-person-circle me-2"></i>Personal Information
              </h3>
            </div>
            <div style={{ padding: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
                <div>
                  <label style={labelStyle}>EMAIL ADDRESS</label>
                  <p style={valueStyle}>{user.email || "Not provided"}</p>
                </div>
                <div>
                  <label style={labelStyle}>PHONE NUMBER</label>
                  <p style={valueStyle}>{user.phoneNumber || "Not provided"}</p>
                </div>
                <div>
                  <label style={labelStyle}>LOCATION</label>
                  <p style={valueStyle}>{getLocation()}</p>
                </div>
                <div>
                  <label style={labelStyle}>GENDER</label>
                  <p style={valueStyle}>{user.gender || "Not provided"}</p>
                </div>
              </div>
              <div style={{ marginTop: "16px" }}>
                <label style={labelStyle}>BIRTHDAY</label>
                <p style={valueStyle}>{formatDateLong(user.birthDate)}</p>
              </div>
            </div>
          </div>

          {/* Education & Career */}
          {(user.fieldOfStudy || user.university || user.jobTitle) && (
            <div style={sectionCardStyle}>
              <div style={sectionHeaderStyle}>
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#1f2937" }}>
                  <i className="bi bi-mortarboard me-2"></i>Education & Career
                </h3>
              </div>
              <div style={{ padding: "24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
                  {(user.fieldOfStudy || user.university) && (
                    <div>
                      <label style={labelStyle}>EDUCATION</label>
                      <p style={valueStyle}>
                        {[user.fieldOfStudy, user.university].filter(Boolean).join(" at ")}
                      </p>
                    </div>
                  )}
                  {user.jobTitle && (
                    <div>
                      <label style={labelStyle}>CURRENT JOB</label>
                      <p style={valueStyle}>{user.jobTitle}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Verification Documents */}
          <div style={sectionCardStyle}>
            <div style={sectionHeaderStyle}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#1f2937" }}>
                <i className="bi bi-file-text me-2"></i>Verification Documents
              </h3>
              {/* ⚠️ NOTE: محتاج تربطها بحقل تحقق مستقل لو متاح في الـ API، دلوقتي بتعتمد على userStatus العام */}
              {isVerified ? (
                <span style={{ background: "#e6f7e6", color: "#2e7d32", padding: "3px 12px", borderRadius: "12px", fontSize: "11px", fontWeight: 600 }}>Verified</span>
              ) : isSuspended ? (
                <span style={{ background: "#fee2e2", color: "#991b1b", padding: "3px 12px", borderRadius: "12px", fontSize: "11px", fontWeight: 600 }}>Suspended</span>
              ) : (
                <span style={{ background: "#fef3c7", color: "#92400e", padding: "3px 12px", borderRadius: "12px", fontSize: "11px", fontWeight: 600 }}>Pending Review</span>
              )}
            </div>
            <div style={{ padding: "24px" }}>
              {user.idImage ? (
                <div>
                  <div style={{ width: "100%", maxWidth: "420px", height: "220px", borderRadius: "12px", overflow: "hidden", background: "#e5e7eb" }}>
                    <img
                      src={user.idImage}
                      alt="National ID Card"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => { e.target.src = "https://placehold.co/420x220/e5e7eb/6b7280?text=ID+Card"; }}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px", maxWidth: "420px" }}>
                    <span style={{ fontSize: "13px", color: "#1f2937", fontWeight: 500 }}>
                      <i className="bi bi-card-id me-1"></i> National ID Card
                    </span>
                    <a href={user.idImage} target="_blank" rel="noreferrer" style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#1e3a8a", textDecoration: "none" }}>
                      <i className="bi bi-download"></i>
                    </a>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <i className="bi bi-card-id" style={{ fontSize: "20px", color: "#9ca3af" }}></i>
                  <span style={{ fontSize: "14px", color: "#6b7280" }}>National ID Card — Not Uploaded</span>
                </div>
              )}
            </div>
          </div>

          {/* Active Listings */}
          <div style={sectionCardStyle}>
            <div style={sectionHeaderStyle}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#1f2937" }}>
                <i className="bi bi-building me-2"></i>Active Listings
              </h3>
            </div>
            <div style={{ padding: "24px" }}>
              {user.listings && user.listings.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                  {user.listings.map((listing) => (
                    <div key={`${listing.propertyId}-${listing.roomId || "main"}`} style={{ border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden", background: "#fff" }}>
                      <div style={{ height: "130px", background: "#e5e7eb", margin: "0 10px", borderRadius: "8px", overflow: "hidden" }}>
                        {listing.image ? (
                          <img
                            src={listing.image}
                            alt={listing.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => { e.target.src = "https://placehold.co/300x180/e5e7eb/6b7280?text=No+Image"; }}
                          />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>🏠</div>
                        )}
                      </div>
                      <div style={{ padding: "12px 14px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.04em" }}>
                              {listing.type || "N/A"}
                            </span>
                            {listing.roomId != null && (
                              <span style={{ background: "#eef2ff", color: "#1e3a8a", padding: "1px 8px", borderRadius: "10px", fontSize: "10px", fontWeight: 600 }}>
                                Room #{listing.roomId}
                              </span>
                            )}
                          </span>
                          {listing.rating > 0 && (
                            <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 700, color: "#1f2937" }}>
                              <i className="bi bi-star-fill" style={{ color: "#fbbf24", fontSize: "11px" }}></i>{listing.rating.toFixed(1)}
                            </span>
                          )}
                        </div>
                        <div style={{ fontWeight: 600, fontSize: "14px", color: "#1f2937", marginBottom: "4px" }}>{listing.title || "Untitled"}</div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>
                          <i className="bi bi-geo-alt"></i> {[listing.city, listing.government].filter(Boolean).join(", ") || "Location not specified"}
                        </div>
                        <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "#6b7280", flexWrap: "wrap", marginBottom: "12px" }}>
                          <span><i className="bi bi-house"></i> {listing.beds ?? 0} Bed{listing.beds === 1 ? "" : "s"}</span>
                          <span><i className="bi bi-droplet"></i> {listing.baths ?? 0} Bath{listing.baths === 1 ? "" : "s"}</span>
                          <span><i className="bi bi-rulers"></i> {listing.size ?? 0} m²</span>
                          {listing.wifi && <span style={{ color: "#10b981" }}><i className="bi bi-wifi"></i> High-Speed</span>}
                          {listing.capacity != null && (
                            <span><i className="bi bi-people"></i> {listing.capacity} guest{listing.capacity === 1 ? "" : "s"}</span>
                          )}
                          {listing.sharedBathroom != null && (
                            <span><i className="bi bi-droplet-half"></i> {listing.sharedBathroom ? "Shared bathroom" : "Private bathroom"}</span>
                          )}
                        </div>
                        <button style={{ width: "100%", padding: "8px", background: "#1e3a8a", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "13px" }}>
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: "16px", textAlign: "center", color: "#6b7280" }}>
                  <i className="bi bi-building" style={{ fontSize: "24px", display: "block", marginBottom: "8px" }}></i>
                  No active listings
                </div>
              )}
            </div>
          </div>

          {/* Recent Reviews */}
          <div style={{ ...sectionCardStyle, marginBottom: 0 }}>
            <div style={sectionHeaderStyle}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#1f2937" }}>
                <i className="bi bi-star me-2"></i>Recent Reviews ({user.reviews?.length || 0})
              </h3>
              <a href="#" style={{ fontSize: "12px", color: "#1e3a8a", fontWeight: 600, textDecoration: "none" }}>View All</a>
            </div>
            <div style={{ padding: "24px" }}>
              {user.reviews && user.reviews.length > 0 ? (
                user.reviews.map((review, index) => (
                  <div key={index} style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: index < user.reviews.length - 1 ? "1px solid #e5e7eb" : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#1e3a8a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "14px" }}>
                        {review.reviewerName?.charAt(0) || "U"}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "14px" }}>{review.reviewerName || "Anonymous"}</div>
                        <div style={{ fontSize: "11px", color: "#6b7280" }}>{formatDateLong(review.createdAt)}</div>
                      </div>
                      <div style={{ marginLeft: "auto" }}>{renderStars(review.rating || 0)}</div>
                    </div>
                    <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.5", margin: "0 0 0 44px" }}>
                      "{review.comment || "No comment provided"}"
                    </p>
                  </div>
                ))
              ) : (
                <div style={{ padding: "16px", textAlign: "center", color: "#6b7280" }}>
                  <i className="bi bi-chat-dots" style={{ fontSize: "24px", display: "block", marginBottom: "8px" }}></i>
                  No reviews yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN ADMIN DASHBOARD (Users)
// ============================================================
const AdminDashboardPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, pageSize: ITEMS_PER_PAGE, totalCount: 0, totalPages: 1 });
  const [stats, setStats] = useState({ totalUsers: 0, verifiedHosts: 0, suspendedUsers: 0 });
  const [loading, setLoading] = useState({ users: true, action: false });
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [activeNav, setActiveNav] = useState("users");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [pendingUser, setPendingUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getAuthConfig = useCallback(() => {
    const token = getAuthToken();
    return token ? { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': '*/*' } } : null;
  }, []);

  // Fetch users from API with pagination
  const fetchUsers = useCallback(async (page = 1, searchTerm = "", pageSize = ITEMS_PER_PAGE) => {
    setLoading(prev => ({ ...prev, users: true }));
    try {
      const config = getAuthConfig();
      if (!config) throw new Error("No token found");

      let url = `${USERS_API}?page=${page}&pageSize=${pageSize}`;
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }

      const response = await axios.get(url, config);
      console.log("👥 Users Data from API:", response.data);

      if (response.data.success && response.data.data) {
        const usersData = response.data.data.users || [];
        const statsData = response.data.data.stats || { totalUsers: 0, verifiedHosts: 0, suspendedUsers: 0 };
        const paginationData = response.data.data.pagination || { page: 1, pageSize: ITEMS_PER_PAGE, totalCount: 0, totalPages: 1 };

        setAllUsers(usersData);
        setStats({
          totalUsers: statsData.totalUsers || 0,
          verifiedHosts: statsData.verifiedHosts || 0,
          suspendedUsers: statsData.suspendedUsers || 0
        });
        setPagination({
          page: paginationData.page || 1,
          pageSize: paginationData.pageSize || ITEMS_PER_PAGE,
          totalCount: paginationData.totalCount || 0,
          totalPages: paginationData.totalPages || 1
        });
      }
    } catch (error) {
      console.error("Users fetch error:", error);
      if (error.response?.status === 401) {
        showToast("Session expired. Please login again.", "error");
        localStorage.removeItem("userToken");
        setTimeout(() => window.location.href = "/login", 2000);
      }
    } finally {
      setLoading(prev => ({ ...prev, users: false }));
    }
  }, [getAuthConfig]);

  const fetchUserDetails = useCallback(async (userId) => {
    try {
      const config = getAuthConfig();
      if (!config) throw new Error("No token found");
      const response = await axios.get(`${USERS_API}/${userId}`, config);
      console.log("👤 User Details from API:", response.data);

      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error("User details fetch error:", error);
      if (error.response?.status === 401) {
        showToast("Session expired. Please login again.", "error");
        localStorage.removeItem("userToken");
        setTimeout(() => window.location.href = "/login", 2000);
      }
      return null;
    }
  }, [getAuthConfig]);

  // ===== Generic handler: open confirm modal for delete / suspend / verify / reactivate =====
  const handleUserAction = (user, action) => {
    setPendingUser(user);
    setConfirmAction(action);
    setShowConfirmModal(true);
  };

  // ===== Update a user's status everywhere it's shown (table row + open details panel) =====
  const updateUserStatusLocally = (userId, newStatus, extraFields = {}) => {
    setAllUsers(prev => prev.map(u => (u.id === userId ? { ...u, userStatus: newStatus, ...extraFields } : u)));
    setSelectedUser(prev => (prev && prev.id === userId ? { ...prev, userStatus: newStatus, ...extraFields } : prev));
  };

  // ===== Re-sync with the server after verify/suspend/reactivate (in case the backend changed extra fields) =====
  const refreshAfterAction = async (userId) => {
    try {
      // يحدّث الجدول (والإحصائيات لو السيرفر رجع أرقام مختلفة بعد الـ refetch)
      await fetchUsers(pagination.page, search);
      // لو صفحة التفاصيل بتاعت اليوزر ده مفتوحة، نحدّثها كمان بآخر بيانات من السيرفر
      if (selectedUser?.id === userId) {
        const fresh = await fetchUserDetails(userId);
        if (fresh) setSelectedUser(fresh);
      }
    } catch (e) {
      console.error("Refresh after action error:", e);
    }
  };

  const executeAction = async () => {
    if (!pendingUser) return;

    setIsProcessing(true);
    setLoading(prev => ({ ...prev, action: true }));

    try {
      const config = getAuthConfig();
      if (!config) throw new Error("No token found");

      if (confirmAction === "delete") {
        const deleteUrl = `${USERS_API}/${pendingUser.id}`;
        console.log("🗑️ Deleting user with ID:", pendingUser.id);

        await axios.delete(deleteUrl, config);

        setAllUsers(prevUsers => prevUsers.filter(u => u.id !== pendingUser.id));
        setStats(prevStats => ({ ...prevStats, totalUsers: Math.max(0, prevStats.totalUsers - 1) }));
        setPagination(prev => ({
          ...prev,
          totalCount: Math.max(0, prev.totalCount - 1),
          totalPages: Math.max(1, Math.ceil(Math.max(0, prev.totalCount - 1) / ITEMS_PER_PAGE))
        }));

        // لو كنا في صفحة تفاصيل اليوزر ده وحذفناه، نرجع لقائمة اليوزرز
        if (selectedUser?.id === pendingUser.id) {
          setShowUserDetails(false);
          setSelectedUser(null);
        }

        showToast(`User "${pendingUser.fullName || pendingUser.email}" deleted successfully`, "success");
        await fetchUsers(pagination.page, search);

      } else if (confirmAction === "suspend") {
        await axios.post(`${USERS_API}/${pendingUser.id}/suspend`, {}, config);
        updateUserStatusLocally(pendingUser.id, "Suspended", { suspendedAt: new Date().toISOString() });
        setStats(prevStats => ({ ...prevStats, suspendedUsers: prevStats.suspendedUsers + 1 }));
        showToast(`User "${pendingUser.fullName || pendingUser.email}" suspended`, "success");
        refreshAfterAction(pendingUser.id);

      } else if (confirmAction === "verify") {
        await axios.post(`${USERS_API}/${pendingUser.id}/verify`, {}, config);
        updateUserStatusLocally(pendingUser.id, "Verified");
        setStats(prevStats => ({ ...prevStats, verifiedHosts: prevStats.verifiedHosts + 1 }));
        showToast(`User "${pendingUser.fullName || pendingUser.email}" verified`, "success");
        refreshAfterAction(pendingUser.id);

      } else if (confirmAction === "reactivate") {
        await axios.post(`${USERS_API}/${pendingUser.id}/reactivate`, {}, config);
        updateUserStatusLocally(pendingUser.id, "Verified", { suspendedAt: null });
        setStats(prevStats => ({ ...prevStats, suspendedUsers: Math.max(0, prevStats.suspendedUsers - 1) }));
        showToast(`User "${pendingUser.fullName || pendingUser.email}" reactivated`, "success");
        refreshAfterAction(pendingUser.id);
      }

    } catch (error) {
      console.error("Action error:", error);

      if (error.response?.status === 401) {
        showToast("Authentication failed. Please login again.", "error");
        localStorage.removeItem("userToken");
        setTimeout(() => window.location.href = "/login", 2000);
      } else if (error.response?.status === 404) {
        showToast("User not found. It may have been already deleted.", "error");
        setAllUsers(prevUsers => prevUsers.filter(u => u.id !== pendingUser.id));
      } else {
        showToast(error.response?.data?.message || `Failed to ${confirmAction} user`, "error");
      }

    } finally {
      setIsProcessing(false);
      setLoading(prev => ({ ...prev, action: false }));
      setShowConfirmModal(false);
      setPendingUser(null);
      setConfirmAction(null);
    }
  };

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetchUsers(1, "");
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    fetchUsers(1, value);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
      fetchUsers(newPage, search);
    }
  };

  const paginatedUsers = allUsers;

  const navItems = [
    { id: "dashboard", icon: "bi-grid", label: "Dashboard" },
    { id: "users", icon: "bi-people", label: "User Management" },
    { id: "properties", icon: "bi-building", label: "Properties" },
    { id: "bookings", icon: "bi-calendar-check", label: "Bookings" },
    { id: "financials", icon: "bi-cash-stack", label: "Financials" },
    { id: "analytics", icon: "bi-graph-up", label: "Analytics" },
    { id: "settings", icon: "bi-gear", label: "General Settings" },
  ];

  const confirmTexts = {
    delete: {
      title: "Delete User",
      message: `Are you sure you want to delete "${pendingUser?.fullName || pendingUser?.email}"? All their data will be permanently removed.`
    },
    suspend: {
      title: "Suspend User",
      message: `Are you sure you want to suspend "${pendingUser?.fullName || pendingUser?.email}"? They will not be able to use the platform.`
    },
    verify: {
      title: "Verify User",
      message: `Are you sure you want to verify "${pendingUser?.fullName || pendingUser?.email}"? They will gain full access to host features.`
    },
    reactivate: {
      title: "Reactivate User",
      message: `Are you sure you want to reactivate "${pendingUser?.fullName || pendingUser?.email}"? Their suspension will be lifted and access restored.`
    },
  };

  return (
    <div style={{ background: "#f5f6fa", minHeight: "100vh" }}>
      {toast && <Toast msg={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showConfirmModal && confirmAction && (
        <ConfirmModal
          action={confirmAction}
          title={confirmTexts[confirmAction].title}
          message={confirmTexts[confirmAction].message}
          onConfirm={executeAction}
          onCancel={() => {
            setShowConfirmModal(false);
            setPendingUser(null);
            setConfirmAction(null);
          }}
          loading={isProcessing || loading.action}
        />
      )}

      <div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
        <AdminSidebar />

        {/* Main Content */}
        <main style={{ flex: 1, padding: "32px", overflow: "hidden" }}>
          {showUserDetails && selectedUser ? (
            <UserDetailsPage
              user={selectedUser}
              onBack={() => setShowUserDetails(false)}
              onAction={(action) => handleUserAction(selectedUser, action)}
            />
          ) : (
            <>
              {/* Header */}
              <div style={{ marginBottom: "32px" }}>
                <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1f2937", marginBottom: "8px" }}>
                  User Management
                </h1>
                <p style={{ color: "#6b7280", fontSize: "14px" }}>
                  Review, monitor and manage roles for all platform participants.
                </p>
              </div>

              {/* Stats Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "32px" }}>
                <StatsCard title="TOTAL USERS" value={stats.totalUsers} />
                <StatsCard title="VERIFIED USERS" value={stats.verifiedHosts} />
                <StatsCard title="SUSPENDED" value={stats.suspendedUsers} />
              </div>

              {/* Users Table */}
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
                {/* Search Bar */}
                <div style={{ padding: "20px", borderBottom: "1px solid #e5e7eb" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <div style={{ flex: 1, position: "relative" }}>
                      <i className="bi bi-search" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}></i>
                      <input
                        type="text"
                        placeholder="Search by name, email or user ID..."
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: "100%", padding: "10px 12px 10px 36px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", outline: "none" }}
                      />
                    </div>
                    {search && (
                      <button
                        onClick={() => handleSearch("")}
                        style={{ padding: "8px 16px", background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: "8px", cursor: "pointer" }}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {loading.users ? (
                  <div style={{ textAlign: "center", padding: "60px" }}><div className="spinner-border text-primary"></div></div>
                ) : (
                  <>
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                          <tr>
                            <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase" }}>
                              USER PROFILE
                            </th>
                            <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase" }}>
                              JOIN DATE
                            </th>
                            <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase" }}>
                              IDENTITY STATUS
                            </th>
                            <th style={{ padding: "16px", textAlign: "right", fontSize: "12px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase" }}>
                              ACTIONS
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedUsers.length === 0 ? (
                            <tr><td colSpan="4" style={{ textAlign: "center", padding: "60px", color: "#6b7280" }}>No users found</td></tr>
                          ) : (
                            paginatedUsers.map((user) => {
                              const isDeleted = isUserDeleted(user);

                              return (
                                <tr key={user.id} style={{
                                  borderBottom: "1px solid #e5e7eb",
                                  opacity: isDeleted ? 0.5 : 1,
                                  background: isDeleted ? "#f9fafb" : "transparent"
                                }}>
                                  <td style={{ padding: "16px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                      <div style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        background: isDeleted ? "#d1d5db" : "#eef2ff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        color: isDeleted ? "#6b7280" : "#1e3a8a"
                                      }}>
                                        {user.fullName?.charAt(0) || user.email?.charAt(0) || "U"}
                                      </div>
                                      <div>
                                        <div style={{ fontWeight: 600, color: "#1f2937", marginBottom: "4px" }}>
                                          {user.fullName || "Unknown User"}
                                        </div>
                                        <div style={{ fontSize: "13px", color: "#6b7280" }}>
                                          {user.email || "No email provided"}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td style={{ padding: "16px", color: "#6b7280", fontSize: "14px" }}>
                                    {formatDate(user.joinDate || user.createdAt)}
                                  </td>
                                  <td style={{ padding: "16px" }}>
                                    <StatusBadge user={user} />
                                  </td>
                                  <td style={{ padding: "16px", textAlign: "right" }}>
                                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                                      <button
                                        onClick={async () => {
                                          console.log("👤 Viewing user:", user);
                                          const userDetails = await fetchUserDetails(user.id);
                                          if (userDetails) {
                                            setSelectedUser(userDetails);
                                            setShowUserDetails(true);
                                          }
                                        }}
                                        style={{
                                          padding: "6px 12px",
                                          background: "#eef2ff",
                                          border: "none",
                                          borderRadius: "6px",
                                          cursor: "pointer",
                                          fontSize: "12px",
                                          display: "inline-flex",
                                          alignItems: "center",
                                          gap: "5px",
                                          color: "#1e3a8a"
                                        }}
                                      >
                                        <i className="bi bi-eye"></i> View
                                      </button>
                                      {!isDeleted && (
                                        <button
                                          onClick={() => handleUserAction(user, "delete")}
                                          style={{
                                            padding: "6px 12px",
                                            background: "#fee2e2",
                                            border: "none",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            fontSize: "12px",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "5px",
                                            color: "#dc2626"
                                          }}
                                        >
                                          <i className="bi bi-trash"></i> Delete
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 0 && (
                      <div style={{ padding: "20px", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                        <div style={{ fontSize: "14px", color: "#6b7280" }}>
                          Showing {((pagination.page - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(pagination.page * ITEMS_PER_PAGE, pagination.totalCount)} of {pagination.totalCount} users
                        </div>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          <button
                            onClick={() => handlePageChange(pagination.page - 1)}
                            disabled={pagination.page === 1}
                            style={{ padding: "6px 12px", border: "1px solid #e5e7eb", background: "#fff", borderRadius: "6px", cursor: pagination.page === 1 ? "not-allowed" : "pointer", opacity: pagination.page === 1 ? 0.5 : 1 }}
                          >
                            Previous
                          </button>
                          {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                            let pageNum = pagination.totalPages <= 5 ? i + 1 : (pagination.page <= 3 ? i + 1 : (pagination.page >= pagination.totalPages - 2 ? pagination.totalPages - 4 + i : pagination.page - 2 + i));
                            return (
                              <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                style={{ padding: "6px 12px", border: "1px solid #e5e7eb", background: pagination.page === pageNum ? "#1e3a8a" : "#fff", color: pagination.page === pageNum ? "#fff" : "#4b5563", borderRadius: "6px", cursor: "pointer", fontWeight: pagination.page === pageNum ? 600 : 400 }}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                          <button
                            onClick={() => handlePageChange(pagination.page + 1)}
                            disabled={pagination.page === pagination.totalPages}
                            style={{ padding: "6px 12px", border: "1px solid #e5e7eb", background: "#fff", borderRadius: "6px", cursor: pagination.page === pagination.totalPages ? "not-allowed" : "pointer", opacity: pagination.page === pagination.totalPages ? 0.5 : 1 }}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
