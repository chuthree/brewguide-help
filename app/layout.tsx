import type { Metadata } from 'next';
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
      <body className="flex min-h-screen flex-col">
        <RootProvider
          theme={{ forcedTheme: 'light', enableSystem: false, hotKey: false }}
          i18n={{ locale: 'zh', translations }}
          search={{ SearchDialog: HelpSearchDialog }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
