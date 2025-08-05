export { default as api } from './api';

// Tipos para as respostas da API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// Helper para fazer requisições com tratamento de erro
export const apiRequest = async <T>(
  requestFn: () => Promise<any>
): Promise<ApiResponse<T>> => {
  try {
    const response = await requestFn();
    return {
      data: response.data,
      message: response.data.message,
      success: true,
    };
  } catch (error: any) {
    throw {
      message: error.response?.data?.message || 'Erro interno do servidor',
      code: error.response?.status,
      details: error.response?.data,
    } as ApiError;
  }
};