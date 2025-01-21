import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';
import { Item } from 'src/app/models/interfaces';
import { livroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 300;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  campoBusca = new FormControl();

  constructor(private service: LivroService) {}

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3),
    tap((retornoAPI) => console.log(retornoAPI)),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    tap(() => console.log('Fluxo final')),
    map((items) => this.livrosResultadoParaLivros(items))
  );

  livrosResultadoParaLivros(items: Item[]): livroVolumeInfo[] {
    return items.map((item) => {
      return new livroVolumeInfo(item);
    });
  }
}
