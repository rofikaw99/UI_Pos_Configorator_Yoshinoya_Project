# Template Selenium UI Automate Framework

## Prerequisite

- Visual Studio Code.
- NodeJS.
- Find and Replace "NamaScrum" in package.json, with scrum / team name. (Ex: "Retail" for scrum retail, "LiveChat") for live chat team. (TBD)
- Run on cmd "npm install" to install node modules.

## Explanation about scripts

- qc                : run di env QC untuk semua file .js dalam PROJECT_DIR/tests_explorer/features
- staging           : run di env Staging untuk semua file .js dalam PROJECT_DIR/tests_explorer/features
- qc-custom         : run di env QC untuk specific test case atau folder dalam PROJECT_DIR/tests_explorer/features
- staging-custom    : run di env staging untuk specific test case atau folder dalam PROJECT_DIR/tests_explorer/features

Notes:
one script will generate reports in html, xml, json & generate live output to terminal

## How to run scripts

- npm run qc
- npm run qc-custom --featurepath=3.acquisition/createPolicy
- npm run staging
- npm run staging-custom --featurepath=3.acquisition/createPolicy

## Reports

- Will generate 3 types of reports: xml, json, and html.
- Reports location path: Reports/
- Date format: YYMMDD_HHMMSS

### Docs

- **[Selenuim](https://www.selenium.dev/documentation/)**
