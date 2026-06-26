// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
 
// const API_BASE = "https://graduationproject1.runasp.net/api";
 
// function StarRating({ rating = 0 }) {
//   const rounded = Math.round(Number(rating));
//   return (
//     <div style={{ display: "flex", gap: 1 }}>
//       {[1, 2, 3, 4, 5].map((s) => (
//         <span key={s} style={{ color: s <= rounded ? "#f5a623" : "#ddd", fontSize: 13 }}>★</span>
//       ))}
//     </div>
//   );
// }
 
// function FeatureTag({ icon, text }) {
//   return (
//     <span style={styles.featureTag}>
//       <span style={{ marginRight: 3 }}>{icon}</span>{text}
//     </span>
//   );
// }
 
// function CompatRow({ label, desc }) {
//   return (
//     <div style={styles.compatRow}>
//       <div style={styles.compatCheck}>✓</div>
//       <div>
//         <div style={styles.compatLabel}>{label}</div>
//         {desc && <div style={styles.compatDesc}>{desc}</div>}
//       </div>
//     </div>
//   );
// }
 
// // safely get first non-null value from multiple possible keys
// const g = (obj, ...keys) => {
//   for (const k of keys) {
//     if (obj?.[k] !== undefined && obj?.[k] !== null && obj?.[k] !== "") return obj[k];
//   }
//   return null;
// };
 
// export default function ViewProfile() {
//   const { id } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!id) {
//       setError("No user ID provided");
//       return;
//     }
//     fetchProfile();
//   }, [id]);

//   const fetchProfile = async () => {
//     const userId = id?.trim();
//     if (!userId) return;
//     setLoading(true);
//     setError(null);
//     setProfile(null);

//     try {
//       const token = localStorage.getItem("userToken");
//       const headers = { "Content-Type": "application/json" };
//       if (token) headers["Authorization"] = `Bearer ${token}`;

//       const res = await fetch(`${API_BASE}/ViewUserProfile/${userId}`, { headers });

//       if (!res.ok) {
//         const text = await res.text();
//         throw new Error(`Error ${res.status}: ${text || "User not found"}`);
//       }

//       const json = await res.json();
//       setProfile(json?.data ?? json);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   // ── derived values ──────────────────────────────────────────────────────────
//   const name         = g(profile, "fullName", "name", "userName", "username");
//   const ratingVal    = g(profile, "rating", "averageRating", "Rate");
//   const rentals      = g(profile, "totalRentals", "rentals", "RentalsCount");
//   const reviewsCount = g(profile, "totalReviews", "reviewsCount", "ReviewsCount");
//   const avatar       = g(profile, "profileImage", "avatar", "imageUrl", "photo", "ProfileImage");
//   const compatibility= g(profile, "compatibility", "compatibilityScore", "CompatibilityScore");
 
//   const listings = profile?.listings ?? profile?.properties ?? profile?.activeListings ?? profile?.Listings ?? [];
//   const reviews  = profile?.recentReviews ?? profile?.reviews ?? profile?.Reviews ?? profile?.ReviewsList ?? [];
//   const prefs    = profile?.preferences ?? profile?.lifestylePreferences ?? profile?.Preferences ?? [];
 
//   return (
//     <div style={styles.root}>

//       {/* ── Loading ────────────────────────────────────────── */}
//       {loading && (
//         <div style={styles.loadingBox}>
//           <span style={styles.btnSpinner} />
//           <span style={{ marginLeft: 10 }}>Loading profile...</span>
//         </div>
//       )}

//       {/* ── Error ──────────────────────────────────────────── */}
//       {error && (
//         <div style={styles.errorBox}>
//           <span style={{ fontSize: 20 }}>⚠️</span>
//           <span style={{ marginLeft: 10 }}>{error}</span>
//         </div>
//       )}

//       {/* ── Profile Layout ─────────────────────────────────── */}
//       {profile && (
//         <div style={styles.layout}>
 
//           {/* LEFT */}
//           <div style={styles.leftCol}>
 
//             {/* Host card */}
//             <div style={styles.card}>
//               <div style={styles.avatarWrap}>
//                 {avatar
//                   ? <img src={avatar} alt={name ?? ""} style={styles.avatarImg} />
//                   : <div style={styles.avatarFallback}><span style={{ fontSize: 38 }}>👤</span></div>
//                 }
//                 <div style={styles.badge}>✓</div>
//               </div>
 
