export const isUpdateFound = async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  const searchUpdate = async () => {
    if (registration) {
      registration.addEventListener('updatefound', () => {
        console.log('サービスワーカーの更新版が見つかりました。');
        return true;
      });
    }
    return false;
  };
  return await searchUpdate();
};
