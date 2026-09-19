'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getProduct } from './catalog';

export interface CartLine {
  slug: string;
  size: string;
  qty: number;
}

interface StoreState {
  cart: CartLine[];
  wishlist: string[];
  drawerOpen: boolean;
  addToCart: (slug: string, size: string, qty?: number) => void;
  updateQty: (slug: string, size: string, qty: number) => void;
  removeLine: (slug: string, size: string) => void;
  toggleWishlist: (slug: string) => void;
  setDrawerOpen: (open: boolean) => void;
  cartCount: number;
  cartTotal: number;
}

const StoreContext = createContext<StoreState | null>(null);

const CART_KEY = 'lpb-cart';
const WISHLIST_KEY = 'lpb-wishlist';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const w = localStorage.getItem(WISHLIST_KEY);
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {
      /* stockage indisponible : panier en mémoire seulement */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch {
      /* idem */
    }
  }, [cart, wishlist, hydrated]);

  const addToCart = useCallback((slug: string, size: string, qty = 1) => {
    setCart((prev) => {
      const i = prev.findIndex((l) => l.slug === slug && l.size === size);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { slug, size, qty }];
    });
    setDrawerOpen(true);
  }, []);

  const updateQty = useCallback((slug: string, size: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.slug === slug && l.size === size))
        : prev.map((l) =>
            l.slug === slug && l.size === size ? { ...l, qty } : l,
          ),
    );
  }, []);

  const removeLine = useCallback((slug: string, size: string) => {
    setCart((prev) => prev.filter((l) => !(l.slug === slug && l.size === size)));
  }, []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  const { cartCount, cartTotal } = useMemo(() => {
    let count = 0;
    let total = 0;
    for (const l of cart) {
      const p = getProduct(l.slug);
      if (!p) continue;
      count += l.qty;
      total += p.price * l.qty;
    }
    return { cartCount: count, cartTotal: total };
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      drawerOpen,
      addToCart,
      updateQty,
      removeLine,
      toggleWishlist,
      setDrawerOpen,
      cartCount,
      cartTotal,
    }),
    [cart, wishlist, drawerOpen, addToCart, updateQty, removeLine, toggleWishlist, cartCount, cartTotal],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore doit être utilisé dans <StoreProvider>');
  return ctx;
}
