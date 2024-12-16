export default function Card({ data }) {
  const printStars = (rating) => {
    let resultStars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        resultStars.push(true);
      } else resultStars.push(false);
    }

    return resultStars;
  };

  return (
    <div className="col">
      <div className="card h-100">
        <img className="img-fluid" src={data.img} alt="" />
        {/* <ul key={data.id}>
          <li>{data.title}</li>
          <li>{data.original_title}</li>
          <li>
            <span className={`lang-icon lang-icon-${data.language}`}></span>
          </li>
          <li>
            {printStars(data.rating).map((star, index) =>
              star ? (
                <i key={index} className="fa-solid fa-star" />
              ) : (
                <i key={index} className="fa-regular fa-star" />
              )
            )}
          </li>
          <li>
            <img className="img-fluid" src={data.img} alt="" />
          </li>
        </ul> */}
      </div>
    </div>
  );
}
