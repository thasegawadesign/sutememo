import SettingsDrawer from '@/components/settings-drawer';

export default function Settings() {
  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 z-[9999] h-[100vh] w-full">
        <SettingsDrawer />
      </div>
    </>
  );
}
