module.exports = function (migration) {
  migration.deriveLinkedEntries({
    contentType: 'portfolioItem',
    from: ['title', 'image'],
    toReferenceField: 'portfolioImage',
    derivedContentType: 'imageWrapper',
    derivedFields: ['title', 'image'],
    identityKey: async (from) => {
      return from.title['en-US'].toLowerCase().replace(/ /g, '-')
    },
    deriveEntryForLocale: async (from, locale) => {
      return {
        title: from.title[locale],
        image: from.image[locale],
      }
    },
  })
}
