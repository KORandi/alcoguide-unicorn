import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NewRecipePage from '../../components/Pages/Recipe/NewRecipePage';
import { useAppContext } from '../../utils/context/state';

function NewRecipe() {
  const { user } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (user === '3') {
      router.push('/');
    }
  }, [user]);

  return (
    <div className="container" style={{ height: 'calc(100% - 50px)' }}>
      <div className="row h-100">
        <div className="col-12 h-100">
          <NewRecipePage />
        </div>
      </div>
    </div>
  );
}

export default NewRecipe;
