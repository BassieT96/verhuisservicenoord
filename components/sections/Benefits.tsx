import { Reveal } from "@/components/animations/Reveal";
import { Card } from "@/components/ui/Card";
import { BoxIcon, ClockIcon, RouteIcon, ShieldIcon } from "@/components/ui/icons";
import styles from "@/components/sections/sections.module.css";
import layoutStyles from "@/components/layout/layout.module.css";

const benefits = [
  {
    title: "Regionale ervaring",
    text: "Onze planners kennen de routes, laadplekken en timing in Friesland tot in detail.",
    backTitle: "Wat merkt u daarvan?",
    backText:
      "Minder verrassingen op de verhuisdag, realistische tijdvakken en een team dat meteen weet hoe het op locatie werkt.",
    icon: RouteIcon,
  },
  {
    title: "Verzekerd vervoer",
    text: "Uw inboedel wordt zorgvuldig behandeld en professioneel beschermd tijdens transport.",
    backTitle: "Extra zekerheid",
    backText:
      "Van kwetsbare stukken tot grote meubels: alles wordt veilig verpakt, vervoerd en gecontroleerd opgeleverd.",
    icon: ShieldIcon,
  },
  {
    title: "Strakke planning",
    text: "U ontvangt vooraf een heldere planning met vaste contactpersoon en duidelijke tijden.",
    backTitle: "Rust in uw hoofd",
    backText:
      "U weet vooraf wie er komt, wanneer we starten en hoe de dag verloopt. Dat geeft overzicht en vertrouwen.",
    icon: ClockIcon,
  },
  {
    title: "Volledige ontzorging",
    text: "Van inpakken en demontage tot plaatsing op locatie: wij regelen het complete traject.",
    backTitle: "Alles geregeld",
    backText:
      "Wij nemen het zware en praktische werk uit handen, zodat u zich kunt richten op uw nieuwe plek.",
    icon: BoxIcon,
  },
] as const;

export function Benefits() {
  return (
    <section className={layoutStyles.section} aria-labelledby="waarom-vsn">
      <div className={layoutStyles.container}>
        <div className={styles.sectionHeading}>
          <h2 id="waarom-vsn">Waarom Verhuisservice Noord</h2>
          <p>
            Wij combineren Friese nuchterheid met professioneel verhuiswerk. Dat levert rust, tempo en
            vertrouwen op voor uw verhuizing.
          </p>
        </div>

        <div className={styles.benefitGrid}>
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 70} className={styles.benefitCard}>
                <div className={styles.flipCard} tabIndex={0}>
                  <div className={styles.flipCardInner}>
                    <Card className={styles.flipCardFront}>
                      <span className={styles.iconWrap}>
                        <Icon width={20} height={20} />
                      </span>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </Card>
                    <Card className={styles.flipCardBack}>
                      <h3>{item.backTitle}</h3>
                      <p>{item.backText}</p>
                    </Card>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
