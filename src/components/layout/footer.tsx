'use client';

import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-muted py-6">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        {year && <p>&copy; {year} VetPet Haven. Todos los derechos reservados.</p>}
      </div>
    </footer>
  );
}
