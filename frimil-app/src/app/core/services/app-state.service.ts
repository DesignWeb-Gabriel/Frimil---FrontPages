import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pecuarista } from '../../models/pecuarista.model';

export interface AppState {
  pecuaristas: {
    items: Pecuarista[];
    loading: boolean;
    error: string | null;
    selectedId: number | null;
  };
  fazendas: {
    items: string[];
    loading: boolean;
    error: string | null;
  };
  ui: {
    sideMenuCollapsed: boolean;
    currentPage: string;
  };
}

const initialState: AppState = {
  pecuaristas: {
    items: [],
    loading: false,
    error: null,
    selectedId: null,
  },
  fazendas: {
    items: [],
    loading: false,
    error: null,
  },
  ui: {
    sideMenuCollapsed: false,
    currentPage: 'dashboard',
  },
};

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private state$ = new BehaviorSubject<AppState>(initialState);

  // Selectors
  public readonly appState$ = this.state$.asObservable();
  
  public readonly pecuaristas$ = this.state$.pipe(
    map(state => state.pecuaristas.items)
  );
  
  public readonly pecuaristasLoading$ = this.state$.pipe(
    map(state => state.pecuaristas.loading)
  );
  
  public readonly selectedPecuarista$ = combineLatest([
    this.state$,
    this.state$.pipe(map(state => state.pecuaristas.selectedId))
  ]).pipe(
    map(([state, selectedId]) => 
      selectedId ? state.pecuaristas.items.find(p => p.id === selectedId) : null
    )
  );
  
  public readonly fazendas$ = this.state$.pipe(
    map(state => state.fazendas.items)
  );
  
  public readonly currentPage$ = this.state$.pipe(
    map(state => state.ui.currentPage)
  );

  // Actions - Pecuaristas
  setPecuaristas(pecuaristas: Pecuarista[]): void {
    this.updateState({
      pecuaristas: {
        ...this.currentState.pecuaristas,
        items: pecuaristas,
        loading: false,
        error: null,
      }
    });
  }

  addPecuarista(pecuarista: Pecuarista): void {
    const currentItems = this.currentState.pecuaristas.items;
    this.updateState({
      pecuaristas: {
        ...this.currentState.pecuaristas,
        items: [...currentItems, pecuarista],
      }
    });
  }

  updatePecuarista(updatedPecuarista: Pecuarista): void {
    const currentItems = this.currentState.pecuaristas.items;
    const updatedItems = currentItems.map(item => 
      item.id === updatedPecuarista.id ? updatedPecuarista : item
    );
    
    this.updateState({
      pecuaristas: {
        ...this.currentState.pecuaristas,
        items: updatedItems,
      }
    });
  }

  removePecuarista(id: number): void {
    const currentItems = this.currentState.pecuaristas.items;
    const filteredItems = currentItems.filter(item => item.id !== id);
    
    this.updateState({
      pecuaristas: {
        ...this.currentState.pecuaristas,
        items: filteredItems,
        selectedId: this.currentState.pecuaristas.selectedId === id ? null : this.currentState.pecuaristas.selectedId,
      }
    });
  }

  selectPecuarista(id: number | null): void {
    this.updateState({
      pecuaristas: {
        ...this.currentState.pecuaristas,
        selectedId: id,
      }
    });
  }

  setPecuaristasLoading(loading: boolean): void {
    this.updateState({
      pecuaristas: {
        ...this.currentState.pecuaristas,
        loading,
      }
    });
  }

  setPecuaristasError(error: string | null): void {
    this.updateState({
      pecuaristas: {
        ...this.currentState.pecuaristas,
        error,
        loading: false,
      }
    });
  }

  // Actions - Fazendas
  setFazendas(fazendas: string[]): void {
    this.updateState({
      fazendas: {
        ...this.currentState.fazendas,
        items: fazendas,
        loading: false,
        error: null,
      }
    });
  }

  setFazendasLoading(loading: boolean): void {
    this.updateState({
      fazendas: {
        ...this.currentState.fazendas,
        loading,
      }
    });
  }

  // Actions - UI
  setCurrentPage(page: string): void {
    this.updateState({
      ui: {
        ...this.currentState.ui,
        currentPage: page,
      }
    });
  }

  toggleSideMenu(): void {
    this.updateState({
      ui: {
        ...this.currentState.ui,
        sideMenuCollapsed: !this.currentState.ui.sideMenuCollapsed,
      }
    });
  }

  // Utility methods
  private get currentState(): AppState {
    return this.state$.value;
  }

  private updateState(partialState: Partial<AppState>): void {
    this.state$.next({
      ...this.currentState,
      ...partialState,
    });
  }

  // Debug method
  getSnapshot(): AppState {
    return this.currentState;
  }
}
