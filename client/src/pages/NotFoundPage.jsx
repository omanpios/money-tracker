import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="text-center">
      <h1 className="fs-1">404</h1>
      <h2 className="fs-2">Not Found Page</h2>
      <Link to={"/"}>Home</Link>
    </div>
  );
}

export default NotFoundPage;
