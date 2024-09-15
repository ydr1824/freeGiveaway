import { useRouteError } from "react-router-dom";
import { useEffect } from "react";

export default function ErrorPage(props) {
  function ChangePageTitle() {
    document.title = props.title;
  }

  useEffect(() => ChangePageTitle, []);

  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
