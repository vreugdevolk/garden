import { formatDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

const growthLabels: Record<string, string> = {
  seedling: "Kiem",
  budding: "In bloei",
  evergreen: "Groenblijver",
}

interface ContentMetaOptions {
  showReadingTime: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text

    // Skip garden metadata on folder index pages
    const slug = fileData.slug ?? ""
    const isFolderIndex = slug === "index" || slug.endsWith("/index")

    if (text && !isFolderIndex) {
      const segments: (string | JSX.Element)[] = []

      // Growth status from tags
      const tags = fileData.frontmatter?.tags ?? []
      const growthTag = tags.find((t: string) => t in growthLabels)
      if (growthTag) {
        segments.push(<span class={`growth-status ${growthTag}`}>{growthLabels[growthTag]}</span>)
      }

      // Garden dates: "Gezaaid op" (created) and "Laatst gewied op" (modified)
      if (fileData.dates) {
        const created = fileData.dates.created
        const modified = fileData.dates.modified
        // Ensure created is the earlier date
        const planted = created && modified && modified < created ? modified : created
        const tended = created && modified && modified < created ? created : modified
        if (planted) {
          segments.push(
            <span>
              Gezaaid op{" "}
              <time datetime={planted.toISOString()}>{formatDate(planted, cfg.locale)}</time>
            </span>,
          )
        }
        if (tended && planted && tended.getTime() !== planted.getTime()) {
          segments.push(
            <span>
              laatst gewied op{" "}
              <time datetime={tended.toISOString()}>{formatDate(tended, cfg.locale)}</time>
            </span>,
          )
        }
      }

      return (
        <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
          {segments}
        </p>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor
