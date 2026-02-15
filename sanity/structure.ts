import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site-instellingen')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings'),
        ),
      S.listItem()
        .title('Homepage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage'),
        ),
      S.listItem()
        .title('Content pagina\'s')
        .child(S.documentTypeList('contentPage').title('Content pagina\'s')),
      S.listItem()
        .title('Diensten')
        .child(S.documentTypeList('dienst').title('Diensten')),
      S.listItem()
        .title('Reviews')
        .child(S.documentTypeList('review').title('Reviews')),
    ])
