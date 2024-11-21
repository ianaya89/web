import { metaDescriptions, metaTitles } from '@/services/seo'

describe('seo', () => {
  it('metaTitles', () => {
    expect(metaTitles('title')).toEqual([
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'title - SPONSOR.ONLINE'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'title - SPONSOR.ONLINE'
      }
    ])
  })

  it('metaDescriptions', () => {
    expect(metaDescriptions('description')).toEqual([
      {
        hid: 'description',
        name: 'description',
        content: 'description'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'description'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'description'
      }
    ])
  })
})
