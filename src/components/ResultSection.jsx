import Card from "./Card";

export default function ResultSection({ display, datas, children }) {
  let isVisibleClass = display ? "d-block " : "d-none ";
  return (
    <section className={`mb-5 ${isVisibleClass}`}>
      {children}
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
        {datas?.length ? (
          datas.map((data) => <Card key={data.id} data={data}></Card>)
        ) : (
          <h3 className="h5 text-light">Nessun risultato trovato</h3>
        )}
      </div>
    </section>
  );
}
