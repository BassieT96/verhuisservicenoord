import type { SchemaTypeDefinition } from 'sanity'

import { dienstType } from './dienst'
import { reviewType } from './review'
import { siteSettingsType } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [dienstType, reviewType, siteSettingsType],
}
