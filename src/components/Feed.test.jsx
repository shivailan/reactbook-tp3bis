/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

// Chemins corrigés pour un fichier situé dans src/components/
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import Feed from './Feed';

// Utilitaire pour injecter les contextes indispensables au fonctionnement du Feed
const renderWithProviders = (ui) => {
  return render(
    <AuthContext.Provider value={{ user: { name: "Shiva" } }}>
      <ThemeContext.Provider value={{ theme: "light" }}>
        {ui}
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
};

describe('Tests d’Intégration ReactBook', () => {

  // Procédure 1 : Test de la Recherche (Interaction Utilisateur)
  test('vérifie que la liste se filtre lors d’une recherche', () => {
    renderWithProviders(<Feed />);
    
    // On utilise une RegEx pour être flexible sur la casse (Rechercher / rechercher)
    const searchInput = screen.getByPlaceholderText(/rechercher/i);
    fireEvent.change(searchInput, { target: { value: 'Alice' } });
    
    // Alice doit rester, Bob (initialement présent) doit disparaître
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
    expect(screen.queryByText(/Bob/i)).not.toBeInTheDocument();
  });

// Procédure 2 : Test des Commentaires (Logique métier et UI)
  test('vérifie l’ajout d’un nouveau commentaire', () => {
    renderWithProviders(<Feed />);
    
    // 1. On utilise "getAllBy" car il y a plusieurs posts sur la page
    const allCommentInputs = screen.getAllByPlaceholderText(/écrire un commentaire/i);
    const firstInput = allCommentInputs[0]; // On prend le premier
    
    const form = firstInput.closest('form');

    // 2. On simule la saisie et l'envoi
    fireEvent.change(firstInput, { target: { value: 'Superbe interface !' } });
    fireEvent.submit(form);
    
    // 3. Le commentaire doit apparaître dans la liste
    expect(screen.getByText('Superbe interface !')).toBeInTheDocument();
  });
});