export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  deferredPrompt: BeforeInstallPromptEvent | null;
  prompt(): Promise<void>;
}
