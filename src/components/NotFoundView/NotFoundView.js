import { useHistory, useLocation } from 'react-router-dom';

export default function NotFoundView() {
  const history = useHistory();
  const location = useLocation();

  const backToHome = () => {
    history.push(location?.state?.from?.location ?? '/');
  };

  return (
    <>
      <h1>404 Page not found!</h1>
      <button type="button" onClick={backToHome}>
        Back to Home
      </button>
    </>
  );
}
