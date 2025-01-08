[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/AyidCUYS)

# Login gegevens:
* Super Admin: sadmin@example.com - 123test123 (log in met dit account om gebruikers rollen te beheren)
* Admin: admin@example.com - 123test123 (log in met dit account om het admin dashboard (cruds) te gebruiken)
* User: student1@example.com - 123test123


# Projectopgave

Voor het vak backend frameworks werk je **individueel** een project uit met Next.js, Tailwind, shadcn/ui, Prisma en
Postgres.
Tijdens de examenperiode ligt je jouw project mondeling toe.

* 80% is te verdienen door te beantwoorden aan de *functionele vereisten*
* 20% is te verdienen door een kwalitatieve, complexe en grote app te schrijven

## Toegestane hulpmiddelen

Je mag voor dit project gebruik maken van bronnen zoals tutorials, voorbeelden en StackOverflow.
Dit betekent echter niet dat je project hier volledig op gebaseerd is.
We controleren je inzendingen en indien grote gelijkenissen met online bronnen gedetecteerd worden, dan is dit plagiaat
en wordt een fraudeprocedure gestart.

Generative AI-tools mogen gebruikt worden, maar we verwachten dat je alle code die door deze tools gegenereerd wordt kan
verklaren.
Dit wordt dan ook ondervraagt op de mondelinge verdediging.
Om de UI van je applicatie te bouwen, kan je bijvoorbeeld gebruik maken van [v0.dev](https://v0.dev/), een website die
op basis van een prompt een shadcn/ui pagina opbouwt.

Het is toegestaan om delen uit de lesvoorbeelden of opgeloste oefeningen te herbruiken.
Als je dit doet, moet je dit op een innovatieve manier doen, anders verdien je hier geen punten mee.
Als je twijfelt of jouw code voldoende verschillen vertoond met de code uit de lessen, dan kan je jouw lector hier
natuurlijk over contacteren.

De enige uitzondering op bovenstaande regel is authenticatie, hierbij mag je de code uit de lesvoorbeelden letterlijk
overnemen aangezien er weinig tot geen variatie mogelijk is.

## Begeleiding

Tijdens het bouwen van de applicatie is het toegestaan raad te vragen aan de begeleidende docent.

Vragen over leerstof die gezien is tijdens de lessen worden zelden beantwoord, je wordt meestal doorverwezen naar het
relevante lesmateriaal.
Als je echter kan aantonen dat je het cursusmateriaal gebruikt heb en geprobeerd hebt om een feature zelf te
implementeren, word je geholpen, ook als dit gaat over leerstof die wel in de les behandeld is.
Vragen over features van Next of React die in geen enkele les of oefening gezien zijn worden sowieso beantwoord.

Met vragen over conceptuele problemen zoals het structureren van je app of dingen die je niet geprogrammeerd krijgt,
maar die los staan van de geziene leerstof kan je altijd terecht bij je begeleidende docent.
Je wordt echter gecoacht in het vinden van een oplossing en krijgt deze niet voorgeschoteld.

Indien er problemen ontstaan door bibliotheken die niet meer werken door updates, updates van de IDE, deprecated
features … kan je hier natuurlijk ook hulp voor vragen.

Als je code van ergens gecopy-pastet hebt (of dat nu van een AI tool komt of van 'het internet'), dan kunnen de docenten hulp weigeren als ze zien dat je de code onvoldoende zelf begrijpt. Uitzonderingen hierop zijn code voorbeelden die rechtstreeks uit de documentatie van de tool/library/framework komen.

## Kwaliteit

De kwaliteit van je code wordt beoordeeld op basis van onderstaande, **niet exhaustieve**, lijst.
Omdat je voor een functionerend project al veel punten kunt verdienen (80%) wordt de kwaliteit en complexiteit van je
code streng beoordeeld.

* Naamgeving van variabelen
    * Correct gebruik van enkelvoud/meervoud in de namen
    * Duidelijke namen
* Types
    * Types van variabelen
    * Types van functies
* Gebruik van enums waar toepasbaar
* Geen diep geneste callbacks
* Gebruik van interfaces/types in de plaats van objecten met het any type
* Consistentie in de code, geen mix van () =&gt; {} en function() {} in eenzelfde bestand.
* Volgen van de linting regels die geconfigureerd zijn in ESLint en de stijlregels die geconfigureerd zijn voor
  Prettier (deze regels mogen aangepast worden, zolang je één bepaalde code-style aanhoud en niet alle regels op 'off'
  zet, is er geen probleem)
* Geen hard gecodeerde gegevens
* Opsplitsen in componenten waar nuttig
* Leesbaarheid
* Bruikbaarheid van de UI
* Aanwezigheid van Suspense boundaries
* Aanwezigheid van indicators tijdens het laden en bewerken van data
* Features die boven onderstaande minimumvereisten uitsteken
* Correct gebruikt van server en client components

## Combinatie met Mobile Development

Het is toegestaan om dit project te combineren met je project van Mobile Development.
Dit doe je door een API te schrijven waarmee je mobiele applicatie communiceert, deze API moet beveiligd worden met een
JSON Web Token (JWT).
Het is natuurlijk toegestaan om de API uit te breiden met extra endpoints die dingen doen die uniek zijn aan je mobiele
applicatie en niet gebruikt worden door je Next applicatie.
Voor meer informatie verwijzen we naar [appendix](http://javascript.pit-graduaten.be/lessen/appendix/deploying_next.md).

**Als je jouw projecten voor Mobile development en Backend Frameworks combineert via een API, verdien je minsten 1 van
de 4 punten die je kan verdienen voor een kwalitatieve, complexe en grote app.**
Dit wil niet zeggen dat je geen 4/4 kan scoren zonder een API te bouwen, zonder API zal je score volledig afhangen van
de kwaliteit van je code en de complexiteit van je app.

## Vereisten

Hieronder worden de functionele vereisten opgesomd waaraan je project moet voldoen.

### Authenticatie & autorisaties

Je applicatie moet voorzien zijn van authenticatie die het toelaat om op verschillende machines/browsers ingelogd te
zijn.
Voor elke operatie in de applicatie moet gecontroleerd worden of de ingelogde gebruiker de juiste rechten heeft om de
operatie uit te voeren.

### Relationeel model

Je applicatie is gebouwd rond een relationele database die via Prisma aangemaakt is.
Je relationeel model bevat minstens 8 tabellen, één veel-op-veel relaties en één tabel met minstens 7 attributen
(exclusief primary key).
Veel-op-veel relaties tellen mee als een tabel, ook als je deze op de achtergrond laat aanmaken door Prisma en deze niet
expliciet in je Prisma schema opneemt.

Aangezien je authenticatie moet voorzien, heb je minstens een _User_, _Session_ tabel nodig.
Er zijn dus nog 6 andere tabellen nodig.

Als je niet onmiddellijk weet wat je als onderwerpt kan nemen, kan je altijd terugvallen op je project van database
advanced.

#### Testdata

Om je applicatie te testen voorzie je een seed script waarmee er minstens 10 records per tabel worden aangemaakt.
Voor de _Session_ en _User_ tabellen volstaat het om 1 record (gebruiker) aan te maken, tenzij je met rollen gewerkt
hebt, dan maak je voor elke rol een gebruiker aan.

Voeg de inloggegevens voor elke gebruiker toe aan je readme.md bestand.

### Validatie

De volledige applicatie moet voorzien worden van validatie aan de server- en clientzijde.  
Je schrijft dus Zod schema's voor elke create, update en delete operatie en doet dit via de _extend_ en _omit_ methodes
van Zod.
Het is dus niet toegestaan om voor een create en update operatie een volledig nieuw Zod schema te schrijven.

### Testing

Schrijf voor 2 kernentiteiten een testscenario uit waarbij de volledige CRUD-operatie getest wordt via Playwright. 

Maak verder gebruik van unit en minstens een 5 tal integration tests om een minimale test coverage van 30% te behalen op je project.

Je test zowel componenten als functies uit de verschillende lagen van je applicatie. Dus niet enkel visuele componenten, maar ook minstens functies uit je DAL, Services en Server Side Componenten.

## Git

Je maakt verplicht gebruik van een Git repository via de GitHub classroom link die je in Canvas vindt.
Dit is de enige plaats waar je code moet inzenden, code die via andere kanalen ingezonden wordt, wordt niet beoordeeld.

Als je de deadline mist, is dit jouw verantwoordelijkheid.
Zet je code vanaf het begin op git en commit elke wijziging, zo wordt het onmogelijk om de deadline te missen.

Enkel code die op de **main** branch gepusht is wordt gecontroleerd.
Je maakt natuurlijk wel gebruik van andere branches, maar als het niet gemerged is met de main branch, wordt het niet
beoordeeld.

## Deadline

De deadline voor de opdracht wordt gecommuniceerd via Canvas en de GitHub classroom. 

