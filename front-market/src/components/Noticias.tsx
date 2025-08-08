interface Noticias {
  titulo: string;
  descripcion: string;
  fecha: string;
  url: string;
}

interface NoticiasProps {
  noticias: Noticias[];
}

export default function Noticias({ noticias }: NoticiasProps) {
  return (
    <div>
      {noticias.length === 0 ? (
        <p className="text-center text-gray-500">
          {" "}
          No hay noticias disponibles
        </p>
      ) : (
        noticias.map((noticia, index) => (
          <div key={index} className="border rounded-lg p-4 m-2 shadow-lg">
            <h2 className="text-xl font-bold mb-2">{noticia.titulo}</h2>
            <p className="text-gray-700 mb-2">{noticia.descripcion}</p>
            <p className="text-sm text-gray-500 mb-2">Fecha: {noticia.fecha}</p>
            <a href={noticia.url} className="text-blue-500 hover:underline">
              Leer más
            </a>
          </div>
        ))
      )}
    </div>
  );
}
