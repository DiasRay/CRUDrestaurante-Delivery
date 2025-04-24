export default interface Usuario {
    id: number|null;
    nome: string;
    usuario: string;
    foto?: string;
    senha: string;
    produto?: null;
}