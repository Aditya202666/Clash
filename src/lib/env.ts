class Env {
  static get BACKEND_URL(): string {
    const url = process.env.NEXT_PUBLIC_BACKEND_APP_URL;
    if (!url) throw new Error("Missing BACKEND_APP_URL in environment variables");
    return url;
  }

  static get APP_URL(): string {
    const url = process.env.APP_URL;
    if (!url) throw new Error("Missing APP_URL in environment variables");
    return url;
  }
}

export default Env;