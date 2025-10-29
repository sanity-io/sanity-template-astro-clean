import { useEffect, useRef, useState } from 'react';
import type { HistoryAdapterNavigate, VisualEditingOptions } from '@sanity/visual-editing';
import { enableVisualEditing } from '@sanity/visual-editing';

export interface VisualEditingProps extends Omit<VisualEditingOptions, 'history' | 'refresh'> {
  enabled?: boolean;
}

export default function VisualEditingComponent(props: VisualEditingProps) {
  const { enabled = true, zIndex } = props;
  const [navigate, setNavigate] = useState<HistoryAdapterNavigate | undefined>();
  const lastUrlRef = useRef<string>('');

  useEffect(() => {
    if (!enabled) return;

    const disable = enableVisualEditing({
      zIndex,
      refresh: () => {
        return new Promise((resolve) => {
          window.location.reload();
          resolve();
        });
      },
      history: {
        subscribe: (_navigate) => {
          setNavigate(() => _navigate);
          return () => setNavigate(undefined);
        },
        update: (update) => {
          if (update.type === 'push' || update.type === 'replace') {
            window.history[update.type === 'push' ? 'pushState' : 'replaceState'](
              null,
              '',
              update.url
            );
          } else if (update.type === 'pop') {
            window.history.back();
          }
        },
      },
    });

    return () => disable();
  }, [enabled, zIndex]);

  // Track URL changes and notify Presentation Tool
  useEffect(() => {
    if (!navigate) return;

    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    // Notify immediately on mount if URL is different
    if (lastUrlRef.current !== currentUrl) {
      lastUrlRef.current = currentUrl;
      navigate({
        type: 'push',
        url: currentUrl,
      });
    }

    // Listen for popstate (back/forward navigation)
    const handlePopState = () => {
      const newUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (lastUrlRef.current !== newUrl) {
        lastUrlRef.current = newUrl;
        navigate({
          type: 'push',
          url: newUrl,
        });
      }
    };

    // Listen for click events on links to detect navigation
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.href) {
        // Use setTimeout to allow the navigation to happen first
        setTimeout(() => {
          const newUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
          if (lastUrlRef.current !== newUrl) {
            lastUrlRef.current = newUrl;
            navigate({
              type: 'push',
              url: newUrl,
            });
          }
        }, 0);
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleClick, true);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick, true);
    };
  }, [navigate]);

  return null;
}
