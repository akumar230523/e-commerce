import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

import "../style/NotFound.css";

const NotFound = () => {

    const error = useRouteError();

    return (
        <div className="not-found">
            <h2> {error.status} - {error.statusText} </h2>
            <p> {error.data} </p>
            <Link to='/' className="back-button"> <i className="fa-solid fa-arrow-left"></i> Back to Home </Link>
        </div>
    );

}

export default NotFound;