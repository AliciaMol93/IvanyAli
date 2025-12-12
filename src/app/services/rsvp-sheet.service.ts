import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Invitado } from '../components/rsvp/rsvp-form/invitadoInterface';
import { tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class RsvpSheetService {

  private apiUrl = 'https://script.google.com/macros/s/AKfycbzzmZI-eSpRlG4xX_CZcmTcY8oDTxUm7Cn4YoAxVXph--qc5RRh4GGgUz8r-36dgagMuA/exec';

  constructor(private http: HttpClient) {}

  guardarInvitado(invitado: Invitado) {
    console.log("📤 ENVIANDO A SHEETS:", invitado);
    return this.http.post(
      this.apiUrl,
      { type: 'invitado', ...invitado },
      { responseType: 'text' })   // 👈 IMPORTANTE: Sheets NO siempre devuelve JSON
    .pipe(
      tap(res => console.log("📥 RESPUESTA SHEETS:", res)),
    );
  }

  guardarSugerencia(invitado_id: number, email: string, song_name: string, artist: string) {
    return this.http.post(
      this.apiUrl,
      { type: 'sugerencia', invitado_id, email, song_name, artist },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }
}
