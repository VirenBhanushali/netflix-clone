import classes from "./SearchList.module.css";
import { Link } from "react-router-dom";

function SearchList(props) {
  function closeSearchContainer() {
    props.closeSearchContainer();
  }

  return (
    <div
      className={classes.seacrhListContainer}
      onMouseLeave={closeSearchContainer}
    >
      <button onClick={closeSearchContainer}>❌</button>
      <ul>
        {props.SearchList.map((curr) => {
          return (
            <Link
              key={curr.id}
              style={{ textDecoration: "none" }}
              to={`/details/${curr.id}/${curr.title ? "movie" : "tv"}`}
            >
              <li> {curr.title || curr.name} </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchList;
