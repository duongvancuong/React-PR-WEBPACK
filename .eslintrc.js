module.exports = {
  "root": true,
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  },
  "rules": {
    "key-spacing": "off",
    "react/sort-comp": ["error", {
      "order": [
        "static-methods",
        "lifecycle",
        "everything-else",
        "render",
        "/^_.+$/"
      ]
    }],
    "no-unused-vars": ["error", { "args": "none" }],
    "semi": [
      1,
      "always"
    ],
    "no-trailing-spaces": 0,
    "eol-last": 1,
    "no-underscore-dangle": 0,
    "no-lone-blocks": 0,
    "react/forbid-prop-types": 0,
    "no-shadow": 0,
    "class-methods-use-this": 0,
  },
   "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    }
  }
};
