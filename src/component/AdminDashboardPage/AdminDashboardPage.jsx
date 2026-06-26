// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";

// // ============================================================
// // API ENDPOINTS
// // ============================================================
// const DASHBOARD_API = "https://graduationproject1.runasp.net/api/admin/dashboard";
// const PENDING_LISTINGS_API = "https://graduationproject1.runasp.net/api/admin/pending-listings";
// const ITEMS_PER_PAGE = 10;

// // ============================================================
// // HELPER FUNCTIONS
// // ============================================================
// const getAuthToken = () => {
//   return localStorage.getItem("userToken");
// };

// const formatDate = (dateString) => {
//   if (!dateString || dateString === "0001-01-01T00:00:00") return "N/A";
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
// };

// // ============================================================
// // TOAST COMPONENT
// // ============================================================
// const Toast = ({ msg, type, onClose }) => {
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
// };

// // ============================================================
// // STATS CARD COMPONENT
// // ============================================================
// const StatsCard = ({ title, value, subValue, icon, color, growth, growthNote }) => {
//   return (
//     <div style={{
//       background: "#fff",
//       borderRadius: "16px",
//       padding: "24px",
//       boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
//       border: "1px solid #e5e7eb",
//       transition: "0.2s"
//     }}>
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
//         <div style={{
//           width: "52px",
//           height: "52px",
//           borderRadius: "14px",
//           background: color || "#eef2ff",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontSize: "26px",
//           color: "#1e3a8a"
//         }}>
//           <i className={`bi ${icon}`}></i>
//         </div>
//         {growth !== undefined && (
//           <div style={{
//             fontSize: "14px",
//             fontWeight: 600,
//             color: growth >= 0 ? "#10b981" : "#ef4444",
//             display: "flex",
//             alignItems: "center",
//             gap: "4px",
//             background: growth >= 0 ? "#ecfdf5" : "#fef2f2",
//             padding: "4px 12px",
//             borderRadius: "20px"
//           }}>
//             <i className={`bi ${growth >= 0 ? "bi-arrow-up" : "bi-arrow-down"}`}></i>
//             {Math.abs(growth)}%
//           </div>
//         )}
//       </div>
//       <div style={{ fontSize: "30px", fontWeight: "bold", color: "#1f2937", marginBottom: "6px" }}>
//         {typeof value === "number" ? value.toLocaleString() : value}
//       </div>
//       <div style={{ fontSize: "14px", color: "#6b7280", fontWeight: 500 }}>{title}</div>
//       {subValue && (
//         <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "6px" }}>
//           {subValue}
//         </div>
//       )}
//       {growthNote && (
//         <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px", fontStyle: "italic" }}>
//           {growthNote}
//         </div>
//       )}
//     </div>
//   );
// };

// // ============================================================
// // MAIN ADMIN DASHBOARD
// // ============================================================
// const AdminDashboardPage = () => {
//   const [dashboardData, setDashboardData] = useState({
//     totalListings: 0,
//     pendingApproval: 0,
//     listingsGrowthPercent: 0,
//     activeUsers: 0,
//     totalRenters: 0,
//     totalHosts: 0,
//     revenueMTD: 0,
//     revenueGrowthPercent: 0,
//     newBookings: 0,
//     bookingsGrowthPercent: 0,
//     bookingsGrowthNote: ""
//   });
  
//   const [pendingListings, setPendingListings] = useState([]);
//   const [pagination, setPagination] = useState({ page: 1, pageSize: ITEMS_PER_PAGE, totalCount: 0, totalPages: 1 });
//   const [loading, setLoading] = useState({ dashboard: true, listings: true });
//   const [toast, setToast] = useState(null);
//   const [activeNav, setActiveNav] = useState("dashboard");

//   const showToast = (message, type = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const getAuthConfig = useCallback(() => {
//     const token = getAuthToken();
//     return token ? { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': '*/*' } } : null;
//   }, []);

//   // ============================================================
//   // FETCH DASHBOARD STATS
//   // ============================================================
//   const fetchDashboardStats = useCallback(async () => {
//     setLoading(prev => ({ ...prev, dashboard: true }));
//     try {
//       const config = getAuthConfig();
//       if (!config) throw new Error("No token found");

//       const response = await axios.get(DASHBOARD_API, config);
//       console.log("📊 Dashboard Stats:", response.data);

//       setDashboardData({
//         totalListings: response.data.totalListings || 0,
//         pendingApproval: response.data.pendingApproval || 0,
//         listingsGrowthPercent: response.data.listingsGrowthPercent || 0,
//         activeUsers: response.data.activeUsers || 0,
//         totalRenters: response.data.totalRenters || 0,
//         totalHosts: response.data.totalHosts || 0,
//         revenueMTD: response.data.revenueMTD || 0,
//         revenueGrowthPercent: response.data.revenueGrowthPercent || 0,
//         newBookings: response.data.newBookings || 0,
//         bookingsGrowthPercent: response.data.bookingsGrowthPercent || 0,
//         bookingsGrowthNote: response.data.bookingsGrowthNote || ""
//       });
//     } catch (error) {
//       console.error("Dashboard stats error:", error);
//       if (error.response?.status === 401) {
//         showToast("Session expired. Please login again.", "error");
//         localStorage.removeItem("userToken");
//         setTimeout(() => window.location.href = "/login", 2000);
//       } else {
//         showToast("Failed to load dashboard stats. Please try again.", "error");
//       }
//     } finally {
//       setLoading(prev => ({ ...prev, dashboard: false }));
//     }
//   }, [getAuthConfig]);

//   // ============================================================
//   // FETCH PENDING LISTINGS
//   // ============================================================
//   const fetchPendingListings = useCallback(async (page = 1, pageSize = ITEMS_PER_PAGE) => {
//     setLoading(prev => ({ ...prev, listings: true }));
//     try {
//       const config = getAuthConfig();
//       if (!config) throw new Error("No token found");

//       const url = `${PENDING_LISTINGS_API}?page=${page}&pageSize=${pageSize}`;
//       const response = await axios.get(url, config);
//       console.log("📋 Pending Listings:", response.data);

//       if (response.data.items) {
//         setPendingListings(response.data.items);
//         setPagination({
//           page: response.data.page || 1,
//           pageSize: response.data.pageSize || ITEMS_PER_PAGE,
//           totalCount: response.data.totalCount || 0,
//           totalPages: Math.ceil((response.data.totalCount || 0) / (response.data.pageSize || ITEMS_PER_PAGE))
//         });
//       } else {
//         setPendingListings([]);
//         setPagination({ page: 1, pageSize: ITEMS_PER_PAGE, totalCount: 0, totalPages: 1 });
//       }
//     } catch (error) {
//       console.error("Pending listings error:", error);
//       if (error.response?.status === 401) {
//         showToast("Session expired. Please login again.", "error");
//         localStorage.removeItem("userToken");
//         setTimeout(() => window.location.href = "/login", 2000);
//       } else {
//         showToast("Failed to load pending listings. Please try again.", "error");
//       }
//     } finally {
//       setLoading(prev => ({ ...prev, listings: false }));
//     }
//   }, [getAuthConfig]);

//   // ============================================================
//   // INITIAL LOAD
//   // ============================================================
//   useEffect(() => {
//     const token = getAuthToken();
//     if (!token) {
//       window.location.href = "/login";
//       return;
//     }
//     fetchDashboardStats();
//     fetchPendingListings(1);
//   }, []);

//   // ============================================================
//   // HANDLE PAGE CHANGE
//   // ============================================================
//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.totalPages) {
//       fetchPendingListings(newPage);
//     }
//   };

//   // ============================================================
//   // NAVIGATION ITEMS (مطابق للصورة الجديدة)
//   // ============================================================
//   const navItems = [
//     { id: "dashboard", icon: "bi-grid", label: "Dashboard" },
//     { id: "users", icon: "bi-people", label: "User Management" },
//     { id: "properties", icon: "bi-building", label: "Properties" },
//     { id: "bookings", icon: "bi-calendar-check", label: "Bookings" },
//     { id: "financials", icon: "bi-cash-stack", label: "Financials" },
//     { id: "analytics", icon: "bi-graph-up", label: "Analytics" },
//     { id: "settings", icon: "bi-gear", label: "General Settings" },
//   ];

//   // ============================================================
//   // RENDER
//   // ============================================================
//   return (
//     <div style={{ background: "#f1f5f9", minHeight: "100vh" }}>
//       {toast && <Toast msg={toast.message} type={toast.type} onClose={() => setToast(null)} />}

//       <div style={{ display: "flex" }}>
//         {/* ===== SIDEBAR (نفس ألوان الصورة) ===== */}
//         <aside style={{
//           width: "270px",
//           background: "#ffffff",
//           color: "#000000",
//           minHeight: "100vh",
//           position: "sticky",
//           top: 0,
//           display: "flex",
//           flexDirection: "column",
//           boxShadow: "4px 0 12px rgba(0,0,0,0.1)"
//         }}>
//           {/* Brand */}
//           <div style={{ padding: "28px 24px", borderBottom: "1px solid #1e2f4a" }}>
//             <h2 style={{ fontSize: "22px", margin: 0, color: "#000000", fontWeight: 700 }}>
//               <i className="bi bi-shield-lock me-2"></i>Admin 1
//             </h2>
//             <p style={{ fontSize: "11px", color: "#000000", margin: "6px 0 0", letterSpacing: "0.5px", textTransform: "uppercase" }}>
//               <i className="bi bi-shield-fill-check me-1"></i>RentalAdmin · PLATFORM CONTROL
//             </p>
//           </div>

