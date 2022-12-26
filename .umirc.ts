import { defineConfig } from "umi";

export default defineConfig({
  npmClient: "npm",
  plugins: ["@umijs/plugins/dist/locale"],
  locale: {
    antd: true,
    baseNavigator: true,
    baseSeparator: "-",
    default: "zh-CN",
    title: false,
    useLocalStorage: true,
  },
  title: "Boating",
  favicons: ["favicon.ico"],
  metas: [
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    {
      name: "apple-touch-fullscreen",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
    { name: "apple-mobile-web-app-title", content: "Boating" },
    { name: "application-name", content: "Boating" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    { name: "apple-mobile-web-app-orientations", content: "portrait-any" },
    { name: "theme-color", content: "#ffffff" },
    { name: "msapplication-TileColor", content: "#ffffff" },
    { name: "msapplication-starturl", content: "/" },
    { name: "format-detection", content: "telephone=no" },
    { name: "format-detection", content: "address=no" },
  ],
  links: [
    {
      rel: "manifest",
      href: "/manifest.json",
    },
    {
      rel: "prefetch",
      href: "/manifest.json",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    {
      rel: "mask-icon",
      href: "/safari-pinned-tab.svg",
      color: "#f3a458",
    },
    {
      rel: "shortcut icon",
      sizes: "196x196",
      href: "/android-chrome-192x192.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "192x192",
      href: "/android-chrome-192x192.png",
    },
    {
      rel: "shortcut icon",
      sizes: "512x512",
      href: "/android-chrome-512x512.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "512x512",
      href: "/android-chrome-512x512.png",
    },
  ],
  // scripts: [
  //   `
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker.register('./service-worker.js')
  //   }
  //   `,
  // ],
  copy: [{ from: "src/assets/pwa", to: "dist" }],
});
