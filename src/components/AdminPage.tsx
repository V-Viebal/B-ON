import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, ImagePlus, LogIn, LogOut, Save, ShieldCheck, Upload } from 'lucide-react';
import { AppLanguage } from '../types';
import { CollectionEdition, FurnitureCollection } from '../data/collectionData';

interface AdminSession {
  loading: boolean;
  isAdmin: boolean;
  email?: string;
  local?: boolean;
}

interface AdminPageProps {
  collection: FurnitureCollection;
  currentLanguage: AppLanguage;
  session: AdminSession;
  onSignIn: () => void;
  onSignOut: () => void;
  onSave: (collection: FurnitureCollection) => Promise<void>;
  onUploadAsset: (file: File, assetKey: string) => Promise<string>;
  onBack: () => void;
}

function cloneCollection(collection: FurnitureCollection): FurnitureCollection {
  return JSON.parse(JSON.stringify(collection)) as FurnitureCollection;
}

function updateEdition(
  collection: FurnitureCollection,
  editionId: string,
  updater: (edition: CollectionEdition) => CollectionEdition,
): FurnitureCollection {
  return {
    ...collection,
    editions: collection.editions.map((edition) =>
      edition.id === editionId ? updater(edition) : edition,
    ),
  };
}

const inputClass = 'mt-2 w-full rounded-xl border border-[#3b3b3b] bg-[#151515] px-4 py-3 text-sm text-white outline-none focus:border-[#aeb8c2]';
const textAreaClass = `${inputClass} leading-relaxed`;

