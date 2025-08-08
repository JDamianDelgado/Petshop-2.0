export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center text-gray-600 py-4 mt-auto text-sm">
      <p>
        © {new Date().getFullYear()} Mi Proyecto Next.js. Todos los derechos
        reservados.
      </p>
    </footer>
  );
}
