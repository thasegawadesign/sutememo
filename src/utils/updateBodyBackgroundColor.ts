import { SafeColorList } from '@/types/ColorList';
import { bgVariants } from '@/utils/colorVariants';

export const updateBodyBackgroundColor = (backgroundColor: SafeColorList) => {
  const BODY = document.body;
  const bodyClassList = BODY.classList;
  let matchedClassName;
  const regEx = new RegExp(/^bg-/);
  bodyClassList.forEach((className) => {
    matchedClassName = className.match(regEx)?.input;
    BODY.classList.remove(String(matchedClassName));
  });
  BODY.classList.add(`${bgVariants[`${backgroundColor}`]}`);
};
