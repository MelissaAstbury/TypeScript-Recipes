import React, { useState, useEffect, FormEvent } from 'react';
import './App.css';
import { IRecipe } from './IRecipe';
import RecipeComponent from './RecipeComponent';

const App: React.FC = () => {
  const [recipesFound, setRecipesFound] = useState<IRecipe[]>([]);
  const [recipeSearch, setRecipeSearch] = useState('');

  const searchForRecipes = async (query: string): Promise<IRecipe[]> => {
    const result = await fetch(`http://localhost:3001/?search=${query}`);
    return (await result.json()).results;
  };

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#searchText') as HTMLInputElement;
    setRecipeSearch(input.value);
    input.value = '';
  };

  useEffect(() => {
    (async () => {
      const query = encodeURIComponent(recipeSearch);
      const response = await searchForRecipes(query);
      setRecipesFound(response);
    })();
  }, [recipeSearch]);

  return (
    <div className="App">
      <h1>Recipe Search App</h1>
      <form className="searchForm" onSubmit={(event) => search(event)}>
        <input type="text" id="searchText" />
        <button>Search</button>
      </form>
      {recipeSearch && <p>Result for {recipeSearch}...</p>}
      <div>
        {recipesFound.length &&
          recipesFound.map((recipe) => (
            <RecipeComponent
              key={recipe.href}
              recipe={recipe}
            ></RecipeComponent>
          ))}
      </div>
    </div>
  );
};

export default App;
