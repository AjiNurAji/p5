export const checkIsActive = (url: string, href: string, mainNav = false): boolean => {
  const spliting = href.split("/").filter(Boolean).pop();
  const location = url.split("/").filter(Boolean).pop();

  const mainLocation = url.split("/")[1];

  return spliting === location || (mainNav && href.includes(mainLocation));
}