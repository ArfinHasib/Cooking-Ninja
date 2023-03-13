import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { projectFireStore } from '../../firebase/config';
import { useTheme } from '../../hooks/useTheme';

// styles
import './Recipe.css';

export default function Recipe() {
  const { id } = useParams();
  const { mode } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unusb = projectFireStore
      .collection('recipes')
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError('Could not find that recipe');
        }
      });

    return () => unusb();
  }, [id]);

  const handleClick = () => {
    projectFireStore.collection('recipes').doc(id).update({
      title: 'Fuck You',
    });
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipe && (
        <>
          <h2 className='page-title'>{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className='method'>{recipe.method}</p>
          <button className='btn' onClick={handleClick}>
            Update me
          </button>
        </>
      )}
    </div>
  );
}
