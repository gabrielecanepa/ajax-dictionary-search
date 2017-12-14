![](bg.png)

>🔍 Simple AJAX autocomplete input with Dictionary.com words and redirection.

# AJAX Dictionary Search [![AJAX Dictionary](https://img.shields.io/badge/ajax-dictionary-orange.svg)](https://github.com/gabrielecanepa/ajax-dictionary-search) [![GitHub top language](https://img.shields.io/github/languages/top/badges/shields.svg)](https://github.com/gabrielecanepa/ajax-dictionary-search)

## [Live Website](http://www.creative-portfolios.com/) ⚡️

## Development

Developed by [Gabriele Canepa](http://www.gabrielecanepa.com/) as exercise for [Le Wagon](http://www.lewagon.com), using _Le Wagon Dictionary API_ (https://wagon-dictionary.herokuapp.com/autocomplete/) and redirection to [Dictionary.com](http://www.dictionary.com).

## Usage

First clone this repository to your laptop. You must have Node (> v4) and [yarn](https://yarnpkg.com/lang/en/docs/install/) installed.

```bash
git clone git@github.com:gabrielecanepa/ajax-dictionary-search.git ajax-dictionary-search
cd ajax-dictionary-search
rm -rf .git
yarn install
stt # Open this folder in Sublime Text
```

Make sure you have `./node_modules/.bin` in your `$PATH`! This way you can run this:

```bash
eslint lib
webpack-dev-server
```

Once a file has been updated in Sublime, you can run it with:

```bash
node lib/autocomplete.js
```

## How was this repo generated?

Environment setup:

```bash
yarn init
yarn add eslint
./node_modules/.bin/eslint --init
# How would you like to configure ESLint? Use a popular style guide
# Which style guide do you want to follow? Airbnb
# Do you use React? No
# What format do you want your config file to be in? JSON

# Open and edit rules in .eslintrc.json

yarn add webpack webpack-dev-server
touch webpack.config.js # Open and configure
touch index.html
./node_modules/.bin/webpack-dev-server

git init
echo "node_modules" >> .gitignore
git add .
git commit -m "JavaScript empty project with ESLint"
```
