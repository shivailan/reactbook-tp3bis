import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Feed from './Feed';

describe('Tests du composant Feed', () => {
  
  test('filtre les posts selon la saisie dans la barre de recherche', () => {
    render(<Feed />);
    const searchInput = screen.getByPlaceholderText(/Rechercher/i);
    fireEvent.change(searchInput, { target: { value: 'Alice' } });
    
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
    expect(screen.queryByText(/Bob/i)).not.toBeInTheDocument();
  });

  test('ajoute un commentaire et met à jour le compteur', () => {
    render(<Feed />);
    
    // 1. Cibler l'input et le formulaire
    const commentInput = screen.getAllByPlaceholderText(/Ajouter un commentaire/i)[0];
    // On remonte au parent <form> de l'input
    const form = commentInput.closest('form');

    // 2. Simuler la saisie (on utilise le nom "comment" pour matcher e.target.comment)
    fireEvent.change(commentInput, { target: { value: 'Mon test de commentaire', name: 'comment' } });
    
    // 3. Soumettre le formulaire directement
    fireEvent.submit(form);

    // 4. Vérifications
    expect(screen.getByText(/Mon test de commentaire/i)).toBeInTheDocument();
    expect(screen.getByText(/Commentaires \(1\)/i)).toBeInTheDocument();
  });
});