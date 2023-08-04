import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom"; // Correct import

const Header = () => {
  const [searchValue, setSearchValue] = useState(""); // State to hold the search input value
  const navigate = useNavigate(); // Get the navigate function from React Router

  const searchHandling = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    console.log(searchValue); // Log the search value (you can perform any search-related actions here)

    // Navigate to another component with the search value as a URL parameter
    navigate(`/${searchValue}`);
  };

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  return (
    <>
      <nav
        className="navbar fixed-top navbar-light"
        style={{ backgroundColor: "#158C66" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand">
            {" "}
            <Link to="/">
              <img
                src="./pokemomlogo.png"
                style={{ width: "120px", height: "50px" }}
              />
            </Link>
          </a>
          <form className="d-flex" onSubmit={searchHandling}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Pokemon"
              aria-label="Search"
              value={searchValue}
              onChange={handleSearchInputChange}
            />
            <button className="btn btn-secondary" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Header;
