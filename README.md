# YNV Demo Lab v0.2 — multiutente condiviso

**Prototipo di laboratorio, non servizio pubblico pronto alla produzione.** Nessun denaro reale, nessuna integrazione PSP, nessuna identità verificata, nessuna conformità fiscale garantita.

## Avvio
Richiede Node.js 22+ con supporto `node:sqlite`. Dalla cartella del progetto:

```bash
node --experimental-sqlite server.mjs
```

Aprire http://localhost:3000. Il database SQLite persistente è in `./data/ynv-demo.sqlite` (escludere dai repository pubblici). Variabili: `PORT` e `DATA_DIR`.

## Test
```bash
node --experimental-sqlite test.mjs
```

## Funzionamento
1. Registrare un privato con nome ed email **fittizi** e password demo (almeno 10 caratteri).
2. Aprire **Invita**, creare link e condividerlo (funziona per altri utenti solo dopo la pubblicazione su hosting pubblico HTTPS).
3. L'invitato si registra dal link: `people.origin_person` registra **l'invitante diretto**.
4. L'invitato apre **Aziende** e attiva un'azienda: `businesses.origin_person` eredita l'origine del **proprietario privato**. L'origine non è l'utente che ha creato l'azienda, né l'invitante del suo invitante.
5. Un privato invitato può creare propri inviti. Non sono previsti compensi multilivello.
6. Prenotazioni, pagamenti e premi sono simulati. Il tasto di accredito anticipato serve solo a dimostrare la meccanica; NON applica il calendario contrattuale dei 30 giorni + 15 del mese seguente.

## Vincoli noti prima di invitare utenti esterni
- Non pubblicare con dati reali: mancano email verification, reset password, rate limiting, anti-abuse, CSRF per autenticazione cookie (qui si usa token Bearer in sessionStorage), autorizzazioni amministrative, privacy notice, retention, audit security e hardening deployment.
- L'offerta demo è un catalogo fisso di quattro aziende fittizie; le nuove aziende non pubblicano ancora offerte.
- Il referral demo paga al **referrer persona** un premio illustrativo del 10% della commissione, non un contratto commerciale definitivo. La regola Founding è semplificata e da rivedere: le offerte seed sono possedute da un account demo non accessibile.
- Non gestisce no-show, rimborsi parziali, recupero premi già spesi, lotti con scadenza, commissioni fiscali reali, riconciliazione PSP, availability concorrente.
- SQLite su hosting effimero perde dati al riavvio: scegliere disco persistente o migrare a PostgreSQL prima di condividere con terzi.
- Per un deployment condiviso, collegare hosting (ad esempio Render) e repository, e configurare volume persistente, HTTPS, domini e controlli di sicurezza. Non è stato effettuato alcun deploy.

## Requisito referral approvato
Se A invita B e B attiva Azienda B, il referente di origine dell'Azienda B è A. Se B invita C e C attiva Azienda C, il referente dell'Azienda C è B, **non A**. Non confondere `origin_person` con proprietario, amministratore o beneficiario fiscale.
