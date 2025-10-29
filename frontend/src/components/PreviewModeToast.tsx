import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { isMaybePresentation } from '@sanity/presentation-comlink';

export interface PreviewModeToastProps {
  enabled?: boolean;
}

export default function PreviewModeToast({ enabled = false }: PreviewModeToastProps) {
  const [isInPresentation, setIsInPresentation] = useState(true);

  useEffect(() => {
    // Check if we're in the Presentation Tool iframe
    setIsInPresentation(isMaybePresentation());
  }, []);

  useEffect(() => {
    // Only show toast if draft mode is enabled AND not in Presentation Tool
    if (!enabled || isInPresentation) return;

    // Show persistent toast when draft mode is enabled
    const toastId = toast('Draft Mode Enabled', {
      duration: Infinity,
      action: {
        label: 'Disable',
        onClick: async () => {
          // Call the disable endpoint
          await fetch('/api/draft/disable');
          // Reload the page to clear the cookie and exit draft mode
          window.location.reload();
        },
      },
    });

    // Cleanup: dismiss toast when component unmounts or draft mode is disabled
    return () => {
      toast.dismiss(toastId);
    };
  }, [enabled, isInPresentation]);

  return <Toaster position="bottom-right" />;
}
