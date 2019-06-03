# Winkels Checklistenapp

Kleines Spielprojekt mit praktischem Hintergrund zum Organisieren von Dingen. Im Hintergrund läuft ein eigener
authentication provider, damit nicht jeder Mensch unsere Listen sehen kann.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6 and upgraded to version 7.3.8

## Dependencies

Benötigt hewi-ng-lib: npm install hewi-ng-lib

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Test /signup/user mit folgendem Request

http://localhost:4200/#accessToken=75mdGzlDNrWD&expiresAt=1588014762&tokenType=Bearer&state=signup&idToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzYTg2Njk5Mi01ZjE4LTRlMjItODg2OC05MGRhYzBjNzk0N2EiLCJpc3MiOiJoZWlrZTI3MTgvYXV0aHByb3ZpZGVyIiwiZXhwIjoxNTg4MDE0NzYyLCJpYXQiOjE1NTY0Nzg3NjJ9.NxoyNGaKYT0l9svhRj8BmL6JBC7aSSANKHG1zPLtpaXjLycXh19CTFNKn2Qdc5aThB8jnLrdc2s2UKRLcbB1UDApuB9yz5HUIm5_8TPKBgnEWFwBUsjQ4Y7vH5jEeRgbGTwXg2SVCyAmSrdIZRa9TB7qpXMvFl236VlArAOqTzkgF_m_45VG9JkkWt_DZwRxvz7GzWX-xY8uU2n_kl_f2NEGCmmakfVmcVIEhphXdGye6sqY65B-QpA2YXKjMzFQJo-z2wrYJVorpl7IVCkc4DC-nCTa3KJOThqeS587vi0CFmAKf4RzkqeCWTNJ5T82MpH7l80rA4_yIye4C5YTwg

(checklistenapp, checklistenserver und authprovider müssen laufen)

## Notizen (chronologisch absteigend)

* __Release 1.1.1:__ valid name, color
* __Release 1.1.0:__ assets werden jetzt immer gefunden
* __Erstes Release ist produktiv__: noch ein workaround mit #-routing, bis der webserver für Html5 konfiguriert ist
* __Global error handler und HttpResponseErrors:__ commit 30734335bdf98cd901ffd11d92483ba9ce871329
* __Open on Click Funktionalität:__ commit 0283a357378ead8a8129d60c5253c78eb37883f7 (hierfür click-Handler auf trash-Button entfernt)
* __Grundgerüst Dialog mit Verwendung von *ngTemplateOutlet:__ commit d2f9728890f51ab61973371dcb6b18f41a845cc7


