import { ButtonExternal, ButtonLink } from "@/components/ui/Button";
import { FileTextIcon, MessageCircleIcon, PhoneIcon } from "@/components/ui/icons";
import styles from "@/components/layout/layout.module.css";

type MobileBarProps = {
  phoneHref: string;
  whatsappHref: string;
};

export function MobileBar({ phoneHref, whatsappHref }: MobileBarProps) {
  return (
    <div className={styles.mobileBar} aria-label="Snelle acties mobiel">
      <ButtonExternal href={phoneHref} variant="secondary" dataTrackEvent="mobile_bar_click" dataTrackLabel="bel">
        <PhoneIcon width={18} height={18} />
        Bel
      </ButtonExternal>
      <ButtonLink href="/contact#offerte" dataTrackEvent="mobile_bar_click" dataTrackLabel="offerte">
        <FileTextIcon width={18} height={18} />
        Offerte
      </ButtonLink>
      <ButtonExternal
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        variant="secondary"
        dataTrackEvent="mobile_bar_click"
        dataTrackLabel="whatsapp"
        className={styles.mobileBarOptional}
      >
        <MessageCircleIcon width={18} height={18} />
        WhatsApp
      </ButtonExternal>
    </div>
  );
}