//           {/* Navigation */}
//           <nav style={{ padding: "20px 16px", flex: 1 }}>
//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => {
//                   setActiveNav(item.id);
//                   if (item.id === "dashboard") {
//                     fetchDashboardStats();
//                     fetchPendingListings(1);
//                   }
//                 }}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "14px",
//                   width: "100%",
//                   padding: "12px 16px",
//                   marginBottom: "4px",
//                   border: "none",
//                   background: activeNav === item.id ? " rgb(238, 242, 255)" : "transparent",
//                   borderRadius: "10px",
//                   color: activeNav === item.id ? "#000000" : "#94a3b8",
//                   fontWeight: activeNav === item.id ? 600 : 400,
//                   cursor: "pointer",
//                   fontSize: "14px",
//                   textAlign: "left",
//                   transition: "all 0.2s ease"
//                 }}
//                 onMouseEnter={(e) => {
//                   if (activeNav !== item.id) {
//                     e.target.style.background = "#ffffff";
//                     e.target.style.color = "#000000";
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (activeNav !== item.id) {
//                     e.target.style.background = "transparent";
//                     e.target.style.color = "#94a3b8";
//                   }
//                 }}
//               >
//                 <i className={`bi ${item.icon}`} style={{ fontSize: "20px", width: "26px" }}></i>
//                 {item.label}
//               </button>
//             ))}
//           </nav>

//           {/* User Footer */}
//           <div style={{ padding: "20px 24px", borderTop: "1px solid #1e2f4a", display: "flex", alignItems: "center", gap: "14px" }}>
//             <div style={{
//               width: "44px",
//               height: "44px",
//               borderRadius: "50%",
//               background: "#2563eb",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontWeight: "bold",
//               color: "#fff",
//               fontSize: "16px"
//             }}>
//               AR
//             </div>
//             <div>
//               <div style={{ fontWeight: 600, fontSize: "15px", color: "#e2e8f0" }}>Alex Rivera</div>
//               <div style={{ fontSize: "12px", color: "#94a3b8" }}>Super Admin</div>
//             </div>
//           </div>

//           {/* Sign Out */}
//           <div style={{ padding: "12px 20px 24px" }}>
//             <button
//               onClick={() => { localStorage.removeItem("userToken"); window.location.href = "/login"; }}
//               style={{
//                 width: "100%",
//                 padding: "10px",
//                 background: "transparent",
//                 border: "1px solid #1e2f4a",
//                 borderRadius: "10px",
//                 color: "#94a3b8",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "10px",
//                 fontSize: "14px",
//                 transition: "all 0.2s ease"
//               }}
//               onMouseEnter={(e) => { e.target.style.background = "#1e2f4a"; e.target.style.color = "#e2e8f0"; e.target.style.borderColor = "#2d4a6f"; }}
//               onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = "#94a3b8"; e.target.style.borderColor = "#1e2f4a"; }}
//             >
//               <i className="bi bi-box-arrow-right"></i>Sign Out
//             </button>
//           </div>
//         </aside>

//         {/* ===== MAIN CONTENT ===== */}
//         <main style={{ flex: 1, padding: "36px 40px", overflow: "hidden", background: "#f1f5f9" }}>
//           {/* Header */}
//           <div style={{ marginBottom: "36px" }}>
//             <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
//               Dashboard
//             </h1>
//             <p style={{ color: "#64748b", fontSize: "15px" }}>
//               <i className="bi bi-search me-2"></i>
//               Search for properties, hosts, or users...
//             </p>
//           </div>

//           {/* ===== STATS CARDS ===== */}
//           {loading.dashboard ? (
//             <div style={{ textAlign: "center", padding: "60px", background: "#fff", borderRadius: "16px" }}>
//               <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }}></div>
//             </div>
//           ) : (
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "36px" }}>
//               <StatsCard
//                 title="TOTAL LISTINGS"
//                 value={dashboardData.totalListings}
//                 subValue={`${dashboardData.pendingApproval} Pending Approval`}
//                 icon="bi-house-fill"
//                 color="#eef2ff"
//                 growth={dashboardData.listingsGrowthPercent}
//               />
//               <StatsCard
//                 title="ACTIVE USERS"
//                 value={dashboardData.activeUsers}
//                 subValue={
//                   <span style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
//                     <span><strong style={{ color: "#0f172a" }}>{dashboardData.totalRenters}</strong> RENTERS</span>
//                     <span><strong style={{ color: "#0f172a" }}>{dashboardData.totalHosts}</strong> HOSTS</span>
//                   </span>
//                 }
//                 icon="bi-people-fill"
//                 color="#ecfdf5"
//               />
//               <StatsCard
//                 title="REVENUE (MTD)"
//                 value={`$${dashboardData.revenueMTD.toLocaleString()}`}
//                 icon="bi-cash-stack"
//                 color="#fffbeb"
//                 growth={dashboardData.revenueGrowthPercent}
//                 growthNote="vs last month"
//               />
//               <StatsCard
//                 title="NEW BOOKINGS"
//                 value={dashboardData.newBookings}
//                 icon="bi-calendar-check"
//                 color="#fef2f2"
//                 growth={dashboardData.bookingsGrowthPercent}
//                 growthNote={dashboardData.bookingsGrowthNote || "increase in last 24h"}
//               />
//             </div>
//           )}

//           {/* ===== PENDING LISTINGS TABLE ===== */}
//           <div style={{
//             background: "#ffffff",
//             borderRadius: "16px",
//             border: "1px solid #e5e7eb",
//             overflow: "hidden",
//             boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
//           }}>
//             {/* Table Header */}
//             <div style={{ padding: "20px 28px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", background: "#fafbfc" }}>
//               <div>
//                 <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 600, color: "#0f172a", display: "flex", alignItems: "center", gap: "10px" }}>
//                   <i className="bi bi-clock-history" style={{ color: "#f59e0b" }}></i>
//                   Pending Listing Approvals
//                 </h3>
//                 <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#64748b" }}>
//                   {pagination.totalCount} properties are currently awaiting manual verification.
//                 </p>
//               </div>
//               <button
//                 onClick={() => fetchPendingListings(1)}
//                 style={{
//                   padding: "8px 18px",
//                   background: "#eef2ff",
//                   border: "none",
//                   borderRadius: "8px",
//                   cursor: "pointer",
//                   fontSize: "13px",
//                   fontWeight: 500,
//                   color: "#1e3a8a",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "8px",
//                   transition: "0.2s"
//                 }}
//                 onMouseEnter={(e) => { e.target.style.background = "#dbeafe"; }}
//                 onMouseLeave={(e) => { e.target.style.background = "#eef2ff"; }}
//               >
//                 <i className="bi bi-arrow-clockwise"></i> Refresh
//               </button>
//             </div>

