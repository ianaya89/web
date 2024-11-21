export const metaDescriptions = str => {
  return [
    {
      hid: 'description',
      name: 'description',
      content: str
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: str
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: str
    }
  ]
}
export const metaTitles = str => {
  return [
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: str + ' - SPONSOR.ONLINE'
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: str + ' - SPONSOR.ONLINE'
    }
  ]
}
