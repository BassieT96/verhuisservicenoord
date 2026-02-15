import { CmsContentPageSection } from "@/components/sections/CmsContentPage";
import { SanityEmptyState } from "@/components/sections/SanityEmptyState";
import { createPageMetadata } from "@/lib/seo";
import { getCmsContentPage, getCmsSiteSettings } from "@/sanity/lib/content";

const slug = "zakelijk-verhuizen";

export async function generateMetadata() {
  const page = await getCmsContentPage(slug);
  if (!page) {
    return createPageMetadata({
      title: "Zakelijk verhuizen",
      description: "Vul de zakelijke pagina in Sanity.",
      path: `/${slug}`,
    });
  }

  return createPageMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: `/${slug}`,
  });
}

export default async function ZakelijkVerhuizenPage() {
  const [page, settings] = await Promise.all([getCmsContentPage(slug), getCmsSiteSettings()]);
  if (!page || !settings) return <SanityEmptyState pageName="Zakelijk verhuizen" />;

  return <CmsContentPageSection page={page} settings={settings} />;
}
