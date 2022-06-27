import { Link } from "react-router-dom";

export const Error404 = () => {
  return (
    <div className="font-mono text-center text-white">
      <h3 className="text-4xl text-black mb-5">Error 404</h3>
      <div className="bg-sky-600 p-5 py-10 text-2xl font-semibold text-white fade-in">
        <p className="mb-3">This page was not found!</p>
        <p className="text-lg">
          But fear not, you can just{" "}
          <Link to="/" className="hover:underline italic">
            go back
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Error404;
