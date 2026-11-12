# YNV Demo Lab — verifica di pubblicazione (12 novembre 2026)

## Verificato
- Workspace Render collegato e visibile; nessun servizio e nessun PostgreSQL restituiti.
- `node --experimental-sqlite test.mjs`: 44 verifiche PASS (Node v22.16.0) nel pacchetto v0.2.
- Codice presente localmente; nessun repository remoto identificato e nessun deploy effettuato.

## Blocchi prima di invitare persone esterne
1. **Repository Git remoto**: Render crea web service da un repository raggiungibile. Lo ZIP locale non è direttamente utilizzabile dallo strumento di creazione servizio.
2. **Persistenza**: il database SQLite in `./data` non è affidabile su istanza Render free senza disco persistente. Alternative: Postgres gestito, storage persistente a pagamento, o backend esterno; non approvare costi automaticamente.
3. **Sicurezza**: manca conferma email, rate limiting, reset password, privacy notice, session expiry/revocation, protezioni anti-abuso, verifica dell'invito prima di confermare origine. Non pubblicare per terzi finché non corretto.
4. **Business logic**: il tasto demo accredita anticipatamente i premi; deve restare marcato simulazione e non confuso con la regola commerciale +30 giorni/15 del mese seguente.
5. **Protezione dati**: usare soltanto nominativi e email inventati fino a conformità e sicurezza.

## Prossimo gate
Identificare repository di destinazione autorizzato e collegare GitHub (o un'altra sorgente Git) a Render. Fare un deploy privato/test, con dati fittizi; solo dopo audit di sicurezza e persistenza rilasciare URL pubblico condivisibile.

Il file render.yaml è una bozza di configurazione, non un'autorizzazione al deploy né una garanzia di idoneità per utenti esterni.
