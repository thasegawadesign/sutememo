export const updateMetaThemeColor = (colorCode: string) => {
  const metaThemeColorElement = document.head.querySelector(
    '[name="theme-color"]',
  ) as HTMLMetaElement;
  updateMetaThemeColorContent(metaThemeColorElement, colorCode);
};

function updateMetaThemeColorContent(
  metaThemeColorElement: HTMLMetaElement,
  resultColorCode: string,
) {
  if (!metaThemeColorElement) {
    const metaElement = document.createElement('meta');
    metaElement.setAttribute('name', 'theme-color');
    metaElement.content = resultColorCode;
    document.head.appendChild(metaElement);
  } else {
    metaThemeColorElement.content = resultColorCode;
  }
}
