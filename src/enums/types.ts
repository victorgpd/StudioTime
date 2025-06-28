export interface IUser {
  uid?: string;
  name: string;
  email: string;
}

export interface IRehearsal {
  id: string;
  nameClient: string;
  date: string;
  time: string;
  location: string;
  type: "Gestante" | "Infantil" | "Corporativo" | "Eventos" | "Modelo" | "Outro";
  price: number;
  status: "Pago" | "Pendente" | "Pago parcialmente";
  observations?: string;
}

export interface IClient {
  id: string;
  name: string;
  phone: string;
  birthday: string;
  observations: string;
}

export interface IPhotographer {
  clients: IClient[];
  rehearsals: IRehearsal[];
  proprietary: string;
}
