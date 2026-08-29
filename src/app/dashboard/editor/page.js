'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { getInvitationByCustomerId, updateWeddingData, publishInvitation, unpublishInvitation } from '@/lib/data';
import { getTemplateById } from '@/lib/templates';
import InvitationRenderer from '@/components/invitation/InvitationRenderer';

function EditorContent() {
  const { user, isCustomer, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [invitation, setInvitation] = useState(null);
  const [weddingData, setWeddingData] = useState({
    groomName: '',
    groomFullName: '',
    brideName: '',
    brideFullName: '',
    groomFather: '',
    groomMother: '',
    brideFather: '',
    brideMother: '',
    weddingDate: '2027-04-17',
    weddingTime: '19:30',
    venue: 'قاعة الملكية - قاعات النعمان',
    venueAddress: 'عمّان - شارع الجاردنز - دوار الواحة',
    mapUrl: 'https://maps.google.com/?q=31.9539,35.9106',
    invitationMessage: 'يتشرف يوسف ودانة بدعوتكم لحضور حفل زفافهما، ليكتمل فرحنا بحضوركم الكريم.',
    photos: [
      '/images/gallery/couple-1.jpg',
      '/images/halls/hall-royal.jpg',
      '/images/halls/hall-andalus.jpg',
      '/images/halls/hall-elegance.jpg'
    ],
    schedule: [
      { name: 'استقبال الضيوف', time: '17:30' },
      { name: 'بدء الحفل', time: '18:30' },
      { name: 'نخب وقطع الكعكة', time: '18:45' },
      { name: 'العشاء الرئيسي', time: '19:00' },
      { name: 'ختام الحفل', time: '21:00' },
    ],
  });

  const [activeTab, setActiveTab] = useState('form');
  const [activeSection, setActiveSection] = useState('couple');
  const [savedToast, setSavedToast] = useState(false);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isCustomer)) {
      router.push('/login');
      return;
    }
    if (user) {
      const inv = getInvitationByCustomerId(user.id);
      if (inv) {
        setInvitation(inv);
        if (inv.weddingData) {
          setWeddingData(prev => ({
            ...prev,
            ...inv.weddingData,
            photos: inv.weddingData.photos?.length > 0 ? inv.weddingData.photos : prev.photos,
            schedule: inv.weddingData.schedule?.length > 0 ? inv.weddingData.schedule : prev.schedule
          }));
        }
      }
    }
  }, [user, loading, isAuthenticated, isCustomer]);

  const handleFieldChange = (field, value) => {
    setWeddingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleScheduleChange = (index, field, value) => {
    const updated = [...weddingData.schedule];
    updated[index] = { ...updated[index], [field]: value };
    setWeddingData(prev => ({ ...prev, schedule: updated }));
  };

  const handleAddScheduleItem = () => {
    setWeddingData(prev => ({
      ...prev,
      schedule: [...prev.schedule, { name: 'فقرة جديدة', time: '20:00' }]
    }));
  };

  const handleRemoveScheduleItem = (index) => {
    setWeddingData(prev => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index)
    }));
  };

  // Direct Device File Upload using FileReader
  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64Url = uploadEvent.target.result;
        setWeddingData(prev => ({
          ...prev,
          photos: [...(prev.photos || []), base64Url]
        }));
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemovePhoto = (index) => {
    setWeddingData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    if (invitation) {
      updateWeddingData(invitation.id, weddingData);
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2000);
    }
  };

  const handlePublish = () => {
    if (!invitation) return;
    setPublishing(true);
    updateWeddingData(invitation.id, weddingData);
    const updated = publishInvitation(invitation.id);
    setInvitation(updated);
    setPublishing(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  const handleUnpublish = () => {
    if (!invitation) return;
    const updated = unpublishInvitation(invitation.id);
    setInvitation(updated);
  };

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner" /></div>;
  if (!user || !isCustomer) return null;

  const currentTemplate = getTemplateById(invitation?.templateId || 'classic-gold');

  return (
    <>
      <Header />
      <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', background: 'var(--off-white)', display: 'flex', flexDirection: 'column' }}>

        {/* Action Bar */}
        <div style={{
          background: 'var(--white)',
          borderBottom: '1px solid var(--warm-gray-200)',
          padding: 'var(--space-3) var(--space-6)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <Link href="/dashboard" className="text-muted text-sm">لوحة التحكم</Link>
            <span className="text-muted text-sm">/</span>
            <span className="text-gold text-sm" style={{ fontWeight: 'bold' }}>محرر الدعوة</span>
            <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>القالب: {currentTemplate?.name}</span>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Link href="/dashboard/templates" className="btn btn-secondary btn-sm">
              🎨 تغيير القالب
            </Link>
            <button onClick={handleSave} className="btn btn-secondary btn-sm">
              💾 حفظ التعديلات
            </button>
            {invitation?.status === 'published' ? (
              <>
                <Link href={`/invite/${invitation.slug}`} target="_blank" className="btn btn-primary btn-sm">
                  🔗 فتح الرابط المنشور
                </Link>
                <button onClick={handleUnpublish} className="btn btn-secondary btn-sm" style={{ color: 'var(--error)', borderColor: 'var(--error)' }}>
                  إلغاء النشر
                </button>
              </>
            ) : (
              <button onClick={handlePublish} disabled={publishing} className="btn btn-primary btn-sm" style={{ background: 'var(--success)' }}>
                🚀 نشر وتوليد الرابط
              </button>
            )}
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="editor-tabs">
          <button
            className={`editor-tab ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            ✏️ تعديل البيانات
          </button>
          <button
            className={`editor-tab ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            👁️ معاينة حية
          </button>
        </div>

        {/* Main Editor Body */}
        <div className="editor-layout" style={{ flex: 1 }}>

          {/* Form Sidebar */}
          <div
            className="editor-sidebar"
            style={{ display: activeTab === 'form' ? 'block' : 'none' }}
          >
            {/* Section Switcher Tabs */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--warm-gray-200)', paddingBottom: 'var(--space-3)' }}>
              {[
                { id: 'couple', label: 'العروسين' },
                { id: 'family', label: 'العائلتين' },
                { id: 'date', label: 'الموعد والمكان' },
                { id: 'message', label: 'نص الدعوة' },
                { id: 'schedule', label: 'برنامج اليوم' },
                { id: 'photos', label: 'ألبوم الصور' },
              ].map(sec => (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  style={{
                    padding: '5px 12px',
                    fontSize: '0.85rem',
                    borderRadius: '15px',
                    border: '1px solid',
                    borderColor: activeSection === sec.id ? 'var(--gold-primary)' : 'var(--warm-gray-200)',
                    background: activeSection === sec.id ? 'var(--gold-primary)' : 'var(--white)',
                    color: activeSection === sec.id ? 'var(--white)' : 'var(--dark-brown)',
                    cursor: 'pointer',
                    fontWeight: activeSection === sec.id ? 'bold' : 'normal'
                  }}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            {/* Section 1: Couple Names */}
            {activeSection === 'couple' && (
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-4)', color: 'var(--gold-dark)' }}>
                  بيانات العروسين
                </h4>
                <div className="form-group">
                  <label className="form-label">اسم العريس (المختصر) *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={weddingData.groomName}
                    onChange={e => handleFieldChange('groomName', e.target.value)}
                    placeholder="مثال: يوسف"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">اسم العريس الكامل واللقب</label>
                  <input
                    type="text"
                    className="form-input"
                    value={weddingData.groomFullName}
                    onChange={e => handleFieldChange('groomFullName', e.target.value)}
                    placeholder="مثال: يوسف بن إبراهيم"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">اسم العروس (المختصر) *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={weddingData.brideName}
                    onChange={e => handleFieldChange('brideName', e.target.value)}
                    placeholder="مثال: دانة"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">اسم العروس الكامل واللقب</label>
                  <input
                    type="text"
                    className="form-input"
                    value={weddingData.brideFullName}
                    onChange={e => handleFieldChange('brideFullName', e.target.value)}
                    placeholder="مثال: دانة بنت خليفة"
                  />
                </div>
              </div>
            )}

            {/* Section 2: Family Info */}
            {activeSection === 'family' && (
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-4)', color: 'var(--gold-dark)' }}>
                  بيانات عائلة العروسين (الداعين)
                </h4>
                <div className="form-group">
                  <label className="form-label">اسم والد العريس</label>
                  <input
                    type="text"
                    className="form-input"
                    value={weddingData.groomFather}
                    onChange={e => handleFieldChange('groomFather', e.target.value)}
                    placeholder="مثال: إبراهيم الحمادي"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">اسم والدة العريس</label>
                  <input
                    type="text"
                    className="form-input"
                    value={weddingData.groomMother}
                    onChange={e => handleFieldChange('groomMother', e.target.value)}
                    placeholder="مثال: موزة المرزوقي"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">اسم والد العروس</label>
                  <input
                    type="text"
                    className="form-input"
                    value={weddingData.brideFather}
                    onChange={e => handleFieldChange('brideFather', e.target.value)}
                    placeholder="مثال: خليفة الشامسي"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">اسم والدة العروس</label>
                  <input
                    type="text"
                    className="form-input"
                    value={weddingData.brideMother}
                    onChange={e => handleFieldChange('brideMother', e.target.value)}
                    placeholder="مثال: عائشة النعيمي"
                  />
                </div>
              </div>
            )}

            {/* Section 3: Date & Venue */}
            {activeSection === 'date' && (
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-4)', color: 'var(--gold-dark)' }}>
                  موعد وموقع الحفل
                </h4>
                <div className="form-group">
                  <label className="form-label">تاريخ الزفاف *</label>
                  <input
                    type="date"
                    className="form-input"
                    value={weddingData.weddingDate}
                    onChange={e => handleFieldChange('weddingDate', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">توقيت بدء الحفل</label>
                  <input
                    type="text"
                    className="form-input"
                    value={weddingData.weddingTime}
                    onChange={e => handleFieldChange('weddingTime', e.target.value)}
                    placeholder="مثال: 19:30"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">اسم القاعة / المكان *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={weddingData.venue}
                    onChange={e => handleFieldChange('venue', e.target.value)}
                    placeholder="مثال: قاعة الملكية - قاعات النعمان"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">العنوان التفصيلي</label>
                  <input
                    type="text"
                    className="form-input"
                    value={weddingData.venueAddress}
                    onChange={e => handleFieldChange('venueAddress', e.target.value)}
                    placeholder="مثال: عمّان - شارع الجاردنز - دوار الواحة"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">رابط خرائط Google Maps</label>
                  <input
                    type="url"
                    className="form-input"
                    value={weddingData.mapUrl}
                    onChange={e => handleFieldChange('mapUrl', e.target.value)}
                    placeholder="https://maps.google.com/..."
                  />
                </div>
              </div>
            )}

            {/* Section 4: Message */}
            {activeSection === 'message' && (
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-4)', color: 'var(--gold-dark)' }}>
                  صيغة ونص الدعوة
                </h4>
                <div className="form-group">
                  <label className="form-label">عبارة الترحيب والدعوة للضيوف</label>
                  <textarea
                    className="form-input"
                    rows={4}
                    value={weddingData.invitationMessage}
                    onChange={e => handleFieldChange('invitationMessage', e.target.value)}
                    placeholder="يتشرف فلان وفلانة بدعوتكم لحضور حفل زفافهما، ليكتمل فرحنا بحضوركم الكريم..."
                  />
                </div>
              </div>
            )}

            {/* Section 5: Schedule (Timeline without emojis) */}
            {activeSection === 'schedule' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', margin: 0, color: 'var(--gold-dark)' }}>
                    برنامج اليوم (الخط الزمني)
                  </h4>
                  <button onClick={handleAddScheduleItem} className="btn btn-secondary btn-sm" style={{ padding: '3px 10px', fontSize: '0.8rem' }}>
                    + إضافة فقرة
                  </button>
                </div>

                {weddingData.schedule?.map((item, idx) => (
                  <div key={idx} style={{ background: 'var(--off-white)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-3)', border: '1px solid var(--warm-gray-200)' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', fontWeight: 'bold' }}>#{idx + 1}</span>
                      <input
                        type="text"
                        style={{ flex: 1 }}
                        className="form-input"
                        value={item.name}
                        onChange={e => handleScheduleChange(idx, 'name', e.target.value)}
                        placeholder="اسم الفقرة (مثال: استقبال الضيوف)"
                      />
                      <input
                        type="text"
                        style={{ width: 95, textAlign: 'center' }}
                        className="form-input"
                        value={item.time}
                        onChange={e => handleScheduleChange(idx, 'time', e.target.value)}
                        placeholder="17:30"
                      />
                      <button
                        onClick={() => handleRemoveScheduleItem(idx)}
                        style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', fontSize: '1.2rem', padding: '0 4px' }}
                        title="حذف الفقرة"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Section 6: Photos with Direct Device Upload */}
            {activeSection === 'photos' && (
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-2)', color: 'var(--gold-dark)' }}>
                  ألبوم صور الزفاف
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--warm-gray-500)', marginBottom: 'var(--space-4)' }}>
                  يمكنك رفع صورك المفضلة مباشرة من جهازك أو هاتفك المحمول ليتم عرضها في الألبوم ثلاثي الأبعاد
                </p>

                {/* Direct Upload Button */}
                <div style={{
                  border: '2px dashed var(--gold-primary)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-6)',
                  textAlign: 'center',
                  background: 'var(--cream)',
                  marginBottom: 'var(--space-6)',
                  cursor: 'pointer'
                }} onClick={() => fileInputRef.current?.click()}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    multiple
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  <div style={{ fontSize: '2.5rem', color: 'var(--gold-primary)', marginBottom: 'var(--space-2)' }}>📸</div>
                  <div style={{ fontWeight: 'bold', color: 'var(--dark-brown)', marginBottom: 'var(--space-1)' }}>
                    انقر هنا لاختيار ورفع صور من جهازك
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--warm-gray-500)' }}>
                    يدعم JPG, PNG, WEBP (يمكنك اختيار عدة صور دفعة واحدة)
                  </div>
                </div>

                {/* Photos Grid / List */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: 'var(--space-3)' }}>
                  {weddingData.photos?.map((img, i) => (
                    <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--warm-gray-200)', boxShadow: 'var(--shadow-sm)' }}>
                      <img src={img} alt={`صورة ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button
                        onClick={() => handleRemovePhoto(i)}
                        style={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          background: 'rgba(0,0,0,0.7)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '50%',
                          width: 22,
                          height: 22,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '11px'
                        }}
                        title="حذف الصورة"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Button */}
            <div style={{ marginTop: 'var(--space-8)', borderTop: '1px solid var(--warm-gray-200)', paddingTop: 'var(--space-4)' }}>
              <button onClick={handleSave} className="btn btn-primary" style={{ width: '100%' }}>
                💾 حفظ كافة البيانات
              </button>
            </div>
          </div>

          {/* Live Mobile Device Preview Frame */}
          <div
            className="editor-preview"
            style={{ display: activeTab === 'preview' || typeof window !== 'undefined' && window.innerWidth > 1024 ? 'flex' : 'none' }}
          >
            <div className="editor-phone-frame">
              <div className="editor-phone-frame-inner">
                <InvitationRenderer
                  templateId={invitation?.templateId || 'classic-gold'}
                  weddingData={weddingData}
                  slug={invitation?.slug || ''}
                  isPreview={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Saved Notification */}
        {savedToast && (
          <div style={{
            position: 'fixed',
            bottom: 'var(--space-8)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--dark-brown)',
            color: 'var(--gold-light)',
            padding: 'var(--space-3) var(--space-6)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-xl)',
            zIndex: 1000,
            fontSize: 'var(--text-sm)'
          }}>
            ✓ تم حفظ وتحديث الدعوة بنجاح!
          </div>
        )}
      </div>
    </>
  );
}

export default function EditorPage() {
  return (
    <AuthProvider>
      <EditorContent />
    </AuthProvider>
  );
}
