import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.tsx'

if (typeof document !== "undefined") {
  const originalTitle = document.title;
  const originalFaviconHref = "/favicon-active.svg";
  const awayTitle = "Vuelve 😳 | Portfolio";
  const awayFaviconHref = "/favicon-away.svg";

  const setFavicon = (href: string) => {
    const link =
      document.querySelector<HTMLLinkElement>("link[rel='icon']") ||
      document.createElement("link");

    link.rel = "icon";
    link.href = href;

    if (!link.parentNode) {
      document.head.appendChild(link);
    }
  };


  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      document.title = awayTitle;
      setFavicon(awayFaviconHref);
    } else {
      document.title = originalTitle;
      setFavicon(originalFaviconHref);
    }
  });
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#38bdf8' }}>Loading...</div>}>
      <App />
    </Suspense>
  </StrictMode>,
)
