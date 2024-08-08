'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState('en');

  const switchLanguage = (lang: string) => {
    setCurrentLang(lang);
    const newPathname = pathname.replace(/\/(en|bn)/, `/${lang}`);
    router.push(newPathname);
  };

  return (
    <div className="language-switcher">
      <button
        onClick={() => switchLanguage('en')}
        className={`btn ${currentLang === 'en' ? 'active' : ''}`}
      >
        English
      </button>
      <button
        onClick={() => switchLanguage('bn')}
        className={`btn ${currentLang === 'bn' ? 'active' : ''}`}
      >
        বাংলা
      </button>
    </div>
  );
};

export default LanguageSwitcher;