//             {/* Table Content */}
//             {loading.listings ? (
//               <div style={{ textAlign: "center", padding: "60px" }}>
//                 <div className="spinner-border text-primary" style={{ width: "2.5rem", height: "2.5rem" }}></div>
//               </div>
//             ) : (
//               <>
//                 <div style={{ overflowX: "auto" }}>
//                   <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                     <thead style={{ background: "#f8fafc", borderBottom: "1px solid #e5e7eb" }}>
//                       <tr>
//                         <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
//                           PROPERTY NAME
//                         </th>
//                         <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
//                           HOST NAME
//                         </th>
//                         <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
//                           LISTING TYPE
//                         </th>
//                         <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
//                           DATE SUBMITTED
//                         </th>
//                         <th style={{ padding: "14px 20px", textAlign: "right", fontSize: "11px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
//                           ACTIONS
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {pendingListings.length === 0 ? (
//                         <tr>
//                           <td colSpan="5" style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>
//                             <i className="bi bi-check-circle" style={{ fontSize: "40px", display: "block", marginBottom: "12px", color: "#10b981" }}></i>
//                             No pending listings
//                           </td>
//                         </tr>
//                       ) : (
//                         pendingListings.map((listing) => (
//                           <tr key={listing.id} style={{ borderBottom: "1px solid #f1f5f9", transition: "0.15s" }}
//                             onMouseEnter={(e) => { e.target.style.background = "#f8fafc"; }}
//                             onMouseLeave={(e) => { e.target.style.background = "transparent"; }}
//                           >
//                             <td style={{ padding: "14px 20px" }}>
//                               <div>
//                                 <div style={{ fontWeight: 600, color: "#0f172a", fontSize: "14px" }}>
//                                   {listing.propertyName || "Untitled"}
//                                 </div>
//                                 <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
//                                   <i className="bi bi-geo-alt me-1"></i>
//                                   {listing.city || ""}{listing.government ? `, ${listing.government}` : ""}
//                                 </div>
//                               </div>
//                             </td>
//                             <td style={{ padding: "14px 20px", color: "#334155", fontSize: "14px" }}>
//                               {listing.hostName || "Unknown"}
//                             </td>
//                             <td style={{ padding: "14px 20px" }}>
//                               <span style={{
//                                 background: "#eef2ff",
//                                 color: "#1e3a8a",
//                                 padding: "4px 14px",
//                                 borderRadius: "20px",
//                                 fontSize: "12px",
//                                 fontWeight: 500,
//                                 display: "inline-block"
//                               }}>
//                                 {listing.listingType || "—"}
//                               </span>
//                             </td>
//                             <td style={{ padding: "14px 20px", color: "#64748b", fontSize: "14px" }}>
//                               {formatDate(listing.dateSubmitted)}
//                             </td>
//                             <td style={{ padding: "14px 20px", textAlign: "right" }}>
//                               <button
//                                 style={{
//                                   padding: "6px 18px",
//                                   background: "#dbeafe",
//                                   border: "none",
//                                   borderRadius: "30px",
//                                   cursor: "pointer",
//                                   fontSize: "13px",
//                                   fontWeight: 500,
//                                   color: "#1e3a8a",
//                                   transition: "all 0.2s ease",
//                                   display: "inline-flex",
//                                   alignItems: "center",
//                                   gap: "6px"
//                                 }}
//                                 onMouseEnter={(e) => { e.target.style.background = "#2563eb"; e.target.style.color = "#ffffff"; }}
//                                 onMouseLeave={(e) => { e.target.style.background = "#dbeafe"; e.target.style.color = "#1e3a8a"; }}
//                               >
//                                 <i className="bi bi-eye me-1"></i>Review
//                               </button>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Pagination Footer */}
//                 {pagination.totalCount > 0 && (
//                   <div style={{ padding: "16px 28px", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", background: "#fafbfc" }}>
//                     <div style={{ fontSize: "14px", color: "#64748b" }}>
//                       Showing {((pagination.page - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(pagination.page * ITEMS_PER_PAGE, pagination.totalCount)} of {pagination.totalCount} pending listings.
//                     </div>
//                     <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
//                       <button
//                         onClick={() => handlePageChange(pagination.page - 1)}
//                         disabled={pagination.page === 1}
//                         style={{
//                           padding: "8px 14px",
//                           border: "1px solid #e5e7eb",
//                           background: "#ffffff",
//                           borderRadius: "8px",
//                           cursor: pagination.page === 1 ? "not-allowed" : "pointer",
//                           opacity: pagination.page === 1 ? 0.5 : 1,
//                           fontSize: "13px",
//                           color: "#334155",
//                           transition: "0.15s"
//                         }}
//                         onMouseEnter={(e) => {
//                           if (pagination.page !== 1) {
//                             e.target.style.background = "#f1f5f9";
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           e.target.style.background = "#ffffff";
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
//                               padding: "8px 14px",
//                               border: "1px solid #e5e7eb",
//                               background: pagination.page === pageNum ? "#1e3a8a" : "#ffffff",
//                               color: pagination.page === pageNum ? "#ffffff" : "#334155",
//                               borderRadius: "8px",
//                               cursor: "pointer",
//                               fontWeight: pagination.page === pageNum ? 600 : 400,
//                               fontSize: "13px",
//                               transition: "0.15s"
//                             }}
//                             onMouseEnter={(e) => {
//                               if (pagination.page !== pageNum) {
//                                 e.target.style.background = "#f1f5f9";
//                               }
//                             }}
//                             onMouseLeave={(e) => {
//                               if (pagination.page !== pageNum) {
//                                 e.target.style.background = "#ffffff";
//                               }
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
//                           padding: "8px 14px",
//                           border: "1px solid #e5e7eb",
//                           background: "#ffffff",
//                           borderRadius: "8px",
//                           cursor: pagination.page === pagination.totalPages ? "not-allowed" : "pointer",
//                           opacity: pagination.page === pagination.totalPages ? 0.5 : 1,
//                           fontSize: "13px",
//                           color: "#334155",
//                           transition: "0.15s"
//                         }}
//                         onMouseEnter={(e) => {
//                           if (pagination.page !== pagination.totalPages) {
//                             e.target.style.background = "#f1f5f9";
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           e.target.style.background = "#ffffff";
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




















import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from '../Shared/AdminSidebar';

// ============================================================
// API ENDPOINTS
// ============================================================
const DASHBOARD_API = "https://graduationproject1.runasp.net/api/admin/dashboard";
const PENDING_LISTINGS_API = "https://graduationproject1.runasp.net/api/admin/pending-listings";
const PROPERTY_API = "https://graduationproject1.runasp.net/api/Property/shared";
const ROOM_API_BASE = "https://graduationproject1.runasp.net/api/Property"; // -> /{propertyId}/rooms/{roomId}
const PROPERTY_REVIEW_API = "https://graduationproject1.runasp.net/api/admin/properties";
const ITEMS_PER_PAGE = 10;

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

const formatDateTime = (dateString) => {
  if (!dateString || dateString === "0001-01-01T00:00:00") return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// دالة مساعدة للتحقق من المصفوفات
const safeArray = (data, fallback = []) => {
  return Array.isArray(data) ? data : fallback;
};

// ============================================================
// SHARED STYLE TOKENS (used by the shared-apartment / room views)
// ============================================================
const cardStyle = {
  background: "#fff",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  padding: "24px",
  marginBottom: "24px"
};

const cardTitleStyle = {
  margin: "0 0 16px",
  fontSize: "16px",
  fontWeight: 600,
  color: "#0f172a",
  display: "flex",
  alignItems: "center",
  gap: "8px"
};

const tagStyle = {
  background: "#f1f5f9",
  padding: "5px 14px",
  borderRadius: "20px",
  fontSize: "13px",
  color: "#0f172a",
  fontWeight: 500,
  display: "inline-flex",
  alignItems: "center",
  gap: "6px"
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
// STATS CARD COMPONENT
// ============================================================
const StatsCard = ({ title, value, subValue, icon, color, growth, growthNote }) => {
  return (
    <div style={{
      background: "#fff",
      borderRadius: "16px",
      padding: "24px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      border: "1px solid #e5e7eb",
      transition: "0.2s"
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <div style={{
          width: "52px",
          height: "52px",
          borderRadius: "14px",
          background: color || "#eef2ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "26px",
          color: "#1e3a8a"
        }}>
          <i className={`bi ${icon}`}></i>
        </div>
        {growth !== undefined && (
          <div style={{
            fontSize: "14px",
            fontWeight: 600,
            color: growth >= 0 ? "#10b981" : "#ef4444",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            background: growth >= 0 ? "#ecfdf5" : "#fef2f2",
            padding: "4px 12px",
            borderRadius: "20px"
          }}>
            <i className={`bi ${growth >= 0 ? "bi-arrow-up" : "bi-arrow-down"}`}></i>
            {Math.abs(growth)}%
          </div>
        )}
      </div>
      <div style={{ fontSize: "30px", fontWeight: "bold", color: "#1f2937", marginBottom: "6px" }}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      <div style={{ fontSize: "14px", color: "#6b7280", fontWeight: 500 }}>{title}</div>
      {subValue && (
        <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "6px" }}>
          {subValue}
        </div>
      )}
      {growthNote && (
        <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px", fontStyle: "italic" }}>
          {growthNote}
        </div>
      )}
    </div>
  );
};

// ============================================================
// REVIEW ACTION PANEL (Approve / Reject / Feedback + Host info)
// Reused by both the single-unit view and the shared-apartment view
// ============================================================
const ReviewActionPanel = ({
  reviewAction,
  setReviewAction,
  feedback,
  setFeedback,
  submitting,
  onSubmit,
  hostName,
  hostId,
  profilePicture,
  onViewHost
}) => {
  return (
    <div style={{ ...cardStyle, position: "sticky", top: "20px" }}>
      <h3 style={cardTitleStyle}><i className="bi bi-check2-square"></i>Review Action</h3>

      <button
        onClick={() => setReviewAction("approve")}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          background: reviewAction === "approve" ? "#10b981" : "#ecfdf5",
          color: reviewAction === "approve" ? "#fff" : "#10b981",
          border: "1px solid #10b981",
          borderRadius: "8px",
          fontWeight: 600,
          fontSize: "14px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          transition: "0.15s"
        }}
      >
        <i className="bi bi-check-circle"></i> Approve Listing
      </button>

      <button
        onClick={() => setReviewAction("reject")}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          background: reviewAction === "reject" ? "#ef4444" : "#fef2f2",
          color: reviewAction === "reject" ? "#fff" : "#ef4444",
          border: "1px solid #ef4444",
          borderRadius: "8px",
          fontWeight: 600,
          fontSize: "14px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          transition: "0.15s"
        }}
      >
        <i className="bi bi-x-circle"></i> Reject &amp; Delete
      </button>

      <label style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", display: "block", marginBottom: "8px" }}>
        <i className="bi bi-pencil me-2"></i>Request Modification
      </label>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Type specific feedback for the host here. (e.g., Please provide higher resolution photos of the kitchen)"
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          fontSize: "14px",
          minHeight: "80px",
          resize: "vertical",
          outline: "none",
          fontFamily: "inherit",
          color: "#1f2937",
          background: "#fafbfc",
          boxSizing: "border-box"
        }}
      />
      <button
        onClick={onSubmit}
        disabled={submitting}
        style={{
          marginTop: "12px",
          width: "100%",
          padding: "10px 24px",
          background: submitting ? "#94a3b8" : "#2563eb",
          border: "none",
          borderRadius: "8px",
          color: "#fff",
          fontWeight: 600,
          cursor: submitting ? "not-allowed" : "pointer",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          transition: "0.2s"
        }}
      >
        {submitting ? (
          <>
            <span className="spinner-border spinner-border-sm"></span>
            Processing...
          </>
        ) : (
          <>
            <i className="bi bi-send"></i> Send Feedback
          </>
        )}
      </button>

      {/* Host Info */}
      <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            overflow: "hidden",
            background: "#1e3a8a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: "20px",
            fontWeight: "bold",
            color: "#fff"
          }}>
            {profilePicture ? (
              <img
                src={profilePicture}
                alt={hostName}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            ) : (
              hostName.charAt(0)
            )}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px", color: "#0f172a" }}>{hostName}</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>Host ID: {hostId ? String(hostId).slice(0, 8) : "N/A"}</div>
          </div>
        </div>
        <button
          onClick={onViewHost}
          style={{
            width: "100%",
            padding: "10px",
            background: "#eef2ff",
            border: "none",
            borderRadius: "8px",
            color: "#1e3a8a",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px"
          }}
        >
          <i className="bi bi-person"></i> View Host Profile
        </button>
      </div>
    </div>
  );
};

