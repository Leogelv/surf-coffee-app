import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Surf Coffee App",
  description: "Telegram Mini App для удобного заказа кофе и еды в Surf Coffee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Создаем заглушку для Telegram WebApp, если его нет
              if (typeof window !== 'undefined' && !window.Telegram) {
                window.Telegram = {
                  WebApp: {
                    initData: '',
                    initDataUnsafe: { user: null },
                    ready: function() {},
                    expand: function() {},
                    close: function() {},
                    showAlert: function(message) { console.log('TG Alert:', message); },
                    showPopup: function() {},
                    setHeaderColor: function() {},
                    enableClosingConfirmation: function() {},
                    BackButton: {
                      show: function() {},
                      hide: function() {},
                      onClick: function() {}
                    }
                  }
                };
                console.log('Telegram WebApp заглушка создана, чтобы приложение могло работать вне Telegram');
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
