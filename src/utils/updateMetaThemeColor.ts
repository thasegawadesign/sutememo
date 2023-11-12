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
  metaThemeColorElement.content = resultColorCode;
}
