import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaUserAlt, FaBook, FaClipboardList, FaHeart, FaList, FaHome } from 'react-icons/fa';

const navItems = [
  { to: '/personal-info', label: 'Personal Info', icon: <FaUserAlt />, matchPaths: ['/personal-info'] },
  { to: '/orders', label: 'My Booking', icon: <FaBook />, matchPaths: ['/orders', '/profile'] },
  { to: '/host-booking-requests', label: 'Booking Requests', icon: <FaClipboardList />, matchPaths: ['/host-booking-requests'] },
  { to: '/saved', label: 'Saved Matches', icon: <FaHeart />, matchPaths: ['/saved'] },
  { to: '/my-properties', label: 'My Properties', icon: <FaList />, matchPaths: ['/my-properties'] },
  { to: '/', label: 'Home', icon: <FaHome />, matchPaths: ['/'] },
];

const DashboardSidebar = () => {
  const location = useLocation();

  const isActiveItem = (item) =>
    item.matchPaths.some(
      (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path))
    );

  return (
    <aside className="profile-sidebar">
      <div className="sidebar-brand">
        <h3>My Profile</h3>
        <p>Manage your renter identity</p>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={() => `sidebar-link${isActiveItem(item) ? ' active' : ''}`}
          >
            <span className="link-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-stats">
        <div className="stat-card">
          <span className="stat-label">PROFILE VIEWS</span>
          <span className="stat-value">124</span>
          <span className="status-tag">Active</span>
        </div>
      </div>

      <style>{`
        .profile-sidebar {
          width: 240px;
          flex-shrink: 0;
          background: #fff;
          border-radius: 18px;
          border: 1px solid #e5e7eb;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          min-height: fit-content;
        }

        .sidebar-brand h3 {
          margin: 0;
          font-size: 1.25rem;
          color: #111827;
        }

        .sidebar-brand p {
          margin: 8px 0 0;
          color: #6b7280;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 14px;
          color: #4b5563;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.2s, color 0.2s;
        }

        .sidebar-link:hover {
          background: #eff6ff;
          color: #1d4ed8;
        }

        .sidebar-link.active {
          background: #eef2ff;
          color: #1d4ed8;
          font-weight: 700;
        }

        .link-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          color: inherit;
        }

        .sidebar-stats {
          margin-top: auto;
        }

        .stat-card {
          border-radius: 16px;
          background: #f8fafc;
          padding: 18px 16px;
          display: grid;
          gap: 8px;
        }

        .stat-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #6b7280;
          letter-spacing: 0.08em;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 800;
          color: #111827;
        }

        .status-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 12px;
          border-radius: 999px;
          background: #dbeafe;
          color: #1e3a8a;
          font-size: 0.75rem;
          font-weight: 700;
        }
      `}</style>
    </aside>
  );
};

export default DashboardSidebar;