//               <h2 style={styles.hostName}>{name ?? "—"}</h2>
 
//               <div style={styles.statsRow}>
//                 {ratingVal !== null && (
//                   <div style={styles.stat}>
//                     <span style={styles.statNum}>{Number(ratingVal).toFixed(1)}</span>
//                     <span style={styles.statLbl}>RATING</span>
//                   </div>
//                 )}
//                 {rentals !== null && (
//                   <div style={styles.stat}>
//                     <span style={styles.statNum}>{rentals}</span>
//                     <span style={styles.statLbl}>RENTALS</span>
//                   </div>
//                 )}
//                 {reviewsCount !== null && (
//                   <div style={styles.stat}>
//                     <span style={styles.statNum}>{reviewsCount}</span>
//                     <span style={styles.statLbl}>REVIEWS</span>
//                   </div>
//                 )}
//               </div>
 
//               <button style={styles.contactBtn}>Contact Host</button>
//             </div>
 
//             {/* Compatibility card */}
//             {(compatibility !== null || prefs.length > 0) && (
//               <div style={{ ...styles.card, marginTop: 14, textAlign: "left" }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
//                   <span style={styles.compatTitle}>Compatibility</span>
//                   {compatibility !== null && <span style={styles.compatPct}>{compatibility}%</span>}
//                 </div>
//                 {compatibility !== null && (
//                   <div style={styles.bar}>
//                     <div style={{ ...styles.barFill, width: `${Math.min(100, Number(compatibility))}%` }} />
//                   </div>
//                 )}
//                 <div style={{ marginTop: 12 }}>
//                   {prefs.map((p, i) => (
//                     <CompatRow
//                       key={i}
//                       label={g(p, "label", "name", "preference", "title") ?? ""}
//                       desc={g(p, "value", "description", "detail") ?? ""}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
 
//           {/* RIGHT */}
//           <div style={styles.rightCol}>
 
//             {/* Active Listings */}
//             {listings.length > 0 && (
//               <div style={styles.section}>
//                 <h3 style={styles.sectionTitle}>Active Listings</h3>
//                 <div style={styles.listingsGrid}>
//                   {listings.map((l, i) => {
//                     const img   = g(l, "image", "mainImage", "imageUrl", "photo", "Image");
//                     const title = g(l, "title", "name", "propertyName", "Title");
//                     const type  = g(l, "type", "propertyType", "category", "Type");
//                     const loc   = g(l, "location", "address", "area", "city", "Location");
//                     const rat   = g(l, "rating", "Rate", "averageRating");
//                     const beds  = g(l, "beds", "bedrooms", "Beds", "Bedrooms");
//                     const baths = g(l, "baths", "bathrooms", "Baths", "Bathrooms");
//                     const area  = g(l, "area", "size", "sqft", "Area");
//                     const wifi  = g(l, "wifi", "highSpeed", "Wifi");
//                     const shared= g(l, "shared", "isShared", "Shared");
//                     const price = g(l, "price", "pricePerMonth", "rent", "Price");
 
//                     return (
//                       <div key={i} style={styles.listingCard}>
//                         {img && (
//                           <div style={{ position: "relative" }}>
//                             <img src={img} alt={title ?? ""} style={styles.listingImg} />
//                             <button style={styles.reviewTagBtn}>View Reviews</button>
//                           </div>
//                         )}
//                         <div style={styles.listingBody}>
//                           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
//                             {type  && <span style={styles.listingType}>{String(type).toUpperCase()}</span>}
//                             {rat   && <span style={styles.listingRating}>★ {Number(rat).toFixed(1)}</span>}
//                           </div>
//                           {title && <h4 style={styles.listingTitle}>{title}</h4>}
//                           {loc   && <p style={styles.listingLoc}>📍 {loc}</p>}
//                           {price && <p style={{ ...styles.listingLoc, color: "#1a3c6e", fontWeight: 700 }}>💰 {price} / month</p>}
 
