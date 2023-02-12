## QRZ Cli

Amatör telsizciler için çağrı işareti bilgisi sağlayan cli'dır. Var olan çağrı işaretinin ad soyad, adres, çağrı işareti, çağrı işaretinin fonetik okunuşu ve mors olarak yazılışı bilgisini gösterir.

### Commands List

| Name           | Description                                                        | Example                     |
| -------------- | ------------------------------------------------------------------ | --------------------------- |
| login          | Cli'a giriş yapmak için kullanılır.                                | qrz login          |
| callsign         | Cli'da çağrı işareti aramak için kullanılır.                               | qrz callsign         |

## Commands

- login
  Cli'a giriş yapmak için kullanılır.

```
qrz login
````

- callsign
  Cli ile çağrı işareti aramak için kullanılır.

```
qrz callsign
```

Örnek bir çağrı işareti araması:

```
qrz callsign
```
```
✔ Login check success!
? Enter callsign:  ta1war
```
```
--------------------------------------------
Ad Soyad: Erdem Özkök

Adres: Bağcılar/İstanbul  / Turkey

Çağrı İşareti: TA1WAR

Tango - Alfa - Bir - Whiskey - Alfa - Romeo
–  ● –  ● – – – –  ● – –  ● –  ● – ●
--------------------------------------------
```