export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  calories?: number;
  modifiers?: ProductModifier[];
  popular?: boolean;
}

export interface ProductModifier {
  id: string;
  name: string;
  required: boolean;
  options: ModifierOption[];
}

export interface ModifierOption {
  id: string;
  name: string;
  price: number;
  default?: boolean;
}

export interface Category {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedModifiers: {
    [modifierId: string]: ModifierOption;
  };
  totalPrice: number;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  workingHours: {
    [day: string]: {
      open: string;
      close: string;
    };
  };
  imageUrl?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  status: 'new' | 'processing' | 'ready' | 'completed' | 'cancelled';
  location: Location;
  pickupTime?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name?: string;
  phone?: string;
  bonusPoints?: number;
  favoriteProducts?: string[];
  orders?: Order[];
}

// Типы для Telegram WebApp
export interface TelegramUser {
  id: number | string;
  username?: string;
  firstName?: string;
  lastName?: string;
  languageCode?: string;
  isPremium?: boolean;
  [key: string]: any;
}

export interface TelegramInitDataUnsafe {
  user?: TelegramUser;
  queryId?: string;
  startParam?: string;
  authDate?: string;
  hash?: string;
  canSendAfter?: number;
  [key: string]: any;
}

export type TelegramButtonType = 'default' | 'ok' | 'close' | 'cancel' | 'destructive';

export interface TelegramButton {
  type: TelegramButtonType;
  text: string;
  id?: string;
}

export interface TelegramPopupParams {
  title?: string;
  message: string;
  buttons?: TelegramButton[];
}

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: TelegramInitDataUnsafe;
  version?: string;
  colorScheme?: 'light' | 'dark';
  themeParams?: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    [key: string]: any;
  };
  isExpanded?: boolean;
  viewportHeight?: number;
  viewportStableHeight?: number;
  headerColor?: string;
  backgroundColor?: string;
  BackButton?: {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
  MainButton?: {
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    text: string;
    color: string;
    textColor: string;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive?: boolean) => void;
    hideProgress: () => void;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
  };
  ready: () => void;
  expand: () => void;
  close: () => void;
  showAlert: (message: string, callback?: () => void) => void;
  showConfirm: (message: string, callback: (confirmed: boolean) => void) => void;
  showPopup: (params: TelegramPopupParams, callback?: (buttonId: string) => void) => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  showProgress: () => void;
  stopProgress: () => void;
  isVersionAtLeast: (version: string) => boolean;
  setTooltipPosition: (x: number, y: number) => void;
  [key: string]: any;
} 