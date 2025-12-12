import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invitado } from '../components/rsvp/rsvp-form/invitadoInterface';


@Injectable({ providedIn: 'root' })
export class RsvpSheetService {

  private apiUrl = 'https://script.google.com/macros/s/AKfycbyAnRC1Nqz_pxaWte6DOziCUFlN-7JuenfMMe-76-7lqBhCTud3azqKL5ypM_i81qabcg/exec';

  constructor(private http: HttpClient) {}

  guardarInvitado(invitado: Invitado) {
    return this.http.post(this.apiUrl, {
      type: 'invitado',
      ...invitado
    });
  }

  guardarSugerencia(invitado_id: number, email: string, song_name: string, artist: string) {
    return this.http.post(this.apiUrl, {
      type: 'sugerencia',
      invitado_id,
      email,
      song_name,
      artist
    });
  }
}
