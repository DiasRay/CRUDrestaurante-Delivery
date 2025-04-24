export default interface Restaurante {
    id: number|null;
    razaoSocial: string;
    cpf: string;
    endereco: string;
    status?: string;
    horarioAbertura?: string;  // "08:00:00"
    horarioFechamento?: string; // "18:00:00"
    //timezone?: string; // <- Adicione esse campo se estiver lidando com horários localizados
}