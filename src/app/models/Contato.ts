import { Categoria } from "./Categoria";
import { Endereco } from "./Endereco";

export interface Contato {
  id: number;
  nome: string;
  fotoUrl?: string;
  emailPrincipal?: string;
  telefonePrincipal?: string;
  empresa?: string;
  cargo?: string;
  aniversario?: string | null;
  endereco: Endereco;
  notas?: string | null;
  favorito: boolean;
  categoria?: Categoria | null;
}