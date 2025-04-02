"use client";

import { useEffect, useState } from 'react';

// Создаем заглушку для WebApp, которая будет использоваться вне Telegram
const createMockWebApp = () => {
  return {
    initData: '',
    initDataUnsafe: { user: null },
    ready: () => {},
    setHeaderColor: () => {},
    enableClosingConfirmation: () => {},
    BackButton: {
      show: () => {},
      hide: () => {},
      onClick: () => {}
    },
    expand: () => {},
    showAlert: (message: string) => { console.log('TG Alert:', message); },
    showPopup: () => {},
    close: () => {},
    showProgress: () => {},
    stopProgress: () => {},
    isVersionAtLeast: () => true
  };
};

// Проверяем доступность WebApp и используем заглушку, если его нет
const getWebApp = () => {
  if (typeof window !== 'undefined') {
    // Пробуем получить WebApp из window.Telegram
    const telegramWebApp = (window as any).Telegram?.WebApp;
    if (telegramWebApp) {
      return telegramWebApp;
    }
    
    // Пробуем импортировать из @twa-dev/sdk, если доступно
    try {
      // Динамический импорт для предотвращения ошибок при сборке
      const WebAppModule = require('@twa-dev/sdk');
      if (WebAppModule.default) {
        return WebAppModule.default;
      }
    } catch (error) {
      console.log('TG SDK not available:', error);
    }
  }
  
  // Возвращаем заглушку, если ничего не найдено
  return createMockWebApp();
};

export const useTelegram = () => {
  const [isReady, setIsReady] = useState(false);
  const [WebApp, setWebApp] = useState<any>(createMockWebApp());

  useEffect(() => {
    // Инициализируем WebApp только на клиенте
    if (typeof window !== 'undefined') {
      const tgWebApp = getWebApp();
      setWebApp(tgWebApp);
      
      // Инициализация WebApp
      if (tgWebApp.initData) {
        tgWebApp.ready();
        setIsReady(true);
      }

      // Установка настроек для Telegram Mini App
      try {
        tgWebApp.setHeaderColor('#0056B3'); // Цвет хедера в стиле Surf Coffee
        tgWebApp.enableClosingConfirmation();
        
        // Отключение обратного свайпа (важно для нашего приложения)
        if (tgWebApp.BackButton) {
          tgWebApp.BackButton.hide();
        }

        // Раскрытие приложения на весь экран
        if (tgWebApp.expand) {
          tgWebApp.expand();
        }
      } catch (error) {
        console.log('TG methods not available:', error);
      }
    }

    // Функция очистки
    return () => {
      try {
        if (WebApp.BackButton) {
          WebApp.BackButton.hide();
        }
      } catch (error) {
        console.log('Error hiding back button:', error);
      }
    };
  }, []);

  // Получение информации о пользователе
  const getUserInfo = () => {
    try {
      if (!WebApp.initDataUnsafe || !WebApp.initDataUnsafe.user) {
        return {
          id: 'guest_' + Date.now(),
          username: 'Guest',
          firstName: 'Guest',
          lastName: '',
        };
      }
      return WebApp.initDataUnsafe.user;
    } catch (error) {
      console.log('Error getting user info:', error);
      return {
        id: 'guest_' + Date.now(),
        username: 'Guest',
        firstName: 'Guest',
        lastName: '',
      };
    }
  };

  // Проверка, запущено ли приложение внутри Telegram
  const isInTelegram = Boolean(WebApp.initData);

  // Показать уведомление Telegram
  const showAlert = (message: string) => {
    try {
      if (WebApp.showAlert) {
        WebApp.showAlert(message);
      } else {
        alert(message);
      }
    } catch (error) {
      console.log('Error showing alert:', error);
      alert(message);
    }
  };

  // Показать всплывающее сообщение Telegram
  const showPopup = (title: string, message: string, buttons: { type: 'default' | 'ok' | 'close' | 'cancel' | 'destructive', text: string }[]) => {
    try {
      if (WebApp.showPopup) {
        WebApp.showPopup({
          title,
          message,
          buttons
        });
      } else {
        alert(`${title}\n${message}`);
      }
    } catch (error) {
      console.log('Error showing popup:', error);
      alert(`${title}\n${message}`);
    }
  };

  // Закрыть мини-приложение
  const close = () => {
    try {
      if (WebApp.close) {
        WebApp.close();
      }
    } catch (error) {
      console.log('Error closing app:', error);
    }
  };

  // Показать кнопку назад
  const showBackButton = () => {
    try {
      if (WebApp.BackButton) {
        WebApp.BackButton.show();
      }
    } catch (error) {
      console.log('Error showing back button:', error);
    }
  };

  // Скрыть кнопку назад
  const hideBackButton = () => {
    try {
      if (WebApp.BackButton) {
        WebApp.BackButton.hide();
      }
    } catch (error) {
      console.log('Error hiding back button:', error);
    }
  };

  // Настройка обработчика для кнопки назад
  const onBackButtonClick = (callback: () => void) => {
    try {
      if (WebApp.BackButton) {
        WebApp.BackButton.onClick(callback);
      }
    } catch (error) {
      console.log('Error setting back button callback:', error);
    }
  };

  // Показать индикатор загрузки
  const showLoader = (withBlur = true) => {
    try {
      if (withBlur && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      // Используем безопасный вызов с проверкой типа
      if (typeof WebApp.showProgress === 'function') {
        WebApp.showProgress();
      }
    } catch (error) {
      console.log('Error showing loader:', error);
    }
  };

  // Скрыть индикатор загрузки
  const hideLoader = () => {
    try {
      // Используем безопасный вызов с проверкой типа
      if (typeof WebApp.stopProgress === 'function') {
        WebApp.stopProgress();
      }
    } catch (error) {
      console.log('Error hiding loader:', error);
    }
  };

  return {
    isReady,
    isInTelegram,
    getUserInfo,
    showAlert,
    showPopup,
    close,
    showBackButton,
    hideBackButton,
    onBackButtonClick,
    showLoader,
    hideLoader,
    // Оригинальный WebApp объект для доступа к другим функциям, если понадобятся
    tg: WebApp,
  };
}; 