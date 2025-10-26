import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Cấu hình Quartz 4 cho website cá nhân
 * Tham khảo thêm: https://quartz.jzhao.xyz/configuration
 */

const config: QuartzConfig = {
  configuration: {
    // 🏷️ Tiêu đề trang hiển thị ở tab trình duyệt
    pageTitle: "Idm Bull",
    pageTitleSuffix: "Ghi chú của Idm",

    // ⚙️ Cài đặt cơ bản
    enableSPA: true,             // Giữ nguyên (trải nghiệm mượt hơn)
    enablePopovers: true,        // Bật popover khi hover link
    analytics: {
      provider: "plausible",     // Có thể bỏ qua nếu không dùng
    },
    locale: "vi-VN",             // Ngôn ngữ trang
    baseUrl: "idmbull.github.io",  // Đặt domain GitHub Pages của bạn
    ignorePatterns: ["private", "templates", ".obsidian"],

    // 🕓 Kiểu ngày mặc định (hiển thị ngày sửa cuối)
    defaultDateType: "modified",

    // 🎨 Chủ đề & giao diện
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Source Sans Pro",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#ffffff",
          lightgray: "#e5e7eb",
          gray: "#9ca3af",
          darkgray: "#374151",
          dark: "#111827",
          secondary: "#2563eb", // xanh dịu
          tertiary: "#f59e0b",  // cam nhẹ
          highlight: "rgba(37, 99, 235, 0.1)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#111827",
          lightgray: "#374151",
          gray: "#9ca3af",
          darkgray: "#d1d5db",
          dark: "#f9fafb",
          secondary: "#60a5fa",
          tertiary: "#fbbf24",
          highlight: "rgba(96, 165, 250, 0.1)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },

  // 🔌 Không cần đổi phần này nếu bạn chưa rành
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: { light: "github-light", dark: "github-dark" },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({ enableSiteMap: true, enableRSS: true }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
