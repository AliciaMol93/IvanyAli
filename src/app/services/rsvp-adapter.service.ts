import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment/environment';
import { RsvpService } from './rsvpService.service';
import { RsvpSheetService } from './rsvp-sheet.service';
import { Invitado } from '../components/rsvp/rsvp-form/invitadoInterface';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject, map } from 'rxjs';

const CLAVE_SECRETA = 'retrowedd123';
console.log("🌍 Modo Sheets:", environment.useSheets);

@Injectable({ providedIn: 'root' })
export class RsvpAdapterService {

  private backend = inject(RsvpService);     // Tu backend local
  private sheets = inject(RsvpSheetService); // Google Sheets

  // Mantiene el estado de asistencia igual que tu servicio original
  private asistenciaSubject = new BehaviorSubject<boolean>(false);
  asistencia$ = this.asistenciaSubject.asObservable();

  // ---------------------------
  // MANEJO DE EMAIL CIFRADO
  // ---------------------------
  guardarEmailCifrado(email: string): void {
    const emailCifrado = CryptoJS.AES.encrypt(email, CLAVE_SECRETA).toString();
    localStorage.setItem('email', emailCifrado);
  }

  getEmailDescifrado(): string | null {
    const emailCifrado = localStorage.getItem('email');
    if (!emailCifrado) return null;

    try {
      const bytes = CryptoJS.AES.decrypt(emailCifrado, CLAVE_SECRETA);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch {
      return null;
    }
  }

  // ---------------------------
  // GUARDAR INVITADO
  // ---------------------------
  guardarInvitado(invitado: Invitado) {
    if (!environment.useSheets) {

      // --- MODO LOCAL (tu backend) ---
      return this.backend.crearInvitado(invitado) as any;
    }

    // --- MODO PRODUCCIÓN (Google Sheets) ---
    // --- MODO SHEETS ---
if (invitado.asistencia) {
  this.asistenciaSubject.next(true);
}

return this.sheets.guardarInvitado(invitado).pipe(
  map((res: any) => {
    console.log("🟢 Respuesta de Sheets:", res);

    // Normalizamos posibles formatos
    const id = res?.invitado_id ?? res?.invitadoId ?? res?.id;

    // ⚠️ Control de error: no guardar si la respuesta no es válida
    if (!res || res.success !== true || !id) {
      console.error("❌ Error guardando invitado:", res);
      throw new Error("No se pudo registrar tu asistencia. Comprueba tu conexión e inténtalo nuevamente.");
    }

    // Guardar SOLO si el ID es correcto
    localStorage.setItem('invitado_id', String(id));
    console.log("🟢 invitado_id guardado correctamente:", id);

    return res;
  })
);

  }

  // ---------------------------
  // CONSULTAR ASISTENCIA
  // ---------------------------
  getAsistenciaStatus(email: string) {
    if (!environment.useSheets) {

      // MODO LOCAL → usa tu backend
      return this.backend.getAsistenciaStatus(email);
    }

    // MODO SHEETS → si está guardado en localStorage, asumimos que sí
    const asistencia = !!this.getEmailDescifrado();
    this.asistenciaSubject.next(asistencia);

    return this.asistenciaSubject.asObservable();
;
  }

  // ---------------------------
  // GUARDAR SUGERENCIA
  // ---------------------------
  guardarSugerencia(inv_id: number, email: string, song: string, artist: string) {

    if (!environment.useSheets) {

      // MODO LOCAL → tu backend
      return this.backend.saveSuggestion({
        invitado: {
          invitado_id: inv_id,
          sugerencias: [{ nombre_cancion: song, artista: artist }]
        }
      });
    }

    // MODO SHEETS
    return this.sheets.guardarSugerencia(inv_id, email, song, artist);
  }
}
