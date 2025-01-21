import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item, Livro } from 'src/app/models/interfaces';
import { livroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  listaLivros: Livro[];
  campoBusca: string = '';
  subscripition: Subscription;
  livro: Livro;

  constructor(private service: LivroService) {}

  buscarLivros() {
    this.service.buscar(this.campoBusca).subscribe({
      next: (items) => {
        this.listaLivros = this.livrosResultadoParaLivros(items);
      },
      error: (erro) => console.error(erro),
    });
  }

  livrosResultadoParaLivros(items: Item[]): livroVolumeInfo[] {
    return items.map((item) => {
      return new livroVolumeInfo(item);
    });
  }

  ngOnDestroy() {
    this.subscripition.unsubscribe();
  }
}
