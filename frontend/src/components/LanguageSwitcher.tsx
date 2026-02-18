import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { SUPPORTED_LOCALES } from "../services/locale";
import type { Locale } from "../services/locale";

type Props = {
  locale: Locale;
  onChange: (l: Locale) => void;
};

const labels: Record<Locale, string> = {
  en: "English",
  ja: "日本語",
};

const LanguageSwitcher: React.FC<Props> = ({ locale, onChange }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const [pos, setPos] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    if (!open) return;
    const btn = triggerRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    setPos({
      top: r.bottom + window.scrollY + 8,
      left: r.left + window.scrollX,
      width: r.width,
    });
  }, [open]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (!menuRef.current) return;
    const items = Array.from(
      menuRef.current.querySelectorAll<HTMLLIElement>("[role=option]"),
    );
    const idx = items.findIndex((it) => it.getAttribute("data-loc") === locale);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = items[(idx + 1) % items.length];
      next?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = items[(idx - 1 + items.length) % items.length];
      prev?.focus();
    } else if (e.key === "Enter") {
      const focused = document.activeElement as HTMLElement | null;
      const loc = focused?.getAttribute("data-loc");
      if (loc) {
        onChange(loc as Locale);
        setOpen(false);
      }
    }
  };

  const menu = (
    <ul
      ref={menuRef}
      role="listbox"
      aria-label="Language selector"
      tabIndex={-1}
      onKeyDown={handleKeyNav}
      className="flex flex-col gap-1 bg-white rounded-md shadow-lg border border-solid border-gray-200 p-1"
      style={{
        position: "absolute",
        top: pos?.top ?? 0,
        left: pos?.left ?? 0,
        minWidth: pos?.width ?? 160,
        zIndex: 10,
      }}
    >
      {SUPPORTED_LOCALES.map((l) => (
        <li
          key={l}
          role="option"
          tabIndex={0}
          data-loc={l}
          onClick={() => {
            onChange(l);
            setOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onChange(l);
              setOpen(false);
            }
          }}
          className={`px-4 py-2 cursor-pointer flex items-center gap-3 text-sm ${l === locale ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
        >
          <span className="shrink-0 w-6 text-xs font-medium text-gray-500">
            {l.toUpperCase()}
          </span>
          <span className="truncate">{labels[l]}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        onClick={toggle}
        aria-haspopup
        aria-expanded={open}
        className="inline-flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="text-sm">{labels[locale]}</span>
        <svg
          className="w-4 h-4 text-gray-500"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M6 8l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && typeof document !== "undefined"
        ? createPortal(menu, document.body)
        : null}
    </div>
  );
};

export default LanguageSwitcher;
