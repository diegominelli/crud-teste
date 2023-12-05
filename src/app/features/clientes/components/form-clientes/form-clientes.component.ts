import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { catchError, finalize, throwError } from 'rxjs';
import { ClientesService } from 'src/app/services/service-clientes.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/model-clientes';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.scss']
})
export class FormClientesComponent implements OnInit {
  addForm: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    sobrenome: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required, this.validaCpf()]),
    dataNascimento: new FormControl('', [Validators.required, this.validarIdade()]),
    renda: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    dataCadastro: new FormControl('', [Validators.required]),
  });

  loading = false;
  error: any = null;
  idCliente!: string;
  editar: boolean = false;

  constructor(
    private clientesService: ClientesService,
    private location: Location,
    private route: ActivatedRoute,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
      this.route.params.subscribe((params) => {
      this.idCliente = params['id'];
    });

    if (this.idCliente) {
      this.editar = true;
      this.addForm.controls['cpf'].disable()
    }

    if (this.editar) {
      this.loadingClienteById(this.idCliente)
    }
  }

  adicionar() {
    this.addForm.markAllAsTouched();
    if (!this.addForm.valid) {
      return
    }
    
    this.loading = true;

    const payload = this.addForm.getRawValue();
    
    if (this.editar) {
      this.editarCliente(payload);

    } else {
      this.adicionarCliente(payload)
    }
  }

  adicionarCliente(params: Cliente) {
    this.clientesService.addNovoClientes(params).pipe(
      catchError((error) => {
        this.error = error;
        return throwError(() => error);
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(() => {
      this.dialog.open(DialogComponent, {
        data: {
          action: 'sucesso',
          mensagem: 'Cliente criado com sucesso !'
        }
      }).afterClosed().subscribe(() => {
        this.voltar()
      })
    })
  }

  editarCliente(payload: any) {
    const payloadEditar = {
      id: this.idCliente,
      ...payload
    }
    
    this.clientesService.atualizarClientes(payloadEditar).pipe(
      catchError((error) => {
        this.error = error;
        return throwError(() => error);
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(() => {
      this.dialog.open(DialogComponent, {
        data: {
          action: 'sucesso',
          mensagem: 'Cliente atualizado com sucesso !'
        }
      }).afterClosed().subscribe(() => {
        this.voltar()
      })
    })
  }

  voltar() {
    this.location.back();
  }

  loadingClienteById(idCliente: string) {
    this.clientesService.getClientesById(idCliente).subscribe((response) => {
      this.addForm.controls['nome'].setValue(response.nome);
      this.addForm.controls['sobrenome'].setValue(response.sobrenome);
      this.addForm.controls['cpf'].setValue(response.cpf);
      this.addForm.controls['dataNascimento'].setValue(response.dataNascimento);
      this.addForm.controls['renda'].setValue(response.renda);
      this.addForm.controls['email'].setValue(response.email);
      this.addForm.controls['dataCadastro'].setValue(response.dataNascimento);
    })
  }

  validarIdade(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dataNascimento = control.value
      if (!dataNascimento) {
        return null
      }

      const hoje = new Date();
      const nascimento = new Date(dataNascimento);

      const diferenca = hoje.getTime() - nascimento.getTime()
      const idade = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));

      if (idade < 18 || idade >= 60) {
        return {
          'idadeInvalida': true,
        }
      }

      return null
    }
  }

  get cpf() {
    return this.addForm.get('cpf');
  }

  validaCpf() {
    return (control: AbstractControl): ValidationErrors | null => {
      const cpf = control.value;

      let soma: number = 0;
      let resto: number;
      let valido: boolean;

      const regex = new RegExp('[0-9]{11}');

      if (
        cpf == '00000000000' ||
        cpf == '11111111111' ||
        cpf == '22222222222' ||
        cpf == '33333333333' ||
        cpf == '44444444444' ||
        cpf == '55555555555' ||
        cpf == '66666666666' ||
        cpf == '77777777777' ||
        cpf == '88888888888' ||
        cpf == '99999999999' ||
        !regex.test(cpf)
      )
        valido = false;
      else {
        for (let i = 1; i <= 9; i++)
          soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;

        if (resto == 10 || resto == 11) resto = 0;
        if (resto != parseInt(cpf.substring(9, 10))) valido = false;

        soma = 0;
        for (let i = 1; i <= 10; i++)
          soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;

        if (resto == 10 || resto == 11) resto = 0;
        if (resto != parseInt(cpf.substring(10, 11))) valido = false;
        valido = true;
      }

      if (valido) return null;

      return { cpfInvalido: true };
    }
  }
}
