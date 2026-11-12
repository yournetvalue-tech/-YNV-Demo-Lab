# YNV Demo Lab v0.3 — gate di pubblicazione

## Verificato in locale
- Repository demo GitHub esistente e file v0.2 controllati.
- v0.3: 51 controlli automatici superati con Node v22.16.0.
- Autenticazione con scadenza 12 ore, logout API, rate limit elementare in memoria, header di sicurezza.
- Crediti: completamento tracciato; maturazione 30 giorni dopo completamento; accredito il 15 del mese successivo alla maturazione; endpoint manuale di accredito alla scadenza.

## Non pronto per pubblicazione
- Nessuna conferma email, recupero password, consenso privacy o adeguata gestione dati personali.
- Nessun rate limiting distribuito; nessuna protezione anti-abuso completa.
- Nessuna procedura controversie/storni o rimborso proporzionale.
- Nessun job automatico per accrediti; l'utente deve richiedere `post-due`.
- Nessuna persistenza garantita su Render free, né PostgreSQL integrato.
- Interfaccia demo non completa per tutte le nuove funzioni API.
- Nessun deploy Render eseguito; nessuna risorsa a pagamento autorizzata.

**Decisione:** usare solo test locali con dati fittizi; NON distribuire un URL pubblico per registrazioni.
