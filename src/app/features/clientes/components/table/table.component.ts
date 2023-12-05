import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, finalize, throwError } from 'rxjs';
import { ClientesService } from 'src/app/services/service-clientes.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Cliente } from 'src/app/models/model-clientes';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<Cliente> = new MatTableDataSource();
  displayedColumns: string[] = ['nome', 'sobrenome', 'cpf', 'dataNascimento', 'renda', 'dataCadastro', 'editar', 'deletar'];

  durationInSeconds = 3;
  loading = false;
  
  constructor(private clientesService: ClientesService,
    private dialog: MatDialog,
) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  carregarClientes() {
    this.clientesService.getClientes().subscribe((response) => {
      // this.loading = false;
      this.dataSource.data = response;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deletar(id: string) {
    this.clientesService.deletarClientes(id)
        .pipe(
          catchError((error) => {
            if (error.status == 400) {
              this.dialog.open(DialogComponent);
            } else {
              this.dialog.open(DialogComponent);
            }

            return throwError(() => error);
          }),
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(() => {
          this.dialog.open(DialogComponent, {
            data: {
              action: 'sucesso',
              mensagem: 'Cliente deletado com sucesso !'
            }
          }).afterClosed().subscribe(() => {
            this.carregarClientes();
          }) 
        });
  }

  deletarModal(id: string) {
    this.dialog.open(DialogComponent, {
      data: {
        action: 'deletar',
        mensagem: 'Deseja deletar o cliente ?'
      }
    })
    .afterClosed().subscribe(result => {
      if (result) {
        this.deletar(id)
      }
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 }
  
