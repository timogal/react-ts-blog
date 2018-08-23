export interface ScriptOptions {
  id?: string

  [K: string]: any
}

export default function loadScript(scriptUrl: string, options?: ScriptOptions): Promise<void> {
  options = options || {};
  return new Promise<void>((resolve, reject) => {
    let script: HTMLScriptElement | null;
    // 检查是否存在
    if (options!.id) {
      script = document.getElementById(options!.id!) as HTMLScriptElement;
      if (script) {
        resolve();
        return;
      }
    }
    script = document.createElement('script');
    script.src = scriptUrl;
    Object.keys(options as {}).forEach((key: string) => {
      script!.setAttribute(key, options![key]);
    });
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (error: ErrorEvent) => reject(error);
    document.body.appendChild(script);
  });
}
