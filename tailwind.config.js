/** @type {import('tailwindcss').Config} */
export default {
  // 扫描所有 Vue/JS/TS 文件，确保 Tailwind 类名生效
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
