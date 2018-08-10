export interface ScriptOptions {
  id?: string

  [K: string]: any
}

export default function loadScript(scriptUrl: string, options?: ScriptOptions): Promise<void> {
  options = options || {};
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = scriptUrl;
    Object.keys(options as {}).forEach((key: string) => {
      script.setAttribute(key, options![key]);
    });
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (error: ErrorEvent) => reject(error);
    document.body.appendChild(script);
  });
}
