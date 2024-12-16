import Card from "./Card";

export default function ResultSection({ datas, children }) {
  return (
    <>
      {children}
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
        {datas?.length ? (
          datas.map((data) => <Card key={data.id} data={data}></Card>)
        ) : (
          <h3>Nessun risultato trovato</h3>
        )}
      </div>
    </>
  );
}
