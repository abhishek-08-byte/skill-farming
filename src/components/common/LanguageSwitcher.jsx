import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Globe, Check, ChevronDown } from 'lucide-react';

export const LanguageSwitcher = ({ variant = 'default' }) => {
  const { currentLanguage, setCurrentLanguage, supportedLanguages, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeLang = supportedLanguages?.find((l) => l.code === currentLanguage) || supportedLanguages?.[0] || {
    code: 'en',
    label: 'English',
    nativeName: 'English',
    flag: '🇬🇧'
  };

  const isCompact = variant === 'compact';
  const isDark = variant === 'dark';

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-xs ${
          isDark
            ? 'bg-white/10 hover:bg-white/20 text-white border-white/20'
            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-300'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={t('select_language', 'Select Language')}
      >
        <Globe className={`w-3.5 h-3.5 ${isDark ? 'text-teal-300' : 'text-teal-600'}`} />
        <span className="text-xs">{activeLang.flag}</span>
        <span className="hidden sm:inline font-semibold">{activeLang.label}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''} ${isDark ? 'text-white/60' : 'text-slate-400'}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
              {t('select_language', 'Select Language')}
            </span>
            <span className="text-[10px] text-teal-700 font-bold bg-teal-50 px-1.5 py-0.5 rounded">
              3 Languages
            </span>
          </div>

          <div className="p-1 space-y-1">
            {supportedLanguages?.map((lang) => {
              const isSelected = lang.code === currentLanguage;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-teal-50 text-[#0F4C47] font-bold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">{lang.flag}</span>
                    <div className="text-left">
                      <div className="font-bold">{lang.label}</div>
                      <div className="text-[10px] text-slate-500">{lang.nativeName}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="px-3 py-1.5 bg-slate-50/80 rounded-b-xl border-t border-slate-100 text-[10px] text-slate-500">
            Govt of Maharashtra • त्रिभाषा प्रणाली
          </div>
        </div>
      )}
    </div>
  );
};
