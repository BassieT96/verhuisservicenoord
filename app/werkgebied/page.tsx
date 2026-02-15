import { CmsContentPageSection } from "@/components/sections/CmsContentPage";
import { SanityEmptyState } from "@/components/sections/SanityEmptyState";
import { createPageMetadata } from "@/lib/seo";
import { getCmsContentPage, getCmsHomePage, getCmsSiteSettings } from "@/sanity/lib/content";

const slug = "werkgebied";

export async function generateMetadata() {
  const page = await getCmsContentPage(slug);
  if (!page) {
    return createPageMetadata({
      title: "Werkgebied",
      description: "Vul de werkgebiedpagina in Sanity.",
      path: `/${slug}`,
    });
  }

  return createPageMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: `/${slug}`,
  });
}

export default async function WerkgebiedPage() {
  const [page, settings, home] = await Promise.all([getCmsContentPage(slug), getCmsSiteSettings(), getCmsHomePage()]);
  if (!page || !settings) return <SanityEmptyState pageName="Werkgebied" />;

  const areasBlock = home
    ? {
        heading: home.areasTitle,
        description: home.areasDescription,
        areas: home.areas,
      }
    : undefined;

  return <CmsContentPageSection page={page} settings={settings} areasBlock={areasBlock} />;
}
