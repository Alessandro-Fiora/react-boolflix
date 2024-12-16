import { useState } from "react";
const defaultFormData = {
  searchedWord: "",
};

export default function HomePage() {
  const [formData, setFormData] = useState(defaultFormData);

  const handleFormData = (e) => {
    const newValue = e.target.value;

    setFormData({
      searchedWord: newValue,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setFormData(defaultFormData);
  };

  return (
    <div className="container py-5">
      <h1>Home</h1>

      <div className="search-bar">
        <form onSubmit={handleFormSubmit}>
          <input
            id="search-input"
            onChange={handleFormData}
            value={formData.searchedWord}
            className="form-control"
            type="text"
            name="searchedWord"
          />
          <button className="btn btn-primary">Cerca</button>
        </form>
      </div>
    </div>
  );
}
