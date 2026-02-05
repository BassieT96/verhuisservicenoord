import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function NotFound() {
  return (
    <Container section>
      <Card>
        <h1>Pagina niet gevonden</h1>
        <p>Deze pagina bestaat niet meer of is verplaatst. Ga terug naar de homepage of neem contact op.</p>
        <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
          <ButtonLink href="/">Naar home</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Naar contact
          </ButtonLink>
        </div>
      </Card>
    </Container>
  );
}
