import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Cấu hình Quartz 4 cho website cá nhân
 * Tham khảo thêm: https://quartz.jzhao.xyz/configuration
 */

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Idm Bull",
    pageTitleSuffix: "Ghi chú của Idm",

    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "vi-VN",
    baseUrl: "idmbull.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],

    defaultDateType: "modified",

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
          secondary: "#2563eb",
          tertiary: "#f59e0b",
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
      Plugin.ObsidianFlavoredMarkdown({
        enableInHtmlEmbed: true,       // render footnote trong embed
        footnotes: true,               // bật footnote
        inlineFootnoteAsPopup: true,   // hiển thị inline footnote dưới dạng popup
      }),
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