// ============================================================
// MAIN ADMIN DASHBOARD
// ============================================================
const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    totalListings: 0,
    pendingApproval: 0,
    listingsGrowthPercent: 0,
    activeUsers: 0,
    totalRenters: 0,
    totalHosts: 0,
    revenueMTD: 0,
    revenueGrowthPercent: 0,
    newBookings: 0,
    bookingsGrowthPercent: 0,
    bookingsGrowthNote: ""
  });
  
  const [pendingListings, setPendingListings] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: ITEMS_PER_PAGE, totalCount: 0, totalPages: 1 });
  const [loading, setLoading] = useState({ dashboard: true, listings: true });
  const [toast, setToast] = useState(null);
  const [activeNav, setActiveNav] = useState("dashboard");

  // ===== STATES FOR REVIEW PAGE =====
  const [showReview, setShowReview] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [selectedListingMeta, setSelectedListingMeta] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [reviewAction, setReviewAction] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [propertyImages, setPropertyImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // ===== STATES FOR SHARED APARTMENT (rooms) REVIEW =====
  const [isSharedProperty, setIsSharedProperty] = useState(false);
  const [sharedRooms, setSharedRooms] = useState([]);
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomLoading, setRoomLoading] = useState(false);
  const [roomImages, setRoomImages] = useState([]);
  const [activeRoomImageIndex, setActiveRoomImageIndex] = useState(0);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getAuthConfig = useCallback(() => {
    const token = getAuthToken();
    return token ? { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': '*/*' } } : null;
  }, []);

  // ============================================================
  // FETCH DASHBOARD STATS
  // ============================================================
  const fetchDashboardStats = useCallback(async () => {
    setLoading(prev => ({ ...prev, dashboard: true }));
    try {
      const config = getAuthConfig();
      if (!config) throw new Error("No token found");

      const response = await axios.get(DASHBOARD_API, config);
      console.log("📊 Dashboard Stats:", response.data);

      setDashboardData({
        totalListings: response.data.totalListings || 0,
        pendingApproval: response.data.pendingApproval || 0,
        listingsGrowthPercent: response.data.listingsGrowthPercent || 0,
        activeUsers: response.data.activeUsers || 0,
        totalRenters: response.data.totalRenters || 0,
        totalHosts: response.data.totalHosts || 0,
        revenueMTD: response.data.revenueMTD || 0,
        revenueGrowthPercent: response.data.revenueGrowthPercent || 0,
        newBookings: response.data.newBookings || 0,
        bookingsGrowthPercent: response.data.bookingsGrowthPercent || 0,
        bookingsGrowthNote: response.data.bookingsGrowthNote || ""
      });
    } catch (error) {
      console.error("Dashboard stats error:", error);
      if (error.response?.status === 401) {
        showToast("Session expired. Please login again.", "error");
        localStorage.removeItem("userToken");
        setTimeout(() => window.location.href = "/login", 2000);
      } else {
        showToast("Failed to load dashboard stats. Please try again.", "error");
      }
    } finally {
      setLoading(prev => ({ ...prev, dashboard: false }));
    }
  }, [getAuthConfig]);

  // ============================================================
  // FETCH PENDING LISTINGS
  // ============================================================
  const fetchPendingListings = useCallback(async (page = 1, pageSize = ITEMS_PER_PAGE) => {
    setLoading(prev => ({ ...prev, listings: true }));
    try {
      const config = getAuthConfig();
      if (!config) throw new Error("No token found");

      const url = `${PENDING_LISTINGS_API}?page=${page}&pageSize=${pageSize}`;
      const response = await axios.get(url, config);
      console.log("📋 Pending Listings:", response.data);

      if (response.data.items) {
        setPendingListings(response.data.items);
        setPagination({
          page: response.data.page || 1,
          pageSize: response.data.pageSize || ITEMS_PER_PAGE,
          totalCount: response.data.totalCount || 0,
          totalPages: Math.ceil((response.data.totalCount || 0) / (response.data.pageSize || ITEMS_PER_PAGE))
        });
      } else {
        setPendingListings([]);
        setPagination({ page: 1, pageSize: ITEMS_PER_PAGE, totalCount: 0, totalPages: 1 });
      }
    } catch (error) {
      console.error("Pending listings error:", error);
      if (error.response?.status === 401) {
        showToast("Session expired. Please login again.", "error");
        localStorage.removeItem("userToken");
        setTimeout(() => window.location.href = "/login", 2000);
      } else {
        showToast("Failed to load pending listings. Please try again.", "error");
      }
    } finally {
      setLoading(prev => ({ ...prev, listings: false }));
    }
  }, [getAuthConfig]);

  // ============================================================
  // FETCH PROPERTY DETAILS FOR REVIEW
  // ============================================================
  const fetchPropertyDetails = useCallback(async (propertyId) => {
    setReviewLoading(true);
    try {
      const config = getAuthConfig();
      if (!config) throw new Error("No token found");

      const response = await axios.get(`${PROPERTY_API}/${propertyId}`, config);
      console.log("🏠 Property Details:", response.data);

      const data = response.data.data || response.data;
      setPropertyDetails(data);

      // ===== هل الشقة دي "مشتركة" (rooms) ولا شقة عادية؟ =====
      // ⚠️ NOTE: عدّل الشرط ده لو الـ API بتاعك بيرجع اسم/شكل مختلف
      // الافتراض هنا: شقة مشتركة لو فيها rooms[] أو فيه فلاج isShared/listingType === "Shared"
      const roomsArray = data.rooms || data.availableRooms || [];
      const sharedFlag =
        data.isShared === true ||
        (typeof data.listingType === "string" && data.listingType.toLowerCase() === "shared") ||
        (Array.isArray(roomsArray) && roomsArray.length > 0);

      setIsSharedProperty(sharedFlag);
      setSharedRooms(Array.isArray(roomsArray) ? roomsArray : []);
      setRoomDetails(null);
      setRoomImages([]);
      setActiveRoomImageIndex(0);

      // استخراج الصور من propertyImages (مع تقديم صورة الغلاف أولاً)
      if (data.propertyImages && Array.isArray(data.propertyImages) && data.propertyImages.length > 0) {
        const sortedImages = [...data.propertyImages].sort((a, b) => (b.isCover ? 1 : 0) - (a.isCover ? 1 : 0));
        setPropertyImages(sortedImages.map(img => img.imageUrl));
      } else if (data.images && Array.isArray(data.images) && data.images.length > 0) {
        setPropertyImages(data.images);
      } else {
        setPropertyImages([
          "https://placehold.co/800x500/e2e8f0/1e293b?text=No+Image+Available"
        ]);
      }
      setActiveImageIndex(0);

      setShowReview(true);
    } catch (error) {
      console.error("Property details error:", error);
      if (error.response?.status === 401) {
        showToast("Session expired. Please login again.", "error");
        localStorage.removeItem("userToken");
        setTimeout(() => window.location.href = "/login", 2000);
      } else if (error.response?.status === 404) {
        showToast("Property not found.", "error");
      } else {
        showToast("Failed to load property details. Please try again.", "error");
      }
    } finally {
      setReviewLoading(false);
    }
  }, [getAuthConfig]);

  // ============================================================
  // FETCH INDIVIDUAL ROOM DETAILS  (GET /api/Property/{propertyId}/rooms/{roomId})
  // ============================================================
  const fetchRoomDetails = useCallback(async (propertyId, roomId) => {
    setRoomLoading(true);
    try {
      const config = getAuthConfig();
      if (!config) throw new Error("No token found");

      const response = await axios.get(`${ROOM_API_BASE}/${propertyId}/rooms/${roomId}`, config);
      console.log("🛏️ Room Details:", response.data);

      const data = response.data.data || response.data;
      setRoomDetails(data);

      // ⚠️ NOTE: عدّل أسماء الحقول دي لو شكل الصور القادم من الـ API مختلف
      if (data.roomImages && Array.isArray(data.roomImages) && data.roomImages.length > 0) {
        const sortedImages = [...data.roomImages].sort((a, b) => (b.isCover ? 1 : 0) - (a.isCover ? 1 : 0));
        setRoomImages(sortedImages.map(img => img.imageUrl || img));
      } else if (data.images && Array.isArray(data.images) && data.images.length > 0) {
        setRoomImages(data.images);
      } else {
        setRoomImages(["https://placehold.co/800x500/e2e8f0/1e293b?text=No+Image+Available"]);
      }
      setActiveRoomImageIndex(0);
    } catch (error) {
      console.error("Room details error:", error);
      if (error.response?.status === 401) {
        showToast("Session expired. Please login again.", "error");
        localStorage.removeItem("userToken");
        setTimeout(() => window.location.href = "/login", 2000);
      } else if (error.response?.status === 404) {
        showToast("Room not found.", "error");
      } else {
        showToast("Failed to load room details. Please try again.", "error");
      }
    } finally {
      setRoomLoading(false);
    }
  }, [getAuthConfig]);

  // ============================================================
  // HANDLE VIEW ROOM / BACK TO APARTMENT OVERVIEW
  // ============================================================
  const handleViewRoom = (roomId) => {
    fetchRoomDetails(selectedPropertyId, roomId);
  };

  const handleBackToApartment = () => {
    setRoomDetails(null);
    setRoomImages([]);
    setActiveRoomImageIndex(0);
  };

  // ============================================================
  // HANDLE REVIEW CLICK
  // ============================================================
  const handleReviewClick = (listing) => {
    console.log(`🔍 Opening review for listing ID: ${listing.id}`);
    setSelectedPropertyId(listing.id);
    setSelectedListingMeta(listing);
    fetchPropertyDetails(listing.id);
  };

  // ============================================================
  // HANDLE BACK TO DASHBOARD
  // ============================================================
  const handleBackToDashboard = () => {
    setShowReview(false);
    setPropertyDetails(null);
    setSelectedPropertyId(null);
    setSelectedListingMeta(null);
    setFeedback("");
    setReviewAction(null);
    setPropertyImages([]);
    setActiveImageIndex(0);
    setIsSharedProperty(false);
    setSharedRooms([]);
    setRoomDetails(null);
    setRoomImages([]);
    setActiveRoomImageIndex(0);
  };

  // ============================================================
  // HANDLE REVIEW SUBMISSION
  // ============================================================
  const handleSubmitReview = async () => {
    if (!reviewAction) {
      showToast("Please select an action (Approve or Reject).", "error");
      return;
    }

    // لو القرار رفض، لازم يكتب سبب الرفض في خانة الـ feedback
    if (reviewAction === "reject" && !feedback.trim()) {
      showToast("Please provide a rejection reason before rejecting.", "error");
      return;
    }

    setSubmitting(true);
    try {
      const config = getAuthConfig();
      if (!config) throw new Error("No token found");

      // الشكل الحقيقي اللي الـ API بتاع الأدمن مستقبله
      // POST /api/admin/properties/{propertyId}/review
      // { "approve": true/false, "rejectionReason": "string" }
      const payload = {
        approve: reviewAction === "approve",
        rejectionReason: feedback.trim() || ""
      };

      console.log("📤 Submitting review:", payload);

      await axios.post(
        `${PROPERTY_REVIEW_API}/${selectedPropertyId}/review`,
        payload,
        config
      );

      showToast(
        reviewAction === "approve" 
          ? `Listing #${selectedPropertyId} approved successfully!` 
          : `Listing #${selectedPropertyId} rejected and deleted.`,
        "success"
      );

      setTimeout(() => {
        handleBackToDashboard();
        fetchPendingListings(pagination.page);
        fetchDashboardStats();
      }, 1500);
    } catch (error) {
      console.error("Review submission error:", error);
      if (error.response?.status === 401) {
        showToast("Session expired. Please login again.", "error");
        localStorage.removeItem("userToken");
        setTimeout(() => window.location.href = "/login", 2000);
      } else if (error.response?.status === 404) {
        showToast("Property not found. It may have already been reviewed.", "error");
      } else if (error.response?.status === 400) {
        showToast(error.response?.data?.message || "Invalid request. Please check the data and try again.", "error");
      } else {
        showToast(error.response?.data?.message || "Failed to submit review. Please try again.", "error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // ============================================================
  // INITIAL LOAD
  // ============================================================
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetchDashboardStats();
    fetchPendingListings(1);
  }, []);

  // ============================================================
  // HANDLE PAGE CHANGE
  // ============================================================
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchPendingListings(newPage);
    }
  };

  // ============================================================
  // NAVIGATION ITEMS
  // ============================================================
  const navItems = [
    { id: "dashboard", icon: "bi-grid", label: "Dashboard" },
    { id: "users", icon: "bi-people", label: "User Management" },
    { id: "properties", icon: "bi-building", label: "Properties" },
    { id: "bookings", icon: "bi-calendar-check", label: "Bookings" },
    { id: "financials", icon: "bi-cash-stack", label: "Financials" },
    { id: "analytics", icon: "bi-graph-up", label: "Analytics" },
    { id: "settings", icon: "bi-gear", label: "General Settings" },
  ];

  // ============================================================
  // RENDER SHARED APARTMENT VIEW (apartment-level info + rooms grid)
  // Matches the "Apartment details (rooms)" mockup
  // ============================================================
  const renderSharedApartmentView = (property) => {
    // ===== Shared Amenities =====
    const amenityNames = {
      wifi: { label: "High-speed WiFi", icon: "bi-wifi" },
      tv: { label: "TV", icon: "bi-tv" },
      cooktop: { label: "Cooktop", icon: "bi-fire" },
      oven: { label: "Oven", icon: "bi-box" },
      kettle: { label: "Kettle", icon: "bi-cup-hot" },
      dishwasher: { label: "Dishwasher", icon: "bi-droplet" },
      refrigerator: { label: "Refrigerator", icon: "bi-snow" },
      microwave: { label: "Microwave", icon: "bi-square" },
      washer: { label: "Washer & Dryer", icon: "bi-water" },
      freeParking: { label: "Free Parking", icon: "bi-p-circle" },
      airConditioning: { label: "Central Air", icon: "bi-wind" },
      smokeAlarm: { label: "Smoke Alarm", icon: "bi-bell" },
      fireExtinguisher: { label: "Fire Extinguisher", icon: "bi-shield-check" }
    };
    const amenities = property.amenities || {};
    const amenitiesList = Object.keys(amenityNames).filter((key) => amenities[key] === true);

    // ===== Nearby Services =====
    const nearbyServiceNames = {
      hasGroceryStore: "Grocery Store",
      hasPharmacy: "Pharmacy",
      hasHospital: "Hospital",
      hasSchool: "School",
      hasUniversity: "University",
      hasPublicTransport: "Public Transport",
      hasParking: "Parking",
      hasMall: "Mall",
      hasRestaurants: "Restaurants",
      hasPark: "Park",
      hasGym: "Gym",
      isSafeArea: "Safe Area",
      hasPoliceStation: "Police Station",
      isQuietArea: "Quiet Area",
      hasChurchNearby: "Church Nearby",
      hasMosqueNearby: "Mosque Nearby"
    };
    const nearbyServices = property.nearbyServices || {};
    const nearbyServicesList = Object.keys(nearbyServiceNames).filter((key) => nearbyServices[key] === true);

    // ===== House Rules =====
    // ⚠️ NOTE: عدّل المفاتيح (smokingAllowed, noPets...) دي لو الـ API الحقيقي عندك باسماء مختلفة
    const houseRules = property.houseRules || {};
    const houseRulesLeft = [
      { key: "noSmoking", label: "No smoking inside the apartment" },
      { key: "noPets", label: "Pets are not permitted" },
      { key: "noParties", label: "No loud parties or large gatherings" }
    ];
    const houseRulesRight = [
      { key: "visitorsAllowed", label: houseRules.visitorsUntilTime ? `Visitors allowed until ${houseRules.visitorsUntilTime}` : "Visitors allowed" },
      { key: "quietHoursEnforced", label: (houseRules.quietHoursFrom && houseRules.quietHoursTo) ? `Maintain quiet hours (${houseRules.quietHoursFrom} - ${houseRules.quietHoursTo})` : "Quiet hours enforced" },
      { key: "sharedKitchenCleanupRequired", label: "Shared kitchen cleaning after use" }
    ];
    const allHouseRules = [...houseRulesLeft, ...houseRulesRight];
    const hasAnyHouseRules = allHouseRules.some((r) => houseRules[r.key] !== undefined);

    // ===== Images =====
    const images = safeArray(propertyImages, ["https://placehold.co/800x500/e2e8f0/1e293b?text=No+Image+Available"]);
    const heroImage = images[activeImageIndex] || images[0];

    const hostName = property.hostName || selectedListingMeta?.hostName || "Unknown Host";
    const submittedDate = selectedListingMeta?.dateSubmitted;

    const mapsLink = (property.latitude && property.longitude)
      ? `https://www.google.com/maps?q=${property.latitude},${property.longitude}`
      : null;

    // ===== Rooms list & derived stats =====
    const rooms = safeArray(sharedRooms, []);
    const availableRoomsCount = rooms.length > 0
      ? rooms.filter((r) => r.isAvailable !== false).length
      : (property.availableRoomsCount ?? 0);
    const totalRoomsCount = rooms.length || property.totalRooms || 0;
    const rentValues = rooms.map((r) => r.monthlyRent).filter((v) => typeof v === "number");
    const minRent = rentValues.length ? Math.min(...rentValues) : property.minRent;
    const maxRent = rentValues.length ? Math.max(...rentValues) : property.maxRent;
    const rentRangeLabel = (minRent != null && maxRent != null)
      ? (minRent === maxRent ? `EGP ${minRent.toLocaleString()}` : `EGP ${minRent.toLocaleString()} - ${maxRent.toLocaleString()}`)
      : "N/A";

    const genderRestriction = property.genderRestriction || property.allowedTenants?.studentGender;
    const genderBadgeLabel = (genderRestriction && genderRestriction !== "any")
      ? `${String(genderRestriction).charAt(0).toUpperCase()}${String(genderRestriction).slice(1)} Only`
      : null;

    return (
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* BREADCRUMB */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", fontSize: "14px", color: "#64748b" }}>
          <span style={{ cursor: "pointer" }} onClick={handleBackToDashboard}>
            <i className="bi bi-arrow-left me-1"></i>Admin Dashboard
          </span>
          <span style={{ color: "#cbd5e1" }}>|</span>
          <span style={{ fontWeight: 600, color: "#0f172a" }}>
            Review Shared Listing #{selectedPropertyId}
          </span>
        </div>

        {/* TITLE + BADGES */}
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 700, color: "#0f172a" }}>
            {property.name || "Untitled Shared Listing"}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
            <span style={{ background: "#fef3c7", color: "#92400e", padding: "4px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <i className="bi bi-clock-history"></i> Pending Review
            </span>
            <span style={{ background: "#dbeafe", color: "#1e3a8a", padding: "4px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 600 }}>
              <i className="bi bi-people-fill me-1"></i>Shared Apartment
            </span>
            {genderBadgeLabel && (
              <span style={{ background: "#fce7f3", color: "#be185d", padding: "4px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 600 }}>
                {genderBadgeLabel}
              </span>
            )}
            {(property.isHostVerified || property.isVerified) && (
              <span style={{ background: "#dcfce7", color: "#15803d", padding: "4px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 600 }}>
                <i className="bi bi-patch-check-fill me-1"></i>Verified
              </span>
            )}
            <span style={{ fontSize: "14px", color: "#64748b" }}>
              <i className="bi bi-calendar3 me-1"></i>
              {submittedDate ? `Submitted ${formatDateTime(submittedDate)}` : "Submission date unavailable"} by {hostName}
            </span>
          </div>
        </div>

        {/* IMAGE GALLERY */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ width: "100%", height: "420px", borderRadius: "16px", overflow: "hidden", background: "#e2e8f0", marginBottom: "12px" }}>
            <img
              src={heroImage}
              alt={property.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.target.src = "https://placehold.co/800x500/e2e8f0/1e293b?text=No+Image"; }}
            />
          </div>
          {images.length > 1 && (
            <div style={{ display: "flex", gap: "12px", overflowX: "auto", padding: "2px" }}>
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  style={{
                    minWidth: "120px", width: "120px", height: "84px", borderRadius: "10px", overflow: "hidden",
                    cursor: "pointer", flexShrink: 0,
                    border: index === activeImageIndex ? "2px solid #2563eb" : "2px solid transparent",
                    opacity: index === activeImageIndex ? 1 : 0.8
                  }}
                >
                  <img
                    src={img}
                    alt={`Apartment ${index + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.target.src = "https://placehold.co/200x150/e2e8f0/1e293b?text=N/A"; }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MAIN CONTENT */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "32px" }}>
          {/* LEFT COLUMN */}
          <div>
            {/* Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "14px", marginBottom: "24px" }}>
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "14px", textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a" }}>{property.totalArea ?? property.size ?? "N/A"}</div>
                <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>Total Area (m²)</div>
              </div>
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "14px", textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a" }}>{property.floorNumber ?? "N/A"}</div>
                <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>{property.hasElevatorAccess ? "Floor (Elevator)" : "Floor"}</div>
              </div>
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "14px", textAlign: "center" }}>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>{rentRangeLabel}</div>
                <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>Rent / Room</div>
              </div>
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "14px", textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#10b981" }}>{availableRoomsCount}</div>
                <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>Rooms Available</div>
              </div>
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "14px", textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a" }}>{totalRoomsCount}</div>
                <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>Total Rooms</div>
              </div>
            </div>

            {/* Shared Amenities & Location */}
            <div style={{ ...cardStyle, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
              <div>
                <h3 style={cardTitleStyle}><i className="bi bi-grid-3x3-gap-fill"></i>Shared Amenities</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {amenitiesList.length > 0 ? (
                    amenitiesList.map((key) => (
                      <span key={key} style={tagStyle}>
                        <i className={`bi ${amenityNames[key].icon}`}></i>{amenityNames[key].label}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: "#64748b", fontSize: "14px" }}>
                      <i className="bi bi-info-circle me-1"></i>No shared amenities listed
                    </span>
                  )}
                </div>
              </div>
              <div>
                <h3 style={cardTitleStyle}><i className="bi bi-geo-alt"></i>Location</h3>
                <p style={{ color: "#334155", fontSize: "14px", margin: "0 0 10px" }}>
                  {[property.street, property.city, property.government].filter(Boolean).join(", ") || "Address not provided"}
                </p>
                {mapsLink && (
                  <a href={mapsLink} target="_blank" rel="noreferrer" style={{ fontSize: "13px", color: "#2563eb", fontWeight: 600, textDecoration: "none" }}>
                    <i className="bi bi-pin-map me-1"></i>Open in Google Maps
                  </a>
                )}
              </div>
            </div>

            {/* Nearby Services */}
            <div style={cardStyle}>
              <h3 style={cardTitleStyle}><i className="bi bi-signpost-split"></i>Nearby Services</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {nearbyServicesList.length > 0 ? (
                  nearbyServicesList.map((key) => (
                    <span key={key} style={tagStyle}>
                      <i className="bi bi-check2"></i>{nearbyServiceNames[key]}
                    </span>
                  ))
                ) : (
                  <span style={{ color: "#64748b", fontSize: "14px" }}>
                    <i className="bi bi-info-circle me-1"></i>No nearby services listed
                  </span>
                )}
              </div>
            </div>

            {/* House Rules */}
            <div style={cardStyle}>
              <h3 style={cardTitleStyle}><i className="bi bi-journal-text"></i>House Rules</h3>
              {hasAnyHouseRules ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
                  {allHouseRules.map((rule) => (
                    houseRules[rule.key] !== undefined && (
                      <div key={rule.key} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#334155" }}>
                        <i
                          className={`bi ${houseRules[rule.key] ? "bi-check-circle-fill" : "bi-x-circle"}`}
                          style={{ color: houseRules[rule.key] ? "#10b981" : "#ef4444" }}
                        ></i>
                        {rule.label}
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <span style={{ color: "#64748b", fontSize: "14px" }}>
                  <i className="bi bi-info-circle me-1"></i>No house rules listed
                </span>
              )}
            </div>

            {/* About */}
            <div style={cardStyle}>
              <h3 style={cardTitleStyle}><i className="bi bi-file-text"></i>About the Apartment</h3>
              <p style={{ color: "#334155", fontSize: "14px", lineHeight: "1.7", margin: 0 }}>
                {property.description || "No description provided."}
              </p>
            </div>

            {/* Available Rooms */}
            <div style={{ ...cardStyle, marginBottom: 0 }}>
              <h3 style={cardTitleStyle}><i className="bi bi-door-open"></i>Available Rooms ({rooms.length})</h3>
              {rooms.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                  {rooms.map((room) => {
                    const roomImg = room.coverImage || room.imageUrl || (Array.isArray(room.images) && room.images[0]) || "https://placehold.co/400x260/e2e8f0/1e293b?text=Room";
                    const roomName = room.roomName || room.name || `Room #${room.id}`;
                    return (
                      <div key={room.id} style={{ border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden", background: "#fff" }}>
                        <div style={{ position: "relative", height: "140px", background: "#e2e8f0" }}>
                          <img
                            src={roomImg}
                            alt={roomName}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => { e.target.src = "https://placehold.co/400x260/e2e8f0/1e293b?text=Room"; }}
                          />
                          {room.monthlyRent != null && (
                            <span style={{ position: "absolute", top: "8px", right: "8px", background: "#fff", color: "#0f172a", fontSize: "12px", fontWeight: 700, padding: "4px 10px", borderRadius: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }}>
                              EGP {room.monthlyRent.toLocaleString()}
                            </span>
                          )}
                          {room.isAvailable === false && (
                            <span style={{ position: "absolute", top: "8px", left: "8px", background: "#ef4444", color: "#fff", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px" }}>
                              Occupied
                            </span>
                          )}
                        </div>
                        <div style={{ padding: "12px 14px" }}>
                          <div style={{ fontWeight: 600, fontSize: "14px", color: "#0f172a", marginBottom: "4px" }}>{roomName}</div>
                          <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "10px", minHeight: "32px" }}>
                            {room.description || room.shortDescription || "No description provided."}
                          </div>
                          <button
                            onClick={() => handleViewRoom(room.id)}
                            style={{
                              width: "100%", padding: "7px", background: "#eef2ff", border: "none", borderRadius: "8px",
                              color: "#1e3a8a", fontWeight: 600, fontSize: "13px", cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px"
                            }}
                          >
                            <i className="bi bi-eye"></i> View Room Details
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <span style={{ color: "#64748b", fontSize: "14px" }}>
                  <i className="bi bi-info-circle me-1"></i>No rooms listed for this apartment yet
                </span>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <ReviewActionPanel
              reviewAction={reviewAction}
              setReviewAction={setReviewAction}
              feedback={feedback}
              setFeedback={setFeedback}
              submitting={submitting}
              onSubmit={handleSubmitReview}
              hostName={hostName}
              hostId={property.hostId}
              profilePicture={property.profilePicture}
              onViewHost={() => navigate(`/profile/${property.hostId}`)}
            />
          </div>
        </div>
      </div>
    );
  };

  // ============================================================
  // RENDER INDIVIDUAL ROOM DETAIL VIEW
  // Matches the "Room details individual" mockup
  // ============================================================
  const renderRoomDetailView = (property) => {
    const room = roomDetails;
    const images = safeArray(roomImages, ["https://placehold.co/800x500/e2e8f0/1e293b?text=No+Image+Available"]);
    const heroImage = images[activeRoomImageIndex] || images[0];

    // ⚠️ NOTE: عدّل المفاتيح دي لو شكل الـ API الحقيقي للـ room features مختلف
    const featureNames = {
      ensuiteBathroom: { label: "En-suite Bathroom", icon: "bi-droplet-half" },
      walkInCloset: { label: "Walk-in Closet", icon: "bi-archive" },
      dedicatedDesk: { label: "Dedicated Desk", icon: "bi-laptop" },
      largeWindow: { label: "Large Window", icon: "bi-window" },
      centralAC: { label: "Central AC", icon: "bi-wind" },
      privateBalcony: { label: "Private Balcony", icon: "bi-door-open" }
    };
    const features = room.features || room.roomFeatures || {};
    const featuresList = Object.keys(featureNames).filter((key) => features[key] === true);

    const tenantRequirements = room.tenantRequirements || {};
    const roomName = room.roomName || room.name || `Room #${room.id}`;

    return (
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* BREADCRUMB */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", fontSize: "14px", color: "#64748b" }}>
          <span style={{ cursor: "pointer" }} onClick={handleBackToDashboard}>
            <i className="bi bi-arrow-left me-1"></i>Admin Dashboard
          </span>
          <span style={{ color: "#cbd5e1" }}>|</span>
          <span style={{ cursor: "pointer" }} onClick={handleBackToApartment}>
            Review Shared Listing #{selectedPropertyId}
          </span>
          <span style={{ color: "#cbd5e1" }}>|</span>
          <span style={{ fontWeight: 600, color: "#0f172a" }}>{roomName}</span>
        </div>

        <button
          onClick={handleBackToApartment}
          style={{
            marginBottom: "16px", padding: "8px 18px", background: "#eef2ff", border: "none", borderRadius: "8px",
            color: "#1e3a8a", fontWeight: 600, fontSize: "13px", cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: "6px"
          }}
        >
          <i className="bi bi-arrow-left"></i> Back to Apartment Overview
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "32px" }}>
          {/* LEFT COLUMN */}
          <div>
            {/* Image gallery */}
            <div style={{ position: "relative", width: "100%", height: "380px", borderRadius: "16px", overflow: "hidden", background: "#e2e8f0", marginBottom: "12px" }}>
              <img
                src={heroImage}
                alt={roomName}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.target.src = "https://placehold.co/800x500/e2e8f0/1e293b?text=No+Image"; }}
              />
              <span style={{ position: "absolute", bottom: "12px", left: "12px", background: "rgba(15,23,42,0.75)", color: "#fff", fontSize: "13px", fontWeight: 600, padding: "5px 14px", borderRadius: "20px" }}>
                {roomName}
              </span>
            </div>
            {images.length > 1 && (
              <div style={{ display: "flex", gap: "12px", overflowX: "auto", padding: "2px", marginBottom: "24px" }}>
                {images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveRoomImageIndex(index)}
                    style={{
                      minWidth: "110px", width: "110px", height: "78px", borderRadius: "10px", overflow: "hidden",
                      cursor: "pointer", flexShrink: 0,
                      border: index === activeRoomImageIndex ? "2px solid #2563eb" : "2px solid transparent",
                      opacity: index === activeRoomImageIndex ? 1 : 0.8
                    }}
                  >
                    <img
                      src={img}
                      alt={`Room ${index + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => { e.target.src = "https://placehold.co/200x150/e2e8f0/1e293b?text=N/A"; }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Title + price + badge */}
            <div style={{ marginBottom: "20px" }}>
              <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 700, color: "#0f172a" }}>{roomName}</h1>
              <p style={{ margin: "4px 0 10px", color: "#64748b", fontSize: "14px" }}>
                {[property.street, property.city, property.government].filter(Boolean).join(", ") || "Address not provided"}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>
                  {room.monthlyRent != null ? `EGP ${room.monthlyRent.toLocaleString()}/month` : "N/A"}
                </span>
                <span style={{
                  background: room.isAvailable === false ? "#fef2f2" : "#dcfce7",
                  color: room.isAvailable === false ? "#ef4444" : "#15803d",
                  padding: "4px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 600
                }}>
                  {room.isAvailable === false ? "Occupied" : "Available Now"}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>
                  {room.depositMonths != null ? `${room.depositMonths} Month${room.depositMonths > 1 ? "s" : ""}` : "N/A"}
                </div>
                <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>Deposit</div>
              </div>
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>{room.roomSize ?? "N/A"}</div>
                <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>Room Size (sqm)</div>
              </div>
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>{formatDate(room.availableFrom)}</div>
                <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>Availability</div>
              </div>
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>
                  {room.minimumStay != null ? `${room.minimumStay} months` : "N/A"}
                </div>
                <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>Minimum Stay</div>
              </div>
            </div>

            {/* Description */}
            {room.description && (
              <div style={cardStyle}>
                <h3 style={cardTitleStyle}><i className="bi bi-file-text"></i>Room Description</h3>
                <p style={{ color: "#334155", fontSize: "14px", lineHeight: "1.7", margin: 0 }}>{room.description}</p>
              </div>
            )}

            {/* Room Features */}
            <div style={cardStyle}>
              <h3 style={cardTitleStyle}><i className="bi bi-stars"></i>Room Features</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {featuresList.length > 0 ? (
                  featuresList.map((key) => (
                    <span key={key} style={tagStyle}>
                      <i className={`bi ${featureNames[key].icon}`}></i>{featureNames[key].label}
                    </span>
                  ))
                ) : (
                  <span style={{ color: "#64748b", fontSize: "14px" }}>
                    <i className="bi bi-info-circle me-1"></i>No room features listed
                  </span>
                )}
              </div>
            </div>

            {/* Tenant Requirements */}
            <div style={{ ...cardStyle, marginBottom: 0 }}>
              <h3 style={cardTitleStyle}><i className="bi bi-people"></i>Tenant Requirements</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                <span style={tagStyle}>
                  <i className="bi bi-gender-ambiguous"></i>
                  Gender: {tenantRequirements.gender && tenantRequirements.gender !== "any" ? tenantRequirements.gender : "Any"}
                </span>
                <span style={tagStyle}>
                  <i className="bi bi-mortarboard"></i>
                  Students: {tenantRequirements.studentsAllowed ? "OK" : "Not Allowed"}
                </span>
                <span style={tagStyle}>
                  <i className="bi bi-briefcase"></i>
                  Workers: {tenantRequirements.workersAllowed ? "OK" : "Not Allowed"}
                </span>
                <span style={tagStyle}>
                  <i className="bi bi-person"></i>
                  Occupancy: {tenantRequirements.occupancy != null ? `${tenantRequirements.occupancy} Person${tenantRequirements.occupancy > 1 ? "s" : ""} Only` : "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - read-only pricing recap (approve/reject stays on the apartment overview) */}
          <div>
            <div style={{ ...cardStyle, position: "sticky", top: "20px" }}>
              <h3 style={cardTitleStyle}><i className="bi bi-cash-coin"></i>Pricing Summary</h3>
              <div style={{ marginBottom: "14px" }}>
                <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Monthly Rent</div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>
                  {room.monthlyRent != null ? `EGP ${room.monthlyRent.toLocaleString()}` : "N/A"}
                </div>
              </div>
              <div style={{ marginBottom: "14px" }}>
                <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Security Deposit</div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>
                  {room.securityDeposit != null ? `EGP ${room.securityDeposit.toLocaleString()}` : "N/A"}
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Service Fee</div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>
                  {room.serviceFee != null ? `EGP ${room.serviceFee.toLocaleString()}` : "N/A"}
                </div>
              </div>
              <button
                onClick={handleBackToApartment}
                style={{
                  width: "100%", padding: "10px", background: "#2563eb", border: "none", borderRadius: "8px",
                  color: "#fff", fontWeight: 600, fontSize: "14px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
                }}
              >
                <i className="bi bi-arrow-left"></i> Back to Apartment Overview
              </button>
              <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "12px", marginBottom: 0 }}>
                Approve/Reject decisions are made for the whole listing from the apartment overview page.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================
  // RENDER REVIEW PAGE
  // ============================================================
  const renderReviewPage = () => {
    if (reviewLoading) {
      return (
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          minHeight: "400px",
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          padding: "40px"
        }}>
          <div style={{ textAlign: "center" }}>
            <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }}></div>
            <p style={{ marginTop: "16px", color: "#64748b" }}>Loading property details...</p>
          </div>
        </div>
      );
    }

    const property = propertyDetails;

    if (!property) {
      return (
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          minHeight: "400px",
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          padding: "40px"
        }}>
          <div style={{ textAlign: "center" }}>
            <i className="bi bi-building" style={{ fontSize: "48px", color: "#94a3b8" }}></i>
            <p style={{ marginTop: "16px", color: "#64748b" }}>No property data available</p>
            <button
              onClick={handleBackToDashboard}
              style={{
                marginTop: "12px",
                padding: "8px 20px",
                background: "#2563eb",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      );
    }

    // ===== شقة مشتركة (rooms) -> UI مختلف عن الشقة العادية =====
    if (isSharedProperty) {
      if (roomLoading) {
        return (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "400px",
            background: "#fff",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            padding: "40px"
          }}>
            <div style={{ textAlign: "center" }}>
              <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }}></div>
              <p style={{ marginTop: "16px", color: "#64748b" }}>Loading room details...</p>
            </div>
          </div>
        );
      }
      return roomDetails ? renderRoomDetailView(property) : renderSharedApartmentView(property);
    }

    // ===== Amenities (من amenities object الحقيقي القادم من الـ API) =====
    const amenityNames = {
      wifi: { label: "WiFi", icon: "bi-wifi" },
      tv: { label: "TV", icon: "bi-tv" },
      cooktop: { label: "Cooktop", icon: "bi-fire" },
      oven: { label: "Oven", icon: "bi-box" },
      kettle: { label: "Kettle", icon: "bi-cup-hot" },
      dishwasher: { label: "Dishwasher", icon: "bi-droplet" },
      refrigerator: { label: "Refrigerator", icon: "bi-snow" },
      microwave: { label: "Microwave", icon: "bi-square" },
      washer: { label: "Washer", icon: "bi-water" },
      freeParking: { label: "Free Parking", icon: "bi-p-circle" },
      airConditioning: { label: "Air Conditioning", icon: "bi-wind" },
      smokeAlarm: { label: "Smoke Alarm", icon: "bi-bell" },
      fireExtinguisher: { label: "Fire Extinguisher", icon: "bi-shield-check" }
    };
    const amenities = property.amenities || {};
    const amenitiesList = Object.keys(amenityNames).filter(key => amenities[key] === true);

    // ===== Nearby Services (من nearbyServices object) =====
    const nearbyServiceNames = {
      hasGroceryStore: "Grocery Store",
      hasPharmacy: "Pharmacy",
      hasHospital: "Hospital",
      hasSchool: "School",
      hasUniversity: "University",
      hasPublicTransport: "Public Transport",
      hasParking: "Parking",
      hasMall: "Mall",
      hasRestaurants: "Restaurants",
      hasPark: "Park",
      hasGym: "Gym",
      isSafeArea: "Safe Area",
      hasPoliceStation: "Police Station",
      isQuietArea: "Quiet Area",
      hasChurchNearby: "Church Nearby",
      hasMosqueNearby: "Mosque Nearby"
    };
    const nearbyServices = property.nearbyServices || {};
    const nearbyServicesList = Object.keys(nearbyServiceNames).filter(key => nearbyServices[key] === true);

    // ===== Allowed Tenants (من allowedTenants object) =====
    const allowedTenants = property.allowedTenants || {};

    // إجمالي الحمامات
    const totalBathrooms = (property.numberOfEnSuiteBathrooms || 0) + (property.numberOfGuestBathrooms || 0);

    // الصور المعروضة
    const images = safeArray(propertyImages, ["https://placehold.co/800x500/e2e8f0/1e293b?text=No+Image+Available"]);
    const heroImage = images[activeImageIndex] || images[0];

    // اسم المستضيف وتاريخ التقديم (من بيانات صف الجدول لو موجودة + بيانات الخاصية)
    const hostName = property.hostName || selectedListingMeta?.hostName || "Unknown Host";
    const submittedDate = selectedListingMeta?.dateSubmitted;

    // رابط خرائط جوجل (بدون عرض خريطة مدمجة)
    const mapsLink = (property.latitude && property.longitude)
      ? `https://www.google.com/maps?q=${property.latitude},${property.longitude}`
      : null;

    const tagStyle = {
      background: "#f1f5f9",
      padding: "5px 14px",
      borderRadius: "20px",
      fontSize: "13px",
      color: "#0f172a",
      fontWeight: 500,
      display: "inline-flex",
      alignItems: "center",
      gap: "6px"
    };

    const cardStyle = {
      background: "#fff",
      borderRadius: "16px",
      border: "1px solid #e5e7eb",
      padding: "24px",
      marginBottom: "24px"
    };

    const cardTitleStyle = {
      margin: "0 0 16px",
      fontSize: "16px",
      fontWeight: 600,
      color: "#0f172a",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    };

    return (
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* ===== BREADCRUMB ===== */}
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "8px", 
          marginBottom: "16px",
          fontSize: "14px",
          color: "#64748b"
        }}>
          <span style={{ cursor: "pointer" }} onClick={handleBackToDashboard}>
            <i className="bi bi-arrow-left me-1"></i>Admin Dashboard
          </span>
          <span style={{ color: "#cbd5e1" }}>|</span>
          <span style={{ fontWeight: 600, color: "#0f172a" }}>
            Review Listing #{selectedPropertyId}
          </span>
        </div>

        {/* ===== TITLE + STATUS ===== */}
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 700, color: "#0f172a" }}>
            {property.name || "Untitled Listing"}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "10px", flexWrap: "wrap" }}>
            <span style={{
              background: "#fef3c7",
              color: "#92400e",
              padding: "4px 16px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}>
              <i className="bi bi-clock-history"></i> Pending Review
            </span>
            {property.isPaid && (
              <span style={{
                background: "#dbeafe",
                color: "#1e3a8a",
                padding: "4px 16px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: 600
              }}>
                <i className="bi bi-star-fill me-1"></i>Paid Listing
              </span>
            )}
            <span style={{ fontSize: "14px", color: "#64748b" }}>
              <i className="bi bi-calendar3 me-1"></i>
              {submittedDate ? `Submitted ${formatDateTime(submittedDate)}` : "Submission date unavailable"} by {hostName}
            </span>
          </div>
        </div>

        {/* ===== IMAGE GALLERY ===== */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{
            width: "100%",
            height: "420px",
            borderRadius: "16px",
            overflow: "hidden",
            background: "#e2e8f0",
            marginBottom: "12px"
          }}>
            <img
              src={heroImage}
              alt={property.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.target.src = "https://placehold.co/800x500/e2e8f0/1e293b?text=No+Image"; }}
            />
          </div>
          {images.length > 1 && (
            <div style={{ display: "flex", gap: "12px", overflowX: "auto", padding: "2px" }}>
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  style={{
                    minWidth: "120px",
                    width: "120px",
                    height: "84px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    cursor: "pointer",
                    flexShrink: 0,
                    border: index === activeImageIndex ? "2px solid #2563eb" : "2px solid transparent",
                    opacity: index === activeImageIndex ? 1 : 0.8
                  }}
                >
                  <img
                    src={img}
                    alt={`Property ${index + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.target.src = "https://placehold.co/200x150/e2e8f0/1e293b?text=N/A"; }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "32px" }}>

          {/* ===== LEFT COLUMN ===== */}
          <div>
            {/* Property Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a" }}>{property.numberOfBedrooms ?? "N/A"}</div>
                <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>Bedrooms</div>
              </div>
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a" }}>{totalBathrooms}</div>
                <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>Bathrooms</div>
              </div>
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a" }}>{property.numberOfLivingRooms ?? "N/A"}</div>
                <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>Living Rooms</div>
              </div>
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a" }}>{property.size ?? "N/A"}</div>
                <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>sqft (Size)</div>
              </div>
            </div>

            {/* Listing Description */}
            <div style={cardStyle}>
              <h3 style={cardTitleStyle}><i className="bi bi-file-text"></i>Listing Description</h3>
              <p style={{ color: "#334155", fontSize: "14px", lineHeight: "1.7", margin: 0 }}>
                {property.description || "No description provided."}
              </p>
            </div>

            {/* Pricing & Lease Details */}
            <div style={cardStyle}>
              <h3 style={cardTitleStyle}><i className="bi bi-cash-coin"></i>Pricing &amp; Lease Details</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Monthly Rent</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>
                    {property.monthlyRent != null ? `EGP ${property.monthlyRent.toLocaleString()}` : "N/A"}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Security Deposit</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>
                    {property.deposite != null ? `EGP ${property.deposite.toLocaleString()}` : "N/A"}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Furnished</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: property.furnished ? "#10b981" : "#ef4444" }}>
                    {property.furnished ? "Yes" : "No"}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Minimum Stay</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>
                    {property.minimumStay != null ? `${property.minimumStay} months` : "N/A"}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Available From</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>
                    {formatDate(property.availableFrom)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Available To</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>
                    {property.availableTo ? formatDate(property.availableTo) : "Open-ended"}
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities & Location side by side */}
            <div style={{ ...cardStyle, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
              <div>
                <h3 style={cardTitleStyle}><i className="bi bi-grid-3x3-gap-fill"></i>Amenities</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {amenitiesList.length > 0 ? (
                    amenitiesList.map((key) => (
                      <span key={key} style={tagStyle}>
                        <i className={`bi ${amenityNames[key].icon}`}></i>{amenityNames[key].label}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: "#64748b", fontSize: "14px" }}>
                      <i className="bi bi-info-circle me-1"></i>No amenities listed
                    </span>
                  )}
                </div>
              </div>
              <div>
                <h3 style={cardTitleStyle}><i className="bi bi-geo-alt"></i>Location</h3>
                <p style={{ color: "#334155", fontSize: "14px", margin: "0 0 10px" }}>
                  {[property.street, property.city, property.government].filter(Boolean).join(", ") || "Address not provided"}
                </p>
                {mapsLink && (
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: "13px", color: "#2563eb", fontWeight: 600, textDecoration: "none" }}
                  >
                    <i className="bi bi-pin-map me-1"></i>Open in Google Maps
                  </a>
                )}
              </div>
            </div>

            {/* Allowed Tenants */}
            <div style={cardStyle}>
              <h3 style={cardTitleStyle}><i className="bi bi-people"></i>Allowed Tenants</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                <span style={tagStyle}>
                  <i className={`bi ${allowedTenants.allowsFamilies ? "bi-check-circle-fill" : "bi-x-circle"}`} style={{ color: allowedTenants.allowsFamilies ? "#10b981" : "#ef4444" }}></i>
                  Families
                </span>
                <span style={tagStyle}>
                  <i className={`bi ${allowedTenants.allowsChildren ? "bi-check-circle-fill" : "bi-x-circle"}`} style={{ color: allowedTenants.allowsChildren ? "#10b981" : "#ef4444" }}></i>
                  Children
                </span>
                <span style={tagStyle}>
                  <i className={`bi ${allowedTenants.allowsStudents ? "bi-check-circle-fill" : "bi-x-circle"}`} style={{ color: allowedTenants.allowsStudents ? "#10b981" : "#ef4444" }}></i>
                  Students {allowedTenants.allowsStudents && allowedTenants.studentGender && allowedTenants.studentGender !== "any" ? `(${allowedTenants.studentGender})` : ""}
                </span>
                <span style={tagStyle}>
                  <i className={`bi ${allowedTenants.allowsWorkers ? "bi-check-circle-fill" : "bi-x-circle"}`} style={{ color: allowedTenants.allowsWorkers ? "#10b981" : "#ef4444" }}></i>
                  Workers {allowedTenants.allowsWorkers && allowedTenants.workerGender && allowedTenants.workerGender !== "any" ? `(${allowedTenants.workerGender})` : ""}
                </span>
                <span style={tagStyle}>
                  <i className={`bi ${allowedTenants.petsAllowed ? "bi-check-circle-fill" : "bi-x-circle"}`} style={{ color: allowedTenants.petsAllowed ? "#10b981" : "#ef4444" }}></i>
                  Pets Allowed
                </span>
              </div>
            </div>

            {/* Nearby Services */}
            <div style={{ ...cardStyle, marginBottom: 0 }}>
              <h3 style={cardTitleStyle}><i className="bi bi-signpost-split"></i>Nearby Services</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {nearbyServicesList.length > 0 ? (
                  nearbyServicesList.map((key) => (
                    <span key={key} style={tagStyle}>
                      <i className="bi bi-check2"></i>{nearbyServiceNames[key]}
                    </span>
                  ))
                ) : (
                  <span style={{ color: "#64748b", fontSize: "14px" }}>
                    <i className="bi bi-info-circle me-1"></i>No nearby services listed
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN ===== */}
          <div>
            {/* Review Action */}
            <div style={{ ...cardStyle, position: "sticky", top: "20px" }}>
              <h3 style={cardTitleStyle}><i className="bi bi-check2-square"></i>Review Action</h3>

              <button
                onClick={() => setReviewAction("approve")}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  background: reviewAction === "approve" ? "#10b981" : "#ecfdf5",
                  color: reviewAction === "approve" ? "#fff" : "#10b981",
                  border: "1px solid #10b981",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "0.15s"
                }}
              >
                <i className="bi bi-check-circle"></i> Approve Listing
              </button>

              <button
                onClick={() => setReviewAction("reject")}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "20px",
                  background: reviewAction === "reject" ? "#ef4444" : "#fef2f2",
                  color: reviewAction === "reject" ? "#fff" : "#ef4444",
                  border: "1px solid #ef4444",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "0.15s"
                }}
              >
                <i className="bi bi-x-circle"></i> Reject &amp; Delete
              </button>

              <label style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", display: "block", marginBottom: "8px" }}>
                <i className="bi bi-pencil me-2"></i>Request Modification
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Type specific feedback for the host here. (e.g., Please provide higher resolution photos of the kitchen)"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "14px",
                  minHeight: "80px",
                  resize: "vertical",
                  outline: "none",
                  fontFamily: "inherit",
                  color: "#1f2937",
                  background: "#fafbfc",
                  boxSizing: "border-box"
                }}
              />
              <button
                onClick={handleSubmitReview}
                disabled={submitting}
                style={{
                  marginTop: "12px",
                  width: "100%",
                  padding: "10px 24px",
                  background: submitting ? "#94a3b8" : "#2563eb",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: submitting ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "0.2s"
                }}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send"></i> Send Feedback
                  </>
                )}
              </button>

              {/* Host Info */}
              <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #e5e7eb" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <div style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: "#1e3a8a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#fff"
                  }}>
                    {property.profilePicture ? (
                      <img
                        src={property.profilePicture}
                        alt={hostName}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    ) : (
                      hostName.charAt(0)
                    )}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "15px", color: "#0f172a" }}>{hostName}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>Host ID: {property.hostId ? property.hostId.slice(0, 8) : "N/A"}</div>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/profile/${property.hostId}`)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "#eef2ff",
                    border: "none",
                    borderRadius: "8px",
                    color: "#1e3a8a",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px"
                  }}
                >
                  <i className="bi bi-person"></i> View Host Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================
  // RENDER DASHBOARD
  // ============================================================
  const renderDashboard = () => {
    return (
      <>
        {/* Header */}
        <div style={{ marginBottom: "36px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
            Dashboard
          </h1>
          <p style={{ color: "#64748b", fontSize: "15px" }}>
            <i className="bi bi-search me-2"></i>
            Search for properties, hosts, or users...
          </p>
        </div>

        {/* STATS CARDS */}
        {loading.dashboard ? (
          <div style={{ textAlign: "center", padding: "60px", background: "#fff", borderRadius: "16px" }}>
            <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }}></div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "36px" }}>
            <StatsCard
              title="TOTAL LISTINGS"
              value={dashboardData.totalListings}
              subValue={`${dashboardData.pendingApproval} Pending Approval`}
              icon="bi-house-fill"
              color="#eef2ff"
              growth={dashboardData.listingsGrowthPercent}
            />
            <StatsCard
              title="ACTIVE USERS"
              value={dashboardData.activeUsers}
              subValue={
                <span style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <span><strong style={{ color: "#0f172a" }}>{dashboardData.totalRenters}</strong> RENTERS</span>
                  <span><strong style={{ color: "#0f172a" }}>{dashboardData.totalHosts}</strong> HOSTS</span>
                </span>
              }
              icon="bi-people-fill"
              color="#ecfdf5"
            />
            <StatsCard
              title="REVENUE (MTD)"
              value={`$${dashboardData.revenueMTD.toLocaleString()}`}
              icon="bi-cash-stack"
              color="#fffbeb"
              growth={dashboardData.revenueGrowthPercent}
              growthNote="vs last month"
            />
            <StatsCard
              title="NEW BOOKINGS"
              value={dashboardData.newBookings}
              icon="bi-calendar-check"
              color="#fef2f2"
              growth={dashboardData.bookingsGrowthPercent}
              growthNote={dashboardData.bookingsGrowthNote || "increase in last 24h"}
            />
          </div>
        )}

        {/* PENDING LISTINGS TABLE */}
        <div style={{
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
        }}>
          {/* Table Header */}
          <div style={{ padding: "20px 28px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", background: "#fafbfc" }}>
            <div>
              <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 600, color: "#0f172a", display: "flex", alignItems: "center", gap: "10px" }}>
                <i className="bi bi-clock-history" style={{ color: "#f59e0b" }}></i>
                Pending Listing Approvals
              </h3>
              <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#64748b" }}>
                {pagination.totalCount} properties are currently awaiting manual verification.
              </p>
            </div>
            <button
              onClick={() => fetchPendingListings(1)}
              style={{
                padding: "8px 18px",
                background: "#eef2ff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 500,
                color: "#1e3a8a",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "0.2s"
              }}
              onMouseEnter={(e) => { e.target.style.background = "#dbeafe"; }}
              onMouseLeave={(e) => { e.target.style.background = "#eef2ff"; }}
            >
              <i className="bi bi-arrow-clockwise"></i> Refresh
            </button>
          </div>

          {/* Table Content */}
          {loading.listings ? (
            <div style={{ textAlign: "center", padding: "60px" }}>
              <div className="spinner-border text-primary" style={{ width: "2.5rem", height: "2.5rem" }}></div>
            </div>
          ) : (
            <>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead style={{ background: "#f8fafc", borderBottom: "1px solid #e5e7eb" }}>
                    <tr>
                      <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        PROPERTY NAME
                      </th>
                      <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        HOST NAME
                      </th>
                      <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        LISTING TYPE
                      </th>
                      <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        DATE SUBMITTED
                      </th>
                      <th style={{ padding: "14px 20px", textAlign: "right", fontSize: "11px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingListings.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>
                          <i className="bi bi-check-circle" style={{ fontSize: "40px", display: "block", marginBottom: "12px", color: "#10b981" }}></i>
                          No pending listings
                        </td>
                      </tr>
                    ) : (
                      pendingListings.map((listing) => (
                        <tr key={listing.id} style={{ borderBottom: "1px solid #f1f5f9", transition: "0.15s" }}
                          onMouseEnter={(e) => { e.target.style.background = "#f8fafc"; }}
                          onMouseLeave={(e) => { e.target.style.background = "transparent"; }}
                        >
                          <td style={{ padding: "14px 20px" }}>
                            <div>
                              <div style={{ fontWeight: 600, color: "#0f172a", fontSize: "14px" }}>
                                {listing.propertyName || "Untitled"}
                              </div>
                              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                                <i className="bi bi-geo-alt me-1"></i>
                                {listing.city || ""}{listing.government ? `, ${listing.government}` : ""}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "14px 20px", color: "#334155", fontSize: "14px" }}>
                            {listing.hostName || "Unknown"}
                          </td>
                          <td style={{ padding: "14px 20px" }}>
                            <span style={{
                              background: "#eef2ff",
                              color: "#1e3a8a",
                              padding: "4px 14px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontWeight: 500,
                              display: "inline-block"
                            }}>
                              {listing.listingType || "—"}
                            </span>
                          </td>
                          <td style={{ padding: "14px 20px", color: "#64748b", fontSize: "14px" }}>
                            {formatDate(listing.dateSubmitted)}
                          </td>
                          <td style={{ padding: "14px 20px", textAlign: "right" }}>
                            <button
                              onClick={() => handleReviewClick(listing)}
                              style={{
                                padding: "6px 18px",
                                background: "#dbeafe",
                                border: "none",
                                borderRadius: "30px",
                                cursor: "pointer",
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "#1e3a8a",
                                transition: "all 0.2s ease",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px"
                              }}
                              onMouseEnter={(e) => { e.target.style.background = "#2563eb"; e.target.style.color = "#ffffff"; }}
                              onMouseLeave={(e) => { e.target.style.background = "#dbeafe"; e.target.style.color = "#1e3a8a"; }}
                            >
                              <i className="bi bi-eye me-1"></i>Review
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Footer */}
              {pagination.totalCount > 0 && (
                <div style={{ padding: "16px 28px", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", background: "#fafbfc" }}>
                  <div style={{ fontSize: "14px", color: "#64748b" }}>
                    Showing {((pagination.page - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(pagination.page * ITEMS_PER_PAGE, pagination.totalCount)} of {pagination.totalCount} pending listings.
                  </div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      style={{
                        padding: "8px 14px",
                        border: "1px solid #e5e7eb",
                        background: "#ffffff",
                        borderRadius: "8px",
                        cursor: pagination.page === 1 ? "not-allowed" : "pointer",
                        opacity: pagination.page === 1 ? 0.5 : 1,
                        fontSize: "13px",
                        color: "#334155",
                        transition: "0.15s"
                      }}
                      onMouseEnter={(e) => {
                        if (pagination.page !== 1) {
                          e.target.style.background = "#f1f5f9";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#ffffff";
                      }}
                    >
                      Previous
                    </button>
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.page <= 3) {
                        pageNum = i + 1;
                      } else if (pagination.page >= pagination.totalPages - 2) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = pagination.page - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          style={{
                            padding: "8px 14px",
                            border: "1px solid #e5e7eb",
                            background: pagination.page === pageNum ? "#1e3a8a" : "#ffffff",
                            color: pagination.page === pageNum ? "#ffffff" : "#334155",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: pagination.page === pageNum ? 600 : 400,
                            fontSize: "13px",
                            transition: "0.15s"
                          }}
                          onMouseEnter={(e) => {
                            if (pagination.page !== pageNum) {
                              e.target.style.background = "#f1f5f9";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (pagination.page !== pageNum) {
                              e.target.style.background = "#ffffff";
                            }
                          }}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      style={{
                        padding: "8px 14px",
                        border: "1px solid #e5e7eb",
                        background: "#ffffff",
                        borderRadius: "8px",
                        cursor: pagination.page === pagination.totalPages ? "not-allowed" : "pointer",
                        opacity: pagination.page === pagination.totalPages ? 0.5 : 1,
                        fontSize: "13px",
                        color: "#334155",
                        transition: "0.15s"
                      }}
                      onMouseEnter={(e) => {
                        if (pagination.page !== pagination.totalPages) {
                          e.target.style.background = "#f1f5f9";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "#ffffff";
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
      </>
    );
  };

  // ============================================================
  // MAIN RENDER
  // ============================================================
  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh" }}>
      {toast && <Toast msg={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
        <AdminSidebar />

        {/* ===== MAIN CONTENT ===== */}
        <main style={{ flex: 1, padding: "36px 40px", overflow: "hidden", background: "#f1f5f9" }}>
          {showReview ? renderReviewPage() : renderDashboard()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;