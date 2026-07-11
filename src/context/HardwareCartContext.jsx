import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {useCatalog} from './CatalogContext';

const HardwareCartContext = createContext(null);
const STORAGE_KEY = 'infoaxon_pos_builder';
const LEGACY_CART_KEY = 'infoaxon_hardware_cart';
const STATE_VERSION = 2;

function loadBuilderState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (stored && Array.isArray(stored.items)) {
      return {
        version: STATE_VERSION,
        items: stored.items,
        purchaseType: stored.purchaseType || 'complete',
        selectedPlanId: stored.version === STATE_VERSION && typeof stored.selectedPlanId === 'string' ? stored.selectedPlanId : null,
      };
    }

    const legacyItems = JSON.parse(
      localStorage.getItem(LEGACY_CART_KEY) || '[]'
    );
    return {
      version: STATE_VERSION,
      items: Array.isArray(legacyItems) ? legacyItems : [],
      purchaseType: 'complete',
      selectedPlanId: null,
    };
  } catch {
    return {
      version: STATE_VERSION,
      items: [],
      purchaseType: 'complete',
      selectedPlanId: null,
    };
  }
}

export function HardwareCartProvider({ children }) {
  const {products:hardwareProducts}=useCatalog();
  const [builderState, setBuilderState] = useState(loadBuilderState);
  const { items, purchaseType, selectedPlanId } = builderState;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(builderState));
  }, [builderState]);

  const setPurchaseType = (value) => {
    setBuilderState((current) => ({ ...current, purchaseType: value }));
  };

  const setSelectedPlanId = (value) => {
    setBuilderState((current) => ({ ...current, selectedPlanId: value }));
  };

  const addItem = (productId, quantity = 1) => {
    setBuilderState((current) => {
      const existing = current.items.find(
        (item) => item.productId === productId
      );
      const nextItems = existing
        ? current.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...current.items, { productId, quantity }];

      return { ...current, items: nextItems };
    });
  };

  const updateQuantity = (productId, quantity) => {
    const safeQuantity = Math.max(1, Number(quantity) || 1);
    setBuilderState((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: safeQuantity }
          : item
      ),
    }));
  };

  const removeItem = (productId) => {
    setBuilderState((current) => ({
      ...current,
      items: current.items.filter((item) => item.productId !== productId),
    }));
  };

  const clearCart = () => {
    setBuilderState((current) => ({ ...current, items: [], selectedPlanId: null }));
  };

  const cartItems = useMemo(
    () =>
      items
        .map((item) => ({
          ...item,
          product: hardwareProducts.find(
            (product) => product.id === item.productId
          ),
        }))
        .filter((item) => item.product),
    [items]
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <HardwareCartContext.Provider
      value={{
        items,
        cartItems,
        subtotal,
        itemCount,
        purchaseType,
        selectedPlanId,
        setPurchaseType,
        setSelectedPlanId,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </HardwareCartContext.Provider>
  );
}

export function useHardwareCart() {
  const context = useContext(HardwareCartContext);
  if (!context) {
    throw new Error(
      'useHardwareCart must be used within HardwareCartProvider'
    );
  }
  return context;
}
