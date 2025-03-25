"use client";

import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

export const useTelegram = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Инициализация WebApp
    if (WebApp.initData) {
      WebApp.ready();
      setIsReady(true);
    }

    // Установка настроек для Telegram Mini App
    WebApp.setHeaderColor('#0056B3'); // Цвет хедера в стиле Surf Coffee
    WebApp.enableClosingConfirmation();
    
    // Отключение обратного свайпа (важно для нашего приложения)
    if (WebApp.BackButton) {
      WebApp.BackButton.hide();
    }

    // Раскрытие приложения на весь экран
    if (WebApp.expand) {
      WebApp.expand();
    }

    // Функция очистки
    return () => {
      if (WebApp.BackButton) {
        WebApp.BackButton.hide();
      }
    };
  }, []);

  // Получение информации о пользователе
  const getUserInfo = () => {
    if (!WebApp.initDataUnsafe || !WebApp.initDataUnsafe.user) {
      return {
        id: 'guest_' + Date.now(),
        username: 'Guest',
        firstName: 'Guest',
        lastName: '',
      };
    }
    return WebApp.initDataUnsafe.user;
  };

  // Проверка, запущено ли приложение внутри Telegram
  const isInTelegram = Boolean(WebApp.initData);

  // Показать уведомление Telegram
  const showAlert = (message: string) => {
    if (WebApp.showAlert) {
      WebApp.showAlert(message);
    } else {
      alert(message);
    }
  };

  // Показать всплывающее сообщение Telegram
  const showPopup = (title: string, message: string, buttons: { type: 'default' | 'ok' | 'close' | 'cancel' | 'destructive', text: string }[]) => {
    if (WebApp.showPopup) {
      WebApp.showPopup({
        title,
        message,
        buttons
      });
    } else {
      alert(`${title}\n${message}`);
    }
  };

  // Закрыть мини-приложение
  const close = () => {
    if (WebApp.close) {
      WebApp.close();
    }
  };

  // Показать кнопку назад
  const showBackButton = () => {
    if (WebApp.BackButton) {
      WebApp.BackButton.show();
    }
  };

  // Скрыть кнопку назад
  const hideBackButton = () => {
    if (WebApp.BackButton) {
      WebApp.BackButton.hide();
    }
  };

  // Настройка обработчика для кнопки назад
  const onBackButtonClick = (callback: () => void) => {
    if (WebApp.BackButton) {
      WebApp.BackButton.onClick(callback);
    }
  };

  // Показать индикатор загрузки
  const showLoader = (withBlur = true) => {
    if (withBlur && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    // Используем безопасный вызов с проверкой типа
    if (typeof (WebApp as any).showProgress === 'function') {
      (WebApp as any).showProgress();
    }
  };

  // Скрыть индикатор загрузки
  const hideLoader = () => {
    // Используем безопасный вызов с проверкой типа
    if (typeof (WebApp as any).stopProgress === 'function') {
      (WebApp as any).stopProgress();
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