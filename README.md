# YNV Demo Lab v0.3 — laboratorio multiutente

**Solo per test locali con identità inventate. Non pubblicare per registrazioni reali.** Nessun pagamento vero, verifica email, autorizzazione fiscale o conformità privacy garantita.

## Avvio
Node.js 22+:

```bash
node --experimental-sqlite server.mjs
node --experimental-sqlite test.mjs
```

Aprire http://localhost:3000. Database locale `./data/ynv-demo.sqlite`, escluso dal repository. `PORT` e `DATA_DIR` sono configurabili.

## Novità v0.3
- Sessioni Bearer con scadenza dopo 12 ore e endpoint `POST /api/logout`; l'interfaccia elimina il token localmente, ma non chiama ancora il logout server-side.
- Limitazione elementare per IP degli accessi e registrazioni (in memoria: non sostituisce un sistema distribuito anti-abuso).
- Header di protezione HTTP iniziali; CSP ancora permissiva per script inline.
- Registrazione della data di completamento (`completed_at`) con migrazione automatica da v0.2.
- Data premio calcolata: 30 giorni di calendario dal completamento, poi il giorno 15 del mese successivo alla maturazione. `GET /api/rewards` mostra le date; `POST /api/post-due` accredita solo dopo la scadenza, su richiesta. Non è ancora presente un job automatico.
- `POST /api/post-demo` per accreditare subito resta disponibile solo se `YNV_ENABLE_ACCELERATED_REWARDS=true`, per test isolati. Non attivarlo in ambienti pubblici.
- 51 controlli automatici superati localmente con Node v22.16.0.

## Logica demo
Registrazione, invito diretto, creazione azienda con origine ereditata dal proprietario, catalogo fittizio, prenotazioni, simulazione di pagamento e wallet crediti. Nessun premio multilivello. La formula cashback/referral è dimostrativa, non definitiva.

## Blocchi alla pubblicazione
- Email verification, reset password, hardening sessioni, CSP senza inline, rate limit condiviso, privacy notice e consensi, cancellazione dati, audit, controlli antifrode e autorizzazioni amministrative.
- Controversie, storni, rimborsi parziali, no-show, disponibilità concorrente, lotti di crediti, riconciliazione e regole fiscali ancora da implementare.
- Il database SQLite su Render free non ha persistenza garantita; scegliere una soluzione persistente autorizzata prima di invitare persone esterne.
- `render.yaml` è soltanto una bozza. Non crea un deployment sicuro.

Repository demo separato dal progetto YNV originale. Nessun deploy eseguito automaticamente.
