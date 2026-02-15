import { CmsContentPageSection } from "@/components/sections/CmsContentPage";
import { SanityEmptyState } from "@/components/sections/SanityEmptyState";
import { createPageMetadata } from "@/lib/seo";
import { getCmsContentPage, getCmsSiteSettings } from "@/sanity/lib/content";

const slug = "spoedverhuizing";

export async function generateMetadata() {
  const page = await getCmsContentPage(slug);
  if (!page) {
    return createPageMetadata({
      title: "Spoedverhuizing",
      description: "Vul de spoedpagina in Sanity.",
      path: `/${slug}`,
    });
  }

  return createPageMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: `/${slug}`,
  });
}

export default async function SpoedverhuizingPage() {
  const [page, settings] = await Promise.all([getCmsContentPage(slug), getCmsSiteSettings()]);
  if (!page || !settings) return <SanityEmptyState pageName="Spoedverhuizing" />;

  return <CmsContentPageSection page={page} settings={settings} />;
}