//                           <div style={styles.featuresRow}>
//                             {beds   && <FeatureTag icon="🛏" text={`${beds} Bed`} />}
//                             {baths  && <FeatureTag icon="🚿" text={`${baths} Bath`} />}
//                             {area   && <FeatureTag icon="📐" text={`${area} sqft`} />}
//                             {shared && <FeatureTag icon="👥" text="Shared" />}
//                             {wifi   && <FeatureTag icon="📶" text="High Speed" />}
//                           </div>
//                           <button style={styles.detailsBtn}>View Details</button>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
 
//             {/* Recent Reviews */}
//             {reviews.length > 0 && (
//               <div style={styles.section}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
//                   <h3 style={styles.sectionTitle}>Recent Reviews</h3>
//                   <button style={styles.viewAllBtn}>View All</button>
//                 </div>
 
//                 {reviews.map((r, i) => {
//                   const rName   = g(r, "name", "reviewerName", "userName", "fullName");
//                   const rDate   = g(r, "date", "createdAt", "month", "Date");
//                   const rText   = g(r, "comment", "text", "body", "review", "Comment");
//                   const rRating = g(r, "rating", "stars", "Rate");
//                   const rAvatar = g(r, "avatar", "profileImage", "photo");
 
//                   return (
//                     <div
//                       key={i}
//                       style={{
//                         ...styles.reviewCard,
//                         borderBottom: i < reviews.length - 1 ? "1px solid #f0f0f0" : "none",
//                       }}
//                     >
//                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                           {rAvatar
//                             ? <img src={rAvatar} alt={rName ?? ""} style={styles.reviewAvatar} />
//                             : <div style={styles.reviewAvatarFallback}>{rName?.[0] ?? "?"}</div>
//                           }
//                           <div>
//                             {rName && <div style={styles.reviewerName}>{rName}</div>}
//                             {rDate && <div style={styles.reviewDate}>{rDate}</div>}
//                           </div>
//                         </div>
//                         {rRating && <StarRating rating={rRating} />}
//                       </div>
//                       {rText && <p style={styles.reviewText}>"{rText}"</p>}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
 
//             {/* Nothing returned */}
//             {listings.length === 0 && reviews.length === 0 && (
//               <div style={styles.noContent}>
//                 <div style={{ fontSize: 48 }}>🏠</div>
//                 <p style={{ color: "#aaa", marginTop: 12 }}>No listings or reviews found.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
 
