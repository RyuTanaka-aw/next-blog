import { getAllCategories, getAllPostsByCategory } from "lib/api";
import Container from "components/container";
import PostHeader from "components/post-header";
import { eyecatchLocal } from "lib/constants";
import Posts from 'components/posts'

// サイトに関する情報
import { siteMeta } from 'lib/constants'
const { siteTitle, siteUrl } = siteMeta

// ベースのメタデータ
import { openGraphMetadata, twitterMetadata } from 'lib/baseMetadata'

export default async function Category({ params }) {
  const catSlug = params.slug

  const allCats = await getAllCategories()
  const cat = allCats.find(({slug}) => slug === catSlug)
  const name = cat.name

  const posts = await getAllPostsByCategory(cat.id)

  for(const post of posts) {
    if(!post.hasOwnProperty('eyecatch')) {
      post.eyecatch = eyecatchLocal
    }
  }


  return (
    <Container>
      <PostHeader title={name} subtitle="Blog Category" />
      <Posts posts={posts} />
    </Container>
  )
}

// export const dynamicParams = false
// export async function generateStaticParams() {
//   const allCats = await getAllCategories()

//   return allCats.map(({slug}) => {
//     return { slug: slug }
//   })
// }

// メタデータ
export async function generateMetadata({params}) {
  const catSlug = params.slug
  const allSlugs = await getAllCategories()
  const cat = allSlugs.find(({slug}) => slug === catSlug)
  const pageTitle = cat.name
  const pageDesc = `${cat.name}に関する記事`
  const ogpTitle = `${pageTitle} | ${siteTitle}`
  const ogpUrl = new URL(`/blog/category/${catSlug}`, siteUrl).toString()

  const metadata = {
    title: pageTitle,
    description: pageDesc,
    openGraph: {
      ...openGraphMetadata,
      title: ogpTitle,
      description: pageDesc,
      url: ogpUrl,
    },
    twitter: {
      ...twitterMetadata,
      title: ogpTitle,
      description: pageDesc
    }
  }

  return metadata
}