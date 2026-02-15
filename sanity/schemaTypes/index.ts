import type { SchemaTypeDefinition } from 'sanity'

import { contentPageType } from './contentPage'
import { dienstType } from './dienst'
import {
  areaItemType,
  benefitItemType,
  faqItemType,
  featureItemType,
  galleryItemType,
  highlightItemType,
  linkItemType,
  metricItemType,
  serviceCardItemType,
  stepItemType,
} from './objects'
import { reviewType } from './review'
import { siteSettingsType } from './siteSettings'
import { homePageType } from './homePage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    faqItemType,
    featureItemType,
    benefitItemType,
    linkItemType,
    galleryItemType,
    metricItemType,
    areaItemType,
    stepItemType,
    serviceCardItemType,
    highlightItemType,
    dienstType,
    reviewType,
    siteSettingsType,
    homePageType,
    contentPageType,
  ],
}
