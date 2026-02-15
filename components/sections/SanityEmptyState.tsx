import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";

type SanityEmptyStateProps = {
  pageName: string;
};

export function SanityEmptyState({ pageName }: SanityEmptyStateProps) {
  return (
    <Container section>
      <Card>
        <h1>Content ontbreekt in Sanity</h1>
        <p>
          Voor <strong>{pageName}</strong> is nog geen document gepubliceerd. Voeg content toe in de
          Studio om deze pagina live te vullen.
        </p>
        <p>
          <Link href="/studio">Open Sanity Studio</Link>
        </p>
      </Card>
    </Container>
  );
}
