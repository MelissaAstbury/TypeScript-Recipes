import React, { useState, useEffect, FormEvent } from 'react';
import './App.css';

const App: React.FC = () => {
  const [recipeFound, setRecipeFound] = useState([]);
  const [recipeSearch, setRecipeSearch] = useState('');

  const searchForRecipes = async (query: string): Promise<any> => {
    const result = await fetch(`http://localhost:3001/?search=${query}`);
    return (await result.json()).results;
  };

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#searchText') as HTMLInputElement;
    setRecipeSearch(input.value);
  };

  useEffect(() => {
    (async () => {
      const query = encodeURIComponent(recipeSearch);
      const response = await searchForRecipes(query);
      setRecipeFound(response);
    })();
  }, [recipeSearch]);

  return (
    <div className="App">
      <h1>Recipe Search App</h1>
      <form className="searchForm">
        <input type="text" id="searchText" />
        <button>Search</button>
      </form>
    </div>
  );
};

export default App;
