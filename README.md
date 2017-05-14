# permanager
permanager propose une interface minimaliste pour gérer les tâches d'un projet permacole   

## setup
après avoir cloné le répertoire

### 1. installer les node modules
    npm install
    
### 2. connecter le projet firebase
1. aller dans la [console firebase](https://console.firebase.google.com/)
2. ouvrir un projet
3. cliquer sur "ajouter firebase à votre application web"
4. copier le code

```javascript
{
    apiKey: "...",
    authDomain: "...",
    databaseURL: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "..."
}
```

5. ouvrir le fichier *src/constants/firebase.js*
6. remplacer les `{}` par l'objet copié
7. sauver

### 3. préparer la base de données
1. dans la console firebase du projet, cliquer sur "database"
2. cliquer sur "régles"
3. remplacer avec le code (pas forcément à optimisé, ne pas hésiter à proposer mieux)

```javascript
{
  "rules": {
    ".read": "true",
    "users": {
      ".write": "root.child('/users/' + auth.uid + '/writer').val() === true || !data.exists()"
    },
    "todos": {
    	".write": "root.child('/users/' + auth.uid + '/writer').val() === true"
    },
    "_todos": {
    	".write": "root.child('/users/' + auth.uid + '/writer').val() === true"
    }
  }
}
```

### 3'. activer l'authentification google
1. toujours dans la console firebase, cliquer sur "authentication"
2. cliquer sur "modes de connexion"
3. cliquer sur "google"
4. activer
5. enregistrer

### 4. lancer l'application en local
en local :

    npm start
    
pour la prod :

    npm run build
    

### 5. donner les droits d'écriture
1. après s'être connecté une première fois sur l'application, retourner dans "database"
2. dans le schéma de la base de données, déplier le noeud "users"
3. cliquer sur "+" sur le noeud de l'utilisateur cible
4. remplisser le nom et la valeur avec, respectivement **writer** et **true**
5. ajouter