// const styles = {
//   root: {
//     minHeight: "100vh",
//     background: "#f4f6fb",
//     fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
//     paddingBottom: 40,
//   },
//   btnSpinner: {
//     display: "inline-block",
//     width: 16,
//     height: 16,
//     border: "2px solid rgba(26,60,110,0.2)",
//     borderTop: "2px solid #1a3c6e",
//     borderRadius: "50%",
//     animation: "spin 0.7s linear infinite",
//   },
//   loadingBox: {
//     maxWidth: 520,
//     margin: "30px auto",
//     background: "#f9fafc",
//     border: "1px solid #d0d8e8",
//     borderRadius: 10,
//     padding: "14px 20px",
//     color: "#1a3c6e",
//     fontSize: 13,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   errorBox: {
//     maxWidth: 520,
//     margin: "30px auto",
//     background: "#fff5f5",
//     border: "1px solid #f5c0c0",
//     borderRadius: 10,
//     padding: "14px 20px",
//     color: "#c0392b",
//     fontSize: 13,
//     display: "flex",
//     alignItems: "center",
//   },
//   layout: {
//     maxWidth: 1050,
//     margin: "28px auto",
//     padding: "0 20px",
//     display: "flex",
//     gap: 22,
//     alignItems: "flex-start",
//   },
//   leftCol: { width: 220, flexShrink: 0 },
//   rightCol: { flex: 1, minWidth: 0 },
//   card: {
//     background: "#fff",
//     borderRadius: 14,
//     padding: 20,
//     boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
//     textAlign: "center",
//   },
//   avatarWrap: { position: "relative", display: "inline-block", marginBottom: 12 },
//   avatarImg: { width: 82, height: 82, borderRadius: "50%", objectFit: "cover", border: "3px solid #e8edf5" },
//   avatarFallback: {
//     width: 82, height: 82, borderRadius: "50%", background: "#c8d8ec",
//     display: "flex", alignItems: "center", justifyContent: "center",
//   },
//   badge: {
//     position: "absolute", bottom: 2, right: 2,
//     background: "#1a3c6e", color: "#fff", borderRadius: "50%",
//     width: 20, height: 20, fontSize: 10, fontWeight: 700,
//     display: "flex", alignItems: "center", justifyContent: "center",
//     border: "2px solid #fff",
//   },
//   hostName: { fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: "0 0 14px" },
//   statsRow: {
//     display: "flex", justifyContent: "center", gap: 14,
//     borderTop: "1px solid #f0f4fa", paddingTop: 12, marginBottom: 16,
//   },
//   stat: { display: "flex", flexDirection: "column", alignItems: "center" },
//   statNum: { fontSize: 17, fontWeight: 700, color: "#1a1a2e" },
//   statLbl: { fontSize: 9, color: "#aaa", fontWeight: 700, letterSpacing: 0.5, marginTop: 2 },
//   contactBtn: {
//     width: "100%", padding: "10px 0", background: "#1a3c6e",
//     color: "#fff", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer",
//   },
//   compatTitle: { fontSize: 13, fontWeight: 700, color: "#1a1a2e" },
//   compatPct:   { fontSize: 13, fontWeight: 700, color: "#1a3c6e" },
//   bar: { height: 6, background: "#e8edf5", borderRadius: 3, overflow: "hidden" },
//   barFill: { height: "100%", background: "#1a3c6e", borderRadius: 3, transition: "width 0.6s ease" },
//   compatRow: { display: "flex", gap: 9, alignItems: "flex-start", marginBottom: 12 },
//   compatCheck: {
//     width: 18, height: 18, borderRadius: "50%", background: "#e8f0fd",
//     color: "#1a3c6e", fontSize: 10, fontWeight: 700,
//     display: "flex", alignItems: "center", justifyContent: "center",
//     flexShrink: 0, marginTop: 1,
//   },
//   compatLabel: { fontSize: 12, fontWeight: 700, color: "#1a1a2e" },
//   compatDesc:  { fontSize: 11, color: "#888", marginTop: 1 },
//   section: {
//     background: "#fff", borderRadius: 14, padding: 20,
//     boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 20,
//   },
//   sectionTitle: { fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: "0 0 16px" },
//   listingsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 16 },
//   listingCard: { border: "1px solid #eef1f7", borderRadius: 12, overflow: "hidden", background: "#fafbfd" },
//   listingImg: { width: "100%", height: 130, objectFit: "cover", display: "block" },
//   reviewTagBtn: {
//     position: "absolute", top: 8, right: 8,
//     background: "rgba(255,255,255,0.92)", border: "none", borderRadius: 6,
//     fontSize: 10, padding: "4px 8px", cursor: "pointer", fontWeight: 600, color: "#333",
//     boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
//   },
//   listingBody: { padding: 12 },
//   listingType: {
//     fontSize: 9, fontWeight: 700, color: "#1a3c6e", letterSpacing: 0.8,
//     background: "#e8f0fd", padding: "2px 7px", borderRadius: 4,
//   },
//   listingRating: { fontSize: 11, color: "#f5a623", fontWeight: 700 },
//   listingTitle:  { fontSize: 13, fontWeight: 700, color: "#1a1a2e", margin: "6px 0 4px", lineHeight: 1.3 },
//   listingLoc:    { fontSize: 11, color: "#888", margin: "0 0 8px" },
//   featuresRow:   { display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 },
//   featureTag: {
//     fontSize: 10, color: "#555", background: "#f0f3fa",
//     padding: "3px 8px", borderRadius: 5, display: "flex", alignItems: "center",
//   },
//   detailsBtn: {
//     width: "100%", padding: "8px 0", background: "#1a3c6e",
//     color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer",
//   },
//   viewAllBtn: { background: "none", border: "none", color: "#1a3c6e", fontSize: 12, fontWeight: 600, cursor: "pointer" },
//   reviewCard: { paddingBottom: 14, marginBottom: 14 },
//   reviewAvatar: { width: 36, height: 36, borderRadius: "50%", objectFit: "cover" },
//   reviewAvatarFallback: {
//     width: 36, height: 36, borderRadius: "50%", background: "#c8d8ec",
//     display: "flex", alignItems: "center", justifyContent: "center",
//     fontSize: 14, fontWeight: 700, color: "#1a3c6e",
//   },
//   reviewerName: { fontSize: 13, fontWeight: 700, color: "#1a1a2e" },
//   reviewDate:   { fontSize: 11, color: "#bbb" },
//   reviewText:   { fontSize: 12, color: "#555", lineHeight: 1.65, margin: 0 },
//   noContent: {
//     textAlign: "center", padding: "60px 20px",
//     background: "#fff", borderRadius: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
//   },
// };
 