export const AdminPage: React.FC<AdminPageProps> = ({
  collection,
  currentLanguage,
  session,
  onSignIn,
  onSignOut,
  onSave,
  onUploadAsset,
  onBack,
}) => {
  const isVi = currentLanguage === 'VI';
  const isLocal = session.local === true;
  const [draft, setDraft] = useState<FurnitureCollection>(() => cloneCollection(collection));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const updateCollectionField = (field: 'name' | 'nameVi' | 'eyebrow' | 'description' | 'descriptionVi', value: string) => {
    setSaved(false);
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const updateImage = async (edition: CollectionEdition, field: 'previewImage' | 'layoutImage' | 'materialsImage' | 'perspectiveImages', file: File, index?: number) => {
    const assetKey = `${draft.id}-${edition.id}-${field}-${index ?? 0}`;
    setUploadingKey(assetKey);
    setError('');
    try {
      const url = await onUploadAsset(file, assetKey);
      updateDraftEdition(edition.id, (current) => {
        if (field === 'perspectiveImages') {
          const images = [...current.perspectiveImages];
          images[index ?? 0] = url;
          return { ...current, perspectiveImages: images };
        }
        return { ...current, [field]: url };
      });
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Không thể tải ảnh lên.');
    } finally {
      setUploadingKey(null);
    }
  };

  useEffect(() => {
    setDraft(cloneCollection(collection));
  }, [collection]);

  const updateDraftEdition = (
    editionId: string,
    updater: (edition: CollectionEdition) => CollectionEdition,
  ) => {
    setSaved(false);
    setDraft((current) => updateEdition(current, editionId, updater));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setError('');
    try {
      await onSave(draft);
      setSaved(true);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : isVi ? 'Không thể lưu thay đổi.' : 'Unable to save changes.');
    } finally {
      setSaving(false);
    }
  };

  if (session.loading) {
    return (
      <section className="min-h-screen pt-40 px-6 bg-[#141414] text-white flex items-center justify-center">
        <p className="text-sm text-[#999]">{isVi ? 'Đang kiểm tra quyền quản trị...' : 'Checking admin access...'}</p>
      </section>
    );
  }

  if (!session.isAdmin) {
    return (
      <section className="min-h-screen pt-36 sm:pt-44 px-6 pb-24 bg-[#141414] text-white font-manrope">
        <div className="max-w-xl mx-auto rounded-3xl border border-[#333] bg-[#1a1a1a] p-8 sm:p-12 text-center shadow-2xl">
          <div className="mx-auto w-14 h-14 rounded-full border border-[#555] flex items-center justify-center text-[#aeb8c2]">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-[#aeb8c2]">B+ON ADMIN</p>
          <h1 className="mt-4 text-3xl sm:text-4xl font-light font-philosopher uppercase">
            {isVi ? 'Chế độ chỉnh sửa' : 'Edit mode'}
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-[#999]">
            {isLocal
              ? (isVi
                ? 'Đăng nhập bằng tài khoản giả lập local để mở Edit Mode trên máy này.'
                : 'Sign in with the local demo account to open Edit Mode on this machine.')
              : (isVi
                ? 'Đăng nhập bằng tài khoản ChatGPT được cấp quyền quản trị để chỉnh sửa nội dung Linear trên public website.'
                : 'Sign in with an approved ChatGPT account to edit Linear content on the public website.')}
          </p>
          <button
            type="button"
            onClick={onSignIn}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#aeb8c2] px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#141414] hover:bg-white transition-colors"
          >
            <LogIn className="w-4 h-4" />
            <span>{isLocal ? (isVi ? 'Đăng nhập local' : 'Sign in locally') : (isVi ? 'Đăng nhập admin' : 'Sign in as admin')}</span>
          </button>
          <button
            type="button"
            onClick={onBack}
            className="mt-5 block mx-auto text-xs uppercase tracking-[0.16em] text-[#777] hover:text-white transition-colors"
          >
            {isVi ? 'Quay lại website' : 'Back to website'}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-32 sm:pt-40 px-4 sm:px-6 md:px-10 pb-24 bg-[#141414] text-white font-manrope">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2d2d2d] pb-6">
          <div>
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#999] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isVi ? 'Quay lại website' : 'Back to website'}</span>
            </button>
            <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-[#aeb8c2]">B+ON ADMIN</p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-light font-philosopher uppercase tracking-wide">
              {isVi ? 'Chỉnh sửa Collection' : 'Edit Collection'}
            </h1>
            <p className="mt-3 text-sm text-[#8f8f8f]">{isLocal ? (isVi ? 'localhost — cần đăng nhập trên public' : 'localhost — sign in on public') : session.email}</p>
          </div>
          <button
            type="button"
            onClick={onSignOut}
            className="inline-flex items-center gap-2 rounded-full border border-[#444] px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-[#b8b8b8] hover:border-white hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>{isVi ? 'Đăng xuất' : 'Sign out'}</span>
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-[#333] bg-[#1a1a1a] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <ImagePlus className="w-5 h-5 text-[#aeb8c2]" />
            <div>
              <h2 className="text-lg font-philosopher uppercase">{isVi ? 'Nội dung Collection' : 'Collection content'}</h2>
              <p className="mt-1 text-xs text-[#777]">{isLocal ? (isVi ? 'Account admin thật chỉ được xác thực trên public website.' : 'The real admin account is authenticated on the public website.') : (isVi ? 'Nội dung được lưu cho mọi người trên public website.' : 'Content is saved for everyone on the public website.')}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#8b8b8b]">Collection name (VI)</span>
              <input value={draft.nameVi} onChange={(event) => updateCollectionField('nameVi', event.target.value)} className={inputClass} />
            </label>
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#8b8b8b]">Collection name (EN)</span>
              <input value={draft.name} onChange={(event) => updateCollectionField('name', event.target.value)} className={inputClass} />
            </label>
            <label className="block md:col-span-2">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#8b8b8b]">Eyebrow</span>
              <input value={draft.eyebrow} onChange={(event) => updateCollectionField('eyebrow', event.target.value)} className={inputClass} />
            </label>
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#8b8b8b]">Description (VI)</span>
              <textarea rows={5} value={draft.descriptionVi} onChange={(event) => updateCollectionField('descriptionVi', event.target.value)} className={textAreaClass} />
            </label>
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#8b8b8b]">Description (EN)</span>
              <textarea rows={5} value={draft.description} onChange={(event) => updateCollectionField('description', event.target.value)} className={textAreaClass} />
            </label>
          </div>
        </div>

        <div className="mt-8 space-y-5">
          {draft.editions.map((edition, index) => (
            <article key={edition.id} className="rounded-2xl border border-[#333] bg-[#1a1a1a] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#777]">Version {String(index + 1).padStart(2, '0')}</p>
                  <h2 className="mt-2 text-2xl font-light font-philosopher uppercase">{edition.name}</h2>
                </div>
                <span className="text-[11px] text-[#777]">PDF / images giữ nguyên</span>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#8b8b8b]">Version name</span>
                  <input
                    value={edition.name}
                    onChange={(event) => updateDraftEdition(edition.id, (current) => ({ ...current, name: event.target.value, nameVi: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-[#3b3b3b] bg-[#151515] px-4 py-3 text-sm text-white outline-none focus:border-[#aeb8c2]"
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#8b8b8b]">Room size</span>
                  <input
                    value={edition.roomSize}
                    onChange={(event) => updateDraftEdition(edition.id, (current) => ({ ...current, roomSize: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-[#3b3b3b] bg-[#151515] px-4 py-3 text-sm text-white outline-none focus:border-[#aeb8c2]"
                  />
                </label>
              </div>

              <div className="mt-5 rounded-2xl border border-[#2d2d2d] bg-[#161616] p-4 sm:p-5">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#aeb8c2]" />
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#aeb8c2]">{isVi ? 'Hình ảnh version' : 'Version images'}</span>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {([
                    ['previewImage', isVi ? 'Ảnh cover' : 'Cover image', edition.previewImage],
                    ['layoutImage', isVi ? 'Ảnh mặt bằng' : 'Layout image', edition.layoutImage],
                    ['materialsImage', isVi ? 'Ảnh vật liệu' : 'Materials image', edition.materialsImage],
                  ] as const).map(([field, label, value]) => {
                    const key = `${draft.id}-${edition.id}-${field}-0`;
                    return (
                      <div key={field} className="rounded-xl border border-[#303030] bg-[#1b1b1b] p-3">
                        <p className="text-xs text-[#b8b8b8]">{label}</p>
                        <img src={value} alt="" className="mt-3 h-28 w-full rounded-lg object-cover bg-[#252525]" />
                        <input value={value} onChange={(event) => updateDraftEdition(edition.id, (current) => ({ ...current, [field]: event.target.value }))} className={inputClass} placeholder="https://... hoặc /collections/..." />
                        <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#444] px-3 py-2 text-xs text-[#c8c8c8] hover:border-[#aeb8c2]">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{uploadingKey === key ? (isVi ? 'Đang tải...' : 'Uploading...') : (isVi ? 'Chọn file ảnh' : 'Choose image')}</span>
                          <input type="file" accept="image/*" className="sr-only" disabled={uploadingKey === key} onChange={(event) => { const file = event.target.files?.[0]; if (file) void updateImage(edition, field, file); event.currentTarget.value = ''; }} />
                        </label>
                      </div>
                    );
                  })}
                  {edition.perspectiveImages.map((value, imageIndex) => {
                    const key = `${draft.id}-${edition.id}-perspectiveImages-${imageIndex}`;
                    return (
                      <div key={`perspective-${imageIndex}`} className="rounded-xl border border-[#303030] bg-[#1b1b1b] p-3">
                        <p className="text-xs text-[#b8b8b8]">{isVi ? `Ảnh phối cảnh ${imageIndex + 1}` : `Perspective image ${imageIndex + 1}`}</p>
                        <img src={value} alt="" className="mt-3 h-28 w-full rounded-lg object-cover bg-[#252525]" />
                        <input value={value} onChange={(event) => updateDraftEdition(edition.id, (current) => { const images = [...current.perspectiveImages]; images[imageIndex] = event.target.value; return { ...current, perspectiveImages: images }; })} className={inputClass} placeholder="https://... hoặc /collections/..." />
                        <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#444] px-3 py-2 text-xs text-[#c8c8c8] hover:border-[#aeb8c2]">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{uploadingKey === key ? (isVi ? 'Đang tải...' : 'Uploading...') : (isVi ? 'Chọn file ảnh' : 'Choose image')}</span>
                          <input type="file" accept="image/*" className="sr-only" disabled={uploadingKey === key} onChange={(event) => { const file = event.target.files?.[0]; if (file) void updateImage(edition, 'perspectiveImages', file, imageIndex); event.currentTarget.value = ''; }} />
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="block md:col-span-2">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#8b8b8b]">Overview (VI)</span>
                  <textarea rows={4} value={edition.overviewVi || ''} onChange={(event) => updateDraftEdition(edition.id, (current) => ({ ...current, overviewVi: event.target.value }))} className={textAreaClass} placeholder="Nội dung mô tả hiển thị ở phần tổng quan..." />
                </label>
                <label className="block md:col-span-2">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#8b8b8b]">Overview (EN)</span>
                  <textarea rows={4} value={edition.overview || ''} onChange={(event) => updateDraftEdition(edition.id, (current) => ({ ...current, overview: event.target.value }))} className={textAreaClass} placeholder="Text shown in the version overview..." />
                </label>
                <label className="block md:col-span-2">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#8b8b8b]">Setting description (VI)</span>
                  <textarea rows={4} value={edition.settingDescriptionVi || ''} onChange={(event) => updateDraftEdition(edition.id, (current) => ({ ...current, settingDescriptionVi: event.target.value }))} className={textAreaClass} placeholder="Mô tả không gian phối cảnh..." />
                </label>
                <label className="block md:col-span-2">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#8b8b8b]">Setting description (EN)</span>
                  <textarea rows={4} value={edition.settingDescription || ''} onChange={(event) => updateDraftEdition(edition.id, (current) => ({ ...current, settingDescription: event.target.value }))} className={textAreaClass} placeholder="Description shown in the curated setting section..." />
                </label>
                <label className="block md:col-span-2">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#8b8b8b]">Palette description (VI)</span>
                  <textarea rows={4} value={edition.paletteDescriptionVi || ''} onChange={(event) => updateDraftEdition(edition.id, (current) => ({ ...current, paletteDescriptionVi: event.target.value }))} className={textAreaClass} placeholder="Mô tả bảng màu và vật liệu..." />
                </label>
                <label className="block md:col-span-2">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#8b8b8b]">Palette description (EN)</span>
                  <textarea rows={4} value={edition.paletteDescription || ''} onChange={(event) => updateDraftEdition(edition.id, (current) => ({ ...current, paletteDescription: event.target.value }))} className={textAreaClass} placeholder="Description shown beside the palette..." />
                </label>
                <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#8b8b8b]">Products (one per line)</span>
                  <textarea
                    rows={7}
                    value={edition.productLineup.join('\n')}
                    onChange={(event) => updateDraftEdition(edition.id, (current) => ({ ...current, productLineup: event.target.value.split('\n').map((item) => item.trim()).filter(Boolean) }))}
                    className="mt-2 w-full rounded-xl border border-[#3b3b3b] bg-[#151515] px-4 py-3 text-sm leading-relaxed text-white outline-none focus:border-[#aeb8c2]"
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#8b8b8b]">Palette (one per line)</span>
                  <textarea
                    rows={7}
                    value={edition.palette.join('\n')}
                    onChange={(event) => updateDraftEdition(edition.id, (current) => ({ ...current, palette: event.target.value.split('\n').map((item) => item.trim()).filter(Boolean) }))}
                    className="mt-2 w-full rounded-xl border border-[#3b3b3b] bg-[#151515] px-4 py-3 text-sm leading-relaxed text-white outline-none focus:border-[#aeb8c2]"
                  />
                </label>
              </div>
            </article>
          ))}
        </div>

        <div className="sticky bottom-5 mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#444] bg-[#202020]/95 p-4 backdrop-blur-xl shadow-2xl">
          <div className="text-sm text-[#a0a0a0]">
            {error ? <span className="text-red-300">{error}</span> : saved ? <span className="inline-flex items-center gap-2 text-emerald-300"><Check className="w-4 h-4" />{isLocal ? (isVi ? 'Đã lưu trên bản local' : 'Saved locally') : (isVi ? 'Đã lưu cho mọi người' : 'Saved for everyone')}</span> : (isLocal ? (isVi ? 'Bản local lưu thay đổi trong trình duyệt này.' : 'Local changes are saved in this browser.') : (isVi ? 'Thay đổi chỉ áp dụng sau khi bấm lưu.' : 'Changes apply after saving.'))}
          </div>
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-full bg-[#aeb8c2] px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#141414] hover:bg-white disabled:cursor-wait disabled:opacity-60 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? (isVi ? 'Đang lưu...' : 'Saving...') : (isVi ? 'Lưu thay đổi' : 'Save changes')}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
