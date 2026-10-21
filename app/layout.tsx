import type { Metadata } from 'next';
import Script from "next/script";
import { RootProvider } from 'fumadocs-ui/provider/next';
import { siteUrl } from '@/lib/site';
import HelpSearchDialog from '@/components/HelpSearchDialog';
import { translations } from '@/lib/translations';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Brew Guide Help', template: '%s · Brew Guide Help' },
  openGraph: { siteName: 'Brew Guide Help', locale: 'zh_CN', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className="flex min-h-screen flex-col">
        {process.env.NODE_ENV === 'production' && (
          <Script
            id="site-metrics"
            src="/site-metrics.js"
            strategy="afterInteractive"
            data-website-id="79e755d1-9a63-4f8c-a765-d9c23363d202"
            data-host-url={siteUrl}
            data-do-not-track="true"
            data-exclude-search="true"
            data-exclude-hash="true"
            data-domains="brewguide-help.chu3.top"
          />
        )}
        <RootProvider
          theme={{ defaultTheme: 'system', enableSystem: true, disableTransitionOnChange: true, hotKey: false }}
          i18n={{ locale: 'zh', translations }}
          search={{ SearchDialog: HelpSearchDialog }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
