# 🚀 Mettre BelgInfo en ligne — Guide complet

## Ce dont tu as besoin (tout gratuit)
- Un compte GitHub : github.com
- Un compte Vercel : vercel.com

---

## ÉTAPE 1 — Créer un compte GitHub

1. Va sur https://github.com/signup
2. Choisis un nom d'utilisateur, email, mot de passe
3. Valide ton email

---

## ÉTAPE 2 — Créer le projet sur GitHub

1. Connecté sur GitHub, clique sur le bouton vert **"New"** (haut gauche)
2. Donne un nom : `belginfo`
3. Mets-le en **Public**
4. Clique **"Create repository"**

---

## ÉTAPE 3 — Uploader les fichiers

Dans la page de ton nouveau repo, clique sur **"uploading an existing file"**

Glisse-dépose ces fichiers/dossiers :
```
belginfo/
  ├── vercel.json
  ├── public/
  │     └── index.html
  └── api/
        ├── search.js
        └── financials.js
```

Clique **"Commit changes"** (bouton vert en bas)

---

## ÉTAPE 4 — Déployer sur Vercel (2 minutes)

1. Va sur https://vercel.com
2. Clique **"Sign up"** → connecte-toi avec GitHub
3. Clique **"Add New Project"**
4. Trouve ton repo `belginfo` → clique **"Import"**
5. Ne change rien → clique **"Deploy"**
6. ✅ Ton site est en ligne sur `belginfo.vercel.app` !

---

## ÉTAPE 5 — Activer les données financières BNB

1. Va sur https://developer.cbso.nbb.be
2. Crée un compte gratuit
3. Va dans "Explore products" → souscris à **"Authentic Data"**
4. Attends l'email d'approbation (quelques heures)
5. Copie ta **Primary Key**
6. Sur ton site, clique **"Clé BNB"** en haut à droite → colle ta clé

---

## Résultat final

Ton site sera accessible à l'adresse :
**https://belginfo.vercel.app**

### Fonctionnalités disponibles :
- ✅ Recherche par nom ou numéro BCE
- ✅ Infos société (forme, date création, statut)
- ✅ Adresse du siège
- ✅ Gérants & administrateurs
- ✅ Chiffre d'affaires (avec clé BNB)
- ✅ Résultat net (avec clé BNB)
- ✅ Fonds propres & total du bilan (avec clé BNB)
- ✅ Graphique d'évolution sur 3 ans

---

## Domaine personnalisé (optionnel — ~10€/an)

Tu veux `belginfo.be` au lieu de `belginfo.vercel.app` ?

1. Achète le domaine sur https://www.dns.be (~10€/an)
2. Dans Vercel → Settings → Domains → Add domain
3. Suis les instructions DNS (5 minutes)

---

## Des questions ?

Reviens sur Claude et montre-lui le message d'erreur, il corrigera !
