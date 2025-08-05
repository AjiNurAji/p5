export const CheckIsActive = (url: string, href: string): boolean => {
  const spliting = href.split("/");

  return url.includes(spliting[spliting.length - 1]);
}