import { CmsContentPageSection } from "@/components/sections/CmsContentPage";
import { SanityEmptyState } from "@/components/sections/SanityEmptyState";
import { createPageMetadata } from "@/lib/seo";
import { getCmsContentPage, getCmsSiteSettings } from "@/sanity/lib/content";

const slug = "contact";

export async function generateMetadata() {
  const page = await getCmsContentPage(slug);
  if (!page) {
    return createPageMetadata({
      title: "Contact",
      description: "Vul de contactpagina in Sanity.",
      path: `/${slug}`,
    });
  }

  return createPageMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: `/${slug}`,
  });
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getCmsContentPage(slug), getCmsSiteSettings()]);
  if (!page || !settings) return <SanityEmptyState pageName="Contact" />;

  return <CmsContentPageSection page={page} settings={settings} />;
}
