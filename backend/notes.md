



# Notes — Portfolio Full-Stack

## Jour 1 — Setup + lecture (GET)

- Une migration exécutée (`node ace migration:run`) est figée : si je la
  modifie après coup, rien ne change en base tant que je n'ai pas fait
  `migration:rollback` puis `migration:run` à nouveau.
- Chaque méthode chaînée dans une migration a besoin de ses parenthèses :
  `.notNullable()`, pas `.notNullable`. Sans elles, on désigne la méthode
  sans l'exécuter, et Git/TypeScript ne signalent rien : le bug est
  silencieux.
- En base (migrations), les colonnes sont en snake_case (`image_url`).
  Dans le modèle TypeScript, elles deviennent camelCase (`imageUrl`).
  Lucid fait la conversion tout seul.
- Un export par défaut (`export default class Project`) s'importe SANS
  accolades : `import Project from '#models/project'`. Avec des accolades,
  Git chercherait un export nommé qui n'existe pas.
- `{ response }: HttpContext` : les accolades servent à piocher seulement
  ce dont j'ai besoin dans le gros objet HttpContext (params, request,
  response...).
- `Project.all()` récupère tous les projets (Lucid). `Project.find(id)`
  cherche un projet par id et renvoie `null` s'il n'existe pas.
- Pour tester "si vide" : `if (!variable)`. Oublier le `!` inverse
  complètement la logique, sans erreur visible — seul le test avec un id
  inexistant (ex: /projects/999) permet de repérer ce bug.
- `response.ok({...})` renvoie un 200, `response.notFound({...})` un 404.
  Toujours mettre `return` devant, sinon le code continue de s'exécuter
  après.
- Un `router.get(...)` mal formé (virgule manquante, crochets mal
  fermés) empêche carrément le serveur de démarrer.

## Jour 2 — Écriture (POST / PUT / DELETE) + validation

- `response` sert à RÉPONDRE au client (`response.ok`, `response.created`,
  `response.notFound`...). `Project` (le modèle) sert à PARLER À LA BASE
  (`Project.create`, `Project.find`...). Ne jamais confondre les deux :
  `response.create()` n'existe pas.
