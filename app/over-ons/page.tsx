import { CmsContentPageSection } from "@/components/sections/CmsContentPage";
import { SanityEmptyState } from "@/components/sections/SanityEmptyState";
import { createPageMetadata } from "@/lib/seo";
import { getCmsContentPage, getCmsSiteSettings } from "@/sanity/lib/content";

const slug = "over-ons";

export async function generateMetadata() {
  const page = await getCmsContentPage(slug);
  if (!page) {
    return createPageMetadata({
      title: "Over ons",
      description: "Vul de over-ons pagina in Sanity.",
      path: `/${slug}`,
    });
  }

  return createPageMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: `/${slug}`,
  });
}

export default async function OverOnsPage() {
  const [page, settings] = await Promise.all([getCmsContentPage(slug), getCmsSiteSettings()]);
  if (!page || !settings) return <SanityEmptyState pageName="Over ons" />;

  return <CmsContentPageSection page={page} settings={settings} />;
}
