import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/admin-dashboard', label: 'Dashboard', icon: 'bi-grid' },
  { to: '/user-management', label: 'User Management', icon: 'bi-people' },
  { to: '/reports', label: 'Reports', icon: 'bi-bar-chart-line' },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({ name: 'Admin User', role: 'Administrator' });

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('userToken');
        if (!token) return;

        const response = await fetch('https://graduationproject1.runasp.net/api/admin/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setCurrentUser({
              name: data.data.fullName || data.data.name || 'Admin User',
              role: data.data.role || 'Administrator',
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <div className="admin-sidebar__logo">SM</div>
        <div>
          <h2>StayMatch Admin</h2>
          <p>Rental Management</p>
        </div>
      </div>

      <nav className="admin-sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `admin-sidebar__link${isActive ? ' active' : ''}`}
          >
            <i className={`bi ${item.icon}`}></i>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar__footer">
        <div className="admin-sidebar__user">
          <div className="admin-sidebar__avatar">{currentUser.name?.charAt(0) || 'A'}</div>
          <div>
            <div className="admin-sidebar__user-name">{currentUser.name}</div>
            <div className="admin-sidebar__user-role">{currentUser.role}</div>
          </div>
        </div>
        <button className="admin-sidebar__signout" onClick={() => { localStorage.removeItem('userToken'); navigate('/login'); }}>
          <i className="bi bi-box-arrow-right"></i>
          Sign Out
        </button>
      </div>

      <style>{`
        .admin-sidebar {
          width: 250px;
          min-height: 100vh;
          background: #fff;
          border-radius: 24px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
          display: flex;
          flex-direction: column;
          padding: 26px 20px;
          gap: 28px;
          position: sticky;
          top: 16px;
        }

        .admin-sidebar__brand {
          display: flex;
          gap: 14px;
          align-items: center;
        }

        .admin-sidebar__logo {
          width: 42px;
          height: 42px;
          border-radius: 16px;
          background: #2563eb;
          color: #fff;
          display: grid;
          place-items: center;
          font-weight: 700;
          font-size: 18px;
        }

        .admin-sidebar__brand h2 {
          margin: 0;
          font-size: 18px;
          color: #0f172a;
          line-height: 1.1;
        }

        .admin-sidebar__brand p {
          margin: 4px 0 0;
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .admin-sidebar__nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .admin-sidebar__link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 14px;
          color: #4b5563;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .admin-sidebar__link:hover {
          background: #eff6ff;
          color: #1d4ed8;
        }

        .admin-sidebar__link.active {
          background: #eef2ff;
          color: #0f172a;
        }

        .admin-sidebar__link i {
          font-size: 16px;
          width: 20px;
          text-align: center;
        }

        .admin-sidebar__footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .admin-sidebar__user {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .admin-sidebar__avatar {
          width: 40px;
          height: 40px;
          border-radius: 14px;
          background: #2563eb;
          color: #fff;
          font-weight: 700;
          display: grid;
          place-items: center;
        }

        .admin-sidebar__user-name {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
        }

        .admin-sidebar__user-role {
          font-size: 12px;
          color: #64748b;
        }

        .admin-sidebar__signout {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
          background: #f8fafc;
          color: #0f172a;
          font-weight: 700;
          cursor: pointer;
        }

        .admin-sidebar__signout:hover {
          background: #eef2ff;
        }
      `}</style>
    </aside>
  );
};

export default AdminSidebar;