// ViewProfile.jsx - Updated
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_BASE = "https://graduationproject1.runasp.net/api";

function StarRating({ rating = 0 }) {
  const rounded = Math.round(Number(rating));
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= rounded ? "#f5a623" : "#ddd", fontSize: 14 }}>★</span>
      ))}
    </div>
  );
}

function FeatureTag({ icon, text }) {
  return (
    <span style={styles.featureTag}>
      <span style={{ marginRight: 4 }}>{icon}</span>{text}
    </span>
  );
}

function CompatRow({ label, desc }) {
  return (
    <div style={styles.compatRow}>
      <div style={styles.compatCheck}>✓</div>
      <div>
        <div style={styles.compatLabel}>{label}</div>
        {desc && <div style={styles.compatDesc}>{desc}</div>}
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  if (!value) return null;
  return (
    <div style={styles.infoRow}>
      <span style={styles.infoIcon}>{icon}</span>
      <div>
        <div style={styles.infoLabel}>{label}</div>
        <div style={styles.infoValue}>{value}</div>
      </div>
    </div>
  );
}

const g = (obj, ...keys) => {
  for (const k of keys) {
    if (obj?.[k] !== undefined && obj?.[k] !== null && obj?.[k] !== "") return obj[k];
  }
  return null;
};

export default function ViewProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) { setError("No user ID provided"); return; }
    fetchProfile();
  }, [id]);



