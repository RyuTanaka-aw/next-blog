import { extractText } from "lib/extract-text";
import Container from "components/container";
import PostHeader from "components/post-header";
import PostBody from "components/post-body";
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from 'components/two-column'
import ConvertBody from "components/convert-body";
import PostCategories from "components/post-categories";
import Image from "next/image";
import { Suspense } from 'react';

// ローカルの代替アイキャッチ画像
import { eyecatchLocal } from "lib/constants";
import { Kings } from 'next/font/google';


export default async function Post({ params, searchParams }) {

  const contentId = params.slug;
  const draftKey = searchParams.draftKey;

  const postData = await fetch(`https://${process.env.SERVICE_DOMAIN}.microcms.io/api/v1/blogs/${contentId}?draftKey=${draftKey}`, {headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY }}).then(res => res.json())
  
  const { title, publishDate: publish, content, categories } = postData

  const eyecatch = postData.eyecatch ?? eyecatchLocal

  return (
    <Container>
      <article>
        <PostHeader title={title} subtitle="Blog Article" publish={publish} />

        <figure>
          <Image
            src={eyecatch.url}
            alt=""
            width={eyecatch.width}
            height={eyecatch.height}
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </figure>

        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              <ConvertBody contentHTML={content} />
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar>
            <PostCategories categories={categories} />
          </TwoColumnSidebar>
        </TwoColumn>
      </article>
    </Container>
  )
}