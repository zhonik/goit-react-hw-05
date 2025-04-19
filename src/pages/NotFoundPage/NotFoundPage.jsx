import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);
  return <h1>We did not find this page. You are being redirected to the home page...</h1>;
};

export default NotFoundPage;
