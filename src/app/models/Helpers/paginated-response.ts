export interface PaginatedResponse<T> {
    data: T[];        // Lista de itens
    totalItens: number; // Total de itens
  }