const fetchProfile = async () => {
  const userId = id?.trim();
  if (!userId) return;
  setLoading(true);
  setError(null);
  try {
    const token = localStorage.getItem("userToken");
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(
      `${API_BASE}/ViewUserProfile/${userId}`,
      { headers }
    );
    if (!res.ok) throw new Error(`Error ${res.status}`);

    const json = await res.json();

    // ← طباعة كل البيانات في الـ console
    console.log("FULL RESPONSE:", json);

    // محاولة استخراج البيانات من أي مستوى
    const extracted =
      json?.data ??
      json?.result ??
      json?.user ??
      json?.profile ??
      json?.Data ??
      json?.Result ??
      json?.User ??
      json;

    console.log("EXTRACTED:", extracted);
    setProfile(extracted);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  // ── Derived Values ──────────────────────────────────────────────────────
const host         = profile?.hostInfo ?? profile;

const name         = host?.hostName;
const ratingVal    = host?.rating;
const rentals      = host?.rentalsCount;
const reviewsCount = host?.reviewsCount;
const avatar       = host?.hostImage;
const isVerified   = host?.isVerified;
const compatibility = g(profile, "compatibilityScore", "compatibility");


  // ── الحقول الجديدة ──────────────────────────────────────────────────────
  const bio           = g(profile, "bio", "about", "description", "aboutMe");
  const email         = g(profile, "email", "emailAddress");
  const phone         = g(profile, "phone", "phoneNumber", "mobile");
  const location      = g(profile, "location", "city", "address", "area");
  const joinDate      = g(profile, "joinDate", "memberSince", "createdAt", "registeredAt");
  const gender        = g(profile, "gender", "sex");
  const age           = g(profile, "age");
  const nationality   = g(profile, "nationality", "country");
  const occupation    = g(profile, "occupation", "job", "profession", "work");
  const isIdVerified  = g(profile, "isIdVerified", "idVerified", "identityVerified");
  const responseRate  = g(profile, "responseRate", "replyRate");
  const responseTime  = g(profile, "responseTime", "avgResponseTime", "replyTime");
  const languages     = g(profile, "languages", "spokenLanguages");

  const listings = profile?.listings ?? profile?.activeListings ?? [];
  const reviews  = profile?.recentReviews ?? profile?.reviewsList ?? profile?.reviews ?? [];
  const prefs    = profile?.preferences ?? profile?.lifestylePreferences ?? [];

  // تنسيق التاريخ
  const formatDate = (d) => {
    if (!d) return null;
    try { return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long" }); }
    catch { return d; }
  };

  return (
    <div style={styles.root}>
      {loading && <div style={styles.loadingBox}>Loading profile data...</div>}
      {error && <div style={styles.errorBox}>⚠️ {error}</div>}

      {profile && (
        <div style={styles.layout}>

          {/* ── LEFT COLUMN ── */}
          <div style={styles.leftCol}>

            {/* Host Card */}
            <div style={styles.card}>
              <div style={styles.avatarWrap}>
                {avatar
                  ? <img src={avatar} alt={name} style={styles.avatarImg} />
                  : <div style={styles.avatarFallback}>👤</div>
                }
                {isVerified && <div style={styles.badge}>✓</div>}
              </div>

              <h2 style={styles.hostName}>{name || "Guest User"}</h2>

              {/* Verification Badges */}
              <div style={styles.badgesRow}>
                {isVerified   && <span style={styles.verifiedBadge}>✓ Verified</span>}
                {isIdVerified && <span style={{ ...styles.verifiedBadge, background: "#e8f5e9", color: "#2e7d32" }}>🪪 ID Verified</span>}
              </div>

              {/* Bio */}
              {bio && <p style={styles.bioText}>{bio}</p>}

              <div style={styles.statsRow}>
                <div style={styles.stat}>
                  <span style={styles.statNum}>{ratingVal ? Number(ratingVal).toFixed(1) : "0.0"}</span>
                  <span style={styles.statLbl}>RATING</span>
                </div>
                <div style={styles.stat}>
                  <span style={styles.statNum}>{rentals || 0}</span>
                  <span style={styles.statLbl}>RENTALS</span>
                </div>
                <div style={styles.stat}>
                  <span style={styles.statNum}>{reviewsCount || 0}</span>
                  <span style={styles.statLbl}>REVIEWS</span>
                </div>
              </div>

              <button style={styles.contactBtn}>Contact Host</button>
            </div>

            {/* Personal Info Card */}
            {(location || email || phone || occupation || age || gender || nationality || joinDate || languages) && (
              <div style={{ ...styles.card, marginTop: 20, textAlign: "left" }}>
                <h3 style={styles.cardSectionTitle}>Personal Info</h3>
                <InfoRow icon="📍" label="Location"    value={location} />
                <InfoRow icon="💼" label="Occupation"  value={occupation} />
                <InfoRow icon="🌍" label="Nationality" value={nationality} />
                <InfoRow icon="🎂" label="Age"         value={age ? `${age} years` : null} />
                <InfoRow icon="⚧"  label="Gender"      value={gender} />
                <InfoRow icon="🗣️" label="Languages"   value={Array.isArray(languages) ? languages.join(", ") : languages} />
                <InfoRow icon="📧" label="Email"       value={email} />
                <InfoRow icon="📱" label="Phone"       value={phone} />
                <InfoRow icon="📅" label="Member since" value={formatDate(joinDate)} />
              </div>
            )}

            {/* Response Info Card */}
            {(responseRate || responseTime) && (
              <div style={{ ...styles.card, marginTop: 20, textAlign: "left" }}>
                <h3 style={styles.cardSectionTitle}>Host Stats</h3>
                {responseRate && (
                  <div style={styles.infoRow}>
                    <span style={styles.infoIcon}>⚡</span>
                    <div>
                      <div style={styles.infoLabel}>Response Rate</div>
                      <div style={styles.infoValue}>{responseRate}%</div>
                    </div>
                  </div>
                )}
                {responseTime && (
                  <div style={styles.infoRow}>
                    <span style={styles.infoIcon}>⏱️</span>
                    <div>
                      <div style={styles.infoLabel}>Response Time</div>
                      <div style={styles.infoValue}>{responseTime}</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Compatibility Card */}
            <div style={{ ...styles.card, marginTop: 20, textAlign: "left" }}>
              <div style={styles.compatHeader}>
                <span style={styles.compatTitle}>Compatibility</span>
                <span style={styles.compatPct}>{compatibility || 0}%</span>
              </div>
              <div style={styles.bar}>
                <div style={{ ...styles.barFill, width: `${Math.min(compatibility || 0, 100)}%` }} />
              </div>
              <div style={{ marginTop: 15 }}>
                {prefs.length > 0
                  ? prefs.map((p, i) => (
                      <CompatRow
                        key={i}
                        label={g(p, "label", "name", "preference", "title")}
                        desc={g(p, "value", "description", "detail")}
                      />
                    ))
                  : <p style={{ fontSize: 11, color: "#999" }}>No preferences set.</p>
                }
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div style={styles.rightCol}>

            {/* Active Listings */}
            {listings.length > 0 && (
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Active Listings</h3>
                <div style={styles.listingsGrid}>
                  {listings.map((l, i) => (
                    <div key={i} style={styles.listingCard}>
                      <div style={{ position: "relative" }}>
                        <img src={g(l, "image", "imageUrl", "mainImage")} alt="Property" style={styles.listingImg} />
                        <button style={styles.reviewTagBtn}>View Reviews</button>
                      </div>
                      <div style={styles.listingBody}>
                        <div style={styles.listingHeaderRow}>
                          <span style={styles.listingType}>{String(g(l, "type", "category") || "Unit").toUpperCase()}</span>
                          <span style={styles.listingRating}>★ {Number(g(l, "rating") || 5).toFixed(1)}</span>
                        </div>
                        <h4 style={styles.listingTitle}>{g(l, "title", "name")}</h4>
                        <p style={styles.listingLoc}>📍 {g(l, "location", "address", "city")}</p>
                        <div style={styles.featuresRow}>
                          <FeatureTag icon="🛏" text={`${g(l, "beds", "bedrooms") || 1} Bed`} />
                          <FeatureTag icon="🚿" text={`${g(l, "baths", "bathrooms") || 1} Bath`} />
                          {g(l, "area", "size", "sqft") && (
                            <FeatureTag icon="📐" text={`${g(l, "area", "size", "sqft")} sqft`} />
                          )}
                          {g(l, "price", "pricePerMonth", "rent") && (
                            <FeatureTag icon="💰" text={`$${g(l, "price", "pricePerMonth", "rent")}/mo`} />
                          )}
                        </div>
                        <button style={styles.detailsBtn}>View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Reviews */}
            {reviews.length > 0 && (
              <div style={styles.section}>
                <div style={styles.compatHeader}>
                  <h3 style={styles.sectionTitle}>Recent Reviews</h3>
                  <button style={styles.viewAllBtn}>View All</button>
                </div>
                {reviews.map((r, i) => (
                  <div key={i} style={styles.reviewItem}>
                    <div style={styles.reviewHeader}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={styles.reviewAvatar}>
                          {g(r, "avatar", "photo")
                            ? <img src={g(r, "avatar", "photo")} style={styles.avatarImgSmall} alt="" />
                            : "👤"
                          }
                        </div>
                        <div>
                          <div style={styles.reviewerName}>{g(r, "name", "reviewerName", "userName")}</div>
                          <div style={styles.reviewDate}>{formatDate(g(r, "date", "createdAt")) || g(r, "date", "createdAt")}</div>
                        </div>
                      </div>
                      <StarRating rating={g(r, "rating", "rate", "stars")} />
                    </div>
                    <p style={styles.reviewText}>"{g(r, "comment", "text", "review", "body")}"</p>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {listings.length === 0 && reviews.length === 0 && (
              <div style={styles.emptyState}>
                <p>No listings or reviews yet for this user.</p>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────

const styles = {
  root: { minHeight: "100vh", background: "#f8f9fc", padding: "40px 0" },
  layout: { maxWidth: 1100, margin: "0 auto", display: "flex", gap: 25, padding: "0 20px" },
  leftCol: { width: 280, flexShrink: 0 },
  rightCol: { flex: 1 },
  card: {
    background: "#fff", borderRadius: 16, padding: 25,
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)", textAlign: "center"
  },
  cardSectionTitle: { fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 12, marginTop: 0 },

  avatarWrap: { position: "relative", display: "inline-block", marginBottom: 15 },
  avatarImg: { width: 100, height: 100, borderRadius: "50%", objectFit: "cover", border: "3px solid #f0f0f0" },
  avatarFallback: { width: 100, height: 100, borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 },
  badge: { position: "absolute", bottom: 5, right: 5, background: "#1a3c6e", color: "#fff", borderRadius: "50%", width: 22, height: 22, fontSize: 12, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" },
  hostName: { fontSize: 20, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 },

  badgesRow: { display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 12 },
  verifiedBadge: { fontSize: 10, fontWeight: 700, background: "#e8edf8", color: "#1a3c6e", padding: "3px 8px", borderRadius: 6 },

  bioText: { fontSize: 12, color: "#666", lineHeight: 1.6, marginBottom: 16, textAlign: "left" },

  statsRow: { display: "flex", justifyContent: "space-between", borderTop: "1px solid #f0f0f0", paddingTop: 15, marginBottom: 20 },
  stat: { textAlign: "center" },
  statNum: { display: "block", fontSize: 18, fontWeight: 700, color: "#333" },
  statLbl: { fontSize: 9, color: "#aaa", fontWeight: 700 },
  contactBtn: { width: "100%", padding: "12px", background: "#1a3c6e", color: "#fff", border: "none", borderRadius: 10, fontWeight: 600, cursor: "pointer" },

  infoRow: { display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 },
  infoIcon: { fontSize: 14, marginTop: 2, flexShrink: 0 },
  infoLabel: { fontSize: 10, color: "#aaa", fontWeight: 700, textTransform: "uppercase" },
  infoValue: { fontSize: 13, color: "#333", fontWeight: 500 },

  compatHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  compatTitle: { fontSize: 15, fontWeight: 700 },
  compatPct: { color: "#1a3c6e", fontWeight: 700 },
  bar: { height: 8, background: "#eee", borderRadius: 4, overflow: "hidden" },
  barFill: { height: "100%", background: "#1a3c6e" },
  compatRow: { display: "flex", gap: 10, marginTop: 12 },
  compatCheck: { color: "#2ecc71", fontSize: 14, fontWeight: "bold" },
  compatLabel: { fontSize: 13, fontWeight: 600, color: "#333" },
  compatDesc: { fontSize: 11, color: "#777" },

  section: { background: "#fff", borderRadius: 16, padding: 25, marginBottom: 25, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" },
  sectionTitle: { fontSize: 17, fontWeight: 700, marginBottom: 20, marginTop: 0 },
  listingsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 },
  listingCard: { borderRadius: 12, border: "1px solid #eee", overflow: "hidden" },
  listingImg: { width: "100%", height: 160, objectFit: "cover" },
  listingBody: { padding: 15 },
  listingHeaderRow: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
  listingType: { fontSize: 10, fontWeight: 700, color: "#1a3c6e", background: "#eef2ff", padding: "2px 8px", borderRadius: 4 },
  listingRating: { fontSize: 12, color: "#f5a623", fontWeight: 700 },
  listingTitle: { fontSize: 14, fontWeight: 700, margin: "5px 0" },
  listingLoc: { fontSize: 12, color: "#888", marginBottom: 10 },
  featuresRow: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 15 },
  featureTag: { fontSize: 11, background: "#f8f9fa", padding: "4px 8px", borderRadius: 6, color: "#555" },
  detailsBtn: { width: "100%", padding: "10px", background: "#1a3c6e", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" },
  reviewTagBtn: { position: "absolute", top: 10, right: 10, background: "#fff", border: "none", padding: "4px 8px", borderRadius: 5, fontSize: 10, fontWeight: 700, cursor: "pointer" },

  viewAllBtn: { background: "none", border: "none", color: "#1a3c6e", fontWeight: 600, cursor: "pointer", fontSize: 12 },
  reviewItem: { padding: "15px 0", borderBottom: "1px solid #f5f5f5" },
  reviewHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  reviewAvatar: { width: 40, height: 40, borderRadius: "50%", background: "#eee", display: "flex", alignItems: "center", justifyContent: "center" },
  avatarImgSmall: { width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" },
  reviewerName: { fontSize: 13, fontWeight: 700 },
  reviewDate: { fontSize: 11, color: "#bbb" },
  reviewText: { fontSize: 13, color: "#666", fontStyle: "italic" },

  emptyState: { background: "#fff", borderRadius: 16, padding: 40, textAlign: "center", color: "#aaa", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" },
  loadingBox: { textAlign: "center", padding: 50, fontSize: 18, color: "#1a3c6e" },
  errorBox: { textAlign: "center", padding: 50, color: "red" }
};