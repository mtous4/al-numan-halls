'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { 
  getEvents, 
  getOrganizerRequests, 
  approveOrganizer, 
  rejectOrganizer, 
  getEventPhotos, 
  deleteEvent 
} from '@/lib/eventAlbum';

function AdminEventsContent() {
  const { user, isAdmin, isAuthenticated, loading } = useAuth();

  const [requests, setRequests] = useState([]);
  const [events, setEvents] = useState([]);
  const [totalPhotos, setTotalPhotos] = useState(0);

  const loadData = () => {
    const reqs = getOrganizerRequests();
    setRequests(reqs);
    const evts = getEvents();
    setEvents(evts);
    const allPhotos = getEventPhotos();
    setTotalPhotos(allPhotos.length);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = (id) => {
    approveOrganizer(id);
    loadData();
  };

  const handleReject = (id) => {
    rejectOrganizer(id);
    loadData();
  };

  const handleDeleteEvent = (id) => {
    if (confirm('هل أنت متأكد من حذف هذه الفعالية نهائياً من النظام؟')) {
      deleteEvent(id);
      loadData();
    }
  };

  return (
    <>
      <Header />
      <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', background: 'var(--off-white)' }}>
        <div className="container" style={{ padding: 'var(--space-8) var(--space-6)' }}>

          {/* Top Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Link href="/admin" className="text-muted text-sm">لوحة الإدارة العامة</Link>
                <span className="text-muted text-sm">/</span>
                <span className="text-gold text-sm">إدارة ألبومات ومصادقات المنظمين (Event Album)</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: 'var(--space-1)', margin: 0 }}>
                إشراف وموافقات منظمي الفعاليات (altous4@gmail.com)
              </h2>
            </div>

            <Link href="/admin" className="btn btn-secondary btn-sm">
              الرجوع للوحة الإدارة
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid" style={{ marginBottom: 'var(--space-8)' }}>
            <div className="stat-card">
              <div className="stat-card-value" style={{ color: 'var(--gold-primary)' }}>{events.length}</div>
              <div className="stat-card-label">إجمالي الفعاليات المنشأة</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-value" style={{ color: 'var(--success)' }}>{totalPhotos}</div>
              <div className="stat-card-label">إجمالي الصور الملتقطة للضيوف</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-value" style={{ color: 'var(--gold-dark)' }}>
                {requests.filter(r => r.status === 'pending').length}
              </div>
              <div className="stat-card-label">طلبات منظمين بانتظار الموافقة</div>
            </div>
          </div>

          {/* Section 1: Organizer Approval Requests */}
          <div className="card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold-dark)', marginBottom: 'var(--space-4)' }}>
              👥 طلبات حسابات المنظمين (Organizer Access Approvals)
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>اسم المنظم</th>
                    <th>البريد الإلكتروني</th>
                    <th>رقم الهاتف</th>
                    <th>الحالة</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id}>
                      <td style={{ fontWeight: 'bold' }}>{req.name}</td>
                      <td>{req.email}</td>
                      <td style={{ direction: 'ltr', textAlign: 'right' }}>{req.phone}</td>
                      <td>
                        <span className={`badge ${req.status === 'approved' ? 'badge-success' : req.status === 'pending' ? 'badge-gold' : 'badge-muted'}`}>
                          {req.status === 'approved' ? '✓ معتمد' : req.status === 'pending' ? 'بانتظار الموافقة' : 'مرفوض'}
                        </span>
                      </td>
                      <td>
                        {req.status === 'pending' ? (
                          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                            <button
                              onClick={() => handleApprove(req.id)}
                              className="btn btn-primary btn-sm"
                              style={{ padding: '4px 10px', fontSize: '0.8rem', background: 'var(--success)' }}
                            >
                              ✓ موافقة
                            </button>
                            <button
                              onClick={() => handleReject(req.id)}
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '4px 10px', fontSize: '0.8rem', color: 'var(--error)', borderColor: 'var(--error)' }}
                            >
                              ✕ رفض
                            </button>
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.8rem', color: 'var(--warm-gray-500)' }}>تمت المعالجة</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: All Events Oversight */}
          <div className="card" style={{ padding: 'var(--space-6)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold-dark)', marginBottom: 'var(--space-4)' }}>
              📸 كافة فعاليات قاعات النعمان
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>اسم الفعالية</th>
                    <th>رمز الـ QR</th>
                    <th>الموقع والقاعة</th>
                    <th>تاريخ الحفل</th>
                    <th>الخصوصية</th>
                    <th>الصور</th>
                    <th>الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((ev) => (
                    <tr key={ev.id}>
                      <td style={{ fontWeight: 'bold' }}>{ev.title}</td>
                      <td><span className="badge badge-gold">{ev.code}</span></td>
                      <td>{ev.venue}</td>
                      <td>{ev.eventDate}</td>
                      <td>{ev.isPublic ? '🌐 عام' : '🔒 خاص'}</td>
                      <td>{getEventPhotos(ev.code).length} صورة</td>
                      <td>
                        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                          <Link href={`/album/${ev.code}`} target="_blank" className="btn btn-secondary btn-sm" style={{ padding: '3px 8px', fontSize: '0.75rem' }}>
                            عرض
                          </Link>
                          <button
                            onClick={() => handleDeleteEvent(ev.id)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '3px 8px', fontSize: '0.75rem', color: 'var(--error)', borderColor: 'var(--error)' }}
                          >
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default function AdminEventsPage() {
  return (
    <AuthProvider>
      <AdminEventsContent />
    </AuthProvider>
  );
}
