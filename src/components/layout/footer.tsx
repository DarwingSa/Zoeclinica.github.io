export default function Footer() {
  return (
    <footer className="bg-muted py-6">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} VetPet Haven. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
