// @filename: models.ts
import { Models } from "@rematch/core"
import { posts } from "./models/posts"
import { ui } from "./models/ui"
import { pages } from "./models/page"
import { media } from "./models/media"
import { customPostTypes } from "./models/cpt"
import { taxonomies } from "./models/taxonomies"
 
export interface RootModel extends Models<RootModel> {
    posts: typeof posts
    pages: typeof pages,
    media: typeof media
    customPostTypes: typeof customPostTypes,
    taxonomies: typeof taxonomies,
    ui: typeof ui
}
 
export const models: RootModel = { posts, pages, ui, media, customPostTypes, taxonomies }