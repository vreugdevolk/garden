import { formatDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

const growthStages: Record<string, { label: string; tooltip: string }> = {
  seedling: {
    label: "Kiem",
    tooltip: "Een pril idee — net geplant, nog niet uitgewerkt",
  },
  budding: {
    label: "In bloei",
    tooltip: "Groeit en krijgt vorm, maar is nog niet af",
  },
  evergreen: {
    label: "Groenblijver",
    tooltip: "Uitgegroeid en regelmatig bijgehouden",
  },
}

export const growthTagNames = Object.keys(growthStages)

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

    if (text) {
      const segments: (string | JSX.Element)[] = []

      // Growth status from tags
      const tags = fileData.frontmatter?.tags ?? []
      const growthTag = tags.find((t: string) => t in growthStages)
      if (growthTag) {
        const stage = growthStages[growthTag]
        segments.push(
          <span class={`growth-status ${growthTag}`} data-tooltip={stage.tooltip} tabindex={0}>
            {stage.label}
          </span>,
        )
      }

      // Garden dates: "Gezaaid op" (created) and "Laatst gewied op" (modified)
      if (fileData.dates) {
        const created = fileData.dates.created
        const modified = fileData.dates.modified
        if (created) {
          segments.push(
            <span>
              Gezaaid op{" "}
              <time datetime={created.toISOString()}>{formatDate(created, cfg.locale)}</time>
            </span>,
          )
        }
        if (modified && created && modified.getTime() !== created.getTime()) {
          segments.push(
            <span>
              laatst gewied op{" "}
              <time datetime={modified.toISOString()}>{formatDate(modified, cfg.locale)}</time>
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
