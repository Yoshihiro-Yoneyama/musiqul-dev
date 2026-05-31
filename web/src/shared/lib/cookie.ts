export function setCookie(name: string, value: string, path = "/"): void {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=${path}; SameSite=Strict`;
}

export function getCookie(name: string): string | undefined {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1]
    ?.split(";")[0]
    .replace(/%([0-9A-F]{2})/gi, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
}

export function deleteCookie(name: string, path = "/"): void {
  document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
