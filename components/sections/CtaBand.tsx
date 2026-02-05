import { ButtonExternal, ButtonLink } from "@/components/ui/Button";
import { MessageCircleIcon, PhoneIcon } from "@/components/ui/icons";
import { Card } from "@/components/ui/Card";
import layoutStyles from "@/components/layout/layout.module.css";
import styles from "@/components/sections/sections.module.css";
import { siteConfig } from "@/lib/site";

type CtaBandProps = {
  title: string;
  text: string;
};

export function CtaBand({ title, text }: CtaBandProps) {
  return (
    <section className={layoutStyles.section}>
      <div className={layoutStyles.container}>
        <Card>
          <div className={styles.sectionHeading}>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className={styles.heroCtas}>
            <ButtonLink href="/contact#offerte">Vrijblijvende offerte</ButtonLink>
            <ButtonExternal href={siteConfig.phoneHref} variant="secondary">
              <PhoneIcon width={18} height={18} />
              Bel direct
            </ButtonExternal>
            <ButtonExternal href={siteConfig.whatsappHref} target="_blank" rel="noreferrer" variant="secondary">
              <MessageCircleIcon width={18} height={18} />
              WhatsApp
            </ButtonExternal>
          </div>
        </Card>
      </div>
    </section>
  );
}
