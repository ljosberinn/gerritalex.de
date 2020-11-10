import { useState, useRef, useEffect } from 'react';

type ChoiceResult = {
  outcome: 'accepted' | 'dismissed';
};

type BeforeInstallPromptEvent = {
  prompt: () => void;
  userChoice: Promise<ChoiceResult>;
} & Event;

let deferredPrompt: BeforeInstallPromptEvent;
let prompted = false;

type UsePWAInstallReturn = {
  isReady: boolean;
  trigger: (onAccepted?: () => void, onDismissed?: () => void) => Promise<void>;
};

export const usePwaInstall = (): UsePWAInstallReturn => {
  const promptRef = useRef<BeforeInstallPromptEvent | null>(null);
  const [isReady, setIsReady] = useState(Boolean(deferredPrompt));

  const triggerInstallPrompt = async (
    onAccepted?: () => void,
    onDismissed?: () => void,
  ) => {
    setIsReady(false);
    prompted = true;

    if (promptRef.current) {
      promptRef.current.prompt();

      try {
        const choice = await promptRef.current.userChoice;

        if (choice.outcome === 'accepted') {
          if (typeof onAccepted === 'function') {
            onAccepted();
          }
        } else if (typeof onDismissed === 'function') {
          onDismissed();
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      promptRef.current = e as BeforeInstallPromptEvent;
      deferredPrompt = promptRef.current;

      setIsReady(true);
    };

    if (!isReady && !prompted) {
      window.addEventListener('beforeinstallprompt', handler);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [isReady]);

  return {
    isReady,
    trigger: triggerInstallPrompt,
  };
};
