// Erro devolvido pela API (ou de rede). "message" já vem em português, pronto para mostrar ao usuário.
export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
