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
      <div className="custom-card rounded-1 h-100">
        <div className="overlay text-center text-light px-3 flex-column align-items-center p-3 ">
          <h5 className="">{data.title}</h5>
          <span
            className={`lang-icon flex-shrink-0 lang-icon-${data.language}`}
          ></span>
          <h6>Original Title: {data.original_title}</h6>
          <div>
            {printStars(data.rating).map((star, index) =>
              star ? (
                <i key={index} className="fa-solid fa-star" />
              ) : (
                <i key={index} className="fa-regular fa-star" />
              )
            )}
          </div>
          <p>{data.overview}</p>
        </div>
        <div className="img-container h-100">
          <img className="img-fluid h-100" src={data.img} alt="" />
        </div>
      </div>
    </div>
  );
}