- `request.all()` n'a pas besoin de `await` (les données sont déjà
  arrivées avec la requête). `Project.create()`, lui, en a besoin (il
  parle à PostgreSQL, donc c'est lent).
- Sans validation, une donnée invalide (ex: title manquant) provoque une
  erreur 500 brute de PostgreSQL, avec des détails internes (chemins de
  fichiers, code SQL) qu'un utilisateur ne doit jamais voir.
- Le validator VineJS arrête la requête AVANT qu'elle atteigne la base,
  avec un message clair et un code 422 au lieu d'un 500.
- Dans le validator, les champs suivent le nommage envoyé par le client
  (camelCase : `imageUrl`), pas celui de la base de données (`image_url`).
- `request.validateUsing(monValidator)` n'a pas besoin qu'on lui précise
  une liste de champs (contrairement à `request.only([...])`) : cette
  liste est déjà définie dans le validator lui-même.
- Deux constantes exportées du même fichier peuvent s'importer sur une
  seule ligne : `import { a, b } from '...'`.
- Une route mal orthographiée (ex: "projet" au lieu de "projects", ou
  "destro'y" avec une faute de frappe) donne une erreur 404
  E_ROUTE_NOT_FOUND. Ce n'est jamais un bug du controller : toujours
  vérifier le chemin exact de la route en premier.
- Le nom du fichier généré par `node ace make:validator project` est
  `project.ts` (pas `project_validator.ts`) : l'import doit correspondre
  exactement au vrai nom de fichier.

## Git / GitHub

- Un token GitHub ne doit jamais être collé ailleurs que dans le
  terminal (jamais dans un chat, un fichier partagé, etc). S'il est
  exposé, le révoquer immédiatement sur GitHub et en créer un nouveau.
- `git push -u origin main` : le `-u` ne sert qu'une fois pour lier la
  branche locale à la branche distante ; ensuite `git push` suffit.
- Toujours vérifier `git status` avant `git add .`, pour confirmer que
  `.env` (et tout secret) n'y figure pas.


## Export default vs exports nommés

- Un fichier "utilitaire" (comme lib/api.ts) peut avoir PLUSIEURS exports
  nommés (export async function getProjects() {...}, export async
  function getProject() {...}). On les importe avec des accolades :
  import { getProjects, getProject } from '@/lib/api'.
- Un fichier page.tsx (App Router Next.js) a toujours UN SEUL export
  default. Cette fonction peut être async et appeler d'autres fonctions
  importées (ex: getProjects()) avant de retourner son JSX.



 ## Jour 3 — Frontend : premières données réelles à l'écran

### Next.js (App Router)

- Un composant de page (`page.tsx`) peut être `async` et faire directement
  `await fetch(...)` (ou appeler une fonction qui le fait), sans
  `useEffect`/`useState` comme en React classique. C'est une
  particularité du App Router : le code s'exécute côté serveur, avant
  l'envoi du HTML au navigateur.
- Un fichier `page.tsx` doit toujours avoir un `export default` — Next.js
  cherche spécifiquement cet export pour savoir quoi afficher pour
  cette route. Sans lui, rien ne s'affiche.

### Export default vs exports nommés

- Un fichier utilitaire (`lib/api.ts`) peut avoir PLUSIEURS exports
  nommés (`export async function getProjects() {...}`, `export async
  function getProject() {...}`), importés avec des accolades :
  `import { getProjects, getProject } from '@/lib/api'`.
- Les composants du projet (`ProjectCard`, `ProjectList`) suivent la
  même logique : exports nommés, pas `export default`, pour rester
  cohérent dans tout le projet.
- Exception à connaître : certains modules externes (comme `next/link`)
  exportent leur fonction par défaut, avec un nom précis (`Link`) à
  respecter exactement à l'import — pas de choix à faire soi-même.

### shadcn/ui : la règle de casse

- Nom de FICHIER en minuscule (`badge.tsx`, `button.tsx`), nom du
  COMPOSANT en majuscule (`Badge`, `Button`). Confondre les deux
  (`<badge>` au lieu de `<Badge>`) ne provoque aucune erreur visible :
  React traite juste la balise comme du HTML brut inconnu, sans le
  style ni le comportement attendu.
- Le composant `Button` peut se comporter comme un lien grâce à la
  prop `asChild` : il prend l'élément à l'intérieur (`Link`) et lui
  applique son style, au lieu d'afficher son propre bouton HTML.

### Nouvelles notions React

- Une props typée se déclare avec la destructuration + le type :
  `{ project }: { project: Project }`. Les accolades avant les
  deux-points extraient la valeur ; celles après décrivent son type.
- Condition d'affichage en JSX avec `&&` :
  `{condition && <element />}`. Si `condition` est fausse (ou `null`),
  rien ne s'affiche ; si elle est vraie, l'élément qui suit s'affiche.
  Ce n'est pas une syntaxe React, c'est un raccourci JavaScript
  classique.
- `.map()` transforme un tableau en un AUTRE tableau, en appliquant
  une règle à chaque élément (ex : `[1,2,3].map(x => x*x)` donne
  `[1,4,9]`). Appliqué à des projets, il transforme un tableau de
  `Project` en un tableau de `<ProjectCard>`. React sait afficher
  directement un tableau d'éléments JSX à l'écran.
- Le `key` sur chaque élément généré par `.map()` est OBLIGATOIRE :
  il donne à React une identité unique par élément, pour qu'il sache
  lequel mettre à jour plus tard sans redessiner les autres.
  `project.id` est un bon choix de clé (toujours unique).

### Construire une URL dynamique

- Même syntaxe partout dans le projet : les template strings avec
  accents graves et `${...}` : `` `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}` ``.
  Utile pour composer une adresse d'API ou un lien de page
  (`/projects/${project.id}`).

### Test de validation du jour 3

- En supprimant un projet dans la base (via Thunder Client), il
  disparaît de la page après rechargement : preuve que la chaîne
  complète PostgreSQL → AdonisJS → Next.js → écran fonctionne de
  bout en bout. 